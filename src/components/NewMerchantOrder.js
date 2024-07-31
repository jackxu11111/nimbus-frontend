import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme of your choice
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

const NewMerchantOrder = () => {
    const navigate = useNavigate();
    const title = <h3>Why choose FlashBox</h3>;

    return (
        <div>
            <Card title={title}>
                <ul className="list-none p-0 m-0">
                    <li><i className="pi pi-dollar" /> Flat-Rate Pricing</li>
                    <li><i className="pi pi-times" /> No Fuel Surcharge</li>
                    <li><i className="pi pi-check" /> 99% On-Time Delivery</li>
                    <li><i className="pi pi-star" /> 4.9/5 Customer Satisfaction Rate</li>
                </ul>

                <h3>What to expect once you’ve scheduled a call:</h3>
                <ul>
                    <li>A FlashBox Account Manager will contact you</li>
                    <li>We’ll ask for your order volume to determine the right plan for your business</li>
                    <li>Jumpstart your deliveries in less than 24h!</li>
                </ul>

                <h3>What our merchants say</h3>
                <blockquote>
                    “We have been working with FlashBox since late 2021 and can confidently say they’re one of the best same-day delivery solutions in the market. We integrated with them in no time, thanks to their easy API documentation. Their support team is excellent and always very responsive until the last delivery is done for the day. The recipients have been very happy since we partnered with them!”
                </blockquote>

                <Button label="Place my Order" className="p-button-raised p-button-rounded"
                    onClick={e => navigate("/merchant/place_order")}
                />
            </Card>
        </div>
    );
};

// TODO: if user did not signin (no json web token)
// then we need to ask for user email here as an identification
export default NewMerchantOrder;
