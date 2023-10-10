import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home'
import Landingpage from './pages/Landingpage'
import History from './pages/History'


function App() {
  return (
    <div className="App">
      <Header></Header>
      
      <Routes>
        <Route path='' element={<Landingpage></Landingpage>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/watch-history' element={<History></History>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
