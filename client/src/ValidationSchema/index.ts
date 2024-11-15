import * as Yup from 'yup';
import {
  PASSWORD_REGEX,
  EMAIL_REGEX,
  ONLY_ALPHABET_REGEX,
  PHONE_REGEX,
} from '@/constants/regex';

export const ForgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter email.')
    .matches(EMAIL_REGEX, 'Please enter valid email'),
});

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter email.')
    .test('email', 'Please enter valid email', function (value) {
      if (!value) return true;

      return EMAIL_REGEX.test(value);
    }),

  password: Yup.string()
    .required('Please enter password')
    .min(8, 'Password must be at least 8 characters long.'),
  // .matches(PASSWORD_REGEX, 'pasword_validation_test'),
});

export const signUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Please enter your name.')
    .max(20, 'Please enter a user name with less than 20 characters.')
    .min(3, 'User name should have minimum 3 characters.')
    .matches(ONLY_ALPHABET_REGEX, 'Please enter only alphabets.'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Please enter a valid email address.')
    .required('Please enter your email address.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password must be minimum 8 characters long.')
    .matches(
      PASSWORD_REGEX,
      'Password should contain one number, one capital letter, and one special character.'
    ),
  accept: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('This field is required'),
});

export const NewPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      PASSWORD_REGEX,
      'Password should contain one number, one capital letter, and one special character.'
    ),
  confirmPassword: Yup.string()
    .required('Please enter your confirm password.')
    .oneOf([Yup.ref('password')], 'Passwords do not match. Please try again.'),
});

export const ContactUsFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Please enter your first name.')
    .max(20, 'Please enter a first name with less than 20 characters.')
    .min(3, 'First name should have minimum 3 characters.')
    .matches(ONLY_ALPHABET_REGEX, 'Please enter only alphabets.'),
  lastName: Yup.string()
    .trim()
    .required('Please enter last name.')
    .max(20, 'Please enter a last name with less than 20 characters.')
    .min(3, 'Last name should have minimum 3 characters.')
    .matches(ONLY_ALPHABET_REGEX, 'Please enter only alphabets.'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Please enter a valid email address.')
    .required('Please enter your email address.'),
  phone: Yup.string()
    .required('Please enter your phone number.')
    .matches(PHONE_REGEX, 'Please enter valid phone number'),
  subject: Yup.string()
    .trim()
    .required('Please enter your subject.')
    .max(20, 'Please enter a subject with less than 20 characters.')
    .min(3, 'Subject should have minimum 3 characters.')
    .matches(ONLY_ALPHABET_REGEX, 'Please enter only alphabets.'),
  message: Yup.string()
    .trim()
    .required('Please enter your message.')
    .max(500, 'Please enter a message with less than 500 characters.')
    .min(3, 'Message should have minimum 3 characters.'),
});
