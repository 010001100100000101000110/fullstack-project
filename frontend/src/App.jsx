import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  useEffect (() => {
    const fetchItems = async () => {
      const apiUrl = '/api/locations';

      try {
        const response = await axios.get(apiUrl);
        console.info(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>Backed Data</h1>
      <ul>
        {items.map((location) => (
          <li key={location.id}> latitude: {location.latitude}, longitude: {location.longitude}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;