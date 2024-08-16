import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../components/validationSchema';
import { RootState } from '../store/store';
import { formSubmit } from '../store/formSlice';
import TextInput from '../components/form/TextInput';
import RadioInput from '../components/form/RadioInput';
import FileInput from '../components/form/FileInput';
import CountryAutocomplete from '../components/CountryAutocomplete';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import '../components/Form.css';

const FormControlled = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const passwordValue = watch('password');
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const handlePasswordChange = (value: string) => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      setPasswordStrength('Strong');
    } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
    console.log('Password strength:', passwordStrength);
  };

  const handleCountrySelect = (country: string) => {
    console.log('Selected country:', country);
    setValue('country', country, { shouldValidate: true });
  };

  const onSubmit = (data: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Picture = reader.result?.toString();
      dispatch(formSubmit({ ...data, picture: base64Picture }));
      navigate('/');
    };

    if (data.picture && data.picture[0]) {
      reader.readAsDataURL(data.picture[0]);
    }
  };

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
            onChange={(e) => {
              field.onChange(e);
              handlePasswordChange(e.target.value);
            }}
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
        <label>Gender</label>
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
            <CountryAutocomplete onSelectCountry={handleCountrySelect} />
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

export default FormControlled;
