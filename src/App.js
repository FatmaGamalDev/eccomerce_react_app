import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProductsList from './components/Products-List/ProductsList';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <div className="App">
      <Navbar/>      
      <Slider/>
      <ProductsList/>
    </div>
  );
}

export default App;
