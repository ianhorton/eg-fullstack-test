import { Button } from 'flowbite-react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { signOutCommand } from '../state/auth.slice';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import AuthLayout from '../components/auth-layout';
import { fetchMessageCommand } from '../state/home.slice';
import { LoaderButton } from '../components/loader-button';

export default function Home() {
  const token = useAppSelector((state) => state.authState.token);
  const { errors, message, loading, loaded } = useAppSelector(
    (state) => state.homeState,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const memoizedToken = useMemo(() => {
    return token;
  }, [token]);

  useEffect(() => {
    if (memoizedToken === undefined) {
      navigate('/');
    }
  }, [memoizedToken]);

  useEffect(() => {
    dispatch(fetchMessageCommand());
  }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center _border border-black p-8">
        {loading && (
          <span className="text-l font-bold text-gray-900 ">LOADING!!</span>
        )}
        {loaded && message && (
          <span className="text-l font-bold text-gray-900 ">{message}</span>
        )}
 
        <LoaderButton   onClick={() => dispatch(signOutCommand())}  isLoading={loading}>
          Sign out
        </LoaderButton>
      </div>
    </AuthLayout>
  );
}
