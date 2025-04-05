import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function createDb(password: string, dbPath: string) {
  console.log('Creating new database');
  const initScriptPath = path.resolve(process.cwd(), 'init.sql');
  const db = await open({filename: dbPath, driver: sqlite3.Database});
  const initScript = readFileSync(initScriptPath, 'utf-8');
  await db.exec(initScript);

  return db;
}

export async function unlockDb(password: string) {
  const dbPath = path.resolve(process.cwd(), 'db.db');
  const db = !existsSync(dbPath) ?
    await createDb(password, dbPath) :
    await open({filename: dbPath, driver: sqlite3.Database});

  return db;
}
