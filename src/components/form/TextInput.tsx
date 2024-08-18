import React from 'react';

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

TextInput.displayName = 'TextInput';

export default TextInput;
