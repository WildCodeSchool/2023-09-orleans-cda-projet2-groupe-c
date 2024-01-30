/* eslint-disable unicorn/no-null */
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@app/backend-shared';
import type { Request } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';

const LIMIT_FILE_SIZE = 1 * 1024 * 1024; // 1MB

// Multer config
const storage = multer.diskStorage({
  // Destination folder
  destination: (_req, _file, callback) => {
    callback(null, 'public/images/users-pictures/');
  },
  // Rename file with uuid + original name
  filename: (_req, file, callback) => {
    callback(null, `${uuidv4()}-${file.originalname}`);
  },
});

// Upload middleware
const upload = multer({
  // Use storage config
  storage: storage,
  limits: { fileSize: LIMIT_FILE_SIZE },
  fileFilter: (_req, file, callback) => {
    // Check if the type file is allowed
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Only .jpeg, .jpg, .png and .webp format allowed!'));
    }
  },
});

const registerRouter = express.Router();

// Upload route
registerRouter.post(
  '/upload',
  getUserId,
  // Middleware multer used to upload file and handle errors
  (req, res, next) => {
    upload.single('picture')(req, res, (err) => {
      // Check if the error is an instance of multer error
      if (err instanceof multer.MulterError) {
        // Check if the code error is LIMIT_FILE_SIZE to send a custom message
        if (err.code === 'LIMIT_FILE_SIZE') {
          err.message = 'File size is too large! Maximum size is 1Mo.';
        }

        // Return the error message to display in the frontend
        return res.status(400).json({ success: false, message: err.message });
      } else if (Boolean(err)) {
        return res.status(500).json({ success: false, message: err.message });
      }

      next();
    });
  },
  // Function to insert data into the database
  async (req: Request, res) => {
    try {
      // Check if the file is present
      if (!req.file) {
        return res.status(400).json({ success: false });
      }

      // Get user id from JWT
      const userId = req.userId as number;

      // Get filename from the request file
      const { filename } = req.file;

      // Data object to insert into the database
      const data = {
        picture_path: `/images/users-pictures/${filename}`,
        user_id: userId,
        order: 1,
      };

      // Insert data into the database
      await db.insertInto('picture').values(data).execute();

      res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Fail to upload a picture : ${String(error)}`,
      });
    }
  },
);

export default registerRouter;
