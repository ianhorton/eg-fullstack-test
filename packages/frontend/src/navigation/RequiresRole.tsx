import { Navigate } from "react-router-dom";
//import { useAccessContext } from "../contexts";
//import { useAccessContext } from "./AccessContext";

interface IRequireRoleProps {
  readonly requiredRoles: string[];
  readonly children: any;
}

const RequiresRole: React.FC<IRequireRoleProps> = ({
  requiredRoles,
  children,
}) => {
 // const { roles } = useAccessContext();
  //const roles: string[] = [];

  const isAllowed = (roles?: string[]): boolean => {
    if (roles) {
      return roles.some((r) => requiredRoles.includes(r));
    }
    return false;
  };

  if (isAllowed([])) {
    return children;
  }
  return <Navigate to={`/`} />;
};

export default RequiresRole;
