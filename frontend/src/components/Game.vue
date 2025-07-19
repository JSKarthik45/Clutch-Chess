<script setup>
    import {ref} from "vue";
    import {useRoute} from "vue-router";
    import 'bootstrap/dist/css/bootstrap.min.css';

    import Board from "@/components/Board.vue";
    import Clock from "@/components/Clock.vue"; 
    import ScoreSheet from "@/components/ScoreSheet.vue";
    import CapturedPieces from "@/components/CapturedPieces.vue";
    import Controls from "@/components/Controls.vue";

    const ranks = ref(["a", "b", "c", "d", "e", "f", "g", "h"]);
    const files = ref([8, 7, 6, 5, 4, 3, 2, 1]);

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
            blackTimer();
        }
        else {
            movesArr.value[movesArr.value.length - 1].B = move;
            currentPlayer.value = "W";
            whiteTimer();
        }
        currentMoveNo.value += 0.5;
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

</script>

<template>
    <div class = "row">
        <div class = "col-12 col-sm-6 p-1">
            <Board :files = "files" :ranks = "ranks" :trackPiecesFromPos = "trackPiecesFromPos" :currentPlayer = "currentPlayer" @pieceMoved = "logAndUpdate" @pieceCaptured = "updateCapturedArr"/>
        </div>
        <div class = "col-12 col-sm-6 margin-top-desktop">
            <ScoreSheet :currentMoveNo = "currentMoveNo" :movesArr = "movesArr" :route = "route"/>   
            <CapturedPieces :capturedPieces = "capturedPieces" player = "B"/>
            <CapturedPieces :capturedPieces = "capturedPieces" player = "W"/>
            <Clock v-if = "route.path === '/bot' || route.path === '/play' || route.path === '/'" :whiteRemTime = "whiteRemTime" :blackRemTime = "blackRemTime" :currentPlayer = "currentPlayer"/>
            <Controls v-else/>        
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
            margin-top: 50px;
        }
    }
</style>