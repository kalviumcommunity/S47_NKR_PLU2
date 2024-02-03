import axios from "axios";
import { useEffect, useState } from "react";
import "./Usercard.css"; 

const Usercard = () => {
  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const recieved = await response.data;
        setuserdata(recieved);
      } catch (error) {
        console.error(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="usercard-container">
      {userdata.map((card, index) => (
        <div key={index} className="usercard">
          <h1>ID: {card._id}</h1>
          <h1>NAME: {card.name}</h1>
          <h1>EMAIL: {card.email}</h1>
        </div>
      ))}
    </div>
  );
};

export default Usercard;
