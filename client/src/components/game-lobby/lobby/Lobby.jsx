import React, { useState, useEffect,useRef } from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom";
import './Lobby.css'
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularProgress from '@mui/material/CircularProgress';
import SettingsIcon from '@mui/icons-material/Settings';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DoneIcon from '@mui/icons-material/Done';
import LockIcon from '@mui/icons-material/Lock';
import HelpIcon from '@mui/icons-material/Help';
import Help from '@mui/icons-material/Help';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import  io  from 'socket.io-client';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
const socket = io.connect("http://localhost:3001");


export default function Lobby({userInfo, setIsGame,setUserInfo,setGameInfo}) {

    const [toggleValue, setToggleValue] = useState(false);
    const [toggle, setToggle] = useState(true)


    /* Create Game */
        useEffect(() => {
            if(userInfo.host == true){
                socket.emit("create-room", userInfo);
            };
        }, [userInfo])

    /* Create Game */
        
    /* Join Game */
        useEffect(() => {
            if(userInfo.host == false){
                socket.emit("join-game", userInfo);
            }
        },[socket, userInfo])    
    /* Join Game */

    /* Getting Users infos */
        const [hostUser, setHostUser] = useState({
            username : null,
            avatar : null,
            roomID : null,
            host : null,
            ready: false,
            singlePlayer: false
        })
        const [guestUser, setGuestUser] = useState({
            username : null,
            avatar : null,
            roomID : null,
            host : null,
            ready: false,
            singlePlayer: false
        })

        useEffect(() => {
            socket.emit("send_infos", 'deneme');

            socket.on("first-info", (data) => {
                setHostUser({
                    username : data.username,
                    avatar : data.avatar,
                    roomID : data.roomID,
                    host : data.host,
                    ready: false,
                    singlePlayer: false,
                    countdown: data.countdown
                })
            })

            socket.on("second-info", (data) => {
                setGuestUser({
                    username : data.username,
                    avatar : data.avatar,
                    roomID : data.roomID,
                    host : data.host,
                    ready: false,
                    singlePlayer: false
                })
            })
            /* setToggle(true) */
        }, [userInfo, socket,toggle, toggleValue])

        useEffect(() => {
            if(userInfo.host){
                setGameInfo({
                    hostUsername: hostUser.username,
                    hostAvatar: hostUser.avatar,
                    guestUsername: guestUser.username,
                    guestAvatar: guestUser.avatar
                })
            }

            if(!userInfo.host){
                setGameInfo({
                    hostUsername: hostUser.username,
                    hostAvatar: hostUser.avatar,
                    guestUsername: guestUser.username,
                    guestAvatar: guestUser.avatar
                })
            }
        },[guestUser, hostUser])

        useEffect(() => {
            if(guestUser.username != null){
                setToggleValue(false);
                setToggle(false);
            }
        }, [guestUser,toggle,toggleValue])

    /*- Getting Users infos -*/

    /* Getting Users infos */

        useEffect(() => {
            socket.emit("send_infos", 'deneme');

        }, [userInfo])

    /*- Getting Users infos -*/

    /* Game + User Info's  */ 

    /* Game + User Info's  */ 

    /* Start Game */

    function startGame() {
        setIsGame(true)
    }

    
    /* Start Game */




    /* Hover Active CSS */
    const [doneIcon, setDoneIcon] = useState(true)
    const [doneIcon2, setDoneIcon2] = useState(false)
    function clickDoneIcon() {
        if(doneIcon2){
            setDoneIcon(true)
            setDoneIcon2(false)
        }
    }
    function clickDoneIcon2(){
        if(doneIcon){
            setDoneIcon(false)
            setDoneIcon2(true)
        }
    }
    /*- Hover Active CSS -*/


    /* Code Copied */
    const [copied, setCopied] = useState(false)
    function codeCopied() {
        navigator.clipboard.writeText(userInfo.roomID)
        setCopied(true)
    }
    useEffect(() => {

        if(copied == true){
            const timeout = setTimeout(() => {
                setCopied(false);
              }, 3000);
              return () => clearTimeout(timeout);
        }
    
      }, [copied]);
    /*- Code Copied -*/

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
    <div className="lobby-container">
        { userInfo.host == false && hostUser.username == undefined ? (
            <LoadingScreen/> 
        )
            : (

            
            <div className="lobby-container-content">
            <div className="lobby-container-top">
                    <Link to='/' style={{ textDecoration: 'none'}}>
                    <h1 className='lobby-top-back'>Back</h1>
                    </Link>
                    <h1 className='lobby-top-configure'>CONFIGURE GAME</h1>
                    <img src="/images/wwe.png" alt="" />
            </div>

            <div className="lobby-container-center">
                <div className="center-left">
                    <div className="players">
                        <div className="player-1">
                            
                            {
                                userInfo.host == true ? (
                                    <img src={`/images/${userInfo.avatar}`}  alt="" className='lobby-player-img player1-img'/>
                                    ) 
                                    :  <img src={`/images/${hostUser.avatar}`}  alt="" className='lobby-player-img player1-img'/>
                                }
                            <h3>
                                {userInfo.host == true ? (
                                    userInfo.username
                                    )
                                    :
                                    hostUser.username
                                }
                            </h3>
                        </div>
                        <div className="player-2">
                        {
                            userInfo.host == false ? (
                                <img src={`/images/${userInfo.avatar}`}  alt="" className='lobby-player-img player2-img'/>
                                ) 
                                :  userInfo.host == true && guestUser.avatar != undefined ? (
                                    <img src={`/images/${guestUser.avatar}`}  alt="" className='lobby-player-img player2-img'/>
                                    ) : (
                                        <img src={`/images/unknow.png`}  alt="" className='lobby-player-img player2-img'/>
                                    )
                            }

                            <h3>
                                {userInfo.host == false ? (
                                    userInfo.username
                                    )
                                    :
                                    userInfo.host == true && guestUser.username != undefined ? (
                                        guestUser.username
                                        ) : (
                                            '?'
                                        )
                                }
                            </h3>
                        </div>
                    </div>


                    <div className="invateCode">
                            <div className="invateCodeh3">
                                <h3 style={{color: '#fff'}}>Your invite code: </h3>
                            </div>
                            <button onClick={codeCopied}>
                                <InsertLinkIcon style={{fontSize: '34px'}}/>
                                {userInfo.roomID}
                            </button>
                            <div className={ copied ? "invateCode-copy active" : "invateCode-copy"}>
                                <ContentCopyIcon style={{fontSize: '20px'}}/>
                                <p>Code copied!</p>
                            </div>

                        </div>

                </div>

                <div className="center-rigth">
                    <div className="center-rigth-top">
                        <button className='topButton1'>GAME MODE</button>
                        <button className='topButton2'>GAME SETTINGS</button>
                    </div>
                    <div className="center-rigth-center">
                        <div className={ doneIcon ? 'mode normal active' : "mode normal"} onClick={clickDoneIcon} >
                            <div className="mode-top" style={{ visibility: doneIcon ? 'visible' : 'hidden' }}>
                                <SettingsIcon style={{  color:'#141516' }}/>
                            </div>
                            <div className={ doneIcon ? "mode-center active" : "mode-center"}>
                                <MusicNoteIcon style={{ fontSize: '45px', color:'#fff'}}/>
                                <div className="center-text-mode">
                                    <h4>Normal Mode</h4>
                                    <p>Let the game unfold and savor every moment!</p>
                                </div>
                            </div>
                            { doneIcon && <div className="mode-check">
                                <DoneIcon style={{ fontSize: '22px', outline: '#fff', backgroundColor: '#fff', borderRadius:'50%', padding:'5px', fontWeight: 'bold', stroke:'black', strokeWidth: 2}}/>
                            </div>}

                        </div>
                        <div className={ doneIcon2 ? 'mode example active' : "mode example"} onClick={clickDoneIcon2} >
                            <div className="mode-top" style={{ visibility: doneIcon2 ? 'visible' : 'hidden' }}>
                                <SettingsIcon style={{  color:'#141516'}}/>
                            </div>
                            <div className={ doneIcon2 ? "mode-center active" : "mode-center"}>
                                <QuestionMarkIcon style={{ fontSize: '45px', color:'#fff'}}/>
                                <div className="center-text-mode">
                                    <h4>Streamer Mode</h4>
                                    <p>Lead the game. Your stream, your rules!!</p>
                                </div>
                            </div>

                            { doneIcon2 && <div className="mode-check">
                                <DoneIcon style={{ fontSize: '22px', outline: '#fff', backgroundColor: '#fff', borderRadius:'50%', padding:'5px', fontWeight: 'bold', stroke:'black', strokeWidth: 2}}/>
                            </div>}
                        </div>
                        <div className="mode secret">

                                <div className="hidden-secret-top">
                                 <h4>Coming Soon</h4>
                                </div>
                            <div className=" secret-center">
                                <div className="hidden-secret-center">
                                    <LockIcon style={{ fontSize: '45px', color:'#fff'}}/>
                                    <h4>It's a secret</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !userInfo.host ? (
                            <div className="center-guest">
                                <CircularProgress size={35} style={{ color: '#fff'}}/>
                                <h2 className='guestWaiting'> WAITING THE HOST TO START THE GAME</h2>
                            </div>
                        ) : (
                            
                            <div className="center-rigth-bottom">
                            <button onClick={startGame} > <PlayArrowIcon style={{fontSize: '30px', borderRadius: '5px', color: '#fff'}} /> START</button>
                            </div>
                        )
                    }
                    
                </div>
            </div>

        </div>
    )
    }
</div>
</>
)
}
