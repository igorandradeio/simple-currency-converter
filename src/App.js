import './App.css';

import Converter from './components/Converter';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Converter baseCurrency="EUR" secondCurrency="BRL"></Converter>
    </div>
  );
}

export default App;
