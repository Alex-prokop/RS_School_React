import React from 'react';
interface SelectInputProps {
  label: string;
  id: string;
  name: string;
  options: string[];
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  defaultValue?: string;
  register?: unknown;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  name,
  options,
  error,
  inputRef,
  defaultValue,
  register,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      list={`${id}-list`}
      ref={inputRef}
      defaultValue={defaultValue}
      {...(register ? register(name) : {})} // Уточняем типизацию
    />
    <datalist id={`${id}-list`}>
      {options.map((option, index) => (
        <option key={index} value={option} />
      ))}
    </datalist>
    {error && (
      <div className="error" style={{ color: 'red' }}>
        {error}
      </div>
    )}
  </div>
);

SelectInput.displayName = 'SelectInput'; // Можно указать displayName для унификации

export default SelectInput;
