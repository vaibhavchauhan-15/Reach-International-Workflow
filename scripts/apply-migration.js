/**
 * Reach International Operations - Supabase Schema Migration Runner
 * 
 * Applies supabase/schema.sql directly to the Postgres database using pg pooler.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Client } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function loadEnv() {
    const envPath = path.join(ROOT_DIR, '.env');
    if (!fs.existsSync(envPath)) return {};
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    const env = {};
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [k, ...v] = trimmed.split('=');
        if (k && v.length) env[k.trim()] = v.join('=').trim();
    }
    return env;
}

const env = loadEnv();
const password = process.argv[2] || env.DATABASE_PASSWORD || env.SUPABASE_DB_PASSWORD;

if (!password) {
    console.log(`
ℹ️  No database password provided.
To execute migrations directly via PostgreSQL, run:
  node scripts/apply-migration.js <YOUR_DB_PASSWORD>
Or set DATABASE_PASSWORD in .env.

Alternatively, copy the contents of "supabase/schema.sql" and run in Supabase SQL Editor:
👉 https://supabase.com/dashboard/project/mwtfftedrtxiegawgssf/sql/new
`);
    process.exit(0);
}

async function runMigration() {
    console.log('Connecting to Supabase PostgreSQL pooler...');
    const client = new Client({
        host: 'aws-0-ap-southeast-1.pooler.supabase.com',
        port: 6543,
        user: 'postgres.mwtfftedrtxiegawgssf',
        password: password,
        database: 'postgres',
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('✅ Connected to Postgres database!');

        const sqlPath = path.join(ROOT_DIR, 'supabase', 'schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('⏳ Executing schema.sql (tables, indexes, RLS)...');
        await client.query(sql);
        console.log('✅ Schema migration completed successfully!');
        await client.end();
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        process.exit(1);
    }
}

runMigration();
