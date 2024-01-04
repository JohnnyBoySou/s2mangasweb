
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

function formatarData(data) {
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();

  return `${dia} de ${mes}, ${ano}`;
}


export default async function addCollectionToUser(req, res) {
    const {collection, id } = req.body;

    console.log('Collection:', collection);
    console.log('ID:', id);
  
    try {
      const result = await sql`
        UPDATE users
        SET collections = array_append(collections, ${collection}::jsonb)
        WHERE id = ${id}
        RETURNING *`;
  
      const updatedUser = result.rows[0];
      return updatedUser;
    } catch (error) {
      console.error('Error adding collection to user', error);
      throw error;
    }
  }
  