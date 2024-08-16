import { useState } from 'react';

export const useFileHandler = () => {
  const [fileData, setFileData] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileData(reader.result?.toString() || null);
    };
    reader.readAsDataURL(file);
  };

  return { fileData, handleFileChange };
};
