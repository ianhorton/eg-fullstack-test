// import { Button, Label } from 'flowbite-react';
// import { FormikHelpers, useFormik } from 'formik';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { object, string } from 'yup';

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

  // const initialValues: ISignInFormProps = {
  //   email: 'ian+a559@collabfocus.com',
  //   password: '123456789012',
  // };

  // const onSubmit = async (
  //   { email, password }: ISignInFormProps,
  //   formikHelpers: FormikHelpers<ISignInFormProps>,
  // ) => {
  //   try {
  //     await login(email, password);
  //     navigate('/collaborations');
  //   } catch (error) {
  //     console.log('error confirming access:', error);
  //   }
  // };

  // const validationSchema = object({
  //   email: string()
  //     .email('please use a valid email address')
  //     .required('your email address is required'),
  //   password: string().required('password is required'),
  // });

  // const {
  //   values,
  //   handleChange,
  //   handleSubmit,
  //   isSubmitting,
  //   errors,
  //   touched,
  //   handleBlur,
  // } = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema,
  // });

  return (
    <div className="flex w-full flex-col">
      <main className="bg-gray-50 dark:bg-gray-900">
        Sign Up
        {/* <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
          <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign in
            </h2>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <FormTextInput
                id="email"
                label="Your email"
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
                label="Your password"
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
                  <p>&nbsp;Create one here</p>
                </a>
              </Label>
            </form>
          </div>
        </div> */}
      </main>
    </div>
  );
}