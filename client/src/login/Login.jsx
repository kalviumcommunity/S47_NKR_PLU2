import { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginbool,setloginbool] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
        axios.post('http://localhost:3000/login', { name:username, email, password })
            .then(response => {
                console.log(response.data.message);
                setloginbool(true)
                setUsername('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                const errormessage = error.response.data?.errors?.map((error) => error?.message).join('\n ');
                if (errormessage) {
                    return alert(errormessage);
                }
                alert(error.response.data.message);
                console.error(error.response.data);
            });
    };

    const handlelogout = (event) =>{
        event.preventDefault();
        axios.get('http://localhost:3000/logout')
        .then(response => {
            console.log(response.data.message);
            setloginbool(false)
        })
        .catch(error => {

            console.error(error.response.data);
        });
    }

    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                />

                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />

                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />

                <button type="submit" className="form-submit-btn">Login</button> <br />
                {loginbool &&  <button onClick={handlelogout} className="form-submit-btn">Logout</button>}
            </form>
        </div>
    );
};

export default Login;
