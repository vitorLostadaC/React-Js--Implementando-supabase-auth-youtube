import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ilvmoiuqzwiqbpltofhp.supabase.co";
const SERVICE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQxNDI4MTMyLCJleHAiOjE5NTcwMDQxMzJ9.L4HMUMohsiSbE33gWxP1ixI98QBwNHUaA7szHQjZ8TU";
export const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
