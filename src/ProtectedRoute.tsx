import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./services/api";

const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const token = localStorage.getItem("entnttoken");
        if (!token) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // Send the token to the server for verification
        const response = await auth.verify();

        // Check the user's role
        if (response?.status === 200 && response?.data?.role === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error verifying role:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyRole();
  }, [requiredRole]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return navigate("/unauthorized");
  }

  return children;
};

export default ProtectedRoute;
