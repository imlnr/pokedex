import React from 'react';
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom"; // Correct import
import Login from '@/pages/Login';

interface PrivateRoutesProps {
    children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    // const navigate = useNavigate();
    const isLoggedIn = Cookies.get("isLoggedIn") && Cookies.get("accessToken");

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate("/login");
    //     }
    // }, [isLoggedIn, navigate]); // Dependency array to avoid unnecessary renders

    // Render the children only if the user is logged in
    return isLoggedIn ? <>{children}</> : <Login />;
};

export default PrivateRoutes;