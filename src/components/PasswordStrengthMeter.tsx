import React from 'react';

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const calculateStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;
    return strength;
  };

  const strength = calculateStrength(password);
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

  return (
    <div>
      <progress value={strength} max="5"></progress>
      <p>{strengthText[strength]}</p>
    </div>
  );
};

export default PasswordStrengthMeter;
