import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import '../App.css';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import AuthRedirectHandler from './AuthRedirectHandler';
import GoogleLogo from '../assets/google.png'


type FormData = {
  email: string;
  password: string;
};

const LogIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Submitted:', formData);
    const { email, password } = formData;
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
      console.error('login failed', error)
      alert('Login failed due to: ' + error.message)
    } else {
      console.log('Login successful:', data);
      alert('Login successful');
      setFormData({ email: '', password: '' });
      navigate('/dashboard')
    }
    } catch (error : any) {
      console.error('Unexpected error loggin in:', error);
      alert('Unexpected Error: ' + error.message);
    }
  }

  const googleSignIn = async () => {
      try {
        const {data, error} = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
        if(error) {
          console.log('Google Sign-In error :', error.message)
        } else {
          console.log('Redirecting to Google...');
          console.log('Sign up successful:', data);
        }
      } catch (error : any) {
        console.error('Unexpected error signing up:', error);
        alert('Unexpected Error: ' + error.message)
      }
    };

  return (
    <div className="container">
      <AuthRedirectHandler />
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <button 
        onClick={googleSignIn}
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px 15px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <img
          src={GoogleLogo}
          alt="Google logo"
          style={{ width: '30px', height: '30px' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default LogIn;