import { useEffect, useState } from 'react';
import './App.css';
import Game from './pages/game/Game';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {

  const [userInfo, setUserInfo] = useState({});
  const [gameInfo, setGameInfo] = useState({});

  return (

    <Router>
      <Routes>
        <Route
          path='/' element= {<Home
            setUserInfo = {setUserInfo} /* Avatar,Username,Host */
          />}
        />
        <Route
          path='/game' element= {<Game
            userInfo = {userInfo}
            gameInfo = {gameInfo}
            setUserInfo = {setUserInfo}
            setGameInfo = {setGameInfo}
          />}
        />
      </Routes>
    </Router>
  );
}

export default App;
