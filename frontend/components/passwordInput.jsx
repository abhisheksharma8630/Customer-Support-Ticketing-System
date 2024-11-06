import React, { useState } from 'react';

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        style={{ padding: '10px 30px 10px 10px', fontSize: '16px' }}
      />
      <img
        src={showPassword ? "https://www.svgrepo.com/show/302446/eye-off.svg" : "https://www.svgrepo.com/show/302445/eye.svg"}
        alt="Toggle Password Visibility"
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          width: '20px',
          height: '20px'
        }}
      />
    </div>
  );
}

export default PasswordInput;
