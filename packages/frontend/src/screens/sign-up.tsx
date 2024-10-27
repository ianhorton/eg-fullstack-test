import { Button, Label } from 'flowbite-react';
import { FormikHelpers, useFormik } from 'formik';
// import { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
import { object, ref, string } from 'yup';
import { FormTextInput } from '../components/form-text-input';
import AuthLayout from '../components/auth-layout';


type SignUpFormProps = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {


  const initialValues: SignUpFormProps = {
    email: 'foo@bar.com',
    name: 'Jeff Bongo',
    password: '12345',
    confirmPassword: '12345',
  };

  const onSubmit = (
    values: SignUpFormProps,
    formikHelpers: FormikHelpers<SignUpFormProps>,
  ) => {
    //alert(JSON.stringify(values, null, 2));
    const { name, email, password } = values;
    //signUp({ name, email, password });
  };

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
      <span className="text-l font-bold text-gray-900 ">Sign up</span>

      {/* {isSignUpInProgress ?? <>Sign Up Is in Progress!!!</>} */}

      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <FormTextInput
          id="name"
          label="Name"
          placeholder="Your Name"
          required={true}
          type="name"
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

        <Button disabled={isSubmitting} type="submit">
          Sign up
        </Button>
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
