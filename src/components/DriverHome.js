import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function DriverHome() {
    const navigate = useNavigate();

    const [ongoingOrders, setOngoingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);

    // Mocked order data (replace with actual backend request)
    const mockedOngoingOrders = [
        {
            id: 1,
            dateTime: '2022-01-15T10:30:00Z',
            pickAddress: {
                address: '123 Main St',
                postalCode: '12345',
                city: 'City',
                province: 'State',
                country: 'Country',
            },
            destinationAddress: {
                address: '456 Elm St',
                postalCode: '67890',
                city: 'City',
                province: 'State',
                country: 'Country',
            },
            dimensions: {
                length: 10,
                width: 5,
                height: 3,
            },
            weight: 15,
            price: 50.0,
            status: 'Ongoing',
        },
        // Add more mocked ongoing orders here
    ];

    const mockedCompletedOrders = [
        {
            id: 2,
            dateTime: '2022-01-10T14:45:00Z',
            pickAddress: {
                address: '789 Oak St',
                postalCode: '54321',
                city: 'City',
                province: 'State',
                country: 'Country',
            },
            destinationAddress: {
                address: '101 Pine St',
                postalCode: '98765',
                city: 'City',
                province: 'State',
                country: 'Country',
            },
            dimensions: {
                length: 8,
                width: 6,
                height: 4,
            },
            weight: 20,
            price: 70.0,
            status: 'Completed',
            completionImage: '/path/to/completion-image.jpg',
        },
        // Add more mocked completed orders here
    ];

    const mockedNewOrders = [
        {
            id: 3,
            dateTime: '2022-02-01T08:00:00Z',
            pickAddress: {
                address: '222 Park Ave',
                postalCode: '11111',
                city: 'City',
                province: 'State',
                country: 'Country',
            },
            destinationAddress: {
                address: '333 Lake Dr',
                postalCode: '44444',
                city: 'City',
                province: 'State',
                country: 'Country',
            },
            dimensions: {
                length: 12,
                width: 7,
                height: 5,
            },
            weight: 25,
            price: 60.0,
            status: 'New',
        },
        // Add more mocked new orders here
    ];

    // Simulated backend request (replace with actual request)
    const fetchDriverOrders = async () => {
        try {
            const token = localStorage.getItem('token');

            // get ongoing order to be completed by the current driver
            var queryParams = new URLSearchParams({
                status: "Confirmed"
            });
            var response = await fetch(`${API_BASE_URL}/drivers/orders/get_my_order_by_status?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token for Authorization
                },
            });

            if (!response.ok) {
                const errorText = await response.text(); // or response.json() if your server responds with JSON
                throw new Error(errorText || 'Failed to fetch orders');
            }

            var orders = await response.json();
            setOngoingOrders(orders);

            // get completed order by the current driver
            queryParams = new URLSearchParams({
                status: "Delivered"
            });
            response = await fetch(`${API_BASE_URL}/drivers/orders/get_my_order_by_status?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token for Authorization
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            orders = await response.json();
            setCompletedOrders(orders);


            // get all the new orders that are pending
            queryParams = new URLSearchParams({
                status: "Pending"
            });
            response = await fetch(`${API_BASE_URL}/drivers/orders/get_by_status?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token for Authorization
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            orders = await response.json();
            console.log(orders)
            setNewOrders(orders);

        } catch (error) {
            console.error('Error fetching driver orders:', error);
        }

    };

    useEffect(() => {
        fetchDriverOrders(); // Fetch orders when the component mounts
    }, []);

    const editOrder = (orderId) => {
        // when a task is ongoing, we can do the following things:
        // - mark the task to complete by submitting a picture
        // - cancle the task TODO
        // - decline the task with reasoning TODO
        navigate(`/driver/edit_order/${orderId}`);
    };


    const viewCompletedOrder = async (orderId, imageUrl) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/drivers/orders/${orderId}/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }

            const orderDetails = await response.json();
            // Assuming the backend returns the photo URL in a field named `completion_image_url`
            const imageUrl = orderDetails.completion_image_url;
            console.log("imageUrl", imageUrl)
            console.log("orderDetails", orderDetails)

            // Now navigate to a component or modal that will display the image
            navigate(`/driver/view-order-photo/${orderId}`, { state: { imageUrl } });
        } catch (error) {
            console.error('Error fetching order details:', error);
            alert('Failed to fetch order details');
        }
    };

    const acceptNewOrder = async (orderId) => {
        try {
            const token = localStorage.getItem('token'); // Assuming JWT for authentication
            const response = await fetch(`${API_BASE_URL}/drivers/orders/${orderId}/confirm`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Authorization header
                },
            });

            if (!response.ok) {
                // If the server response is not ok, throw an error
                const errorText = await response.text(); // or response.json() for JSON response
                throw new Error(errorText || 'Failed to accept order');
            }

            // If the request is successful, you might want to refresh the orders list
            fetchDriverOrders(); // Re-fetch orders to update the list
            console.log(`Order with ID: ${orderId} accepted successfully.`);
        } catch (error) {
            console.error('Error accepting new order:', error);
            alert(error.message); // Display error to the user, or handle it as needed
        }
    };


    return (
        <div>
            <h2>Driver Home</h2>
            <h3>Welcome, Driver!</h3>

            <h4>Ongoing Orders</h4>
            <RenderOrdersTable orders={ongoingOrders} onAction={editOrder} actionLabel="Edit" />

            <h4>Completed Orders</h4>
            <RenderOrdersTable orders={completedOrders} onAction={(orderId) => viewCompletedOrder(orderId)} actionLabel="View" />

            <h4>New Orders</h4>
            <RenderOrdersTable orders={newOrders} onAction={acceptNewOrder} actionLabel="Accept" />
        </div>
    );
}

function RenderOrdersTable({ orders, onAction, actionLabel }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date and Time</th>
                    <th>Pick-up Address</th>
                    <th>Destination Address</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.order_datetime}</td>
                        <td>{`${order.pick_address}, ${order.pick_city}`}</td>
                        <td>{`${order.dest_address}, ${order.dest_city}`}</td>
                        <td>{order.status}</td>
                        <td><button onClick={() => onAction(order.id)}>{actionLabel}</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default DriverHome;
