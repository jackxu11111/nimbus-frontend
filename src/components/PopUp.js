import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme of your choice
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

const Popup = ({ visible, setVisible }) => {

    const navigate = useNavigate();

    var navigateMerchant = (e) => {
        navigate("new_merchant");
    }

    var navigateDriver = (e) => {
        navigate("driver/signup")

    }

    return (
        <div>
            <Dialog header="Join Us" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                <div className="p-grid">
                    <div className="p-col-12 p-md-6">
                        <h4>I'm a business owner</h4>
                        <p>Talk to Same-Day Delivery Experts</p>
                        <Button label="Become a Merchant" icon="pi pi-briefcase" className="p-button-warning" onClick={navigateMerchant} />
                    </div>
                    <div className="p-col-12 p-md-6">
                        <h4>I'm a driver</h4>
                        <p>Join FlashBox's professional fleet of drivers.</p>
                        <Button label="Become a Driver" icon="pi pi-car" className="p-button-danger" onClick={navigateDriver} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Popup;
