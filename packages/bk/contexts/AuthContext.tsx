import React, { ReactNode, createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/RootReducer';
import { signOutCommand, signUpCommand } from '../../frontend/src/rtk/AuthSlice';
import { SignUpModel } from '../models/SignUpModel';

interface IAuthContextProps {
  userId: string | undefined;
  isSignUpInProgress: boolean;
  signOut: () => void;
  signUp: (signUp: SignUpModel) => void;
}

const AuthContext = createContext<IAuthContextProps>({
  userId: undefined,
  isSignUpInProgress: false,
  signOut: () => console.warn('no signOut provider.'),
  signUp: (signUp: SignUpModel) => console.warn('no signUp provider.'),
});

interface IAuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const { userId, isSignUpInProgress } = useSelector(
    ({ authState }: RootState) => authState,
  );

  const value: IAuthContextProps = {
    userId: userId,

    isSignUpInProgress: isSignUpInProgress,
    signOut: () => dispatch(signOutCommand()),
    signUp: (signUp: SignUpModel) => {
      console.log(signUp);
      const cmd = signUpCommand(signUp);
      console.log(cmd);
      const r = dispatch(cmd);
      console.log(r);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContext };

export default AuthContextProvider;
