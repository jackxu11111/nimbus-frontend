import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate("/")
        },
        {
            label: 'About',
            icon: 'pi pi-info',
            command: () => navigate("/about")
        },
        {
            label: 'Services',
            icon: 'pi pi-briefcase',
            command: () => navigate("/services")
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            command: () => navigate("/contact")
        },
    ];

    // TODO: change to nimbus photo
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    const end = (
        <div className="flex align-items-center gap-2">
            <Button label="Sign In" className="p-button-primary p-button-rounded"
                onClick={() => navigate("signin")}
            />
        </div>
    );

    return (
        <div>

            <Menubar model={items} start={start} end={end} />
        </div>
    );
};

export default Menu;
