// pages/api/user/
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


export default async function POST(req, res) {
  const {
    name,
    genres,
    email,
    role,
    avatar,
    capa,
    coins,
    diamonds,
    date,
    plan,
    read,
    likes,
    complete,
    collections,
    preferences,
    marks,
  } = req.body;


  try {
    const result = await sql`
    INSERT INTO users (
      name,
      genres,
      email,
      role,
      avatar,
      capa,
      coins,
      diamonds,
      date,
      plan,
      read,
      likes,
      complete,
      collections,
      preferences,
      marks
    ) VALUES (
      ${name},
      ${JSON.stringify(genres)}::jsonb,
      ${email},
      ${role},
      ${avatar},
      ${capa},
      ${coins},
      ${diamonds}, 
      ${formatarData(new Date())},
      ${plan},
      ${JSON.stringify(read)}::jsonb,
      ${JSON.stringify(likes)}::jsonb,
      ${JSON.stringify(complete)}::jsonb,
      ${JSON.stringify(collections)}::jsonb,
      ${JSON.stringify(preferences)}::jsonb,
      ${JSON.stringify(marks)}::jsonb
    ) RETURNING *`;
 
    const newUser = result.rows[0];
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating a new user', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

