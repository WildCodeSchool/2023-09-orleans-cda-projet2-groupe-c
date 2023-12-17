import express from 'express';

import { db } from '@app/backend-shared';

const register = express.Router();

register.get('/users', async (req, res) => {
  const users = await db.selectFrom('user').selectAll().execute();
  return res.json(users);
});
register.post('/', async (req, res) => {
  try {
    const {
      name,
      role,
      birthdate,
      gender,
      cityId,
      biography,
      accountGithub,
      email,
      password,
      languages
    } = req.body;
    
    const result = await db.transaction().execute(async (trx) => {
      const userResult = await trx.insertInto('user')
      .values({
        name,
        role,
        birthdate,
        gender,
        city_id: cityId,
        biography,
        account_github: accountGithub,
        email,
        password,
      })
      .execute()
      
      //recupère l'id de l'user nouvellement creer 
      const userId = userResult[0].insertId;
      
        for (const language of languages) { 
          await trx
          .insertInto('language_user')
          .values({
            language_id: language.id,
            user_id: Number(userId)
          })
          .execute();  
        }
      
      return userResult;
    });
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.json({ success: true, result: JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v) });
  } catch (error) {
    // Gérer les erreurs et envoyer une réponse appropriée
    console.error('Error in registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { register };
