import React, { useEffect, useState } from 'react'
import './Body.css'
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import io from "socket.io-client";
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import { useNavigate   } from "react-router-dom";



const socket = io.connect("http://localhost:3001");


export default function Body({setUserInfo}) {

  const navigate = useNavigate();

  const [roomID, setRoomID] = useState()
  useEffect(() => {
    socket.emit("roomID", 'data');
    socket.on("get-roomID", (data) =>{
      setRoomID(data);
    })
  })


  /* SOCKET IO */
    // Error States
    const [enterCode, setEnterCode] = useState(false)
    const [roomNotFound, setRoomNotFound] = useState(true)
    const [isRoomFull, setIsRoomFull] = useState('');
    const [loading , setLoading] = useState(false);
  /*- SOCKET IO -*/


  /* Popups */ 
  const [joinGamePopup, setJoinGamePopup] = useState(false)
  const [aboutPopup, setAboutPopup] = useState(false)

  function joinGame() {
    setJoinGamePopup(true)
  }
  function closeJoinGamePopup() {
    setJoinGamePopup(false)
  }

  function about() {
    setAboutPopup(true)
  }

  function closeAboutPopup() {
    setAboutPopup(false)
  }
  /*- Popups -*/

  /* Avatar + Username + User Info's + Is Host? */
  const [avatarCounter, setAvatarCounter] = useState(1)
  const [avatar, setAvatar] = useState('cena.png')
  const avatars = ['cena.png', 'female.png', 'cmpunk.png', 'sting.png','jeffhardy.png','drew.png']
  const randomUsername = ['OhaDiyorumMelih', 'Baldwin IV', 'Michael Jackson', 'Kieślowski', 'György Pálfi', 'Quorthon', 'Johan Andersson', 'BrownieConnoisseur', 'Toezilla', 'HolyGrail' ]
  const randomIndex = Math.floor(Math.random() * randomUsername.length);
  const [username, setUsername] = useState(randomUsername[randomIndex])
  const [host, setHost] = useState(false);

  function changeAvatar() {
    setAvatarCounter(prevCounter => prevCounter + 1);
    setAvatar(avatars[avatarCounter % 6])
  }

  function createGame () {
    setHost(true);
    setLoading(true);
  }

  const [guestReady, setGuestReady] = useState(false);
  const [guestRoomID, setGuestRoomID] = useState();

  function joinCreateGame () {
    setUserInfo({
      avatar: avatar,
      username: username,
      host: host,
      roomID: guestRoomID,
      singlePlayer: false,
      oUsername: null,
      oAvatar: null
    })

    setGuestReady(true)
  }

  useEffect(() => {
    setUserInfo({
      avatar: avatar,
      username: username,
      host: host,
      roomID: roomID,
      singlePlayer: false,
      oUsername: null,
      oAvatar: null

    })
  }, [avatar, username, host,roomID])

  useEffect(() => {
    if(loading && host){
      navigate("/game");
    }
  }, [loading, host])

  useEffect(() => {
    if(guestReady){
      navigate("/game");
    }
  }, [guestReady])
  /*- Avatar + Username + User Info's + Is Host? -*/ 


  return (
    <div className="home-body-container">
      {
        !loading ? (

          <div className="home-body-container-content">
        <div
          className={joinGamePopup ? "home-body-container-content-body activePopup" : "home-body-container-content-body"}
          style={aboutPopup ? { filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' } : {}}
          >    
          <div className="home-body-container-top">
            <h1>Song Showdown</h1>
            <p>Ready to test your wrestling knowledge?</p>
          </div>

          <div className="home-body-container-center">
            <div className="home-body-container-center-img">
               <img src={`/images/${avatar}`} alt="" />
             <ReplayCircleFilledIcon className='replayIcon' onClick={changeAvatar} />
            </div>

            <p className='centerDesc'>Pick an avatar and a nickname</p>

            <div className="center-input">
              <div className="inputHR"></div>
              <input
                type="text"
                placeholder='Your Username'
                className='nicknameInput'
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                value={username}
                maxLength={20}
              />

            </div>

            <div className="center-buttons" >
              <button className='homePlayButton joinButton' onClick={joinGame}>
                <PlayArrowIcon className='homePlayIcon' style={{ fontSize: '34px', fontWeight: 'bold', borderRadius: '8px' }} />
                <span style={{ fontWeight: 'bold' }}>JOIN A ROOM</span>
              </button>
              {/* <Link to = '/game' style={{textDecoration: 'none'}}> */}
              <button className='homePlayButton createButton' onClick={createGame}>
                <PlayArrowIcon className='homePlayIcon ' style={{ fontSize: '34px', fontWeight: 'bold', borderRadius: '8px' }} />
                <span style={{ fontWeight: 'bold' }}>CREATE A ROOM</span>
              </button>
              {/* </Link> */}
            </div>

          </div>
          
          <div className="home-body-container-bottom">
            <ul>
              <li>
                <div className="home-bottom-icons">
                  <GitHubIcon className='icon-home-bottom'/>
                  <h3>Github</h3>
                </div>
              </li>

              <li>
                <div className="home-bottom-icons" onClick={about}>
                  <InfoIcon className='icon-home-bottom'/>
                  <h3>About</h3>
                </div>
              </li>
            </ul>


          </div>
        </div>

        {/* Popups */}
        {/* Join Game Popup */}
        <div className={joinGamePopup ? "join-popup active" : "join-popup"} style={{ visibility: joinGamePopup ? 'visible' : 'hidden' }}>
          <div className="join-popup-content">
            <div className="join-popup-content-top">
              <div className="top-part">
                <h2 style={{color: '#c31818'}} >Song Showdown</h2>
                  <CloseIcon className='join-popup-closeIcon' style={{ }}
                    onClick={closeJoinGamePopup}
                    />
              </div>
              <p>To join a game, enter the invitation code you received from your friend.</p>
            </div>

            <div className="join-game-popup-center">
              <h4>INVITE CODE:</h4>
              <div className="join-game-popup-buttonContainer">

                <input type="text" placeholder='Your Invite Code'
                className='join-game-input'
                onChange={(event) => {
                  setGuestRoomID(event.target.value);
                }}
                
                />
               </div>
                
                <button className='join-game-button2' 
                  onClick={joinCreateGame}
                  style={{fontSize: '19.5px', fontWeight: 'bold'}}
                >{ loading ? 'loading...' : 'Join A Game'}</button>
                


               {enterCode && <p>You must enter a code</p> }
               {!roomNotFound && <p>Game not found</p>}
               {isRoomFull && <p>Room is full</p> }
              <div className="join-game-popup-input-hr">
                <hr />
                <p>or</p>
                <hr />
              </div>
                <button className='join-game-button' style={{backgroundColor: '#c31818', fontSize: '19.5px', fontWeight: 'bold',}}>Create A Game</button>

              <p className='join-game-popup-p'>If you dont have invitation code, you can create a game.</p>
            </div>
            
          </div>
        
        </div>
        {/*- Join Game Popup -*/}

        {/* About Popup */}
          <div className={aboutPopup ? "info-popup active" : "info-popup"}>
            <div className="info-popup-link">
              <li><a href="https://youtu.be/Q3jEnbwAXMQ?si=3rnC6IgaVyHLm3Xq&t=130"><h2>Thank You!</h2></a></li>
            <CloseIcon className='join-popup-closeIcon'  onClick={closeAboutPopup}/>
            </div>

            <div className="info-popup-top">
              <p>I made this game to learn Socket.io, and you can find the sites I inspired while making this game below.</p>
              <ul>
                <li><a href="https://songtrivia2.io/">Songtrivia</a></li>
                <li><a href="https://songl.io/">Songlio</a></li>
              </ul>
            </div>
            <div className="info-popup-center">
              <h3>Contact: </h3>
              <ul>
                <li>Gmail: tynansylvester23999@gmail.com</li>
                <li>Github: tynansylvester</li>
              </ul>
            </div>
          </div>
        {/*- About Popup -*/}

      </div>
      )
      :
      (
        <LoadingScreen/>
      )
      }
      </div>
      )
    }
