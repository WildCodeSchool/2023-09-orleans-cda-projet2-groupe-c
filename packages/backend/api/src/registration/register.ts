/* eslint-disable unicorn/no-null */
import express from 'express';
import multer from 'multer';
/* import { v4 as uuidv4 } from 'uuid'; */
import crypto from 'node:crypto';


import { db } from '@app/backend-shared';
import type { FormProfileBodyBackend, Request } from '@app/shared';

import { getUserId } from '../middlewares/auth-handlers';

const LIMIT_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const registerRouter = express.Router();

registerRouter.post('/', getUserId, async (req: Request, res) => {
  try {
    const {
      name,
      birthdate,
      gender,
      cityId,
      biography,
      accountGithub,
      languages,
      technologies,
      hobbies,
      distance,
      languagePrefId,
      genderPref,
    } = req.body as FormProfileBodyBackend;

    const userId = req.userId as number;

    // Use the transaction property allows us to cancel the request if an
    // Error has arrived during the submission of the data
    await db.transaction().execute(async (trx) => {
      await trx
        .updateTable('user')
        .set({
          name,
          birthdate,
          gender,
          city_id: Number(cityId),
          biography,
          account_github: String(accountGithub),
        })
        .where('user.id', '=', userId)
        .executeTakeFirstOrThrow();

      // It maps over the 'languages, technologies and hobbies' array, which contains objects with 'id' and 'order' properties.
      // e.g For each language, it creates a new record with 'language_id' set to the language's 'id',
      // 'user_id' set to 'userId', and 'order' set to the language's 'order'.
      await trx
        .insertInto('language_user')
        .values(
          languages.map((language) => ({
            language_id: language.id,
            user_id: Number(userId),
            order: language.order,
          })),
        )
        .execute();

      await trx
        .insertInto('technology_user')
        .values(
          technologies.map((technology) => ({
            technology_id: technology.id,
            user_id: Number(userId),
            order: technology.order,
          })),
        )
        .execute();

      await trx
        .insertInto('hobby_user')
        .values(
          hobbies.map((hobby) => ({
            hobby_id: hobby.id,
            user_id: Number(userId),
            order: hobby.order,
          })),
        )
        .execute();

      await trx
        .insertInto('preference')
        .values({
          distance,
          language_pref_id: Number(languagePrefId),
          gender_pref: genderPref,
          user_id: Number(userId),
          // TODO : change this value with dynamic value
          min_age: 18,
          max_age: 100,
        })
        .execute();
    });

    return res.json({ success: true, message: 'User add with success !' });
  } catch (error) {
    return res.status(500).json({
      error: `An error occurred during registration ${String(error)}`,
    });
  }
});

const MIME_TYPES: Record<string, string> = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// Multer config
const storage = multer.diskStorage({
  // Destination folder
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  // Rename file with uuid + original name
  filename: (_req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const uniqueSuffix = crypto.randomUUID();
    const uniqueName = `${uniqueSuffix}.${extension}`;
    callback(null, uniqueName);
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
}).fields([
  {
    name: 'picture_1',
    maxCount: 1,
  },
  {
    name: 'picture_2',
    maxCount: 1,
  },
  {
    name: 'picture_3',
    maxCount: 1,
  },
  {
    name: 'picture_4',
    maxCount: 1,
  },
  {
    name: 'picture_5',
    maxCount: 1,
  },
  {
    name: 'picture_6',
    maxCount: 1,
  },
]);

// Upload route
registerRouter.post(
  '/upload',
  getUserId,
  // Middleware multer used to upload file and handle errors
  (req, res, next) => {
    upload(req, res, (err) => {
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
      // Check if the files is present
      if (!req.files) {
        return res
          .status(400)
          .json({ success: false, message: 'No files uploaded!' });
      }

      // Get user id from JWT
      const userId = req.userId as number;

      // Order to insert into the database, initialize to 0
      let order = 0;

      // Array to store the data to insert into the database
      const dataFiles = [];

      if (Boolean(req.files)) {
        // Get files from the request
        const filesObject = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        // Loop through the files
        for (const field in filesObject) {
          // Get files from the field
          const files = filesObject[field];

          for (const file of files) {
            // Get filename from the file
            const { filename } = file;

            // For each file, increment the order
            order++;

            // Data object to insert into the database
            const data = {
              picture_path: `/uploads/${filename}`,
              user_id: userId,
              order,
            };

            // Push the data into the array dataFiles
            dataFiles.push(data);
          }
        }
      }

      // Insert data into the database
      await db.insertInto('picture').values(dataFiles).execute();

      res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({
        success: false,
        message: `Fail to upload a pictures !`,
      });
    }
  },
);

export default registerRouter;
