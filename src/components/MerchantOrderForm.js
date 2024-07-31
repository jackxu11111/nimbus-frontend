import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { format, parse } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';

function MerchantOrderForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state; // Data passed for editing if user returned from confirmatioin page

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateTime, setDateTime] = useState(null);
    // TODO: in the future, add dimension, weight, price ot each package
    // const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    // const [weight, setWeight] = useState('');
    // const [price, setPrice] = useState(null);

    const [orders, setOrders] = useState([
        {
            dateTime: null,
            pickAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
            destinationAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
            itemQuantity: 1 // Default one item per package
        }
    ]);

    // Populate the form fields if there is edit data
    useEffect(() => {
        if (editData) {
            const parsedDate = editData.dateTime ? parseCustomDateString(editData.dateTime) : null;
            setDateTime(parsedDate);
            setEmail(editData.email || '');
            setName(editData.name || '');
            setPhoneNumber(editData.phoneNumber || '');

            const ordersData = editData.orders || [
                {
                    pickAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
                    destinationAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
                    itemQuantity: 1
                },
            ];

            setOrders(ordersData);
        } else {
            // Create one order with empty values
            setOrders([
                {
                    pickAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
                    destinationAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
                    itemQuantity: 1
                },
            ]);
        }
    }, [editData]);


    // Function to add a new package
    const addPackage = () => {
        setOrders([
            ...orders,
            {
                // dateTime: null,
                pickAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
                destinationAddress: { address: '', postalCode: '', city: '', province: '', country: '' },
                itemQuantity: 1,
            }
        ]);
    };


    const monthNameToNumber = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };

    const parseCustomDateString = (dateString) => {
        const regex = /(\w+) (\d+)[a-z]{2}, (\d{4}) at (\d+):(\d+):(\d+) ([APM]{2}) GMT([+-]\d+)/;
        const matches = dateString.match(regex);
        console.log(matches)

        if (matches) {
            const [, month, day, year, hour, minute, second, ampm, timeZoneOffset] = matches;
            let hour24 = parseInt(hour, 10);
            if (ampm === 'PM') {
                hour24 += 12;
            }
            const monthNumber = monthNameToNumber[month]
            console.log(year, monthNumber - 1, day, hour24, minute, second)

            // Create a JavaScript Date object
            const parsedDate = new Date(year, monthNumber - 1, day, hour24, minute, second);
            console.log("parsedDate", parsedDate)

            return parsedDate

        }
        return null;
    };

    console.log("MerchantOrderForm")


    // Function to calculate price (to be implemented)
    // TODO: add calculate price back
    const calculatePrice = (idx) => {

        // TODO: update to read this from a dictionary
        const updatedOrders = [...orders];
        updatedOrders[idx].price = 5; // always 5 for now TODO: lookup in the given table
        setOrders(updatedOrders);

        // const calculatedPrice = Number(dimensions.length) + Number(dimensions.width) + Number(dimensions.height) + Number(weight);
        // setPrice(calculatedPrice);
    };

    // Function to submit an order request to the confirmation page
    const submitHandler = () => {
        const formattedOrders = orders.map((order) => ({
            ...order,
            // dateTime: order.dateTime ? format(order.dateTime, 'PPPppp') : null,
        }));

        const formData = {
            email,
            name,
            phoneNumber,
            dateTime: dateTime ? format(dateTime, 'PPPppp') : null,
            orders: formattedOrders,
        };

        navigate('/merchant/confirm_order', { state: formData });
    };

    return (
        <div>
            <h3>Place Your Order</h3>
            <div>
                <h5>Select Date & Time</h5>
                <Calendar value={dateTime} onChange={(e) => setDateTime(e.value)} showTime showIcon inline />
                <div>
                    <p>Selected Date and Time: {dateTime ? format(dateTime, 'PPPppp') : 'No date selected'}</p>
                </div>
            </div>

            <div>
                <h5>Contact Information</h5>
                <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <InputText value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
            </div>

            {orders.map((order, index) => (
                <div key={index}>
                    <h5>Package {index + 1}</h5>

                    <div>
                        <h5>Pick-up Address</h5>
                        <InputText
                            value={order.pickAddress.address}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].pickAddress = { ...updatedOrders[index].pickAddress, address: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Address"
                        />
                        <InputText
                            value={order.pickAddress.postalCode}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].pickAddress = { ...updatedOrders[index].pickAddress, postalCode: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Postal Code"
                        />
                        <InputText
                            value={order.pickAddress.city}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].pickAddress = { ...updatedOrders[index].pickAddress, city: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="City"
                        />
                        <InputText
                            value={order.pickAddress.province}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].pickAddress = { ...updatedOrders[index].pickAddress, province: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Province"
                        />
                        <InputText
                            value={order.pickAddress.country}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].pickAddress = { ...updatedOrders[index].pickAddress, country: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Country"
                        />
                    </div>
                    <div>
                        <h5>Destination Address</h5>
                        <InputText
                            value={order.destinationAddress.address}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].destinationAddress = { ...updatedOrders[index].destinationAddress, address: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Address"
                        />
                        <InputText
                            value={order.destinationAddress.postalCode}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].destinationAddress = { ...updatedOrders[index].destinationAddress, postalCode: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Postal Code"
                        />
                        <InputText
                            value={order.destinationAddress.city}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].destinationAddress = { ...updatedOrders[index].destinationAddress, city: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="City"
                        />
                        <InputText
                            value={order.destinationAddress.province}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].destinationAddress = { ...updatedOrders[index].destinationAddress, province: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Province"
                        />
                        <InputText
                            value={order.destinationAddress.country}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].destinationAddress = { ...updatedOrders[index].destinationAddress, country: e.target.value };
                                setOrders(updatedOrders);
                            }}
                            placeholder="Country"
                        />
                    </div>

                    <div>
                        <h5>Items Quantity</h5>
                        <InputText
                            value={order.itemQuantity}
                            onChange={(e) => {
                                const updatedOrders = [...orders];
                                updatedOrders[index].itemQuantity = e.target.value;
                                setOrders(updatedOrders);
                            }}
                            placeholder="Quantity"
                        />
                    </div>

                    <div>
                        <h5>Calculate Package Price</h5>
                        <Button label="Calculate Price" onClick={() => calculatePrice(index)} />
                        <p>Price: ${order.price}</p>
                    </div>

                </div>
            ))}

            <div className="button-container">
                <Button label="Add Package" icon="pi pi-plus" onClick={addPackage} className="p-button-sm p-button-outlined" />
            </div>

            <div className="button-container">
                <Button type="submit" label="Submit" icon="pi pi-check" onClick={submitHandler} />
            </div>
        </div>
    );
}

export default MerchantOrderForm;
