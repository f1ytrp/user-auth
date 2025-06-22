import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import '../App.css';
import { supabase } from '../client';
import { Link } from 'react-router-dom'
import AuthRedirectHandler from './AuthRedirectHandler';


type FormData = {
  fullName: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Submitted:', formData);
    const { fullName, email, password } = formData;
    try{
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
    })
    if (error) {
      console.error('Error from Supabase:', error)
      alert('Error signing up: ' + error.message)
    } else {
      console.log('Sign up successful:', data);
      alert('Sign up successful! Please check your email for confirmation.');
      setFormData({ fullName: '', email: '', password: '' });
    }
    } catch (error : any) {
      console.error('Unexpected error signing up:', error);
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
        <h2>Sign Up</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
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

      <p>
        Already Signed Up? Then {' '}
        <Link to="/LogIn" style={{ color: 'blue' }}>
          Login...
        </Link>
      </p>

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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google logo"
          style={{ width: '20px', height: '20px' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignUp;
