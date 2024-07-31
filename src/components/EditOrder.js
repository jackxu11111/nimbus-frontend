import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { API_BASE_URL } from '../config';

function EditOrder() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const toast = useRef(null);

    const [orderStatus, setOrderStatus] = useState({ success: null, message: '' });
    const [photo, setPhoto] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const onUpload = (event) => {
        const selectedFile = event.files[0];
        setPhoto(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const handleSubmit = () => {
        if (photo) {
            // Create a FormData instance to send the photo file
            const formData = new FormData();
            formData.append('photo', photo);

            fetch(`${API_BASE_URL}/drivers/orders/${orderId}/complete`, {
                method: 'PUT',
                headers: {
                    // Do not set 'Content-Type': 'multipart/form-data',
                    // Fetch will set it correctly with the boundary when FormData is used
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        // If the server responds with a non-2xx HTTP status, throw an error
                        throw new Error('Failed to mark the order as completed');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Order completed successfully:', data);
                    setOrderStatus({
                        success: true,
                        message: 'Order marked as completed successfully.',
                    });
                    // You can navigate to another page or update the state as needed
                })
                .catch(error => {
                    console.error('Error completing the order:', error);
                    setOrderStatus({
                        success: false,
                        message: error.message || 'An error occurred while marking the order as completed.',
                    });
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message || 'An error occurred while marking the order as completed.',
                    });
                });
        } else {
            console.error('Please select a photo to upload.');
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Please select a photo to upload.',
            });
        }
    };


    const handleRemovePhoto = () => {
        setPhoto(null);
        setImagePreviewUrl(null);
    };

    const returnHome = () => {
        window.history.back(); // Navigate back to the previous page
    };

    return (
        <div>
            <h2>Edit Order</h2>
            <p>Order ID: {orderId}</p>

            {orderStatus.success ? (
                <div className={`order-status`}>
                    <Message sticky={true} severity="success" summary="Success" detail={orderStatus.message} />
                    <Button label="Return to Home" onClick={returnHome} />
                </div>
            ) : (
                <div>
                    <label htmlFor="photo">Upload Photo:</label>
                    <Toast ref={toast} />
                    <FileUpload mode="basic" name="order_photo" accept="image/*" maxFileSize={1000000} customUpload uploadHandler={onUpload} />
                    {imagePreviewUrl && (
                        <div>
                            <h5>Preview:</h5>
                            <img src={imagePreviewUrl} alt="Order Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                            <Button label="Remove Photo" className="p-button-danger" onClick={handleRemovePhoto} />
                        </div>
                    )}
                    <Button label="Mark as Completed" onClick={handleSubmit} />
                </div>
            )}
        </div>
    );
}

export default EditOrder;
