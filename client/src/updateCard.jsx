import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateCard.css'; // Import CSS file for styling

const UpdateCard = () => {
    const location = useLocation();
    const user = location?.state?.user;
    const navigate = useNavigate();

    const [userName, setUserName] = useState(user?.name);
    const [userEmail, setUserEmail] = useState(user?.email);

    const updateuser = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'name') {
            setUserName(value);
        } else {
            setUserEmail(value);
        }
        console.log(userName, userEmail);
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:3000/users/${user._id}`, { name: userName, email: userEmail })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        navigate('/users');
    }

    return (
        <div className="update-form-container">
            <form className="update-form" onChange={updateuser} onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input className="input-field" type="text" name='name' value={userName} autoFocus /><br /><br />
                <label htmlFor="email">Email:</label>
                <input className="input-field" type="text" name='email' value={userEmail} />
                <br /><br />
                <button className="submit-btn">Update</button>
            </form>
        </div>
    )
}

export default UpdateCard;
