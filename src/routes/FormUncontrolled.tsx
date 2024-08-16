import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { formSchema } from '../components/validationSchema';
import { RootState } from '../store/store';
import { formSubmit } from '../store/formSlice';
import TextInput from '../components/form/TextInput';
import RadioInput from '../components/form/RadioInput';
import FileInput from '../components/form/FileInput';
import CountryAutocomplete from '../components/CountryAutocomplete';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const FormUncontrolled = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<string | null>(null);

  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = () => {
    const value = passwordRef.current?.value || '';
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
  };

  const handleCountrySelect = (country: string) => {
    countryRef.current = country;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current,
    };

    console.log('Form data before validation:', formData);

    try {
      await formSchema.validate(formData, { abortEarly: false });

      setErrors({});
      console.log('Validation passed, submitting form');

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Picture = reader.result?.toString();
        console.log('Picture processed:', base64Picture);
        dispatch(formSubmit({ ...formData, picture: base64Picture }));
        navigate('/');
      };

      if (formData.picture) {
        reader.readAsDataURL(formData.picture);
      } else {
        reader.onloadend();
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
        console.error('Validation errors:', newErrors);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        id="name"
        name="name"
        inputRef={nameRef}
        error={errors.name}
      />

      <TextInput
        label="Age"
        id="age"
        name="age"
        type="number"
        inputRef={ageRef}
        error={errors.age}
      />

      <TextInput
        label="Email"
        id="email"
        name="email"
        type="email"
        inputRef={emailRef}
        error={errors.email}
      />

      <TextInput
        label="Password"
        id="password"
        name="password"
        type="password"
        inputRef={passwordRef}
        onChange={handlePasswordChange}
        error={errors.password}
      />
      <PasswordStrengthMeter password={passwordRef.current?.value || ''} />

      <TextInput
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        inputRef={confirmPasswordRef}
        error={errors.confirmPassword}
      />
      {errors.confirmPassword && (
        <div className="error">{errors.confirmPassword}</div>
      )}

      <div>
        <label>Gender</label>
        <RadioInput
          label="Male"
          id="male"
          name="gender"
          value="Male"
          inputRef={genderRef}
          error={errors.gender}
        />
        <RadioInput
          label="Female"
          id="female"
          name="gender"
          value="Female"
          inputRef={genderRef}
          error={errors.gender}
        />
      </div>

      <TextInput
        label="Accept Terms and Conditions"
        id="terms"
        name="terms"
        type="checkbox"
        inputRef={termsRef}
        error={errors.terms}
      />

      <FileInput
        label="Upload Picture"
        id="picture"
        name="picture"
        inputRef={pictureRef}
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

export default FormUncontrolled;
