<script setup>
    import {ref, watch, onUnmounted} from "vue";
    import {useRoute} from "vue-router";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import * as bootstrap from 'bootstrap';

    import * as Ably from 'ably';

    import Board from "@/components/Board.vue";
    import Clock from "@/components/Clock.vue"; 
    import ScoreSheet from "@/components/ScoreSheet.vue";
    import CapturedPieces from "@/components/CapturedPieces.vue";
    import Controls from "@/components/Controls.vue";
    import Modal from "@/components/Modal.vue";
    import Settings from "@/components/Settings.vue";
    import Fen from "@/components/Fen.vue";
    import About from "@/components/About.vue";

    const ranks = ref(["a", "b", "c", "d", "e", "f", "g", "h"]);
    const files = ref([8, 7, 6, 5, 4, 3, 2, 1]);
    
    const flip = () => {
        ranks.value = ranks.value.reverse();
        files.value = files.value.reverse();
    };
    const players = ref({
        "W": 1,
        "B" : 8,
    })
    const pieces = ref({
        "K": "e",
        "Q": "d",
        "R1": "a", 
        "R2": "h", 
        "B1": "c", 
        "B2": "f", 
        "N1": "b", 
        "N2": "g", 
        "P1": "a",
        "P2": "b",
        "P3": "c",
        "P4": "d",
        "P5": "e",
        "P6": "f",
        "P7": "g",
        "P8": "h",
    });

    
    let trackPiecesFromPiece = ref({});
    let trackPiecesFromPos = ref({});
    let pieceKey, pieceValue, posValue, posKey;
    for(const [player, file] of Object.entries(players.value)){
        for(const [piece, rank] of Object.entries(pieces.value)) {
            pieceKey = `${player}${piece}`;
            posValue = {player: player, piece: piece};
            if(piece[0] == "P") {
                if(player == "W") {
                    pieceValue = {rank: rank, file: file + 1};
                    posKey = `${rank}${file+1}`;
                }
                else {
                    pieceValue = {rank: rank, file: file - 1};
                    posKey = `${rank}${file-1}`;
                }
            }
            else {
                pieceValue = {rank: rank, file: file};
                posKey = `${rank}${file}`;
            }
            trackPiecesFromPiece.value[pieceKey] = pieceValue;
            trackPiecesFromPos.value[posKey] = posValue;
        }
    }

    let currentMoveNo = ref(1);
    let currentPlayer = ref("W");
    
    let whiteRemTime = ref(180);
    let blackRemTime = ref(180);
    let IntervalId = null;
    let increment = ref(0);
    let level = ref(10);

    let ably = null;
    let channel = null;

    let isLoading = ref(false);


    let isRemoteMove = false;

    let movesArr = ref([]);
    const logAndUpdate = (rank, file, capturedStatus, fromRankForPawn, fromFile) => {
        const toPos = `${rank}${file}`;
        let piece = trackPiecesFromPos.value[toPos].piece[0];
        let move = "";
        if(capturedStatus) {
            piece = piece != "P" ? piece + "x" : fromRankForPawn + "x"
            move = piece != "P" ? piece + toPos : toPos;
        }
        else {
            move = piece != "P" ? piece + toPos : toPos;
        }
        if (currentPlayer.value === "W") {
            let moveObj = {
                W: move, 
                B: "",
            }
            movesArr.value.push(moveObj);
            currentPlayer.value = "B";
            if(movesArr.value.length != 1) {
                whiteRemTime.value += increment.value;
            }
            if(route.path === "/bot" || route.path === "/play") {
                blackTimer();
            }
        }
        else {
            if (movesArr.value.length === 0) {
                // Defensive fallback: no previous move, create a new one or throw error
                movesArr.value.push({ W: "", B: move });
            } else {
                movesArr.value[movesArr.value.length -1].B = move;
            }
            currentPlayer.value = "W";
            blackRemTime.value += increment.value;
            if(route.path === "/bot" || route.path === "/play") {
                whiteTimer();
            }
        }
        currentMoveNo.value += 0.5;
        if(route.path === "/bot") {
            if(currentMoveNo.value === 1.5) {
                isLoading.value = true;
                showToast();
                botMove();
            }
            else {
               botMove(); 
            }
        }
        if(route.path === "/play" && channel) {
        if (isRemoteMove) {
            return; // Avoid echo loop
        }
            channel.publish('move', {
            // Handle move, e.g., update the chess board based on message.data
                str1: fromRankForPawn,
                str2: fromFile,
                str3: rank, 
                str4: file,  
            });
        }
        /*channel.publish('move', {
        // Handle move, e.g., update the chess board based on message.data
            str1: rank,
            str2: file, 
        });
        channel.subscribe('move', (message) => {
            const {str1, str2} = message.data;
            boardFn.value.changeVals(str1, str2);
        })*/
    };

    const whiteTimer = () => {
        clearInterval(IntervalId);
        IntervalId = setInterval(() => {
            whiteRemTime.value -= 1;
            if(whiteRemTime.value <= 0) {
                alert("White Runs Out Of Time! Black Wins!!!");
                clearInterval(IntervalId);
                location.reload();
            }
        }, 1000);
    };

    const blackTimer = () => {
        clearInterval(IntervalId);
        IntervalId = setInterval(() => {
            blackRemTime.value -= 1;
            if(blackRemTime.value <= 0) {
                alert("Black Runs Out Of Time! White Wins!!!");
                clearInterval(IntervalId);
                location.reload();
            }
        }, 1000);
    };

    let capturedPieces = ref([]);

    const updateCapturedArr = (piece) => {
        capturedPieces.value.push(piece);
    };

    let route = useRoute();

    import { onMounted, onBeforeUnmount } from 'vue'

    let isMobile = ref(window.innerWidth < 800) // Set breakpoint as needed

    function handleResize() {
        isMobile.value = window.innerWidth < 800
    }

    onMounted(() => {
        window.addEventListener('resize', handleResize)
    }) 
    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize)
    })

    const props = defineProps({
        t1: Object, 
    })

    const handleBot = (obj) => {
        whiteRemTime.value = obj.time * 60;
        blackRemTime.value = obj.time * 60;
        increment.value = obj.increment;
        if(obj.level === "I") {
            level.value = 10;
        }
        else if(obj.level === "A") {
            level.value = 12;
        }
        else {
            level.value = 14;
        }
        if(ranks.value[0] === "a" && obj.colour === "B") {
            flip();
        }
        if(ranks.value[0] === "h" && obj.colour === "W") {
            flip();
        }
        if(obj.colour === "B" && currentPlayer.value === "W") {
            showToast();
            isLoading.value = true;
            botMove();
        }
    };

    let connected = ref([]);
    let roomNo = ref();
    let createdRooms = ref([]);
    /*const handlePlay = (obj) => {
        if(obj.action === "join") {
            let channeltoconnect = ably.channels.get('chat-room-' + obj.roomNo);
            channeltoconnect.presence.get().then((members) => {
                for(member of members) {
                    console.log(member);
                }
            });
        }
        else {
            whiteRemTime.value = obj.time * 60;
            blackRemTime.value = obj.time * 60;
            increment.value = obj.increment;
        }
        if(ranks.value[0] === "a" && obj.colour === "B") {
            flip();
        }
        if(ranks.value[0] === "h" && obj.colour === "W") {
            flip();
        }
        ably = new Ably.Realtime(
            {key: 'UK-xHQ.fz_ucg:QxVb5bu7tx7JZeS8aPZBhcHvollNc-vIQWKsFeUErj4', 
            echoMessages: false, 
            clientId: `${obj.colour}`});
        roomNo.value = obj.roomNo;
        channel = ably.channels.get('chat-room-' + roomNo.value);
        channel.presence.enter();
        channel.subscribe('move', (message) => {
            const {str1, str2, str3, str4} = message.data;
            if(message.clientId != ably.auth.clientId) {
                isRemoteMove = true;
                if (boardFn.value && boardFn.value.changeVals) {
                    boardFn.value.changeVals(str1, str2);
                    boardFn.value.changeVals(str3, str4);
                }
                setTimeout(() => {
            isRemoteMove = false;
        }, 50);
            }
        });
        channel.presence.subscribe(['enter', 'leave'], (member) => {
            channel.presence.get().then((members) => {
                connected.value.length = 0;
                connected.value.push(members.length);
                for(member of members) {
                    connected.value.push(member.clientId);
                }
                if (connected.value[0] === 1) {
                    isLoading.value = true;
                    showToastConnect();
                } 
                else if (connected.value[0] >= 2) {
                    let istherew = false;
                    let isthereb = false;
                    for(member of members) {
                        if (member.clientId === "W") {
                            istherew = true;
                        }
                        else if (member.clientId === "B") {
                            isthereb = true;
                        }
                    }
                    if((istherew === true) && (isthereb === true)) {
                        isLoading.value = false;
                        hideToastConnect();
                        showToastConnected();
                        setTimeout(()=>{
                            hideToastConnected();
                        }, 2000);
                    }
                    else {
                        isLoading.value = true;
                        showToastConnect();
                    }
                }
            })

        });

    };*/
    
    
    const handlePlay = (obj) => {
    // For joiners, first check if room is available
    if(obj.action === "join") {
        // Check room capacity before joining
        const tempAbly = new Ably.Realtime({
            key: 'UK-xHQ.fz_ucg:QxVb5bu7tx7JZeS8aPZBhcHvollNc-vIQWKsFeUErj4'
        });
        const tempChannel = tempAbly.channels.get('chat-room-' + obj.roomNo);
        
        tempChannel.presence.get().then((members) => {
            if(members.length >= 2) {
                alert("Room is full! Cannot join.");
                tempAbly.close();
                return;
            }
            
            // Room has space, proceed with joining
            proceedWithJoining(obj, members);
            tempAbly.close();
        }).catch(() => {
            alert("Room not found!");
        });
        
        return; // Exit early for joiners until room check is complete
    }
    
    // For room creators, proceed normally
    whiteRemTime.value = obj.time * 60;
    blackRemTime.value = obj.time * 60;
    increment.value = obj.increment;
    
    initializeRoom(obj);
};

const proceedWithJoining = (obj, existingMembers) => {
    // Determine creator's color from existing members
    let creatorColour = null;
    for(const member of existingMembers) {
        if(member.clientId === "W" || member.clientId === "B") {
            creatorColour = member.clientId;
            break;
        }
    }
    
    // Assign opposite color to joiner
    obj.colour = creatorColour === "W" ? "B" : "W";
    
    if(ranks.value[0] === "a" && obj.colour === "B") {
        flip();
    }
    if(ranks.value[0] === "h" && obj.colour === "W") {
        flip();
    }
    
    initializeRoom(obj);
    
    // Request room settings after joining
    setTimeout(() => {
        if(channel) {
            channel.publish('request-settings', {});
        }
    }, 500);
};

const initializeRoom = (obj) => {
    // Initialize Ably connection
    ably = new Ably.Realtime({
        key: 'UK-xHQ.fz_ucg:QxVb5bu7tx7JZeS8aPZBhcHvollNc-vIQWKsFeUErj4', 
        echoMessages: false, 
        clientId: `${obj.colour}`
    });
    
    roomNo.value = obj.roomNo;
    channel = ably.channels.get('chat-room-' + roomNo.value);
    channel.presence.enter();
    
    setupChannelSubscriptions(obj);
};

const setupChannelSubscriptions = (obj) => {
    // Handle settings requests (for room creators)
    channel.subscribe('request-settings', (message) => {
        if(obj.action !== "join") { // Only room creator responds
            channel.publish('room-settings', {
                time: obj.time,
                increment: obj.increment
            });
        }
    });
    
    // Handle room settings (for joiners)
    channel.subscribe('room-settings', (message) => {
        if(obj.action === "join") { // Only joiners apply settings
            const settings = message.data;
            whiteRemTime.value = settings.time * 60;
            blackRemTime.value = settings.time * 60;
            increment.value = settings.increment;
        }
    });
    
    // Move subscription
    channel.subscribe('move', (message) => {
        const {str1, str2, str3, str4} = message.data;
        if(message.clientId != ably.auth.clientId) {
            isRemoteMove = true;
            if (boardFn.value && boardFn.value.changeVals) {
                boardFn.value.changeVals(str1, str2);
                boardFn.value.changeVals(str3, str4);
            }
            setTimeout(() => {
                isRemoteMove = false;
            }, 50);
        }
    });
    
    // Presence subscription with room capacity management
    channel.presence.subscribe(['enter', 'leave'], (member) => {
        channel.presence.get().then((members) => {
            connected.value.length = 0;
            connected.value.push(members.length);
            
            // Block new joins if room is full (2 players)
            if(members.length > 2) {
                alert("Room does not exist! Please check the room number.");
                return;
            }
            
            for(member of members) {
                connected.value.push(member.clientId);
            }
            
            if (connected.value[0] === 1) {
                isLoading.value = true;
                showToastConnect();
            } 
            else if (connected.value[0] >= 2) {
                let istherew = false;
                let isthereb = false;
                for(member of members) {
                    if (member.clientId === "W") {
                        istherew = true;
                    }
                    else if (member.clientId === "B") {
                        isthereb = true;
                    }
                }
                if((istherew === true) && (isthereb === true)) {
                    isLoading.value = false;
                    hideToastConnect();
                    showToastConnected();
                    setTimeout(()=>{
                        hideToastConnected();
                    }, 2000);
                }
                else {
                    isLoading.value = true;
                    showToastConnect();
                }
            }
        });
    });
};

    const handleOpenings = (obj) => {

    };

    let fen = ref("")
    const handlePractice = (obj) => {
        fen.value = obj.fen;
        if (obj.fen && obj.fen.trim() !== '') {
            applyFEN(obj.fen);
        }
    };



    const parseFEN = (fenString) => {
        if (!fenString) return {};
        
        const piecePlacement = fenString.split(' ')[0];
        const ranks = piecePlacement.split('/');
        const newTrackPiecesFromPos = {};
        
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        
        for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
            const rankStr = ranks[rankIndex];
            let fileIndex = 0;
            
            for (const char of rankStr) {
                if (char >= '1' && char <= '8') {
                    fileIndex += parseInt(char);
                } 
                else {
                    const file = 8 - rankIndex;
                    const rank = files[fileIndex];
                    const square = `${rank}${file}`;
                    
                    const player = char === char.toUpperCase() ? 'W' : 'B';
                    let pieceType = char.toUpperCase();
                    
                    let piece = pieceType;
                    if (pieceType === 'P') {
                        piece = `P${fileIndex + 1}`;
                    } else if (pieceType === 'R') {
                        piece = fileIndex < 4 ? 'R1' : 'R2';
                    } else if (pieceType === 'N') {
                        piece = fileIndex < 4 ? 'N1' : 'N2';
                    } else if (pieceType === 'B') {
                        piece = fileIndex < 4 ? 'B1' : 'B2';
                    }
                    
                    newTrackPiecesFromPos[square] = {
                        player: player,
                        piece: piece
                    };
                    
                    fileIndex++;
                }
            }
        }
        return newTrackPiecesFromPos;
    };
    const applyFEN = (fenString) => {
        trackPiecesFromPos.value = parseFEN(fenString);
        movesArr.value = [];
        currentMoveNo.value = 1;
        currentPlayer.value = fenString.split(" ")[1].toUpperCase();
        capturedPieces.value = [];
    };

    const boardToFEN = () => {
  // Board coordinates in chess order (a-file left, rank-8 top)
        const filesArr = ['a','b','c','d','e','f','g','h'];

        const rankStrings = [];                // will collect eight rank substrings
        for (let rank = 8; rank >= 1; rank--) { // FEN goes 8-to-1
            let rankStr = '';
            let empty = 0;                       // counter for consecutive empty squares

            for (let f = 0; f < 8; f++) {
            const square = `${filesArr[f]}${rank}`;
            const squareInfo = trackPiecesFromPos.value[square];

            if (squareInfo) {                  // there is a piece on this square
                if (empty) {                     // flush any empty-square run
                rankStr += empty;
                empty = 0;
                }

                // First letter of internal piece ID → K,Q,R,B,N,P
                let pieceLetter = squareInfo.piece[0].toUpperCase();

                // Lowercase for Black pieces, uppercase for White
                if (squareInfo.player === 'B') pieceLetter = pieceLetter.toLowerCase();

                rankStr += pieceLetter;
            } else {                           // empty square
                empty++;
            }
            }
            if (empty) rankStr += empty;         // flush trailing empties
            rankStrings.push(rankStr);
        }

        // Piece-placement field (ranks joined by ‘/’)
        const placement = rankStrings.join('/');

        // Active colour:  w / b
        const sideToMove = currentPlayer.value === 'W' ? 'w' : 'b';

        // Castling rights, en-passant square, half-move clock, full-move number
        // -  Keep them at their “empty/default” values as requested
        const rest = '- - 0 ' + Math.ceil(currentMoveNo.value);

        // Full FEN
        return `${placement} ${sideToMove} ${rest}`;
    };

    const botMove = () => {
        if((ranks.value[0] === "a" && currentPlayer.value === "B") || (ranks.value[0] === "h" && currentPlayer.value === "W")) {
            let fetchPromise = fetch(`https://stockfish.online/api/s/v2.php?fen=${boardToFEN()}&depth=${level.value}`);
            fetchPromise.then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.json(); // or .text() if the API does not return JSON
            })
            .then(data => {
                let fromTo = data.bestmove.split(" ")[1]
                let newtrack = trackPiecesFromPos.value[`${fromTo[0]}${fromTo[1]}`];
                //delete trackPiecesFromPos.value[`${fromTo[0]}${fromTo[1]}`];
                //trackPiecesFromPos.value[`${fromTo[2]}${fromTo[3]}`] = newtrack;
                 if (boardFn.value && boardFn.value.changeVals) {
                    boardFn.value.changeVals(fromTo[0],fromTo[1]);
        boardFn.value.changeVals(fromTo[2],fromTo[3]);
        isLoading.value = false;
        hideToast();
    } else {
        console.warn("Board ref or method not ready");
    }
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        } 
    }
    
    let boardFn = ref();

const showToastConnect = () => {
        const toast = document.getElementById("connecttoast");
        toast.style.zIndex = 2;
        const toastObj = new bootstrap.Toast(toast, { autohide: false });
        toastObj.show();
    };

    const hideToastConnect = () => {
        const toast = document.getElementById("connecttoast");
        toast.style.zIndex = 0;
        const toastObj = new bootstrap.Toast(toast);
        toastObj.hide();
    }
    const showToastConnected = () => {
        const toast = document.getElementById("connectedtoast");
        toast.style.zIndex = 2;
        const toastObj = new bootstrap.Toast(toast, { autohide: false });
        toastObj.show();
    };

    const hideToastConnected = () => {
        const toast = document.getElementById("connectedtoast");
        toast.style.zIndex = 0;
        const toastObj = new bootstrap.Toast(toast);
        toastObj.hide();
    }

const showToast = () => {
        const toast = document.getElementById("gametoast");
        toast.style.zIndex = 2;
        const toastObj = new bootstrap.Toast(toast);
        toastObj.show();
    };

    const hideToast = () => {
        const toast = document.getElementById("gametoast");
        toast.style.zIndex = 0;
        const toastObj = new bootstrap.Toast(toast);
        toastObj.hide();
    }


window.addEventListener('beforeunload', (event) => {
    if(channel) {
        channel.presence.leave(); // Fire-and-forget (Ably will try to send it)
    }
});
</script>

<template>
    <div v-if="isLoading" class = "loading-overlay">
        <div class = "spinner-container">
  <div class="spinner-grow text-dark" role="status" style="width: 3rem; height: 3rem;">
    <span class="visually-hidden">Loading...</span>
  </div>
  </div>
</div>
    <Modal :route = "route" @root = "handleBot" @bot = "handleBot" @play = "handlePlay" @openings = "handleOpenings" @practice = "handlePractice"/>
    <div class = "row">
        <div class = "col-12 col-sm-6 p-1">
            <Board ref = "boardFn" :files = "files" :ranks = "ranks" :trackPiecesFromPos = "trackPiecesFromPos" :currentPlayer = "currentPlayer" @pieceMoved = "logAndUpdate" @pieceCaptured = "updateCapturedArr" :t1 = "t1" :isMobile = "isMobile" :fen = "boardToFEN()"/>
        </div>
        <div class = "col-12 col-sm-6 margin-top-desktop">
            <div v-if = "route.path != '/'">
                <div v-if = "isMobile">
                    <Clock v-if = "route.path === '/bot' || route.path === '/play' || route.path === '/'" :whiteRemTime = "whiteRemTime" :blackRemTime = "blackRemTime" :currentPlayer = "currentPlayer" :t1 = "t1"/>
                    <Fen v-else-if = "route.path === '/practice'" :fen = "boardToFEN()" :t1 = "t1"/>
                    <!--<Controls v-else :t1 = "t1"/>-->
                    <CapturedPieces :capturedPieces = "capturedPieces" player = "B"/>
                    <CapturedPieces :capturedPieces = "capturedPieces" player = "W"/>
                </div>
                <ScoreSheet v-if = "movesArr.length != 0" :currentMoveNo = "currentMoveNo" :movesArr = "movesArr"/>   
                <Settings v-else :movesArr = "movesArr" :route = "route" :t1 = "t1"/>
                <div v-if = "!isMobile">
                    <CapturedPieces :capturedPieces = "capturedPieces" player = "B"/>
                    <CapturedPieces :capturedPieces = "capturedPieces" player = "W"/>
                    <Clock v-if = "route.path === '/bot' || route.path === '/play'" :whiteRemTime = "whiteRemTime" :blackRemTime = "blackRemTime" :currentPlayer = "currentPlayer" :t1 = "t1"/>
                    <Fen v-else-if = "route.path === '/practice'" :fen = "boardToFEN()" :t1 = "t1"/>
                    <!--<Controls v-else :t1 = "t1"/>-->
                </div>
            </div>
            <div v-else>
                <div v-if = "isMobile"style = "width: 100%; height: 100%;">
                    <About :t1 = "t1" class = "p-1" style = "width: 100%; height: 100%;"/>
                </div>
                <div v-if = "!isMobile">
                    <About :t1 = "t1"/>
                </div>
            </div>
       
        </div>
    </div>
    <div class = "toast position-fixed bottom-0 end-0 bg-dark p-2" id = "gametoast">
        <div class = "toast-header bg-secondary">
            <strong class = "me-auto">
                Connecting Bot (Stockfish)
            </strong>
            <button type = "button" class = "btn-close" data-bs-dismiss = "toast"></button>
        </div>
    </div>
    <div class = "toast position-fixed bottom-0 end-0 bg-dark p-2" id = "connecttoast">
        <div class = "toast-header bg-secondary">
            <strong class = "me-auto">
                Waiting For Another Player To Join Room {{ roomNo }}
            </strong>
            <button type = "button" class = "btn-close" data-bs-dismiss = "toast"></button>
        </div>
    </div>
    <div class = "toast position-fixed bottom-0 end-0 bg-dark p-2" id = "connectedtoast">
        <div class = "toast-header bg-secondary">
            <strong class = "me-auto">
                Connected!
            </strong>
            <button type = "button" class = "btn-close" data-bs-dismiss = "toast"></button>
        </div>
    </div>
</template>

<style scoped>



    .capturedPieces {
        width: 40px;
    }
    .capturedPiecesForPlayer {
        height: 310px;
    }
    @media(min-width: 992px) {
        .margin-top-desktop {
            margin-top: 90px;
        }
    }
    @media(576px <= width <= 991px) {
        .margin-top-desktop {
            margin-top: 55px;
        }
    }
    .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* dimmed background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: all;
}

/* Separate container for spinner to avoid background dimming spinner itself */
.spinner-container {
  background: transparent; /* no dim on spinner itself */
  z-index: 10000; /* above overlay, if needed */
}

</style>