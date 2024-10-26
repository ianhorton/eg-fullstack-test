import { Navigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";

// import { accessState } from "../state/access";
import { ReactElement } from "react";

function RequiresSignIn({ children }: { children: ReactElement }) {
 // const { isSignedIn } = useRecoilValue(accessState);

  if (true) {
    return children;
  }
  return <Navigate to={`/sign-in`} />;
}

export default RequiresSignIn;
