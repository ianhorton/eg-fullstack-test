import { Button, Label } from 'flowbite-react';
import { FormikHelpers, useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import AuthLayout from '../components/AuthLayout';
import { FormTextInput } from '../components/FormTextInput';

// import { FormTextInput } from '../components/molecules';
// import useAccess from '../state/access';

interface ISignInFormProps {
  email: string;
  password: string;
}

export default function SignIn() {
  // const navigate = useNavigate();

  // const { login, getCurrentAccess } = useAccess();

  // useEffect(
  //   () => {
  //     try {
  //       getCurrentAccess();
  //     } catch (error) {
  //       // swallow error
  //     }
  //   },
  //   [
  //     // intentionally empty
  //   ],
  // );

  const initialValues: ISignInFormProps = {
    email: '',
    password: '',
  };

   const onSubmit = async (
  //   { email, password }: ISignInFormProps,
  //   formikHelpers: FormikHelpers<ISignInFormProps>,
   ) => {
  //   try {
  //     await login(email, password);
  //     navigate('/collaborations');
  //   } catch (error) {
  //     console.log('error confirming access:', error);
  //   }
   };

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
    isSubmitting,
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

        <Button disabled={isSubmitting} type="submit">
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
