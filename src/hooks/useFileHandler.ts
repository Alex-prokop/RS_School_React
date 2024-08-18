import { useState } from 'react';

export const useFileHandler = () => {
  const [fileData, setFileData] = useState<string | null>(null);

  const handleFileChange = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result?.toString() || null;
        setFileData(result);
        resolve(result);
      };
      reader.onerror = () => {
        reject(null);
      };
      reader.readAsDataURL(file);
    });
  };

  return { fileData, handleFileChange };
};
