import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from '../components/form/TextInput';
import RadioInput from '../components/form/RadioInput';
import FileInput from '../components/form/FileInput';
import CountryAutocomplete from '../components/CountryAutocomplete';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import '../components/Form.css';

const FormControlledView = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  passwordValue,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            id="name"
            name="name"
            {...field}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Age"
            id="age"
            name="age"
            type="number"
            {...field}
            error={errors.age?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Email"
            id="email"
            name="email"
            type="email"
            {...field}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Password"
            id="password"
            name="password"
            type="password"
            {...field}
            error={errors.password?.message}
          />
        )}
      />
      <PasswordStrengthMeter password={passwordValue} />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...field}
            error={errors.confirmPassword?.message}
          />
        )}
      />
      {errors.confirmPassword && (
        <div className="error">{errors.confirmPassword.message}</div>
      )}

      <div>
        <label htmlFor="gender">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <>
              <RadioInput
                label="Male"
                id="male"
                name="gender"
                value="Male"
                checked={field.value === 'Male'}
                onChange={() => field.onChange('Male')}
                error={errors.gender?.message}
              />
              <RadioInput
                label="Female"
                id="female"
                name="gender"
                value="Female"
                checked={field.value === 'Female'}
                onChange={() => field.onChange('Female')}
                error={errors.gender?.message}
              />
            </>
          )}
        />
      </div>

      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Accept Terms and Conditions"
            id="terms"
            name="terms"
            type="checkbox"
            {...field}
            error={errors.terms?.message}
          />
        )}
      />

      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <FileInput
            label="Upload Picture"
            id="picture"
            name="picture"
            onChange={(e) => field.onChange(e.target.files)}
            error={errors.picture?.message}
          />
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <div>
            <label htmlFor="country">Country</label>
            <CountryAutocomplete
              value={field.value || ''}
              onSelectCountry={(value) => {
                field.onChange(value);
              }}
            />
            {errors.country && (
              <div className="error">{errors.country.message}</div>
            )}
          </div>
        )}
      />

      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        Submit
      </button>
    </form>
  );
};

export default FormControlledView;
