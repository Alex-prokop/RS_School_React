import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { RootState } from './store';

const FormUncontrolled: React.FC = () => {
  const dispatch = useDispatch();
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
  const countryRef = useRef<HTMLInputElement>(null);

  const [passwordStrength, setPasswordStrength] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const schema = yup.object().shape({
      name: yup
        .string()
        .required('Name is required')
        .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
      age: yup
        .number()
        .required('Age is required')
        .positive('Age must be a positive number'),
      email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
      password: yup
        .string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must be stronger'
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match'),
      gender: yup.string().required('Gender is required'),
      terms: yup
        .boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
      picture: yup
        .mixed()
        .required('Picture is required')
        .test(
          'fileSize',
          'File too large',
          (value) => value && value.size <= 1024 * 1024
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
        ),
      country: yup.string().required('Country is required'),
    });

    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current?.value,
    };

    try {
      await schema.validate(formData, { abortEarly: false });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Picture = reader.result?.toString();
        dispatch({
          type: 'FORM_SUBMIT',
          payload: { ...formData, picture: base64Picture },
        });
        // Редирект на главную страницу после успешной отправки
      };
      if (formData.picture) reader.readAsDataURL(formData.picture);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Обработка ошибок валидации
        err.inner.forEach((error) => {
          console.error(error.path, error.message);
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" ref={nameRef} />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" ref={ageRef} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          onChange={handlePasswordChange}
        />
        <span>Password Strength: {passwordStrength}</span>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
        />
      </div>
      <div>
        <label>Gender</label>
        <div>
          <input
            id="male"
            name="gender"
            type="radio"
            value="Male"
            ref={genderRef}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            id="female"
            name="gender"
            type="radio"
            value="Female"
            ref={genderRef}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
      <div>
        <label htmlFor="terms">Accept Terms and Conditions</label>
        <input id="terms" name="terms" type="checkbox" ref={termsRef} />
      </div>
      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" name="picture" type="file" ref={pictureRef} />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          list="countries-list"
          ref={countryRef}
        />
        <datalist id="countries-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormUncontrolled;
