import React from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout failed:', error);
        alert('Logout failed: ' + error.message);
      } else {
        console.log('Logout successful');
        alert('You have been logged out successfully');
        navigate('/LogIn');
      }
    } catch (error: any) {
      console.error('Unexpected error logging out:', error);
      alert('Unexpected Error: ' + error.message);
    }
  }

  return (
    <div>
        <h3>DashboardScreen</h3>
        <p>Welcome to the Dashboard, sign up and login is successful....</p>

        <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default DashboardScreen