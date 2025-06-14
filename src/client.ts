
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mdbaicxyjckpznvpkwsm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYmFpY3h5amNrcHpudnBrd3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTAwMjcsImV4cCI6MjA2NTQ4NjAyN30.f-hEvD-0XJp13jJqkt5N198UMh51D9Ox-kW1yV2T3_4"
export const supabase = createClient(supabaseUrl, supabaseKey)