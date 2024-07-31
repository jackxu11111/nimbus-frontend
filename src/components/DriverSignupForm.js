import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function DriverSignupForm({ onSubmit, initialFormData }) {
    const [formData, setFormData] = useState(initialFormData || {
        phoneNumber: '',
        email: '',
        sinNumber: '',
        city: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-inputgroup-wrapper">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <label htmlFor="phoneNumber">Phone Number</label>
                    </span>
                    <InputText
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="p-inputgroup-wrapper">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <label htmlFor="email">Email</label>
                    </span>
                    <InputText
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="p-inputgroup-wrapper">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <label htmlFor="sinNumber">SIN Number</label>
                    </span>
                    <InputText
                        id="sinNumber"
                        name="sinNumber"
                        value={formData.sinNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="p-inputgroup-wrapper">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <label htmlFor="city">City</label>
                    </span>
                    <InputText
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="p-inputgroup-wrapper">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <label htmlFor="password">Password</label>
                    </span>
                    <InputText
                        id="password"
                        name="password"
                        type="password" // Set type as password for hiding input content
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="p-mt-2"> {/* Add margin-top for spacing */}
                <Button type="submit" label="Submit" />
            </div>
        </form>
    );
}

export default DriverSignupForm;
