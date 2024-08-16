import { useState } from 'react';

export const useFileHandler = () => {
  const [fileData, setFileData] = useState<string | null>(null);

  const handleFileChange = (file: File): Promise<string | null> => {
    console.log('File received for processing:', file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result?.toString() || null;
        console.log('File successfully read as Base64:', result);
        setFileData(result);
        resolve(result);
      };
      reader.onerror = () => {
        console.error('Failed to read file');
        reject(null);
      };
      reader.readAsDataURL(file);
    });
  };

  return { fileData, handleFileChange };
};
1;
