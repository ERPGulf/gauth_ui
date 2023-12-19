import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Signup } from './screens/signup/Signup';
import Loggedin from './screens/Loggedin/Loggedin';
import Login from './screens/login/Login';
import Newuser from './screens/newuser/Newuser';
import UserProvider from './Contexts/User/UserProvider';
import Forgetpassword from './screens/forgetpassword/Forgetpassword';
import { Changepassword } from './screens/changePassword/Changepassword';
import { Deleteuser } from './screens/Deleteuser/Deleteuser';
import { Disableaccount } from './screens/DisableAccount/Disableaccount';



function App() {
  return(
    <div>
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/' element={<Login/>}/>
            <Route path='/Forgotpassword' element={<Forgetpassword/>}/>
            <Route path='/Loggedin' element={<Loggedin/>}/>
            <Route path='/Newuser' element={<Newuser/>}/>
            <Route path='/Changepassword' element={<Changepassword/>}/>
            <Route path='/DeleteAccount' element={<Deleteuser/>}/>
            <Route path='/DisableAccount' element={<Disableaccount/>}/>

          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;

