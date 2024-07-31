import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import PopUp from './PopUp';
import React, { useState } from 'react';

const HomePage = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div>

            <div className="content">
                <h1>Delight your customers with Same-Day delivery</h1>
                <p>Fast & affordable same-day delivery carrier.</p>
                <Button label="Get Started" className="p-button-raised p-button-rounded"
                    onClick={e => setVisible(!visible)}
                />
                <PopUp visible={visible} setVisible={setVisible} />
            </div>
        </div>
    );
};

export default HomePage;
