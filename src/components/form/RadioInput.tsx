import React from 'react';

interface RadioInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  error?: string;
  checked?: boolean;
  onChange?: () => void;
}

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>(
  ({ label, id, name, value, error, checked, onChange }, ref) => (
    <div>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        ref={ref}
        defaultChecked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <div className="error" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  )
);

export default RadioInput;
