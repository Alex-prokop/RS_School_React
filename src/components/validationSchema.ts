import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),

  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be a whole number')
    .max(120, 'Age cannot exceed 120 years'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  gender: yup.string().required('Gender is required'),

  terms: yup
    .boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),

  picture: yup
    .mixed()
    .required('Picture is required')
    .test('fileSize', 'File size should be less than 1MB', (value) => {
      return value && value[0] && value[0].size <= 1024 * 1024;
    })
    .test(
      'fileFormat',
      'Unsupported format, only JPEG and PNG are allowed',
      (value) => {
        return (
          value &&
          value[0] &&
          ['image/jpeg', 'image/png'].includes(value[0].type)
        );
      }
    )
    .test(
      'fileResolution',
      'Image resolution should be at least 300x300',
      async (value) => {
        if (!value || !value[0]) return true;

        const file = value[0];
        const img = new Image();
        img.src = URL.createObjectURL(file);
        return new Promise((resolve) => {
          img.onload = () => {
            if (img.width >= 300 && img.height >= 300) {
              resolve(true);
            } else {
              resolve(false);
            }
          };
        });
      }
    ),

  country: yup.string().required('Country is required'),
  // .min(2, 'Country must be at least 2 characters long'),
});
