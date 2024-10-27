import { Button, Label } from 'flowbite-react';
import { FormikHelpers, useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import AuthLayout from '../components/auth-layout';
import { FormTextInput } from '../components/form-text-input';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { signInCommand } from '../state/auth.slice';
import FormError from '../components/form-error';

type SignInFormProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const isSignInInProgress = useAppSelector(
    (state) => state.authState.isSignInInProgress,
  );
  const authErrors = useAppSelector((state) => state.authState.errors);
  const dispatch = useAppDispatch();

  const initialValues: SignInFormProps = {
    email: 'jb@foo.com',
    password: '12345',
  };

  function onSubmit(
    values: SignInFormProps,
    formikHelpers: FormikHelpers<SignInFormProps>,
  ) {
    const { email, password } = values;
    dispatch(signInCommand({ email, password }));
  }

  const validationSchema = object({
    email: string()
      .email('Email address invalid')
      .required('Email is required'),
    password: string().required('Password is required'),
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <AuthLayout>
      <span className="text-l font-bold text-gray-900 ">Sign in</span>

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
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
        {authErrors.map((e, i) => {
          return <FormError key={i} errors={e} />;
        })}
        <Button disabled={isSignInInProgress} type="submit">
          Sign in
        </Button>
        <Label className="flex" htmlFor="agree">
          <p>No account?</p>
          <a
            href="/sign-up"
            color=""
            className="text-cyan-600 hover:underline dark:text-cyan-500">
            <p>&nbsp;Sign up here</p>
          </a>
        </Label>
      </form>
    </AuthLayout>
  );
}
