const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const { userInfo } = require("os");

const getGameSetting = require('./questions.js');

app.use(cors());
const server = http.createServer(app);

const rooms = {};

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    const randomRoomCode = Math.floor(100000 + Math.random() * 900000); 
    console.log(`User Connected: ${socket.id}, User Room Number: ${randomRoomCode}`); 
    let roomNumber = ''

    /* Her kullanıcıya kendi odasını kurabilmesi için verilen roomID */ 
    socket.on("roomID", (data) => {
        socket.emit("get-roomID", randomRoomCode.toString());
    })
    /*- Her kullanıcıya kendi odasını kurabilmesi için verilen roomID -*/ 

    /* Create Game */
    socket.on("create-room", (data) => {
        if(data.roomID != undefined){
            rooms[data.roomID] = [{
                host: data.host,
                avatar: data.avatar,
                username: data.username,
                roomID: data.roomID,
                ready: false,
                singlePlayer: false,
                countdown: 2,
                skip: false,
                questions: getGameSetting(),
                skipQuestionH: false,
                skipQuestionG: false
            }]
            socket.join(data.roomID);
            roomNumber = data.roomID;
        }
            console.log(rooms)
    })
    /*- Create Game -*/

    /* Join Game */
    socket.on("join-game", (data) => {
        if(data.roomID != undefined){
            rooms[data.roomID].push({
                host: data.host,
                avatar: data.avatar,
                username: data.username,
                roomID: data.roomID,
                ready: false,
                singlePlayer: false,
                skip: false

            });
            socket.join(data.roomID);
            roomNumber = data.roomID;

        }
            console.log(rooms)
    }) 
    /*- Join Game -*/ 

    /* Send User's infos to each other */
        socket.on("send_infos", (data) => {
            if(rooms[roomNumber]){
                socket.to(roomNumber).emit("first-info", {
                    username : rooms[roomNumber][0].username,
                    avatar : rooms[roomNumber][0].avatar,
                    roomID : rooms[roomNumber][0].roomID,
                    host : rooms[roomNumber][0].host,
                    ready: rooms[roomNumber][0].ready,
                    singlePlayer: rooms[roomNumber][0].singlePlayer,
                    countdown: rooms[roomNumber][0].countdown,
                    questions: rooms[roomNumber][0].questions
                }) 
            }

            if(rooms[roomNumber]){
            if(rooms[roomNumber].length > 1){
                socket.to(roomNumber).emit("second-info", {
                    username : rooms[roomNumber][1].username,
                    avatar : rooms[roomNumber][1].avatar,
                    roomID : rooms[roomNumber][1].roomID,
                    ready: rooms[roomNumber][1].ready,
                    singlePlayer: rooms[roomNumber][0].singlePlayer,
                })
              }
            }

        })
    /*- Send User's infos to each other -*/

    /* Game Start */ 
        socket.on("first-user-ready", (data) => {
            console.log(data)
            if(rooms[data.roomID] && data.isHost == true){
            rooms[data.roomID][0].ready = true;
            }

            if(rooms[data.roomID]){
                if(rooms[data.roomID].length == 1){
                    console.log('single player game has started!');

                    rooms[data.roomID][0].singlePlayer = true;
                }
            } 
            })
        
        socket.on("second-user-ready", (data) => {
            if(rooms[data]){
                if(rooms[data].length > 1){
                    if(rooms[data][0].ready == true){
                        rooms[data][1].ready = true;
                    }
                }
            }
        })
        

        socket.on('start-game', (data) => {
            socket.join(data);
            
            if(rooms[data]){
            if(rooms[data].length > 1){
                if(rooms[data][1].ready == true && rooms[data][0].ready == true){
                    socket.to(data).emit('send', true);
                    socket.emit('send',true)
                }
            }else if( rooms[data].length  == 1 && rooms[data][0].singlePlayer == true){
                socket.emit('send',true)
            }
        }

        })

        socket.on("game", (data) => {
            socket.join(data.roomID);
            console.log(data.host)

            if(rooms[data.roomID]){

                socket.emit('questions', rooms[data.roomID][0].questions)
            }

            let launch      = true
            let prepare     = false
            let question    = false
            let answered    = false
            let solution    = false
            let leaderboard = false
            let video       = false
            let result      = false
            let controlPoint = false

            let questionNumber = 1;

            if(data.host){
                const interval = setInterval(() => {

                    /* Süre Burda */
                    if(rooms[data.roomID]){
                            socket.to(data.roomID).emit('countdown', rooms[data.roomID][0].countdown);
                            socket.emit('countdown', rooms[data.roomID][0].countdown);
                    }
                    /*- Süre Burda -*/

                    /* Stageler */

                    if(launch){

                        if(questionNumber < 5){
                            socket.emit('questionNumber', questionNumber )
                            socket.to(data.roomID).emit('questionNumber', questionNumber );
                        }
                        
                        if(rooms[data.roomID][0].countdown == 0){
                            
                            socket.emit('launch', false);
                            socket.to(data.roomID).emit('launch', false);
                            
                            socket.emit('prepare', true);
                            socket.to(data.roomID).emit('prepare', true);
                            
                            rooms[data.roomID][0].countdown = 3
                            launch = false
                            prepare = true
                        }
                    }
                    
                    if(prepare){

                        if(questionNumber < 5){
                            socket.emit('questionNumber', questionNumber )
                            socket.to(data.roomID).emit('questionNumber', questionNumber );
                        }

                        if(rooms[data.roomID][0].countdown == 0){

                            socket.emit('prepare', false);
                            socket.to(data.roomID).emit('prepare', false);

                            socket.emit('question', true);
                            socket.to(data.roomID).emit('question', true);

                            rooms[data.roomID][0].countdown = 10
                            prepare = false
                            question = true
                        }
                    }                    

                    if(question){
                        if(rooms[data.roomID][0].countdown == 0){
                            socket.emit('question', false);
                            socket.to(data.roomID).emit('question', false);

                            socket.emit('answered', true);
                            socket.to(data.roomID).emit('answered', true);

                            rooms[data.roomID][0].countdown = 2
                            question = false
                            answered = true
                        }

                        if(rooms[data.roomID][0].singlePlayer == true && rooms[data.roomID][0].skipQuestionH == true){
                            socket.emit('question', false);
                            socket.to(data.roomID).emit('question', false);

                            socket.emit('answered', true);
                            socket.to(data.roomID).emit('answered', true);

                            rooms[data.roomID][0].countdown = 2
                            question = false
                            answered = true
                        }

                        if(rooms[data.roomID][0].singlePlayer == false && rooms[data.roomID][0].skipQuestionH == true && rooms[data.roomID][0].skipQuestionG == true){
                            socket.emit('question', false);
                            socket.to(data.roomID).emit('question', false);

                            socket.emit('answered', true);
                            socket.to(data.roomID).emit('answered', true);

                            rooms[data.roomID][0].countdown = 2
                            question = false
                            answered = true
                        }
                    }                       
                  
                    if(answered){
                        if(rooms[data.roomID][0].countdown == 0){
                            socket.emit('answered', false);
                            socket.to(data.roomID).emit('answered', false);

                            socket.emit('solution', true);
                            socket.to(data.roomID).emit('solution', true);

                            rooms[data.roomID][0].countdown = 2
                            answered = false
                            solution = true
                        }

                        if(rooms[data.roomID].length > 1){
                            rooms[data.roomID][0].skipQuestionH = false
                            rooms[data.roomID][0].skipQuestionG = false
                        }else{
                            rooms[data.roomID][0].skipQuestionH = false
                        }
                    }  
                                      
                    if(solution){
                        if(rooms[data.roomID][0].countdown == 0){
                            socket.emit('solution', false);
                            socket.to(data.roomID).emit('solution', false);

                            socket.emit('leaderboard', true);
                            socket.to(data.roomID).emit('leaderboard', true);

                            rooms[data.roomID][0].countdown = 2
                            solution = false
                            leaderboard = true
                        }
                    }  
                                      
                    if(leaderboard){
                        if(rooms[data.roomID][0].countdown == 0){
                            socket.emit('leaderboard', false);
                            socket.to(data.roomID).emit('leaderboard', false);

                            socket.emit('video', true);
                            socket.to(data.roomID).emit('video', true);

                            rooms[data.roomID][0].countdown = 30
                            leaderboard = false
                            video = true
                        }
                    }  
                                      
                    if(video){

                        if(rooms[data.roomID].length > 1){

                            if(rooms[data.roomID][0].skip && rooms[data.roomID][1].skip){
                                socket.emit('video', false);
                                socket.to(data.roomID).emit('video', false);
                                video = false
                                controlPoint = true
                            }

                        }else{
                            if(rooms[data.roomID][0].skip){
                                socket.emit('video', false);
                                video = false
                                controlPoint = true
                            }
                        }

                        if(rooms[data.roomID][0].countdown == 0){
                            socket.emit('video', false);
                            socket.to(data.roomID).emit('video', false);

                            /* rooms[data.roomID][0].countdown = 3 */
                            video = false
                            controlPoint = true
                        }
                    }

                    if(controlPoint){
                        if(questionNumber == 5 || questionNumber > 5){
                            socket.emit('result', true);
                            socket.to(data.roomID).emit('result', true);
                            controlPoint = false
                        }else{
                            
                            questionNumber++;
                            
                            socket.emit('questionNumber', questionNumber )
                            socket.to(data.roomID).emit('questionNumber', questionNumber );

                            socket.emit('prepare', true);
                            socket.to(data.roomID).emit('prepare', true);

                            rooms[data.roomID][0].countdown = 3

                            if(rooms[data.roomID].length > 1){
                                rooms[data.roomID][0].skip = false;
                                rooms[data.roomID][1].skip = false;
                            }else{
                                rooms[data.roomID][0].skip = false;
                            }

                            prepare = true
                            controlPoint = false
                        }

                    }

                    rooms[data.roomID][0].countdown--; 
                    console.log(rooms[data.roomID][0].countdown)

                }, 1000);

                
                if(rooms[data.roomID]){
                    if(rooms[data.roomID][0].singlePlayer){
                        socket.emit('is-single-player-game', true)
                    }
                }
            }

                
        })

        socket.on('skip-video', (data) => {
            socket.join(data.roomID)

            if(data.host == true){
                rooms[data.roomID][0].skip = true;
                socket.emit('skip-counter', 'plus-one')
                socket.to(data.roomID).emit('skip-counter', 'plus-one')
            }else if(data.host == false){
                rooms[data.roomID][1].skip = true;
                socket.emit('skip-counter', 'plus-one')
                socket.to(data.roomID).emit('skip-counter', 'plus-one')
            }
        })

        socket.on('questionAnswered', (data) => {
            socket.join(data.roomID)

            if(data.host == true){
                rooms[data.roomID][0].skipQuestionH = true;
            }else if(data.host == false){
                rooms[data.roomID][0].skipQuestionG = true;
            }
        })

        socket.on('hosts-answer', (data) =>{
            socket.join(data.roomID)
            if(data.host){
                socket.to(data.roomID).emit('send-hosts-answer', {answer : data.answer, time: data.time})
                
            }  
            console.log(data) 
            
        })

        socket.on('guests-answer', (data) =>{
            socket.join(data.roomID)
            if(!data.host){
                socket.to(data.roomID).emit('send-guests-answer', {answer : data.answer, time: data.time})
            }   
        })



        
    /*- Game Start -*/ 



})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
  });