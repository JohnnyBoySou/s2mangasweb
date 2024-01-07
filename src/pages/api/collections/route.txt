
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default async function handle(req, res) {
    const { collection, id } = req.body;
    return res.status(200).json({ message: 'Hello from Next.js!' })
  
    try {
      const result = await sql`
        UPDATE users
        SET collections = array_append(collections, ${collection}::jsonb)
        WHERE id = ${id}
        RETURNING *`;
  
      const updatedUser = result.rows[0];
      //return updatedUser;
    } catch (error) {
      console.error('Error adding collection to user', error);
      throw error;
    }
  }
  