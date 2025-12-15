
import { Routes, Route } from 'react-router-dom';
import EMR_Frontend_Assignment from './Pages/EMR_Frontend_Assignment';


function App() {
  return (
    <Routes>
  <Route path="/" element={<EMR_Frontend_Assignment/>} />
    </Routes>
  );
}

export default App; 