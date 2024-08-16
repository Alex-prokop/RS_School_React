import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../components/validationSchema';
import { RootState } from '../store/store';
import { formSubmit } from '../store/formSlice';
import { useFileHandler } from '../hooks/useFileHandler';
import FormControlledView from './FormControlledView';

const FormControlledContainer = () => {
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
  const { fileData, handleFileChange } = useFileHandler();

  const handleCountrySelect = (country: string) => {
    setValue('country', country, { shouldValidate: true });
  };

  const onSubmit = async (data: any) => {
    let pictureData = null;

    if (data.picture && data.picture[0]) {
      pictureData = await handleFileChange(data.picture[0]);
    }

    dispatch(formSubmit({ ...data, picture: pictureData }));
    navigate('/');
  };

  return (
    <FormControlledView
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setValue={setValue}
      watch={watch}
      errors={errors}
      isSubmitting={isSubmitting}
      handleCountrySelect={handleCountrySelect}
      countries={countries}
      passwordValue={passwordValue}
    />
  );
};

export default FormControlledContainer;
