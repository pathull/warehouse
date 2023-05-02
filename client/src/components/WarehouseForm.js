import { useState } from 'react';

export default function WarehouseForm() {
  const [name, setName] = useState('');
  const [zone, setZone] = useState(1);
  //shelves automatically get assigned the warehouse zone
  const [shelves, setShelves] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleZoneChange = (event) => {
    if (parseInt(event.target.value) >= 1) {
      setZone(parseInt(event.target.value));
    }

  };

  const handleShelfNameChange = (event, index) => {
    const newShelves = [...shelves];
    newShelves[index].name = event.target.value;
    setShelves(newShelves);
  };


  const deleteShelf = () => {
    setShelves(shelves.filter((shelf, index) => index - 1));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { name, zone, shelves };

    // Send data to backend using fetch
    const response = await fetch('http://localhost:3001/api/warehouses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Warehouse Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} required />
      </div>
      <div>
        <label htmlFor="zone">Warehouse Zone:</label>
        <input type="number" id="zone" value={zone} max={12} onChange={handleZoneChange} />
      </div>
      {shelves.map((shelf, index) => (
        <div key={index}>
          <label htmlFor={`shelf-name-${index}`}>{`Shelf #${index + 1} Name:`}</label>
          <input type="text" id={`shelf-name-${index}`} value={shelf.name} onChange={(event) => handleShelfNameChange(event, index)} required />
        </div>
      ))}
      <span onClick={() => shelves.length <= 9 ? setShelves([...shelves, { name: '', zone: zone }]) : null}>Add Shelf</span>
      <span onClick={deleteShelf}>Delete Shelf</span>
      <button type="submit">Create Warehouse</button>
    </form>
  );
}