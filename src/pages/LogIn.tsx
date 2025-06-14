import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import '../App.css';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';


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

  return (
    <div className="container">
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
    </div>
  );
};

export default LogIn;