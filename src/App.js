import './App.css';

import Converter from './components/Converter';

function App() {
  return (
    <div className="App">
      <Converter baseCurrency="EUR" secondCurrency="BRL"></Converter>
    </div>
  );
}

export default App;
