import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import '../App.css';
import { supabase } from '../client';

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
      setFormData({ fullName: '', email: '', password: '' });                       // Reset form
    }
    } catch (error : any) {
      console.error('Unexpected error signing up:', error);
      alert('Unexpected Error: ' + error.message);
    }
  }

  return (
    <div className="container">
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
    </div>
  );
};

export default SignUp;
