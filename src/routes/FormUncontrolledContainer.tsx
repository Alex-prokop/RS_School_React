import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { formSchema } from '../components/validationSchema';
import { RootState } from '../store/store';
import { formSubmit } from '../store/formSlice';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import { useFileHandler } from '../hooks/useFileHandler';
import FormUncontrolledView from './FormUncontrolledView';

const FormUncontrolledContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    picture: [] as File[], // Здесь мы сохраняем файл как массив
    country: '',
  });

  const passwordStrength = usePasswordStrength(formData.password);
  const { fileData, handleFileChange } = useFileHandler();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCountrySelect = (country: string) => {
    setFormData((prev) => ({ ...prev, country }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? [files[0]] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToValidate = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : null,
    };

    try {
      await formSchema.validate(dataToValidate, { abortEarly: false });

      setErrors({});
      console.log('Validation passed, submitting form');

      let pictureData = null;
      if (formData.picture.length > 0) {
        pictureData = await handleFileChange(formData.picture[0]);
        console.log('Processed file data:', pictureData);
      }

      dispatch(formSubmit({ ...dataToValidate, picture: pictureData }));
      navigate('/'); // Перенаправляем на главную страницу после успешной отправки формы
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <FormUncontrolledView
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      passwordStrength={passwordStrength}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCountrySelect={handleCountrySelect}
      countries={countries}
    />
  );
};

export default FormUncontrolledContainer;
