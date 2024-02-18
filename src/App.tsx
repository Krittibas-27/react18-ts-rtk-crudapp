import React from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import UserListing from './page/UserListing';
import ViewSingleUser from './page/ViewSingleUser';
import AddUser from './page/AddUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserListing />}></Route>
        <Route path="/user/:vid" element={<ViewSingleUser />}></Route>
        <Route path="/user/addnewuser" element={<AddUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
