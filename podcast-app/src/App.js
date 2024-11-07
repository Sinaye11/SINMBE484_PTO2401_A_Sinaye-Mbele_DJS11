import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import SeasonDetail from './pages/SeasonDetail';
import ShowDetail from './pages/ShowDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/show/:id/season/:seasonId" element={<SeasonDetail />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
