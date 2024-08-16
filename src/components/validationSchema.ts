import * as yup from 'yup';

export const formSchema = yup.object().shape({
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
    .test('fileSize', 'File too large', (value) => {
      return value && value[0] && value[0].size <= 1024 * 1024; // Проверка размера первого файла
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      return (
        value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type)
      ); // Проверка формата первого файла
    }),
});
