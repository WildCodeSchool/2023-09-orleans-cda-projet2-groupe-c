import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@app/backend-shared';

const registerRouter = express.Router();

// Upload middleware
const upload = multer({ dest: 'public/uploads/' });

// Upload route
registerRouter.post('/upload', upload.single('picture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false });
    }
    const { originalname, filename } = req.file;

    // Rename file
    const newFilename = `${uuidv4()}-${originalname}`;

    // Rename file in public/uploads
    fs.rename(
      `public/uploads/${filename}`,
      `public/uploads/${newFilename}`,
      (error) => {
        if (error) throw error;
        res.send('File uploaded.');
      },
    );

    const data = {
      picture_path: `/uploads/${newFilename}`,
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
