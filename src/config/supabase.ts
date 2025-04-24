import { supabaseKey, supabaseUrl } from './env'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(supabaseUrl, supabaseKey)