import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project details
const supabaseUrl = 'https://prcqfoarqrjrkjwogzqh.supabase.co'
const supabaseAnonKey = 'sb_publishable_kySEu3TWHz5N3DGzOUJw8w_jlAPkdZ3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)