import { useState } from 'react';
import "./WarehouseForm.css"

export default function WarehouseForm() {
  const [name, setName] = useState('');
  const [shelves, setShelves] = useState([]);
  let [shelfCount, setShelfCount] = useState(0);
  let [zoneCounts, setZoneCounts] = useState(new Array(12).fill(0));

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleShelfNameChange = (event, index) => {
    const newShelves = [...shelves];
    newShelves[index].name = event.target.value;
    setShelves(newShelves);
  };

  const handleShelfZoneChange = (event, index) => {
    const newShelves = [...shelves];
    const inputValue = parseInt(event.target.value);

    if (inputValue >= 1 && inputValue <= 12) {
      // decrement the count of the previous zone
      if (newShelves[index].zone) {
        zoneCounts[newShelves[index].zone - 1] -= 1;
      }
      // increment the count of the new zone
      newShelves[index].zone = inputValue;
      zoneCounts[inputValue - 1] += 1;
    }

    setShelves(newShelves);
  };

  const addShelf = () => {
    const newShelf = { name: '', zone: 1 };
  setShelves([...shelves, newShelf]);
  setShelfCount(shelves.length + 1);

  // Increment counter for the zone of the new shelf
   const zone = newShelf.zone;
    setZoneCounts(prev => {
    const newCounter = [...prev];
    newCounter[zone - 1] += 1;
    return newCounter;
  });
  }

  const deleteShelf = (index) => {
    const newShelves = [...shelves];
    const zone = newShelves[index].zone;
    if (zone) {
      // decrement the count of the zone of the deleted shelf
      zoneCounts[zone - 1] -= 1;
    }
    newShelves.splice(index, 1);
    setShelves(newShelves);
    setShelfCount(newShelves.length);
  }

  const resetFormOnSubmit = () => {
    setName('')
    setShelves([])
    setShelfCount(0);
    setZoneCounts(new Array(12).fill(0));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { name, shelves };

    // Send data to backend using fetch
    const response = await fetch('http://localhost:3001/api/warehouses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // handle error response
      const errorMessage = await response.text();
      alert(errorMessage);
      return;
    } else if (response.ok) {
      const message = await response.text();
      alert(message);
    }
    resetFormOnSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='warehouse-name-field'>
        <label htmlFor="name">Warehouse Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} required />
      </div>
      <div className="shelf-list-container">
        <div className="shelf-list-wrapper">
          {shelves.map((shelf, index) => (
            <div className="shelf-list" key={index}>
              <label htmlFor={`shelf-name-${index}`}>Shelf Name:</label>
              <input type="text" id={`shelf-name-${index}`} value={shelf.name} maxLength="50" onChange={(event) => handleShelfNameChange(event, index)} required />
              <label htmlFor={`shelf-zone-${index}`}>Warehouse Zone:</label>
              <input className='zone-input' type="number" pattern="^([1-9]|1[012])$" id={`shelf-zone-${index}`} maxLength="2" value={shelf.zone} onChange={(event) => handleShelfZoneChange(event, index)} required />
              <span onClick={() => deleteShelf(index)}>Delete</span>
            </div>
          ))}
        </div>
      </div>
      <div className='add-shelf-container'>
        <span onClick={addShelf}>Add Shelf +</span>
      </div>
      <p>Shelf Count by Zone</p>
      <div className='zone-counts-container'>
      <div>
      <p>Z - 1</p>
      <p className="zone-counts">{zoneCounts[0]}</p>
      </div>
      <div>
      <p>Z - 2</p>
      <p className="zone-counts">{zoneCounts[1]}</p>
      </div>
      <div>
      <p>Z - 3</p>
      <p className="zone-counts">{zoneCounts[2]}</p>
      </div>
      <div>
      <p>Z - 4</p>
      <p className="zone-counts">{zoneCounts[3]}</p>
      </div>
      <div>
      <p>Z - 5</p>
      <p className="zone-counts">{zoneCounts[4]}</p>
      </div>
      <div>
      <p>Z - 6</p>
      <p className="zone-counts">{zoneCounts[5]}</p>
      </div>
      <div>
      <p>Z - 7</p>
      <p className="zone-counts">{zoneCounts[6]}</p>
      </div>
      <div>
      <p>Z - 8</p>
      <p className="zone-counts">{zoneCounts[7]}</p>
      </div>
      <div>
      <p>Z - 9</p>
      <p className="zone-counts">{zoneCounts[8]}</p>
      </div>
      <div>
      <p>Z - 10</p>
      <p className="zone-counts">{zoneCounts[9]}</p>
      </div>
      <div>
      <p>Z - 11</p>
      <p className="zone-counts">{zoneCounts[10]}</p>
      </div>
      <div>
      <p>Z - 12</p>
      <p className="zone-counts">{zoneCounts[11]}</p>
      </div>
      </div>
      <p>{`Total Warehouse Shelves: ${shelfCount}`}</p>
      <button type="submit">Submit Warehouse Layout</button>
      <p className="reset-button" onClick={resetFormOnSubmit}>Delete Warehouse</p>
    </form>
  );
}