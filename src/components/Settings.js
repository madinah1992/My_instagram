import React, { useState } from 'react';
import { auth } from '../firebase';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (email) await user.updateEmail(email);
        if (password) await user.updatePassword(password);
        alert('Settings updated successfully');
      } catch (error) {
        console.error('Error updating settings:', error);
        alert('Failed to update settings');
      }
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="New email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="New password" />
      </div>
      <button onClick={handleUpdate}>Update Settings</button>
    </div>
  );
};

export default Settings;
