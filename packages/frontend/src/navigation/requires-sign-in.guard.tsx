import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

//import { useAuthContext } from '../contexts/AuthContext';

function RequiresSignIn({ children }: { children: ReactElement }) {
  //const { userId } = useAuthContext();

  if (true) {
    return children;
  }
  return <Navigate to={`/sign-in`} />;
}

export default RequiresSignIn;
