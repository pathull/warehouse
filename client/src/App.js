import './App.css';
import WarehouseForm from "./components/WarehouseForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='background-color'>
      <WarehouseForm />
      </div>
    </div>
  );
}

export default App;
