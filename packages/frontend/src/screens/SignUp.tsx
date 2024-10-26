import { Button, Label } from "flowbite-react";
import { FormikHelpers, useFormik } from "formik";
// import { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
import { object, ref, string } from "yup";
import { FormTextInput } from "../components/FormTextInput";

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

  const initialValues: SignUpFormProps = {
    email: `jb${Math.floor(Math.random() * 1000)}@foo.com`,
    name: "Jeff Bongo",
    password: "123456789012",
    confirmPassword: "123456789012",
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
      //   //alert(JSON.stringify(values, null, 2));
    };

  const validationSchema = object({
    email: string()
      .email("please use a valid email address")
      .required("your email address is required"),
    password: string().required("password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), undefined], "Passwords don't match")
      .required("Confirm Password is required"),
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
    <div className="flex w-full flex-col">
      <main className="bg-gray-50">
        Sign Up
        <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
        <Button color="blue">Default</Button>
        <button
        type="submit"
        className="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 rounded-lg"
      >
        <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
          Create account
        </span>
      </button>
          <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Create your account
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
                Create account
              </Button>
              <Label className="flex" htmlFor="agree">
                <p>Already have an account?</p>
                <a href="/sign-in" className="text-cyan-700 hover:underline">
                  <p>&nbsp;Login here</p>
                </a>
              </Label>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
