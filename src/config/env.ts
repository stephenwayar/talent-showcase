import { z } from 'zod';

// Define schema for environment variables to ensure they exist and have correct types
const configSchema = z.object({
  VITE_APP_SUPABASE_URL: z.string(),
  VITE_APP_SUPABASE_KEY: z.string(),
  VITE_APP_ENCRYPTION_KEY: z.string()
});

// Parse environment variables against the schema
// Will throw an error if any required variables are missing
const config = configSchema.parse(import.meta.env);

export const supabaseUrl = config.VITE_APP_SUPABASE_URL
export const supabaseKey = config.VITE_APP_SUPABASE_KEY
export const encryptionKey = config.VITE_APP_ENCRYPTION_KEY