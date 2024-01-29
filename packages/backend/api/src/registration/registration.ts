/* eslint-disable unicorn/no-null */
import express from 'express';
import multer from 'multer';

import { db } from '@app/backend-shared';

const registerRouter = express.Router();

// Upload configuration
const storage = multer.diskStorage({
  // Destination folder
  destination: (_req, _file, callback) => {
    callback(null, '/uploads');
  },
  // File name
  filename: (_req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() + 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Upload middleware
const upload = multer({ storage: storage });

// Upload route
registerRouter.post('/upload', upload.single('picture'), async (req, res) => {
  try {
    const file = req.file; // Use req.file instead of req.body.pictures
    const body = req.body;

    console.log(file);
    console.log(body);

    if (!file || !file.path) {
      return res.status(400).json({
        success: false,
        message: 'File data is missing',
      });
    }

    const data = {
      picture_path: file.path,
      user_id: 75,
      order: 1,
    };

    await db.insertInto('picture').values(data).execute();

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Fail to upload a picture : ${String(error)}`,
    });
  }
});

export default registerRouter;
