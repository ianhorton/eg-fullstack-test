import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../state/hooks';

function RequiresSignIn({ children }: { children: ReactElement }) {

  const userId = useAppSelector((state) => state.authState.userId);

  if (userId) {
    return children;
  }
  return <Navigate to={`/sign-in`} />;
}

export default RequiresSignIn;
