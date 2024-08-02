import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import DataPage from './components/data';
import './App.css';
import ProductDetailPage from './components/dataDetail';
import NewUser from './components/newData';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<DataPage />} />
          <Route exact path='/detail' element={<ProductDetailPage />} />
          <Route exact path='/add' element={<NewUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
