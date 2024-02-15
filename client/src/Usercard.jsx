import { useState, useEffect } from "react";
import axios from "axios";
import "./Usercard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Usercard = () => {
  const [userdata, setuserdata] = useState([]);
  const [click, setclick] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        const recieved = await response.data;
        setuserdata(recieved);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [click]);

  const editUser = (user) => {
    navigate('/edit-user', {
      state: {user}
    })
  };

  const deleteuser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/users/${id}`);
        const received = await response.data;
        console.log(received);
        setclick(!click);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
    <Link to="/add-user"><button className="adduser">Add User</button></Link>
      <div className="usercard-container">
        {userdata.map((card, index) => (
          <div key={index} className="usercard">
            <h1>ID: {card._id}</h1>
                <h1>NAME: {card.name}</h1>
                <h1>EMAIL: {card.email}</h1>
                <div className="button-container">
                  <button onClick={() => editUser(card)}>Edit</button>
                  <button onClick={() => deleteuser(card._id)}>Delete</button>
                </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Usercard;