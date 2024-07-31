import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const userTypes = [
    { label: 'Driver', value: 'drivers' },
    { label: 'Merchant', value: 'merchants' },
    { label: 'Other', value: 'admins' }, // admin are handled as drivers
];

function SignIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: userTypes[0].value, // Set the default user type
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
        // Handle sign-in logic here
        // You can make API calls to authenticate the user
        console.log('Submitted data:', formData);
        // After successful sign-in, navigate to the appropriate page
        // admin share driver page
        var api_path = formData.userType != "admins" ? formData.userType : "drivers"
        console.log("api path", `http://localhost:3000/${api_path}/signin`)
        axios.post(`${API_BASE_URL}/${api_path}/signin`, {
            email: formData.email,
            password: formData.password,
        })
            .then(response => {
                console.log('Sign in successful', response.data);
                localStorage.setItem('token', response.data.token); // Save token to local storage
                navigate(`/${formData.userType.slice(0, -1)}`); // remove the last s from path and redirect
            })
            .catch(error => {
                console.error('Sign in failed');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    required
                />
            </div>
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <label htmlFor="password">Password</label>
                </span>
                <InputText
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <label htmlFor="userType">User Type</label>
                </span>
                <Dropdown
                    id="userType"
                    name="userType"
                    options={userTypes}
                    value={formData.userType}
                    onChange={handleChange}
                />
            </div>
            <div className="p-mt-2">
                <Button type="submit" label="Sign In" />
            </div>
        </form>
    );
}

export default SignIn