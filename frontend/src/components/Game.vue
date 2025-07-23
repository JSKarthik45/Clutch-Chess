<script setup>
    import {ref, watch} from "vue";
    import {useRoute} from "vue-router";
    import 'bootstrap/dist/css/bootstrap.min.css';

    import Board from "@/components/Board.vue";
    import Clock from "@/components/Clock.vue"; 
    import ScoreSheet from "@/components/ScoreSheet.vue";
    import CapturedPieces from "@/components/CapturedPieces.vue";
    import Controls from "@/components/Controls.vue";
    import Modal from "@/components/Modal.vue";
    import Settings from "@/components/Settings.vue";

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

    let movesArr = ref([]);
    const logAndUpdate = (rank, file, capturedStatus, fromRankForPawn) => {
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
            blackTimer();
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
            whiteTimer();
        }
        currentMoveNo.value += 0.5;
        if(route.path === "/bot") {
            //botMove();
        }
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

    const isMobile = ref(window.innerWidth < 800) // Set breakpoint as needed

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
        whiteRemTime.value = obj.time;
        blackRemTime.value = obj.time;
        increment.value = obj.increment;
        if(ranks.value[0] === "a" && obj.colour === "B") {
            flip();
        }
        if(ranks.value[0] === "h" && obj.colour === "W") {
            flip();
        }
    };

    let roomNo = ref();
    const handlePlay = (obj) => {
        whiteRemTime.value = obj.time;
        blackRemTime.value = obj.time;
        increment.value = obj.increment;
        if(ranks.value[0] === "a" && obj.colour === "B") {
            flip();
        }
        if(ranks.value[0] === "h" && obj.colour === "W") {
            flip();
        }
        roomNo.value = obj.roomNo;
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

    /*const botMove = () => {
        if((ranks.value[0] === "a" && currentPlayer.value === "B") || (ranks.value[0] === "h" && currentPlayer.value === "W")) {
            fetch(`https://stockfish.online/api/s/v2.php?fen=${boardToFEN()}&depth=10`)
            .then(response => {
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
    } else {
        console.warn("Board ref or method not ready");
    }
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        } 
    }*/
    
    let boardFn = ref();
        const callChangeVals = (...args) => {
  if (boardFn.value && boardFn.value.changeVals) {
    boardFn.value.changeVals(...args);
  } else {
    console.warn('boardFn or changeVals not ready');
  }
};
</script>

<template>
    <Modal :route = "route" @root = "handleBot" @bot = "handleBot" @play = "handlePlay" @openings = "handleOpenings" @practice = "handlePractice"/>
    <div class = "row">
        <div class = "col-12 col-sm-6 p-1">
            <Board ref = "boardFn" :files = "files" :ranks = "ranks" :trackPiecesFromPos = "trackPiecesFromPos" :currentPlayer = "currentPlayer" @pieceMoved = "logAndUpdate" @pieceCaptured = "updateCapturedArr" :t1 = "t1"/>
        </div>
        <div class = "col-12 col-sm-6 margin-top-desktop">
            <div v-if = "isMobile">
                <Clock v-if = "route.path === '/bot' || route.path === '/play' || route.path === '/'" :whiteRemTime = "whiteRemTime" :blackRemTime = "blackRemTime" :currentPlayer = "currentPlayer" :t1 = "t1"/>
                <div v-else-if = "route.path === '/practice'" class = "fen center">
                    <h5>
                        Current FEN: 
                        <input type = "text" :value = "boardToFEN()" disabled/>
                    </h5>
                </div>
                <Controls v-else :t1 = "t1"/> 
                <CapturedPieces :capturedPieces = "capturedPieces" player = "B"/>
                <CapturedPieces :capturedPieces = "capturedPieces" player = "W"/>
            </div>
            <ScoreSheet v-if = "movesArr.length != 0" :currentMoveNo = "currentMoveNo" :movesArr = "movesArr"/>   
            <Settings v-else :movesArr = "movesArr" :route = "route" :t1 = "t1"/>
            <div v-if = "!isMobile">
                <CapturedPieces :capturedPieces = "capturedPieces" player = "B"/>
                <CapturedPieces :capturedPieces = "capturedPieces" player = "W"/>
                <Clock v-if = "route.path === '/bot' || route.path === '/play' || route.path === '/'" :whiteRemTime = "whiteRemTime" :blackRemTime = "blackRemTime" :currentPlayer = "currentPlayer" :t1 = "t1"/>
                <div v-else-if = "route.path === '/practice'" class = "fen center">
                    <h5>
                        Current FEN: 
                        <input type = "text" :value = "boardToFEN()" disabled/>
                    </h5>
                </div>
                <Controls v-else :t1 = "t1"/> 
            </div>
       
        </div>
    </div>
</template>

<style scoped>
     @media(max-width: 575px) {
        .fen {
            height: 50px;
            width: 88vw;
        }
    }
    @media (min-width: 576px) {
        .fen {
            height: 70px;
            width: 45vw;
        }
    }



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
</style>