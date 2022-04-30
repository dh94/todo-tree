import { useState, useEffect } from "react";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "./api/client";
import Auth from "./Auth";
import { Account } from "./Account";
import "./index.css";

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth />
      ) : (
        <Account
          key={session.user!.id}
          session={{ ...session, user: session.user! }}
        />
      )}
    </div>
  );
}
