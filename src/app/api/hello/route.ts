import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
import {NextResponse} from "next/server" 
export async function GET(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const client = await db.connect();
 
  try {
    await client.sql`CREATE TABLE Petsss ( Name varchar(255), Owner varchar(255) );`;
    const names = ['Fiona', 'Lucy'];
    await client.sql`INSERT INTO Petsss (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return NextResponse.json({ error });
    // return response.status(500).json({ error });
  }
 
  const pets = await client.sql`SELECT * FROM Petsss;`;
  return NextResponse.json({ pets });
  // return response.status(200).json({ pets });
}