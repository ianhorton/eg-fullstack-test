import { Label } from 'flowbite-react';
import { FormikHelpers, useFormik } from 'formik';
import { object, ref, string } from 'yup';

import { passwordValidator } from '../common/password-validator';
import AuthLayout from '../components/auth-layout';
import FormError from '../components/form-error';
import { FormTextInput } from '../components/form-text-input';
import { LoaderButton } from '../components/loader-button';
import { signUpCommand } from '../state/auth.slice';
import { useAppDispatch, useAppSelector } from '../state/hooks';

type SignUpFormProps = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const isSignUpInProgress = useAppSelector(
    (state) => state.authState.isSignUpInProgress,
  );
  const authErrors = useAppSelector((state) => state.authState.errors);
  const dispatch = useAppDispatch();

  const initialValues: SignUpFormProps = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };

  function onSubmit(
    values: SignUpFormProps,
    formikHelpers: FormikHelpers<SignUpFormProps>,
  ) {
    const { name, email, password } = values;
    dispatch(signUpCommand({ name, email, password }));
  }

  const validationSchema = object({
    email: string()
      .email('Invalid valid email address')
      .required('Email address is required'),
    name: string().required('Name is required'),
    password: string()
      .required('Password is required')
      .test(
        'validate-password',
        'The password must be at least 8 characters and contain at least a letter, a number and special character.',
        function (value) {
          return passwordValidator(value);
        },
      ),
    confirmPassword: string()
      .oneOf([ref('password'), undefined], "Passwords don't match")
      .required('Confirm Password is required'),
  });

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <AuthLayout>
      <span className="text-l font-bold text-gray-900 ">Sign up</span>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <FormTextInput
          id="name"
          label="Name"
          placeholder="Your Name"
          required={true}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.name}
          errors={errors.name}
          value={values.name}
        />
        <FormTextInput
          id="email"
          label="Email"
          placeholder="name@company.com"
          required={true}
          type="email"
          autoComplete="username"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          errors={errors.email}
          value={values.email}
        />
        <FormTextInput
          id="password"
          label="Password"
          placeholder="••••••••"
          required={true}
          type="password"
          autoComplete="new-password"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.password}
          errors={errors.password}
          value={values.password}
        />
        <FormTextInput
          id="confirmPassword"
          label="Confirm password"
          placeholder="••••••••"
          required={true}
          type="password"
          autoComplete="new-password"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.confirmPassword}
          errors={errors.confirmPassword}
          value={values.confirmPassword}
        />

        {authErrors.map((e, i) => {
          if (e) {
            return <FormError key={i} errors={e} />;
          }
        })}

        <LoaderButton isLoading={isSignUpInProgress} type="submit">
          Sign up
        </LoaderButton>
        <Label className="flex" htmlFor="agree">
          Already have an account?
          <a href="/sign-in" className="text-cyan-700 hover:underline">
            &nbsp;Sign in here
          </a>
        </Label>
      </form>
    </AuthLayout>
  );
}
