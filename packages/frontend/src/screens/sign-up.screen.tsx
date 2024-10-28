import { Button, Label } from 'flowbite-react';
import { FormikHelpers, useFormik } from 'formik';
// import { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
import { object, ref, string } from 'yup';
import { FormTextInput } from '../components/form-text-input';
import AuthLayout from '../components/auth-layout';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { signUpCommand } from '../state/auth.slice';
import { ApiAdapter } from '../api/api-adapter';
import { useEffect } from 'react';
import FormError from '../components/form-error';
import { LoaderButton } from '../components/loader-button';

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
    email: 'foo@bar.com',
    name: 'Jeff Bongo',
    password: '12345',
    confirmPassword: '12345',
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
    password: string().required('Password is required'),
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

      {/* <div className="flex">
        <div className="relative w-full">
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
            type="name"
            id="name"
            placeholder="Your Name"
            required
            value="Jeff Bongo"></input>
        </div>
      </div> */}

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
          Click me
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
