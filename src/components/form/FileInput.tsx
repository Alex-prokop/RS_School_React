import React from 'react';

interface FileInputProps {
  label: string;
  id: string;
  name: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, id, name, error, onChange }, ref) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="file" ref={ref} onChange={onChange} />
      {error && (
        <div className="error" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  )
);

FileInput.displayName = 'FileInput';

export default FileInput;
