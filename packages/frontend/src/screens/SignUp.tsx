import { Button, Label } from 'flowbite-react';
import { FormikHelpers, useFormik } from 'formik';
// import { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
import { object, ref, string } from 'yup';
import { FormTextInput } from '../components/FormTextInput';
import AuthLayout from '../components/AuthLayout';

// import { FormTextInput } from '../components/molecules';
// import useAccess, { accessState } from '../state/access';

type SignUpFormProps = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  // const { createAccess, confirmAccess } = useAccess();
  // const [code, setCode] = useState('');
  // const [confirmingAccess, setConfirmingAccess] = useState(false);
  // const [confirmingAccessErrors, setConfirmingAccessErrors] = useState<
  //   string | undefined
  // >(undefined);

  // const { userId } = useRecoilValue(accessState);

  // const initialValues: SignUpFormProps = {
  //   email: `jb${Math.floor(Math.random() * 1000)}@foo.com`,
  //   name: 'Jeff Bongo',
  //   password: '123456789012',
  //   confirmPassword: '123456789012',
  // };

  const initialValues: SignUpFormProps = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };

  // const register = async (username: string, password: string) => {
  //   try {
  //     await createAccess(
  //       username,
  //       password,
  //       searchParams.get('license') ?? undefined,
  //     );
  //   } catch (error) {
  //     console.log('error creating access:', error);
  //   }
  // };

  // const verifyCode = async () => {
  //   try {
  //     setConfirmingAccessErrors(undefined);
  //     setConfirmingAccess(true);
  //     await confirmAccess(code);
  //     navigate('/details');
  //   } catch (error) {
  //     setConfirmingAccess(false);
  //     setConfirmingAccessErrors(error as any);
  //     console.log('error confirming access:', error);
  //   }
  // };

  const onSubmitAsync = async () =>
    //   values: ISignUpFormProps,
    //   formikHelpers: FormikHelpers<ISignUpFormProps>,
    {
      //   await register(values.email, values.password);
      alert(JSON.stringify(values, null, 2));
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
    onSubmit: onSubmitAsync,
    validationSchema,
  });

  return (
    <AuthLayout>
      <span className="text-l font-bold text-gray-900 ">
        Sign up
      </span>

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
