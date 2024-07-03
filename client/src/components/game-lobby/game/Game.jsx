import React, { useEffect, useRef, useState } from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import StarIcon from '@mui/icons-material/Star';
import './Game.css'
import VideoPlayer from '../../VideoPlayer';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


export default function GameX({userInfo,gameInfo}) {


  // PUANLAMANIN DUZELTILMESI GEREKIYOR

  /* Oyun asamalari */ 
    /* Launch */ 
      const [launch, setLaunch] = useState(true);
    /* Launch */

    
    /* Question Hazırlık */
      const [questionPrepare, setQuestionPrepare] = useState(false)
      const [qpCounter, setQPcounter] = useState(false)
      useEffect(() => {
        const timeout = setTimeout(() => {
          if(questionPrepare){
            setQPcounter(true);
          }else{
            setQPcounter(false)
          }
        }, 2500);
    
        return () => clearTimeout(timeout);
      }, [questionPrepare]);
    /* Question Hazırlık */

    /* Question Stage */
      const [questionStage, setQuestionStage] = useState(false);
      const [questionTimer, setQuestionTimer] = useState(10);

      useEffect(() => {
        const timeout = setTimeout(() => {
          if(questionStage){
            if(questionTimer > 0){
              setQuestionTimer(questionTimer - 1);
            }
          }else{
            setQuestionTimer(10)
          }
        }, 1000);
        return () => clearTimeout(timeout);
      }, [questionTimer,questionStage])

    /*- Question Stage -*/

    /* Question Answered */
      const [questionAnswered, setQuestionAnswered] = useState(false);

    /*- Question Answered -*/

    /* Solution Stage */
     const [solution, setSolution] = useState(false);
    /*- Solution Stage -*/

    /* Question Leaderboard */
      const [questionLeaderboard, setQuestionLeaderboard] = useState(false);
    /*- Question Leaderboard -*/

    /* Video Stage */ 
      const [videoStage, setVideoStage] = useState(false)
    /*- Video Stage -*/ 

    /* Result */
      const [result, setResult ] = useState(false)
    /*- Result -*/

      const [questionNumber, setQuestionNumber] = useState(0);

  /* Oyun asamalari */ 

  /* Cevap Asamalari */
  const [hostAnswer, setHostAnswer] = useState("");
  const [hostAnswerCheck, setHostAnswerCheck] = useState(false);
  const [guestAnswer, setGuestAnswer] = useState("");
  const [guestAnswerCheck, setGuestAnswerCheck] = useState(false);

  const [hostAnswerTime, setHostAnswerTime] = useState();
  const [guestAnswerTime, setGuestAnswerTime] = useState();


  const [answerFake, setAnswerFake] = useState(false);
  


  const [clicked, setClicked] = useState(false);

  const [clickedTime, setClickedTime] = useState(null)
  const [clickedTimeGuest, setClickedTimeGuest] = useState(null)

  function answerA(){
    if(!clicked){
      setClicked(true)

      if(userInfo.host){
        setClickedTime(timer)
      }else{
        setClickedTimeGuest(timer)
      }

      socket.emit('questionAnswered', {host: userInfo.host,roomID: userInfo.roomID})


      if(!isSingle){
        if(userInfo.host){
          setHostAnswer(0);
          setHostAnswerTime(timer);
          socket.emit('hosts-answer', {host: userInfo.host, answer: 0, roomID: userInfo.roomID, time: timer})

        }else{
          setGuestAnswer(0)
          setGuestAnswerTime(timer)
          socket.emit('guests-answer', {host: userInfo.host, answer: 0, roomID: userInfo.roomID, time: timer})
        }
      }else{
        setHostAnswer(0)
        setHostAnswerTime(timer);
        socket.emit('hosts-answer', {host: userInfo.host, answer: 0, roomID: userInfo.roomID, time: timer})
      }
      

    }
  }

  function answerB(){
    if(!clicked){
      setClicked(true)

      if(userInfo.host){
        setClickedTime(timer)
      }else{
        setClickedTimeGuest(timer)
      }

      socket.emit('questionAnswered', {host: userInfo.host,roomID: userInfo.roomID})

      if(!isSingle){
        if(userInfo.host){
          setHostAnswer(1)
          setHostAnswerTime(timer);

          socket.emit('hosts-answer', {host: userInfo.host, answer: 1, roomID: userInfo.roomID, time: timer})
        }else{
          setGuestAnswer(1)
          setGuestAnswerTime(timer)
          socket.emit('guests-answer', {host: userInfo.host, answer: 1, roomID: userInfo.roomID, time: timer})
        }
      }else{
        setHostAnswer(1)
        setHostAnswerTime(timer);
        socket.emit('hosts-answer', {host: userInfo.host, answer: 1, roomID: userInfo.roomID, time: timer})
      }

    }
  }



  function answerC(){
    if(!clicked){
      setClicked(true)

      if(userInfo.host){
        setClickedTime(timer)
      }else{
        setClickedTimeGuest(timer)
      }


      socket.emit('questionAnswered', {host: userInfo.host,roomID: userInfo.roomID})

      if(!isSingle){
        if(userInfo.host){
          setHostAnswer(2)
          setHostAnswerTime(timer);
          socket.emit('hosts-answer', {host: userInfo.host, answer: 2, roomID: userInfo.roomID, time: timer})
        }else{
          setGuestAnswer(2)
          setGuestAnswerTime(timer)

          socket.emit('guests-answer', {host: userInfo.host, answer: 2, roomID: userInfo.roomID, time: timer})
        }
      }else{
        setHostAnswer(2)
        setHostAnswerTime(timer);

        socket.emit('hosts-answer', {host: userInfo.host, answer: 2, roomID: userInfo.roomID, time: timer})
      }

      setClickedTime(timer)

    }
  }

  useEffect(() =>{
    console.log(guestAnswer,hostAnswer)
  })

  function answerD(){
    if(!clicked){
      setClicked(true)


      if(userInfo.host){
        setClickedTime(timer)
      }else{
        setClickedTimeGuest(timer)
      }

      socket.emit('questionAnswered', {host: userInfo.host,roomID: userInfo.roomID})
      
      if(!isSingle){
        if(userInfo.host){
          setHostAnswer(3)
          setHostAnswerTime(timer);

          socket.emit('hosts-answer', {host: userInfo.host, answer: 3, roomID: userInfo.roomID, time: timer})
        }else{
          setGuestAnswer(3)
          setGuestAnswerTime(timer)
          socket.emit('guests-answer', {host: userInfo.host, answer: 3, roomID: userInfo.roomID, time: timer})
        }
      }else{
        setHostAnswer(3)
        setHostAnswerTime(timer);

        socket.emit('hosts-answer', {host: userInfo.host, answer: 3, roomID: userInfo.roomID, time: timer})
      }

      setClickedTime(timer)
    }
  }
  
  const [timer, setTimer] = useState(10);
  const [isTimer, setIsTimer] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  
  const [skip, setSkip] = useState(false);

  const [questions, setQuestions] = useState({});
  const [questionKey, setQuestionKey] = useState();
  const [skipButtonCounter, setSkipButtonCounter] = useState(0);

  useEffect(() =>{
    console.log(questions)
    console.log(questionKey)
  })
  
  function skipFunction() {
    if(!skip){
      setSkip(true);
      socket.emit('skip-video', {roomID: userInfo.roomID, host: userInfo.host})
    }
  }

  useEffect(() => {
    socket.emit('game', {roomID: userInfo.roomID, host: userInfo.host})
    
    socket.on('countdown', (data) => {
      setTimer(data)
    })

  },[])


  const [stagee, setStagee] = useState('')
  
  useEffect(() => {
    socket.on('launch', (data) => {
      setLaunch(data)
      setStagee('launch')
    })

    socket.on('prepare', (data) => {
      setQuestionPrepare(data);
      setStagee('prepare');
      setSkip(false);
      setSkipButtonCounter(0);
      setClicked(false);
      setGuestAnswer('');
      setHostAnswer('');
      setGuestAnswerTime(null);
      setHostAnswerTime(null);
      setAnswerFake(false)
    })

    socket.on('question', (data) => {
      setQuestionStage(data)
      setStagee('question')

    })

    socket.on('answered', (data) => {
      setQuestionAnswered(data)
      setStagee('answered')

    })

    socket.on('solution', (data) => {
      setSolution(data)
      setStagee('solution')

    })

    socket.on('leaderboard', (data) => {
      setQuestionLeaderboard(data)
      setStagee('leaderboard')

    })

    socket.on('video', (data) => {
      setVideoStage(data)
      setStagee('video')
      setSecL(false)
      setAnswerFake(true)
    })

    socket.on('result', (data) => {
      setResult(data)
      setStagee('result')

    })

    socket.on('questionNumber', (data) => {
      setQuestionNumber(data)
    })

    socket.on('questions', (data) => {
      setQuestions(data)
    })

    socket.on('skip-counter', (data) => {
      setSkipButtonCounter(skipButtonCounter + 1);
    })

    socket.on('send-hosts-answer', (data) => {
      setHostAnswer(data.answer)
      setHostAnswerTime(data.time)
    })

    socket.on('send-guests-answer', (data) => {
      setGuestAnswer(data.answer)
      setGuestAnswerTime(data.time)
    })
    
    socket.on( 'is-single-player-game', (data) => {
      setIsSingle(data)
    })
  })

  useEffect(() =>{
  })

  useEffect(() =>{
    
  },[questionAnswered,solution])

  const [answer0 , setAnswer0] = useState('')
  const [answer1 , setAnswer1] = useState('')
  const [answer2 , setAnswer2] = useState('')
  const [answer3 , setAnswer3] = useState('')

  useEffect(() =>{
    /* console.log(questions) */

    setQuestionKey(Object.keys(questions)[questionNumber-1])

    if(questions[questionKey] != undefined){
        if(hostAnswer != ''){
          if(questionKey == questions[questionKey][hostAnswer]){
            setHostAnswerCheck(true)
          }
        }
    }

/*     console.log(hostAnswerTime, guestAnswerTime)
    console.log(!isSingle , userInfo.host , hostAnswerTime > guestAnswerTime  , hostAnswer == 0) */

    if(questions[questionKey] != undefined){
      setAnswer0(questions[questionKey][0])
      setAnswer1(questions[questionKey][1])
      setAnswer2(questions[questionKey][2])
      setAnswer3(questions[questionKey][3])
    }

  },[questionPrepare,questionStage,questionAnswered,solution,questionLeaderboard,videoStage,questionNumber, timer,questions]);

  /* Auido */
    const [volume, setVolume] = useState(0.1);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
      const newAudio = new Audio(`/assets/${questionKey}.mp3`);
      newAudio.volume = volume;
      setAudio(newAudio);
    }, [questionKey]);

    useEffect(() => {
      if (audio) {
        audio.volume = volume;
        if (questionStage) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }, [volume, questionStage]);

    const handleVolumeChange = (event) => {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume);
      if (audio) {
        audio.volume = newVolume; 
      }
    };
  /* Auido */

  const [noAnswer, setNoAnswer] = useState(false);
  const [noCorrectAnswer, setNoCorrectAnswer] = useState(false)
  const [badAnswer, setBadAnswer] = useState(false)


  useEffect(() => {

    if(hostAnswer == "" &&  guestAnswer == "" &&  solution){
      setNoAnswer(true)
    }else if(hostAnswer == "" &&  guestAnswer == "" &&  questionAnswered){
      setNoAnswer(true)
    }
    else{
      setNoAnswer(false)
    }

    if(questionAnswered){
      if(questions[questionKey][hostAnswer] != questionKey  && hostAnswer != "" && userInfo.host){
        setBadAnswer(true)
      }else if(questions[questionKey][guestAnswer] != questionKey  && guestAnswer != "" && !userInfo.host){
        setBadAnswer(true)
      }
      else if(questions[questionKey][0] != questionKey && userInfo.host && hostAnswer === 0){    
        setBadAnswer(true)
      }
      else if(questions[questionKey][0] != questionKey && userInfo.host && guestAnswer === 0){    
        setBadAnswer(true)
      }
      else{
        setBadAnswer(false)
      }
    }

    if(questionAnswered){
      if(questions[questionKey][hostAnswer]  != questionKey && questions[questionKey][guestAnswer]  != questionKey){
        setNoCorrectAnswer(true)
      }else{
        setNoCorrectAnswer(false)
      }
    }

  })

  const [hostPoint, setHostPoint] = useState(0)
  const [hostTotalPoint, setHostTotalPoint] = useState(0)

  const [guestPoint, setGuestPoint] = useState(0)
  const [guestTotalPoint, setGuestTotalPoint] = useState(0)


  useEffect(() =>{
    if(hostAnswer !== ""){

      if(questions[questionKey][hostAnswer] == questionKey){
        setHostPoint(hostAnswerTime * 10)
      }
    }else if( hostAnswer === 0){
      if(questions[questionKey][0] == questionKey){
        setHostPoint(hostAnswerTime * 10)
      }
    }
    
  }, [hostAnswer])

  useEffect(() =>{
    if(guestAnswer != ""){

      if(questions[questionKey][guestAnswer] == questionKey){
        setGuestPoint(guestAnswerTime * 10)
      }
    }else if( guestAnswer === 0){
      if(questions[questionKey][0] == questionKey){
        setGuestPoint(guestAnswerTime * 10)
      }
    }
    
  }, [guestAnswer])

/*   useEffect(() =>{
    if(solution){
      if(questions[questionKey][hostAnswer] == questionKey){
        setHostTotalPoint(hostPoint + hostTotalPoint)
      }
      if(questions[questionKey][guestAnswer] == questionKey){
        setGuestTotalPoint(guestPoint + guestTotalPoint)
      }
    }

  },[solution]) */

  function truncateText(text, maxLength) {
    if (!text) {
      return ''; // or return a default value
    }
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  


  const [secL , setSecL] = useState(false);

  useEffect(() =>{

    
    if(solution){
      console.log(questions[questionKey][guestAnswer])
      if(questions[questionKey][hostAnswer] == undefined || questions[questionKey][hostAnswer] != questionKey ){
        setHostPoint(0)
      }
      if(questions[questionKey][guestAnswer] == undefined || questions[questionKey][guestAnswer] != questionKey ){
        setGuestAnswer("")
        console.log("islem burda")
      }
      if(questions[questionKey][hostAnswer] == questionKey){
        setHostTotalPoint(hostPoint + hostTotalPoint)
      }
      if(questions[questionKey][guestAnswer] == questionKey){
        setGuestTotalPoint(guestPoint + guestTotalPoint)
      }
      if(questions[questionKey][guestAnswer] == questionKey && questions[questionKey][hostAnswer] == questionKey){
        setSecL(true)
      }else{
        setSecL(false)
      }
    }

  },[solution])
  
  useEffect(() =>{
    if(guestAnswer != '' && hostAnswer != ''){

      console.log(questions[questionKey][guestAnswer] == questionKey )
      console.log(questions[questionKey][hostAnswer] ==  questionKey )
    }
  })
  
  return (
    <>
    <div className="game-container">

      {/* TOP-CONTAINER */}
      { !result &&      
      <div className="game-top-bar">

        <img className='game-top-bar-img' src="/images/wwe.png" alt="" />
          { !result &&
          <div className="game-top-center">

          
            <div className="game-top-center-text">
               <h3>
                
                { launch && 'GAME START'}
                {
                  questionPrepare || questionStage || questionAnswered || solution || questionLeaderboard || videoStage ||
                  (
                    !videoStage && !launch && !questionPrepare && !questionStage &&
                    !questionAnswered && !solution && !questionLeaderboard && !result
                  )
                  
                  ? (
                    `ROUND ${questionNumber}/5:`
                  ) : null
                }
               </h3>
               <h3 style={{color: '#c31818', fontSize: '26px'}}>
                { launch && 'LAUNCH'}
                {
                  questionPrepare || questionStage || questionAnswered ? (
                    'QUESTION'
                  ) : null
                }

                { solution  && 'SOLUTION'}
                 {
                  questionLeaderboard && 'QUESTION LEADERBOARD'
                 }
                 {
                  videoStage && 'ANSWER'
                 }

                  {
                  !videoStage && !launch && !questionPrepare && !questionStage &&
                  !questionAnswered && !solution && !questionLeaderboard && !result && 'ANSWER'
                 }                 

                </h3>
            </div>
            {
              questionStage && 
              <div className="questionCounter">
                  <h2>{ questionTimer === 10 ? questionTimer : `0${questionTimer}` }</h2>

              </div>
            } 
            {
              questionStage &&
                <div className="xdx" style={{'--width': questionTimer * 10}}>
                </div>
            }
            {
              questionAnswered || solution ?  (

                <div className="xdx" style={{'--width': 0}}>
              </div>
                ) : null
            }
              
            </div>
            }
        
            <div className="game-top-bar-rigth">
              <CancelRoundedIcon style={{ color: '#fff' }}/>
            </div>
          </div>}
      {/* TOP-CONTAINER */}
      {
        result && 
        <div className="game-top-bar-result">
            <img className='game-top-bar-img' src="/images/wwe.png" alt="" />

            <div className="result-text">
                <h1>RESULTS</h1>
            </div>

            <div className="game-top-bar-rigth">
              <CancelRoundedIcon style={{ color: '#fff' }}/>
            </div>
        </div>
      }      

      <div className="game-center">
        <div className="game-center-left">
          {
            !result && 
            <div className="game-center-left-content">

            <div className="rank-box">
              <StarIcon style={{color: '#c31818', fontSize: '30px'}}/>
              <h1>{1}/{isSingle ? '1' : '2'} </h1>

            </div>
            <div className="rank-box-players">
              <div className="players-box">
                <div className="info">
                  <h3>1</h3>
                  {
                    isSingle ? 
                    <img className='players-box-img' src={`/images/${userInfo.avatar}`} alt="" />
                    :
                    <img className='players-box-img' src={`/images/${gameInfo.hostAvatar}`} alt="" />
                  }

                  {userInfo.host && 
                    <h3> YOU </h3>
                  }
                  {!userInfo.host && 
                    <h3> {truncateText(gameInfo.hostUsername, 10)}  </h3>
                  }
                </div>
                <div className="score">
                  <h3>{hostTotalPoint}</h3>
                </div>
                <div className="addPoint">
                  { questionLeaderboard && hostPoint != 0 &&
                    <h3>+{hostPoint}</h3>
                  }
                  { solution && hostPoint != 0 &&
                    <h3>+{hostPoint}</h3>
                  }
{/*                   { questionAnswered && hostPoint != 0 &&
                    <h3>+{hostPoint}</h3>
                  } */}
                </div>
              </div>
              
              {
                !isSingle && 
                <div className="players-box">
                  <div className="info">
                    <h3>2</h3>
                    <img className='players-box-img' src={`/images/${gameInfo.guestAvatar}`} alt="" />
                    {!userInfo.host && 
                    <h3> YOU </h3>
                    }
                    {userInfo.host && 
                      <h3> {truncateText(gameInfo.guestUsername, 10)}  </h3>
                    }
                  </div>
                  <div className="score">
                    <h3>{guestTotalPoint}</h3>
                  </div>

                  <div className="addPoint">

                    { questionLeaderboard && guestPoint != 0 && !isSingle && questions[questionKey][guestAnswer] == questionKey &&
                      <h3>+{guestPoint}</h3>
                    }
                    { solution && guestPoint != 0 && !isSingle && questions[questionKey][guestAnswer] == questionKey &&
                      <h3>+{guestPoint}</h3>
                    }
                  </div>

               </div>
              }

            </div>

          </div>
          }
        </div>

        <div className="game-center-center">
          <div className="game-center-center-content">
            {
              launch && 
              <div className="launch">
                <img src={`/images/${userInfo.avatar}`} alt="" />
                <h1>ARE YOU READY?</h1>
              </div>
            }
            {
              questionPrepare && 
              <div className="qPrepare">
                <div className={qpCounter ? "qPrepare-text active" : "qPrepare-text"}> 
                  <h2>QUESTION {questionNumber}</h2>
                </div>
                <div className="qPrepare-boxs">
                  <div className={qpCounter ? "questionValue active" : "questionValue"}>
                    <h1>{450 + (questionNumber * 50) }</h1>
                    <h3>QUESTION VALUE</h3>
                  </div>
                  <div className={qpCounter ? "questionValue active" : "questionValue"}>
                    <h1>{250 + (questionNumber * 50) }</h1>
                    <h3>MAX SPEED BONUS</h3>
                  </div>
                </div>
              </div>
            }
            {
              questionStage || questionAnswered || solution ? (
                <div className="questionStage">
                  <div className="qStage-text">
                    { questionStage && 
                      <h1>WHAT'S THE ARTIST?</h1>
                    }
                    {
                      questionAnswered && !noAnswer &&
                      <h1>EVERYONE ANSWERED!</h1>
                    }
                    {
                      questionAnswered && noAnswer &&
                      <h1 style={{ color: "#141516" }}>NO ONE ANSWERED!</h1>
                    }
                    {
                      solution && !badAnswer && !noAnswer &&
                      <h1 style={{color: '#EE2724'}}>GOOD ANSWER!</h1>
                    }
                    {
                      solution && badAnswer &&
                      <h1 style={{color: '#EE2724'}}>BAD ANSWER!</h1>
                    }
                  </div>

                  <div className="qStage-boxs"> {/* wrong correct */}
                    <div className = 
                    
                    {
                      !solution ? (
                        (clicked && !solution && userInfo.host && hostAnswer === 0) ? "top-box box active" :
                        (clicked && !solution && !userInfo.host && guestAnswer === 0) ? "top-box box active" :
                        "top-box box"
                      ) : (
                        (questionKey == answer0) ? "top-box box correct" :
                        (userInfo.host && hostAnswer === 0 && questionKey !== answer0) ? "top-box box wrong" :
                        (!userInfo.host && guestAnswer === 0 && questionKey !== answer0) ? "top-box box wrong" :
                        "top-box box"
                      )
                    }
                    

                      onClick={answerA}
                    >
                      <h2>{questions[questionKey][0]}</h2>

                      {
                        (isSingle && hostAnswer == 0 && clicked) ? 
                        <img src={`/images/${userInfo.avatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && hostAnswer === 0 && hostAnswerTime > guestAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 0 && guestAnswerTime > hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 0 && guestAnswerTime === hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 0 && hostAnswerTime > guestAnswerTime && hostAnswer === 0) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && hostAnswer === 0 && guestAnswerTime > hostAnswerTime && guestAnswer === 0 ) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && guestAnswer === 0 && guestAnswerTime === hostAnswerTime && hostAnswer === 0 ) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 0 && hostAnswerTime > guestAnswerTime && hostAnswer !== 0) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && hostAnswer === 0 && guestAnswerTime > hostAnswerTime && guestAnswer !== 0) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 0 && guestAnswerTime === hostAnswerTime && hostAnswer !== 0) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                    </div>
                    <div className="mid-boxs ">
                      <div className = 
                        {
                          !solution ? (
                            (clicked && !solution && userInfo.host && hostAnswer === 1) ? "top-box box active" :
                            (clicked && !solution && !userInfo.host && guestAnswer === 1) ? "top-box box active" :
                            "top-box box"
                          ) : (
                            (questionKey == answer1) ? "top-box box correct" :
                            (userInfo.host && hostAnswer === 1 && questionKey !== answer1) ? "top-box box wrong" :
                            (!userInfo.host && guestAnswer === 1 && questionKey !== answer1) ? "top-box box wrong" :
                            "top-box box"
                          )
                        }
                        onClick={answerB}
                      >
                      <h2>{questions[questionKey][1]}</h2>

                      {
                        (isSingle && hostAnswer == 1 && clicked) ? 
                        <img src={`/images/${userInfo.avatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && hostAnswer === 1 && hostAnswerTime > guestAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 1 && guestAnswerTime > hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 1 && guestAnswerTime === hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }


                      {
                        (!isSingle && guestAnswer === 1 && hostAnswerTime > guestAnswerTime && hostAnswer === 1) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && hostAnswer === 1 && guestAnswerTime > hostAnswerTime && guestAnswer === 1) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && guestAnswer === 1 && guestAnswerTime === hostAnswerTime && hostAnswer === 1) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 1 && hostAnswerTime > guestAnswerTime && hostAnswer !== 1) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && hostAnswer === 1 && guestAnswerTime > hostAnswerTime && guestAnswer !== 1) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 1 && guestAnswerTime === hostAnswerTime && hostAnswer !== 1) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }
                      
                      </div>
                      <div className = 
                        {
                          !solution ? (
                            (clicked && !solution && userInfo.host && hostAnswer === 2) ? "top-box box active" :
                            (clicked && !solution && !userInfo.host && guestAnswer === 2) ? "top-box box active" :
                            "top-box box"
                          ) : (
                            (questionKey == answer2) ? "top-box box correct" :
                            (userInfo.host && hostAnswer === 2 && questionKey !== answer2) ? "top-box box wrong" :
                            (!userInfo.host && guestAnswer === 2 && questionKey !== answer2) ? "top-box box wrong" :
                            "top-box box"
                          )
                        }
                        onClick={answerC}
                       >
                        <h2>{questions[questionKey][2]}</h2>
                        {
                        (isSingle && hostAnswer == 2 && clicked) ? 
                        <img src={`/images/${userInfo.avatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && hostAnswer == 2 && hostAnswerTime > guestAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 2 && guestAnswerTime > hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 2 && guestAnswerTime === hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 2 && hostAnswerTime > guestAnswerTime && hostAnswer === 2) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && hostAnswer === 2 && guestAnswerTime > hostAnswerTime && guestAnswer === 2 ) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && guestAnswer === 2 && guestAnswerTime === hostAnswerTime && hostAnswer === 2) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 2 && hostAnswerTime > guestAnswerTime && hostAnswer !== 2) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && hostAnswer === 2 && guestAnswerTime > hostAnswerTime && guestAnswer !== 2) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 2 && guestAnswerTime === hostAnswerTime && hostAnswer !== 2) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }
                      </div>
                    </div>
                    <div className = 
                      {
                        !solution ? (
                          (clicked && !solution && userInfo.host && hostAnswer === 3) ? "top-box box active" :
                          (clicked && !solution && !userInfo.host && guestAnswer === 3) ? "top-box box active" :
                          "top-box box"
                        ) : (
                          (questionKey == answer3) ? "top-box box correct" :
                          (userInfo.host && hostAnswer === 3 && questionKey !== answer3) ? "top-box box wrong" :
                          (!userInfo.host && guestAnswer === 3 && questionKey !== answer3) ? "top-box box wrong" :
                          "top-box box"
                        )
                      }
                      onClick={answerD}
                      >
                       <h2>{questions[questionKey][3]}</h2>
                       {
                        (isSingle && hostAnswer == 3 && clicked) ? 
                        <img src={`/images/${userInfo.avatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && hostAnswer === 3 && hostAnswerTime > guestAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 3 && guestAnswerTime > hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 3 && guestAnswerTime === hostAnswerTime) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 3 && hostAnswerTime > guestAnswerTime && hostAnswer === 3) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && hostAnswer === 3 && guestAnswerTime > hostAnswerTime && guestAnswer === 3 ) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon2" />
                        : (!isSingle && guestAnswer === 3 && guestAnswerTime === hostAnswerTime && hostAnswer === 3 ) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon2" />
                        : null
                      }

                      {
                        (!isSingle && guestAnswer === 3 && hostAnswerTime > guestAnswerTime && hostAnswer !== 3) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && hostAnswer === 3 && guestAnswerTime > hostAnswerTime && guestAnswer !== 3) ? 
                        <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="asnwerIcon" />
                        : (!isSingle && guestAnswer === 3 && guestAnswerTime === hostAnswerTime && hostAnswer !== 3) ? 
                        <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="asnwerIcon" />
                        : null
                      }

                    </div>
                  </div>
                  
                </div>
              ) : null
            }

            {
              questionLeaderboard && !noCorrectAnswer &&
              <div className="qLeaderboard">
                <div className="qL-text">
                  <h1>THE FASTESTS IN THIS ROUND</h1>
                </div>

                <div className="qL-content">
                { gameInfo.hostUsername != null &&
                  <div className="ql-box you">

                    <div className="ql-content-box first">

                          {
                            userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime > guestAnswerTime &&
                            <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime > guestAnswerTime &&
                            <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />

                          }
                          {
                            userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime < guestAnswerTime && !(questions[questionKey][guestAnswer] == questionKey) &&
                            <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime < guestAnswerTime && !(questions[questionKey][guestAnswer] == questionKey) &&
                            <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                          }

                          {
                            userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && hostAnswerTime < guestAnswerTime &&
                            <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            !userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && hostAnswerTime < guestAnswerTime &&
                            <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && guestAnswerTime < hostAnswerTime && !(questions[questionKey][hostAnswer] == questionKey) &&
                            <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            !userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && guestAnswerTime < hostAnswerTime && !(questions[questionKey][hostAnswer] == questionKey) &&
                            <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            hostAnswerTime === guestAnswerTime && userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && (questions[questionKey][guestAnswer] == questionKey) &&
                            <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                          }
                          {
                            hostAnswerTime === guestAnswerTime && !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && (questions[questionKey][guestAnswer] == questionKey) &&
                            <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                          }

                      <div className="ql-rank"> 
                        <h1>1</h1>
                      </div>

                      <div className="ql-username">
                         {
                            userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime > guestAnswerTime &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime > guestAnswerTime &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.hostUsername}</h1>
                          }
                          {
                            userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime < guestAnswerTime && !(questions[questionKey][guestAnswer] == questionKey) &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime < guestAnswerTime && !(questions[questionKey][guestAnswer] == questionKey) &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.hostUsername}</h1>
                          }

                          {
                            userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && hostAnswerTime < guestAnswerTime &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.guestUsername}</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && hostAnswerTime < guestAnswerTime &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && guestAnswerTime < hostAnswerTime && !(questions[questionKey][hostAnswer] == questionKey) &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.guestUsername}</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && guestAnswerTime < hostAnswerTime && !(questions[questionKey][hostAnswer] == questionKey) &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            hostAnswerTime === guestAnswerTime && userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && (questions[questionKey][guestAnswer] == questionKey) &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.hostUsername}</h1>
                          }
                          {
                            hostAnswerTime === guestAnswerTime && !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && (questions[questionKey][guestAnswer] == questionKey) &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.hostUsername}</h1>
                          }
                      </div>

                      <div className="ql-points first-ql-points">
                          {
                            userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime > guestAnswerTime &&
                            <h1>+{hostPoint}</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime > guestAnswerTime &&
                            <h1>+{hostPoint}</h1>
                          }
                          {
                            userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime < guestAnswerTime && !(questions[questionKey][guestAnswer] == questionKey) &&
                            <h1>+{hostPoint}</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && hostAnswerTime < guestAnswerTime && !(questions[questionKey][guestAnswer] == questionKey) &&
                            <h1>+{hostPoint}</h1>
                          }

                          {
                            userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && hostAnswerTime < guestAnswerTime &&
                            <h1>+{guestPoint}</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && hostAnswerTime < guestAnswerTime &&
                            <h1>+{guestPoint}</h1>
                          }
                          {
                            userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && guestAnswerTime < hostAnswerTime && !(questions[questionKey][hostAnswer] == questionKey) &&
                            <h1>+{guestPoint}</h1>
                          }
                          {
                            !userInfo.host && (questions[questionKey][guestAnswer] == questionKey) && guestAnswerTime < hostAnswerTime && !(questions[questionKey][hostAnswer] == questionKey) &&
                            <h1>+{guestPoint}</h1>
                          }
                          {
                            hostAnswerTime === guestAnswerTime && userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && (questions[questionKey][guestAnswer] == questionKey) &&
                            <h1>+{hostPoint}</h1>
                          }
                          {
                            hostAnswerTime === guestAnswerTime && !userInfo.host && (questions[questionKey][hostAnswer] == questionKey) && (questions[questionKey][guestAnswer] == questionKey) &&
                            <h1>+{hostPoint}</h1>
                          }
                        <p>points</p>
                      </div>

                    </div>

                    <div className="sec">
                      {
                          hostAnswerTime > guestAnswerTime &&
                          <h4>{10 - hostAnswerTime}s</h4>
                        }
                        {
                          hostAnswerTime < guestAnswerTime &&
                          <h4>{10 - guestAnswerTime}s</h4>
                        }
                        {
                          hostAnswerTime === guestAnswerTime &&
                          <h4>{10 - hostAnswerTime}s</h4>
                        }
                    </div>
                  </div>}

                  { gameInfo.hostUsername == null && 
                  <div className="ql-box you">

                    <div className="ql-content-box first">
                        <img src={`/images/${userInfo.avatar}`} alt="" className="qlIcon" />
                      <div className="ql-rank"> 
                        <h1>1</h1>
                      </div>

                      <div className="ql-username">
                        <h1 style={{color: '#c31818 '}}>YOU</h1>
                      </div>

                      <div className="ql-points first-ql-points">
                          <h1>+{hostPoint}</h1>
                        <p>points</p>
                      </div>

                    </div>

                    <div className="sec">
                          <h4>{hostAnswerTime}s</h4>
                    </div>
                  </div>}


                    { gameInfo.hostUsername != null && secL &&
                    
                    <div className="ql-box">

                    <div className="ql-content-box second">
                        {
                          hostAnswerTime > guestAnswerTime && 
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                        }
                        {
                          hostAnswerTime < guestAnswerTime &&
                          <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                        }
                        {
                          hostAnswerTime === guestAnswerTime && 
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                        }
                    
                      <div className="ql-rank"> 
                        <h1>2</h1>
                      </div>

                      <div className="ql-username">
                          {
                            hostAnswerTime > guestAnswerTime && !userInfo.host &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            hostAnswerTime < guestAnswerTime && userInfo.host &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            hostAnswerTime === guestAnswerTime && !userInfo.host &&
                            <h1 style={{color: '#c31818 '}}>YOU</h1>
                          }
                          {
                            hostAnswerTime === guestAnswerTime && userInfo.host &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.guestUsername}</h1>
                          }
                          {
                            hostAnswerTime < guestAnswerTime && !userInfo.host &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.hostUsername}</h1>
                          }
                          {
                            hostAnswerTime > guestAnswerTime && userInfo.host &&
                            <h1 style={{color: '#c31818 '}}>{gameInfo.guestUsername}</h1>
                          }
                      </div>

                      <div className="ql-points">
                        {
                          hostAnswerTime > guestAnswerTime &&
                          <h1>+{guestPoint}</h1>
                        }
                        {
                          hostAnswerTime < guestAnswerTime &&
                          <h1>+{hostPoint}</h1>
                        }
                        {
                          hostAnswerTime === guestAnswerTime &&
                          <h1>+{guestPoint}</h1>
                        }
                        <p>points</p>
                      </div>

                    </div>

                    <div className="sec">
                        {
                          hostAnswerTime > guestAnswerTime &&
                          <h4>{10 - guestAnswerTime}s</h4>
                        }
                        {
                          hostAnswerTime < guestAnswerTime &&
                          <h4>{10 - hostAnswerTime}s</h4>
                        }
                        {
                          hostAnswerTime === guestAnswerTime &&
                          <h4>{10 - guestAnswerTime}s</h4>
                        }
                    </div>

                  </div>}
                  
                </div>
              </div>
            }

            {
              noCorrectAnswer &&  questionLeaderboard &&
              <h1 className='noAnswer'>NO ONE ANSWERED CORRECTLY!</h1>
            }

            {
              videoStage && !launch && !questionPrepare && !questionStage &&
              !questionAnswered && !solution && !questionLeaderboard && !result &&
              <>
              <div className="video-player-content">

                <div className="video-player">
                  <VideoPlayer
                    width={774}
                    height={435}
                    questionKey = {questionKey}
                    />
                </div>

                <div className="video-player-skip">

                  <button className='video-player-button'
                  onClick={skipFunction}
                  >SKIP {skipButtonCounter}/{isSingle ? '1' : '2'}</button>
                </div>
              </div>
              </>
            }

            {
              !videoStage && !launch && !questionPrepare && !questionStage &&
              !questionAnswered && !solution && !questionLeaderboard && !result && answerFake &&
              <>
              <div className="video-player-content">

                <div className="video-player">
                { <VideoPlayer
                    width={774}
                    height={435}
                    /> }
                </div>

                <div className="video-player-skip">

                  <button className='video-player-button'
                  onClick={skipFunction}
                  >SKIP{isSingle ? '1' : '2'}/{isSingle ? '1' : '2'}</button>
                </div>
              </div>
              </>
            }            

            {
              result && 
              <div className="result-center">
                
                <div className="result-content">
                  <div className="result-box you">

                    <div className="result-content-box first">
                        { gameInfo.hostUsername != null && hostTotalPoint > guestTotalPoint && userInfo.host &&                      
                          <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint > guestTotalPoint && !userInfo.host &&                      
                          <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="qlIcon" />
                        }

                        { gameInfo.hostUsername != null && hostTotalPoint < guestTotalPoint &&   userInfo.host &&                       
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint < guestTotalPoint &&   !userInfo.host &&                       
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                        }
                        { gameInfo.hostUsername == null &&  !userInfo.host &&                 
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="qlIcon" />
                        }
                        {
                          isSingle && 
                          <img src={`/images/${userInfo.avatar}`} alt="" className="qlIcon" />
                        }

                      <div className="result-rank"> 
                        <h1>1</h1>
                      </div>

                      <div className="result-username">
                        { gameInfo.hostUsername != null && hostTotalPoint > guestTotalPoint && userInfo.host &&                      
                        <h1 style={{color: '#c31818 '}}>YOU</h1>
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint > guestTotalPoint && !userInfo.host &&                      
                        <h1 style={{color: '#c31818 '}}>{gameInfo.hostUsername}</h1>
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint < guestTotalPoint &&   userInfo.host &&                       
                        <h1 style={{color: '#c31818 '}}>{gameInfo.guestUsername}</h1>
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint < guestTotalPoint &&   !userInfo.host &&                       
                        <h1 style={{color: '#c31818 '}}>YOU</h1>
                        }
                        { gameInfo.hostUsername == null &&  userInfo.host &&                 
                        <h1 style={{color: '#c31818 '}}>YOU</h1>
                        }
                        { gameInfo.hostUsername == null &&  !userInfo.host &&                 
                        <h1 style={{color: '#c31818 '}}>YOU</h1>
                        }
                      </div>

                      <div className="result-points first-result-points">
                        { gameInfo.hostUsername != null && hostTotalPoint > guestTotalPoint &&                          
                          <h1>+{hostTotalPoint}</h1>
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint < guestTotalPoint &&                          
                          <h1>+{guestTotalPoint}</h1>
                        }
                        { gameInfo.hostUsername != null && hostTotalPoint == guestTotalPoint &&                          
                          <h1>+{hostTotalPoint}</h1>
                        }
                        { gameInfo.hostUsername == null &&                        
                          <h1>+{hostTotalPoint}</h1>
                        }
                        <p>points</p>
                      </div>

                    </div>
                  </div>


                  {  !isSingle && 
                    <div className="result-box">

                    {  gameInfo.hostUsername != null &&      
                      <div className="result-content-box second">
                      <img src={`/images/cmpunk.png`} alt="" className="resultIcon" />
                        { hostTotalPoint > guestTotalPoint && !userInfo.host &&                      
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="resultIcon" />
                        }
                        { hostTotalPoint > guestTotalPoint && userInfo.host &&                      
                          <img src={`/images/${gameInfo.guestAvatar}`} alt="" className="resultIcon" />
                        }
                        { hostTotalPoint < guestTotalPoint &&   userInfo.host &&                       
                          <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="resultIcon" />
                        }
                        { hostTotalPoint < guestTotalPoint &&   !userInfo.host &&                       
                          <img src={`/images/${gameInfo.hostAvatar}`} alt="" className="resultIcon" />
                        }
                      
                        <div className="result-rank"> 
                          <h1>2</h1>
                        </div>

                        <div className="result-username">
                        { hostTotalPoint > guestTotalPoint && !userInfo.host &&                      
                          <h1>YOU</h1>
                        }
                        { hostTotalPoint > guestTotalPoint && userInfo.host &&                      
                          <h1>{gameInfo.guestUsername}</h1>
                        }
                        { hostTotalPoint < guestTotalPoint &&   userInfo.host &&                       
                          <h1>YOU</h1>
                        }
                        { hostTotalPoint < guestTotalPoint &&   !userInfo.host &&                       
                          <h1>{gameInfo.hostUsername}</h1>
                        }
                        </div>

                        <div className="result-points">
                        { hostTotalPoint > guestTotalPoint &&                          
                          <h1>+{guestTotalPoint}</h1>
                        }
                        { hostTotalPoint < guestTotalPoint &&                          
                          <h1>+{hostTotalPoint}</h1>
                        }
                          <p>points</p>
                        </div>

                    </div>}
                  </div>}

                </div>

                  <button className='continue-button'>CONTINUE</button>
              </div>
            }

          </div>

        </div>

        <div className="game-center-rigth">

        </div>

        {/* Song Volume */} 
              <div className="volume">
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
        </div>
      {/* Song Volume */} 


      </div>


    </div>

    </>
  )
}
