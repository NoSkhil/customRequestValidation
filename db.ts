import { Client } from 'pg';

// Replace 'your_supabase_connection_url' with your actual Supabase connection URL
const supabaseUrl = `postgres://postgres.tguiudddfjvlibhkjuja:${process.env.PGPASSWORD}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`;

const client = new Client({
  connectionString: supabaseUrl
});

export default client;