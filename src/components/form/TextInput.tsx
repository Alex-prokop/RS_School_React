import React from 'react';

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, name, type = 'text', error, onChange }, ref) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} ref={ref} onChange={onChange} />
      {error && <div className="error">{error}</div>}
    </div>
  )
);

export default TextInput;
