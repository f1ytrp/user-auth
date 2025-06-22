import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;
