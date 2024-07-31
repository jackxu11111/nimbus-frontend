import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function MerchantHome() {
    const [merchantOrders, setMerchantOrders] = useState([]);
    const merchantEmail = 'merchant@example.com'; // Replace with the actual merchant's email from JWT

    // Mocked order data (replace with actual backend request)
    const mockedOrders = [
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
            status: 'Pending',
        },
        // Add more mocked orders here
    ];

    // Simulated backend request (replace with actual request)
    const fetchMerchantOrders = () => {
        // In a real application, you would make an API request to get merchant orders.
        // For now, we'll use the mocked data.
        setMerchantOrders(mockedOrders);
    };

    useEffect(() => {
        fetchMerchantOrders(); // Fetch orders when the component mounts
    }, []);

    return (
        <div>
            <h2>Merchant Home</h2>
            <h3>Welcome, Merchant!</h3>
            <Link to="/merchant/place_order">
                <button>Place New Order</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Pick-up Address</th>
                        <th>Destination Address</th>
                        <th>Dimensions</th>
                        <th>Weight (kg)</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {merchantOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.dateTime).toLocaleString()}</td>
                            <td>{`${order.pickAddress.address}, ${order.pickAddress.city}, ${order.pickAddress.province}`}</td>
                            <td>{`${order.destinationAddress.address}, ${order.destinationAddress.city}, ${order.destinationAddress.province}`}</td>
                            <td>{`${order.dimensions.length} x ${order.dimensions.width} x ${order.dimensions.height}`}</td>
                            <td>{order.weight}</td>
                            <td>${order.price.toFixed(2)}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MerchantHome;
