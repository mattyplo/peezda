import React from 'react';
import './App.css';
import Home from './components/home.js';
import Header from './components/header.js';
import Footer from './components/footer.js'

function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
