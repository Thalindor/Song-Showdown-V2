import './Game.css'

import React, { useEffect, useState } from 'react'
import Lobby from '../../components/game-lobby/lobby/Lobby'
import GameX from '../../components/game-lobby/game/Game'

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import  io  from 'socket.io-client';
import VolumeOff from '@mui/icons-material/VolumeOff';
const socket = io.connect("http://localhost:3001");

export default function Game({userInfo,setUserInfo, gameInfo, setGameInfo}) {
  const [isGame , setIsGame] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [toggleValue, setToggleValue] = useState(false);
  const [toggle, setToggle] = useState(true);

      /* Song Volume */ 
      const [volume, setVolume] = useState(.1);

      const handleVolumeChange = (event) => {
          const newVolume = parseFloat(event.target.value);
          setVolume(newVolume);
        };
      /*- Song Volume -*/

      useEffect(() => {
        if(isGame){
          socket.emit('first-user-ready', {roomID: userInfo.roomID, isReady: true, isHost: userInfo.host})
        }
      }, [isGame])

      useEffect(() => {
        socket.emit("second-user-ready", userInfo.roomID)
      })

      useEffect(() => {
        socket.emit("start-game", userInfo.roomID);
        socket.on('send', (data) => {
          setGameStart(data);
        })
      })


      useEffect(() => {
        let interval;
        if (toggle) {
            interval = setInterval(() => {
                setToggleValue((prevToggleValue) => !prevToggleValue);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [toggle]);



  return (
    <>
      {
        gameStart ? (
          <GameX
          userInfo = {userInfo}
          gameInfo = {gameInfo}
          
          />
        ) : (
          <Lobby
           userInfo = {userInfo}
           setIsGame = {setIsGame}
           setUserInfo = {setUserInfo}
           setGameInfo = {setGameInfo}
          />
        )
      }

      {/* Song Volume */} 
{/*         <div className="volume">
          <div className="volume-box">
          <div className="volumeOff">
              <VolumeOffIcon style={{ fontSize: '32px', color: '#fff' }} />
          </div>
          <div className="volume-slider">
              <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              />
          </div>
          <VolumeUpIcon style={{ fontSize: '32px', color: '#fff' }} />
          </div>
        </div> */}
      {/* Song Volume */} 

    </>
  )
}
