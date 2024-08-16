// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import * as yup from 'yup';
// import { formSchema } from '../components/validationSchema';
// import { RootState } from '../store/store';
// import { formSubmit } from '../store/formSlice';
// import TextInput from '../components/form/TextInput';
// import RadioInput from '../components/form/RadioInput';
// import FileInput from '../components/form/FileInput';
// import CountryAutocomplete from '../components/CountryAutocomplete';
// import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
// import { usePasswordStrength } from '../hooks/usePasswordStrength';
// import { useFileHandler } from '../hooks/useFileHandler';
// import '../components/Form.css';

// const FormUncontrolled = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const countries = useSelector(
//     (state: RootState) => state.countries.countries
//   );

//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     gender: '',
//     terms: false,
//     picture: [] as File[], // Здесь мы сохраняем файл как массив
//     country: '',
//   });

//   const passwordStrength = usePasswordStrength(formData.password);
//   const { fileData, handleFileChange } = useFileHandler();
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleCountrySelect = (country: string) => {
//     setFormData((prev) => ({ ...prev, country }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : files ? [files[0]] : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const dataToValidate = {
//       ...formData,
//       age: formData.age ? parseInt(formData.age, 10) : null,
//     };

//     try {
//       await formSchema.validate(dataToValidate, { abortEarly: false });

//       setErrors({});
//       console.log('Validation passed, submitting form');

//       let pictureData = null;
//       if (formData.picture.length > 0) {
//         pictureData = await handleFileChange(formData.picture[0]);
//         console.log('Processed file data:', pictureData);
//       }

//       dispatch(formSubmit({ ...dataToValidate, picture: pictureData }));
//       navigate('/'); // Перенаправляем на главную страницу после успешной отправки формы
//     } catch (err) {
//       if (err instanceof yup.ValidationError) {
//         const newErrors: { [key: string]: string } = {};
//         err.inner.forEach((error) => {
//           if (error.path) {
//             newErrors[error.path] = error.message;
//           }
//         });
//         setErrors(newErrors);
//       }
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextInput
//         label="Name"
//         id="name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         error={errors.name}
//       />

//       <TextInput
//         label="Age"
//         id="age"
//         name="age"
//         type="number"
//         value={formData.age}
//         onChange={handleChange}
//         error={errors.age}
//       />

//       <TextInput
//         label="Email"
//         id="email"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         error={errors.email}
//       />

//       <TextInput
//         label="Password"
//         id="password"
//         name="password"
//         type="password"
//         value={formData.password}
//         onChange={handleChange}
//         error={errors.password}
//       />
//       <PasswordStrengthMeter password={formData.password} />

//       <TextInput
//         label="Confirm Password"
//         id="confirmPassword"
//         name="confirmPassword"
//         type="password"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         error={errors.confirmPassword}
//       />

//       <div>
//         <label>Gender</label>
//         <RadioInput
//           label="Male"
//           id="male"
//           name="gender"
//           value="Male"
//           checked={formData.gender === 'Male'}
//           onChange={handleChange}
//           error={errors.gender}
//         />
//         <RadioInput
//           label="Female"
//           id="female"
//           name="gender"
//           value="Female"
//           checked={formData.gender === 'Female'}
//           onChange={handleChange}
//           error={errors.gender}
//         />
//       </div>

//       <TextInput
//         label="Accept Terms and Conditions"
//         id="terms"
//         name="terms"
//         type="checkbox"
//         checked={formData.terms}
//         onChange={handleChange}
//         error={errors.terms}
//       />

//       <FileInput
//         label="Upload Picture"
//         id="picture"
//         name="picture"
//         onChange={handleChange}
//         error={errors.picture}
//       />

//       <div>
//         <label htmlFor="country">Country</label>
//         <CountryAutocomplete onSelectCountry={handleCountrySelect} />
//         {errors.country && <div className="error">{errors.country}</div>}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting || Object.keys(errors).length > 0}
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default FormUncontrolled;
