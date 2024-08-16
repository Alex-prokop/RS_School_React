import { useState, useEffect } from 'react';

export const usePasswordStrength = (password: string) => {
  const [strength, setStrength] = useState<string>('Weak');

  useEffect(() => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setStrength('Strong');
    } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      setStrength('Medium');
    } else {
      setStrength('Weak');
    }
  }, [password]);

  return strength;
};
