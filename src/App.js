import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import RuleCreate from './components/RuleCreate';
import DebugRule from './components/DebugRule';
import ModifyRule from './components/ModifyRule';
import TestRule from './components/TestRule';
import DbFileRule from './components/DbFileRule';

function App() {
  return (
    <div className={`bg-[url('./assets/Images/mainbg.jpg')] h-[100vh] w-[100vw] mt-0 mx-0 overflow-hidden`}>
      <div className='py-[1rem] px-[2rem]'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<RuleCreate/>} />
          <Route path='/debug' element={<DebugRule/>} />
          <Route path='/modify' element={<ModifyRule/>} />
          <Route path='/test' element={<TestRule/>} />
          <Route path='/dbfilerule' element={<DbFileRule/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
