import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import DestinationCard from './Destination';
import destinationdata from './destinationdata.json';
import Usercard from './Usercard';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Destinations</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<Usercard />} />
          <Route path="/" element={
            <>
              <h1 className="main-title">Piss-Off Prevention Zones: A Girlfriend's Guide</h1>
              <h2 className="sub-title">Avoidable Vacation Destinations</h2>
              <div className="destination-container">
                {destinationdata.map((data, index) => (
                  <DestinationCard key={index} title={data.title} description={data.description} imageUrl={data.imageUrl} />
                ))}
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;