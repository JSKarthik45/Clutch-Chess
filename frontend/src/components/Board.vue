<script setup>
    const emit = defineEmits(['pieceMoved', 'pieceCaptured']);
    import * as bootstrap from 'bootstrap';
    const emitfn = () => {
        emit("pieceMoved", toLoc.value.rank, toLoc.value.file, capturedStatus, fromLoc.value.rank, fromLoc.value.file);
    };

    const emitfn2 = (piece) => {
        emit("pieceCaptured", piece)
    }

    import { ref, onMounted } from "vue";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Square from "@/components/Square.vue";

    const changeVals = (rank, file) => {
        if (from) {
            setFromLoc(rank, file);
            checkValidityOfFromLoc(rank, file) ? highlightSquare(rank, file) : showToast();
        }
        else {
            if(checkValidityOfToLoc(rank, file)) {
                setToLoc(rank, file)
                movePiece();
                dehighlightSquare(rank, file);
                emitfn();
                resetFromAndTo();
                from = true;
            }
            else {
                dehighlightSquare(rank, file);
                clearValidMoveHighlights();
                setFromLoc(rank, file);
                checkValidityOfFromLoc(rank, file) ? highlightSquare(rank, file) : showToast();
            }
        }
    };
    defineExpose({ changeVals });


    const props = defineProps({
        files: Array, 
        ranks: Array,
        trackPiecesFromPos: Object,
        currentPlayer: String, 
        t1: Object,  
        isMobile: Boolean, 
        fen: String, 
    });

    import { Chess } from "chess.js";

    let prom = false;
    let promPiece = "Q";

    let from = true;
    let fromLoc = ref();
    let toLoc = ref();

    let tohighlight = ref();

    let capturedStatus = false;

    const resetFromAndTo = () => {
        fromLoc.value = undefined;
        toLoc.value = undefined;
        capturedStatus = false;
    };

    const highlightSquare = (rank, file) => {
        let ele = document.getElementById(`${rank}${file}`);
        ele.style.position = "relative";
        ele.style.zIndex = 2;
        ele.style.boxShadow = "0 0 100px rgb(0, 0, 0)";
        ele.style.opacity = 0.8;
        ele.style.transform = "scale(1.05)";
    };

    const dehighlightSquare = (rank, file) => {
        let ele = document.getElementById(`${fromLoc.value.rank}${fromLoc.value.file}`);
        ele.style.zIndex = "auto";
        ele.style.boxShadow = "none";
        ele.style.opacity = 1;
        ele.style.transform = "scale(1)";
    };
    let movess = [];
    const highlightValidMoves = () => {
    if (!fromLoc.value) return;
    
    const chess = new Chess(props.fen);
    const originSquare = `${fromLoc.value.rank}${fromLoc.value.file}`;
    if(kinghighlighted) {
        for(let i in getAllKingsPos()) {
            let kingsquare = document.getElementById(getAllKingsPos()[i]);
            kingsquare.querySelector('div').style.removeProperty('background-color');
            kinghighlighted = false;
        }
    }
    // Get all valid moves for the selected piece
    movess = chess.moves({ square: originSquare });
    movess.forEach(move => {
        if(move.slice(-1) === "+" || move.slice(-1) === "#") {
            move = move.slice(0, -1); // Remove check or checkmate indicator
        }
        const destSquare = move.slice(-2); // Get destination square
        const elem = document.getElementById(destSquare);
        if (elem && elem.querySelector('div')) {
            elem.querySelector('div').style.setProperty('background-color', 'rgba(70, 115, 140, 0.6)', 'important');
            elem.querySelector('div').style.boxShadow = "0 0 1px rgb(0, 0, 0)";
            elem.querySelector('div').style.zIndex = 100000000;
        }
    });
};
let kinghighlighted = false;
const getKingsPos = () => {
    for(let pos in props.trackPiecesFromPos) {
        if(props.trackPiecesFromPos[pos].piece === 'K' && props.trackPiecesFromPos[pos].player != props.currentPlayer) {
            kinghighlighted = true;
            return pos;
        }
    }
}
const getAllKingsPos = () => {
    let array = []
    for(let pos in props.trackPiecesFromPos) {
        if(props.trackPiecesFromPos[pos].piece === 'K') {
            array.push(pos);
        }
    }
    return array;
}

// Add function to clear valid move highlights
const clearValidMoveHighlights = (rank, file) => {
    movess.forEach(move => {
        if(move.slice(-1) === "+" || move.slice(-1) === "#") {
            move = move.slice(0, -1); // Remove check or checkmate indicator
            if(move.slice(-2) === `${rank}${file}`) {
                let kingsquare = document.getElementById(getKingsPos());
                if(kingsquare && kingsquare.querySelector('div')) {
                    kingsquare.querySelector('div').style.setProperty('background-color', 'rgb(179, 59, 46)', 'important');
                }
            }
        }
        const destSquare = move.slice(-2);
        const elem = document.getElementById(destSquare);
        if (elem && elem.querySelector('div')) {
            elem.querySelector('div').style.removeProperty('background-color');
            elem.querySelector('div').style.removeProperty('box-shadow');
            elem.querySelector('div').style.removeProperty('z-index');
        }
    });
};

    const setFromLoc = (rank, file) => {
        fromLoc.value = {rank: rank, file: file};
        from = false;
        highlightValidMoves();
    };
    
    const setToLoc = (rank, file) => {
    // Clear previous move highlighting
        if(tohighlight.value) {
            let prevFromElem = document.getElementById(`${tohighlight.value.fromRank}${tohighlight.value.fromFile}`);
            let prevToElem = document.getElementById(`${tohighlight.value.toRank}${tohighlight.value.toFile}`);
            
            if(prevFromElem && prevFromElem.querySelector('div')) {
                prevFromElem.querySelector('div').style.removeProperty('background-color');
            }
            if(prevToElem && prevToElem.querySelector('div')) {
                prevToElem.querySelector('div').style.removeProperty('background-color');
            }
        }
        toLoc.value = {rank: rank, file: file};
        
        // Store both from and to for highlighting
        tohighlight.value = {
            fromRank: fromLoc.value.rank,
            fromFile: fromLoc.value.file,
            toRank: rank,
            toFile: file
        };
        
        from = true;
        
        // Highlight both from and to squares with blue background
        let fromElem = document.getElementById(`${fromLoc.value.rank}${fromLoc.value.file}`);
        let toElem = document.getElementById(`${rank}${file}`);
        clearValidMoveHighlights(rank, file);
        if(fromElem && fromElem.querySelector('div')) {
            fromElem.querySelector('div').style.setProperty('background-color', 'rgb(70, 115, 140)', 'important');
        }
        if(toElem && toElem.querySelector('div')) {
            toElem.querySelector('div').style.setProperty('background-color', 'rgb(70, 115, 140)', 'important');
        }

        

    };

    const checkValidityOfFromLoc = (rank, file) => {
        let rf = `${rank}${file}`;
        if(!(rf in props.trackPiecesFromPos) || ((rf in props.trackPiecesFromPos) && (props.trackPiecesFromPos[rf].player != props.currentPlayer))) {
            fromLoc.value = undefined;
            from = true;
            return false;
        }
        return true;
    };

    let gameover = false;
    let possiblecheckmate = false;
    let win = "W";

    let chess = null;
    let moves = null;
    let p = null;
    let move = "";
    let toPos = "";
    let piece = "";
    const checkValidityOfToLoc = (rank, file) => {
    const rf = `${rank}${file}`;
    if (!fromLoc.value) return false;
    // Prevent moving to a square occupied by own piece
    if (rf in props.trackPiecesFromPos && props.trackPiecesFromPos[rf].player === props.currentPlayer) {
        return false;
    }
    for (const move of movess) {
        let moveStr = move;
        if(moveStr.slice(-1) === "+" || moveStr.slice(-1) === "#") {
            if(moveStr.slice(-1) === "#") {
                possiblecheckmate = true;
            }
            moveStr = moveStr.slice(0, -1); // Remove check or checkmate indicator
        }
        if(moveStr.slice(-2) === "=R" || moveStr.slice(-2) === "=N" || moveStr.slice(-2) === "=B" || moveStr.slice(-2) === "=Q") {
            moveStr = moveStr.slice(0, -2);
            prom = true;
            promPiece = "Q";
        }
        const destSquare = moveStr.slice(-2);
        if (destSquare === rf) {
            if(possiblecheckmate) {
                gameover = true;
                win = props.currentPlayer === 'W' ? 'White' : 'Black';
            }
            possiblecheckmate = false;
            if(prom == true) {
                const choice = window.prompt("Promote to (R, N, B, Q)", "Q").toUpperCase();
                if (["R", "N", "B"].includes(choice)) {
                    promPiece = choice;
                } else {
                    promPiece = "Q"; // default to Queen
                }
            }
            return true; // valid move found, return true early
        }
        prom = false;
  }
  return false;
};

    const movePiece = () => {
        let s = `${fromLoc.value.rank}${fromLoc.value.file}`;
        let piece = props.trackPiecesFromPos[s];
        let news = `${toLoc.value.rank}${toLoc.value.file}`;
        if(news in props.trackPiecesFromPos) {
            capturedStatus = true;
            emitfn2(props.trackPiecesFromPos[news]);
        }
        delete props.trackPiecesFromPos[s];
        props.trackPiecesFromPos[news] = piece;
        if(prom) {
            props.trackPiecesFromPos[news].piece = promPiece;
            prom = false;
        }
        if(gameover) {
            setTimeout(() => {
                alert(`Game Over! ${win} Wins!`);
            }, 1000);
            showToastGameOver();
            setTimeout(() => {
                window.location.reload();
            }, 1001);
        }
        gameover = false;
    }

    const showToast = () => {
        const toast = document.getElementById("toast");
        toast.style.zIndex = 2;
        const toastObj = new bootstrap.Toast(toast);
        toastObj.show();
    };
    const showToastGameOver = () => {
        const toast = document.getElementById("toastgameover");
        toast.style.zIndex = 2;
        const toastObj = new bootstrap.Toast(toast);
        toastObj.show();
    };
    
    import { useWindowSize } from '@vueuse/core'
    const { width, height } = useWindowSize()

    let board = ref(null)

    onMounted(() => {
        props.t1.restart();
        props.t1.fromTo(board.value, {
            scale: 0, 
        }, {
            scale: 1, 
            duration: 1,
            ease: "power1.out",
        }, 0
        )
    })

</script>

<template>
    <div class = "container-fluid" ref = "board">
        <div v-if = "width > 992" class = "row">
            <div class = "col-1 filerankintersection"></div>
            <div class = "col rank center" v-for = "rank in ranks">
                {{ rank }}
            </div>
            <div class = "col-1 filerankintersection"></div>
        </div>
        <div v-for = "file in files" class = "row">
            <div v-if = "width > 992" class = "col-1 file center">
                {{file}}
            </div>
            <div v-for = "rank in ranks" class = "col p-0 square" :id = "`${rank}${file}`">
                <Square :rank = "rank" :file = "file" :piece = "trackPiecesFromPos[`${rank}${file}`]" @clicked = "changeVals" :t1 = "t1" :isMobile = "isMobile"/>
            </div>
            <div v-if = "width > 992" class = "col-1 file center">
                {{file}}
            </div>
        </div>
        <div v-if = "width > 992" class = "row">
            <div class = "col-1 filerankintersection"></div>
            <div class = "col rank center" v-for = "rank in ranks">
                {{ rank }}
            </div>
            <div class = "col-1 filerankintersection"></div>
        </div>
    </div>
    <div class = "toast position-fixed bottom-0 end-0 bg-dark p-2" id = "toast">
        <div class = "toast-header bg-secondary">
            <strong class = "me-auto">
                Invalid Move!
            </strong>
            <button type = "button" class = "btn-close" data-bs-dismiss = "toast"></button>
        </div>
    </div><div class = "toast position-fixed bottom-0 end-0 bg-dark p-2" id = "toastgameover">
        <div class = "toast-header bg-secondary">
            <strong class = "me-auto">
            Game Over!
            </strong>
            <button type = "button" class = "btn-close" data-bs-dismiss = "toast"></button>
        </div>
    </div>
</template>

<style scoped>
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media(max-width: 575px) {
        .square {
            height: 6.5vh;
        }
    }
    @media(min-width: 576px) {
        .rank {
            width: 10vw;
            height: 3vh;
        }
        .file {
            width: 2vw;
            height: 11.5vh;
        }
        .square {
            width: 10vw;
            height: 11.5vh;
        }
        .filerankintersection {
            width: 2vw;
            height: 3vh;
        }
    }
</style>