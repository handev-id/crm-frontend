import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoleKey } from "../../types/roles";

type Props = {
  allowed: string[];
  roles?: RoleKey[];
  redirectTo: string;
};

export default function useCheckRoles({ allowed, roles, redirectTo }: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (allowed && roles && allowed.length > 0 && roles.length > 0) {
      if (roles.some((role) => !allowed.includes(role))) {
        navigate(redirectTo, { replace: true });
      }
    }
  }, [allowed, roles]);
}
