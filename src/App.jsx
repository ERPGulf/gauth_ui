import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Signup } from './screens/signup/Signup';
import { Forgetpassword } from './screens/forgetpassword/Forgetpassword';
import Loggedin from './screens/Loggedin/Loggedin';
import Login from './screens/login/login';
import Newuser from './screens/newuser/Newuser';


function App() {
  return(
    <div>
      <Router>
        <Routes>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/Forgotpassword' element={<Forgetpassword/>}/>
          <Route path='/Loggedin' element={<Loggedin/>}/>
          <Route path='/Newuser' element={<Newuser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

