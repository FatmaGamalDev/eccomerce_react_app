import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../api/supabaseClient";
import { setUser } from "../features/auth/authSlice";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        dispatch(setUser(data.session.user));
      } else {
        dispatch(setUser(null));
      }
      setSessionChecked(true);
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          dispatch(setUser(session.user));
        } else {
          dispatch(setUser(null));
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [dispatch]);

  return { sessionChecked };
};

export default useAuthSession;
