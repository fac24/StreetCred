import supabase from "../../utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-up");
  }

  return <button onClick={handleLogOut}>Log Out</button>;
}

export default Navbar;
