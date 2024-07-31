import React from 'react';
import DriverSignupForm from './DriverSignupForm';
import { useNavigate, useLocation } from 'react-router-dom';


function BecomeDriverPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const prevOrderDetails = location.state || null;


    const handleSignup = (formData) => {
        // Handle the form submission, e.g., make an API request to sign up the driver
        console.log('Submitted data:', formData);
        // You can make API calls here to submit the driver's information
        navigate('/driver/confirm_signup', { state: formData });
    };

    return (
        <div>
            <h2>Become a Driver</h2>
            <p>Please provide your information to sign up as a driver.</p>
            <DriverSignupForm onSubmit={handleSignup} initialFormData={prevOrderDetails} />
        </div>
    );
}

export default BecomeDriverPage;
