import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://isuiabahpvktbvhwzpgf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdWlhYmFocHZrdGJ2aHd6cGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODAwMTksImV4cCI6MjA1ODY1NjAxOX0.YtbGefREFNe9gZk7BOqGizUjLs2o6xOosJs-Lwjseo0";
// const  SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdWlhYmFocHZrdGJ2aHd6cGdmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzA4MDAxOSwiZXhwIjoyMDU4NjU2MDE5fQ.oO807-xaaSqBoP_co-40pTss76EyRqOGVW12j0JSC8M";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
