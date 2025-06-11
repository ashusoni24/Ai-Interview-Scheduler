'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch user from Supabase and Users table
  const fetchUser = async (supabaseUser) => {
    if (!supabaseUser?.email) {
      setUser(null);
      return;
    }
    let { data: Users, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', supabaseUser.email);

    if (Users?.length === 0) {
      // Insert new user
      const { data } = await supabase.from("Users").insert([
        {
          name: supabaseUser?.user_metadata?.name,
          email: supabaseUser?.email,
          picture: supabaseUser?.user_metadata?.picture
        }
      ]).select();
      setUser(data?.[0] || null);
    } else {
      setUser(Users[0]);
    }
  };

  useEffect(() => {
    // Initial fetch
    supabase.auth.getUser().then(({ data: { user: supabaseUser } }) => {
      fetchUser(supabaseUser);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};