import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom"

import Navbar from "./components/common/Navbar.js"
import Home from "./pages/Home.js"
import Dashboard from "./pages/Dashboard.js"
import Login from "./pages/Login.js"
import Signup from "./pages/Signup.js"
import Error from "./pages/Error"


import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute";




function App() {

  const [isLoggedIn, setLogIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-gray-900 flex flex-col font-inter text-white">
    <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route 
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />



        <Route path="*" element={<Error />} />

        {/* <Route path="/" element={<Home/>}/> */}
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        {/* <Route path="/login" element={<Login setLogIn={setLogIn}/>}/>
        <Route path="/signup" element={<Signup setLogIn={setLogIn}/>}/> */}

      </Routes>
    </div>
  );
}

export default App;




// Add the logic for handling colors
// /* global chrome */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [highlights, setHighlights] = useState([]);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState('');
//   const [highlightColor, setHighlightColor] = useState('#FFFF00'); // Default color is yellow

//   useEffect(() => {
//     if (user) {
//       fetchHighlights();
//     }
//   }, [user]);

//   const fetchHighlights = async () => {
//     const response = await axios.get('http://localhost:3000/highlights/getHighlights', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       params: { url: window.location.href }
//     });
//     setHighlights(response.data);
//   };

//   const handleHighlight = async () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { type: 'HIGHLIGHT_TEXT', color: highlightColor }, async (response) => {
//         if (response) {
//           const { serializedRange, color } = response;
//           await axios.post('http://localhost:3000/highlights/saveHighlight', {
//             url: window.location.href,
//             serializedRange,
//             color
//           }, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           fetchHighlights();
//         }
//       });
//     });
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:3000/highlights/deleteHighlight/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     fetchHighlights();
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const response = await axios.post('http://localhost:3000/users/login', { email, password });
//     setUser(response.data.user);
//     setToken(response.data.token);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const confirmPassword = e.target.confirmPassword.value;
//     const response = await axios.post('http://localhost:3000/users/register', { name, email, password, confirmPassword });
//     setUser(response.data.user);
//     setToken(response.data.token);
//   };

//   return (
//     <div className="App">
//       {!user ? (
//         <div>
//           <form onSubmit={handleLogin}>
//             <h2>Login</h2>
//             <input type="email" name="email" placeholder="Email" required />
//             <input type="password" name="password" placeholder="Password" required />
//             <button type="submit">Login</button>
//           </form>
//           <form onSubmit={handleSignup}>
//             <h2>Signup</h2>
//             <input type="text" name="name" placeholder="Name" required />
//             <input type="email" name="email" placeholder="Email" required />
//             <input type="password" name="password" placeholder="Password" required />
//             <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
//             <button type="submit">Signup</button>
//           </form>
//         </div>
//       ) : (
//         <div>
//           <h2>Welcome, {user.name}</h2>
//           <input type="color" value={highlightColor} onChange={(e) => setHighlightColor(e.target.value)} />
//           <button onClick={handleHighlight}>Highlight</button>
//           <ul>
//             {highlights.map((highlight) => (
//               <li key={highlight._id}>
//                 <span style={{ backgroundColor: highlight.color }}>{highlight.serializedRange.text}</span>
//                 <button onClick={() => handleDelete(highlight._id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

