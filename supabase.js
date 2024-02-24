/** @format */

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oqvmwvylltourrjvzotk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdm13dnlsbHRvdXJyanZ6b3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyODg5OTcsImV4cCI6MjAyMzg2NDk5N30.c4w_dZhCsnU98xlrjUMHkvKY0P3JM4EnwfEaCJiMiX8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
