import supabase from "../../utils/supabaseClient";

function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}

export default handler;
