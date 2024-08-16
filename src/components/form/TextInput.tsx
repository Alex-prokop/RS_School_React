import React from 'react';

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, name, type = 'text', error, onChange, defaultValue }, ref) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        ref={ref}
        onChange={onChange}
        defaultValue={defaultValue}
        aria-invalid={!!error}
      />
      {error && (
        <div className="error" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  )
);

export default TextInput;
