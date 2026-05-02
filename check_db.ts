import { Pool } from "pg";
import "dotenv/config";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const result = await pool.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'user';
  `);
  console.log("Columns in 'user' table:", result.rows.map(r => r.column_name));
  
  const tables = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public';
  `);
  console.log("Tables in public schema:", tables.rows.map(r => r.table_name));
  
  process.exit(0);
}
main();
