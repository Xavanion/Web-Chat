import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setAuthentication] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await fetch('http://localhost:5000/api/verify',{
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.status === 200) {
                    setAuthentication(true);
                } else {
                    setAuthentication(false);
                }
            } catch ( error ) {
                console.error('Auth Failed', error);
                setAuthentication(false);
                navigate('/account');
            }
        };

        checkAuth();
    }, [navigate]);

    return isAuthenticated;
};
