import { z } from 'zod';

const configSchema = z.object({
  VITE_APP_SUPABASE_URL: z.string(),
  VITE_APP_SUPABASE_KEY: z.string(),
  VITE_APP_ENCRYPTION_KEY: z.string()
});

const config = configSchema.parse(import.meta.env);

export const supabaseUrl = config.VITE_APP_SUPABASE_URL
export const supabaseKey = config.VITE_APP_SUPABASE_KEY
export const encryptionKey = config.VITE_APP_ENCRYPTION_KEY