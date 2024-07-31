import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { API_BASE_URL } from '../config';

function MerchantOrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state; // Assuming order details are passed via React Router's state

    const [orderStatus, setOrderStatus] = useState({ success: null, message: '' });

    const [userExist, setUserExist] = useState(false);
    const [password, setPassword] = useState('');
    const [userSignedIn, setUserSignedIn] = useState(false);

    // check if a user is logged in
    const isSignedIn = () => {
        // Replace with actual logic to check if user is signed in
        const token = localStorage.getItem('token');
        return token != null;
    };

    // Check for sign in status when component mounts
    useEffect(() => {
        if (!isSignedIn()) {
            // If not signed in, check if it's an existing user
            checkUserExists(orderDetails.email);
        }
        //  else {
        //     // If already signed in, submit the order directly
        //     confirmOrder();
        // }
    }, [userSignedIn]);


    const checkUserExists = (email) => {
        // Replace with actual API call to check if user exists
        // TODO:
        fetch(`${API_BASE_URL}/merchants/check_merchant_exists?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    // If user exists, prompt for password
                    setUserExist(true);
                } else {
                    // If user doesn't exist, prompt to create password and register
                    setUserExist(false);
                }
            });
    };

    const handlePasswordSubmit = () => {
        console.log("password submitted")
        if (userExist) {
            // Assume we have an API endpoint to sign in the user
            fetch(`${API_BASE_URL}/merchants/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: orderDetails.email, password: password })
            })
                .then(response => response.json())
                .then(data => {
                    // Save the token, assume the API returns a token on successful sign in
                    localStorage.setItem('token', data.token);
                    setUserSignedIn(true);
                    // confirmOrder();
                })
                .catch(error => {
                    console.error('Sign in failed', error);
                    // Handle sign in error, possibly by showing a message or retrying
                });
        } else {
            // If the dialog is to create a new password, handle registration
            // Assume we have an API endpoint to register the user
            fetch(`${API_BASE_URL}/merchants/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: orderDetails.email,
                    password: password,
                    name: orderDetails.name,
                    phoneNumber: orderDetails.phoneNumber,
                    companyName: orderDetails.companyName,
                    address: orderDetails.address,
                })
            })
                .then(response => response.json())
                .then(data => {
                    // Save the token, assume the API returns a token on successful registration
                    console.log("received response token after signup")
                    localStorage.setItem('token', data.token);
                    setUserSignedIn(true);
                    // confirmOrder(); Don't automatically confirm order
                })
                .catch(error => {
                    console.error('Registration failed', error);
                    // Handle registration error, possibly by showing a message or retrying
                });
        }
    };

    const confirmOrder = () => {

        const token = localStorage.getItem('token');

        console.log(JSON.stringify(orderDetails))
        console.log(token)

        // Make the POST request to submit the order
        fetch(`${API_BASE_URL}/merchants/submit_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use the token for Authorization
            },
            body: JSON.stringify(orderDetails)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit order');
                }
                return response.json();
            })
            .then(data => {
                console.log('Order submitted successfully', data);
                // Here, handle the UI update or navigation based on successful order submission
                // For example, you might want to navigate to a confirmation page
                setOrderStatus({ success: true, message: 'Order submitted successfully.' });
            })
            .catch(error => {
                console.error('Error submitting order:', error);
                setOrderStatus({ success: false, message: 'Failed to submit order. Please try again.' });
            });
    };


    const returnToHome = () => {
        navigate('/');
    }


    const editOrder = () => {
        navigate('/merchant/place_order', { state: orderDetails });
    };

    const formatAddress = (address) => {
        return `${address.address}, ${address.postalCode}, ${address.city}, ${address.province}, ${address.country}`;
    };

    // Dialog footer with conditional buttons
    const dialogFooter = (
        <div>
            <Button label={userExist ? "Sign In" : "Register"} onClick={handlePasswordSubmit} />
        </div>
    );


    return (
        <div>

            {/* Display order status message based on success or failure */}
            {orderStatus.success !== null && (
                <div className={`order-status`}>
                    <Message sticky={true} severity={orderStatus.success ? 'success' : 'error'}
                        summary={orderStatus.success ? 'success' : 'error'}
                        text={orderStatus.message} visible={orderStatus.success} />
                </div>
            )}

            <Dialog header="Authentication Required" visible={!isSignedIn()} style={{ width: '50vw' }} footer={dialogFooter}>
                <div>
                    <p>{userExist ? "Please enter your password to sign in." : "Welcome! Set a password to register."}</p>
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                </div>
            </Dialog>


            <h3>Order Confirmation</h3>
            <p>Date and Time: {orderDetails?.dateTime ? orderDetails.dateTime : 'Not specified'}</p>
            {orderDetails?.orders.map((order, index) => (
                <div key={index}>
                    <p>Package {index + 1}:</p>
                    <p>Pick-up Address: {order.pickAddress ? formatAddress(order.pickAddress) : 'Not specified'}</p>
                    <p>Destination Address: {order.destinationAddress ? formatAddress(order.destinationAddress) : 'Not specified'}</p>
                    <p>Items Quantity: {order.itemQuantity}</p>
                </div>
            ))}





            {orderStatus.success == null ?
                <div className="button-container">
                    <Button label="Confirm Order" onClick={confirmOrder} />
                    <Button label="Edit Order" className="p-button-secondary" onClick={editOrder} />
                </div>

                :
                <Button label="Return to Home" onClick={returnToHome} />
            }
        </div>
    );
}

export default MerchantOrderConfirmation;
