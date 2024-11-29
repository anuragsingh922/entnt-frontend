import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./services/api";

const Verify = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem("entnttoken");
        if (!token) {
          setIsLoading(false);
          setIsAuthorized(true);
          return;
        }

        const user = await auth.verify();
        setIsLoading(false);

        if (user?.status !== 200 || !user?.data) {
          localStorage.removeItem("entnttoken");
          return navigate("/unauthorized");
        }

        console.log("User : " , user);

        localStorage.setItem("identnt", user?.data?.id);
        setIsAuthorized(true);

        if (user?.data?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } catch (error) {
        console.error("Error in verification:", error);
        setIsLoading(false);
        navigate("/unauthorized");
      }
    };

    verify();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : null;
};

export default Verify;
