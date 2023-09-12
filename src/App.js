import React from "react";
import Home from "./components/Home";
import Edit from "./components/Edit";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit" element={<Edit/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;