import React, { useState, useEffect } from 'react';
import Login from './Login'; // Import your Login component
import Loading from '../Components/Loading'; // Import the Loading component

function LoginPage() {
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Simulate an async operation like data fetching
        setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);
    }, []);

    if (loading) {
        return <Loading />; // Show loading component while loading is true
    }

    return <Login />; // Render the login page after loading is complete
}

export default LoginPage;
