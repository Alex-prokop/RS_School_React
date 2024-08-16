import React from 'react';
import TextInput from '../components/form/TextInput';
import RadioInput from '../components/form/RadioInput';
import FileInput from '../components/form/FileInput';
import CountryAutocomplete from '../components/CountryAutocomplete';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const FormUncontrolledView = ({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit,
  handleCountrySelect,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <TextInput
        label="Age"
        id="age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        error={errors.age}
      />

      <TextInput
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <PasswordStrengthMeter password={formData.password} />

      <TextInput
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <div>
        <label>Gender</label>
        <RadioInput
          label="Male"
          id="male"
          name="gender"
          value="Male"
          checked={formData.gender === 'Male'}
          onChange={handleChange}
          error={errors.gender}
        />
        <RadioInput
          label="Female"
          id="female"
          name="gender"
          value="Female"
          checked={formData.gender === 'Female'}
          onChange={handleChange}
          error={errors.gender}
        />
      </div>

      <TextInput
        label="Accept Terms and Conditions"
        id="terms"
        name="terms"
        type="checkbox"
        checked={formData.terms}
        onChange={handleChange}
        error={errors.terms}
      />

      <FileInput
        label="Upload Picture"
        id="picture"
        name="picture"
        onChange={handleChange}
        error={errors.picture}
      />

      <div>
        <label htmlFor="country">Country</label>
        <CountryAutocomplete onSelectCountry={handleCountrySelect} />
        {errors.country && <div className="error">{errors.country}</div>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        Submit
      </button>
    </form>
  );
};

export default FormUncontrolledView;
