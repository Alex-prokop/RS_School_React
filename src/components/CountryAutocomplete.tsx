import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CountryAutocomplete = ({
  value,
  onSelectCountry,
}: {
  value: string;
  onSelectCountry: (country: string) => void;
}) => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredCountries(
      countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    );
    onSelectCountry(value); // Обновляем значение country в форме при каждом изменении ввода
  };

  const handleSelect = (country: string) => {
    setInputValue(country);
    setFilteredCountries([]);
    onSelectCountry(country); // Обновляем значение country в форме при выборе из списка
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {filteredCountries.length > 0 && (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index} onClick={() => handleSelect(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
