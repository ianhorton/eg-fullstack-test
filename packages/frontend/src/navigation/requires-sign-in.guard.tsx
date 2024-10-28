import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../state/hooks';

function RequiresSignIn({ children }: { children: ReactElement }) {

  const token = useAppSelector((state) => state.authState.token);

  if (token) {
    return children;
  }
  return <Navigate to={`/sign-in`} />;
}

export default RequiresSignIn;
