import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Text } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return children;
  }

  if (loading) {
    return (
      <Text textAlign='center' py='96px'>
        Loading...
      </Text>
    );
  }

  return <Navigate to='/login' state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
