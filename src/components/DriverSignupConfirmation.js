import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { API_BASE_URL } from '../config';

function DriverSignupConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const signupFormData = location.state; // Assuming signup form data is passed via React Router's state

    const [confirmationStatus, setConfirmationStatus] = useState({ success: null, message: '' });

    const confirmSignup = () => {
        fetch(`${API_BASE_URL}/drivers/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupFormData)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        return response.text().then(text => Promise.reject(new Error(text)));
                    }
                    // Convert non-2xx HTTP responses into errors
                    throw new Error('Signup failed');
                }
                return response.json();
            })
            .then(data => {
                // Handle success
                console.log('Signup completed successfully', data);
                setConfirmationStatus({
                    success: true,
                    message: 'Signup completed successfully.'
                });
                // You can navigate to another route or perform additional actions here
            })
            .catch(error => {
                // Handle errors
                console.error('Error during signup:', error);
                setConfirmationStatus({
                    success: false,
                    message: error.message || 'An error occurred during signup.'
                });
            });
    };


    const returnToHome = () => {
        navigate('/');
    };

    const editSignup = () => {
        navigate('/driver/signup', { state: signupFormData });
    };

    return (
        <div>
            {/* Display confirmation status message based on success or failure */}
            {confirmationStatus.success !== null && (
                <div className={`confirmation-status`}>
                    <Message
                        sticky={true}
                        severity={confirmationStatus.success ? 'success' : 'error'}
                        summary={confirmationStatus.success ? 'Success' : 'Error'}
                        text={confirmationStatus.message}
                        visible={confirmationStatus.success}
                    />
                </div>
            )}

            <h3>Driver Signup Confirmation</h3>

            {/* Display signup details */}
            <p>Phone Number: {signupFormData?.phoneNumber || 'Not specified'}</p>
            <p>Email: {signupFormData?.email || 'Not specified'}</p>
            <p>SIN Number: {signupFormData?.sinNumber || 'Not specified'}</p>
            <p>City: {signupFormData?.city || 'Not specified'}</p>

            {confirmationStatus.success == null ? (
                <div className="button-container">
                    <Button label="Confirm Signup" onClick={confirmSignup} />
                    <Button label="Edit Signup" className="p-button-secondary" onClick={editSignup} />
                </div>
            ) : (
                <div className="button-container">
                    <Button label="Return to Home" onClick={returnToHome} />
                </div>
            )}
        </div>
    );
}


export default DriverSignupConfirmation;
