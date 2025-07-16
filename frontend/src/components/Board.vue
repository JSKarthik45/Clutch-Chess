<script setup>
    const emit = defineEmits(['pieceMoved', 'pieceCaptured']);
    import * as bootstrap from 'bootstrap';
    const emitfn = () => {
        emit("pieceMoved", toLoc.value.rank, toLoc.value.file, capturedStatus, fromLoc.value.rank);
    };

    const emitfn2 = (piece) => {
        emit("pieceCaptured", piece)
    }

    import { ref } from "vue";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Square from "@/components/Square.vue";

    const props = defineProps({
        files: Array, 
        ranks: Array,
        trackPiecesFromPos: Object,
        currentPlayer: String, 
    });

    let from = true;
    let fromLoc = ref();
    let toLoc = ref();

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
        ele.style.boxShadow = "0 0 5px rgb(0, 0, 0)";
    };

    const dehighlightSquare = (rank, file) => {
        let ele = document.getElementById(`${fromLoc.value.rank}${fromLoc.value.file}`);
        ele.style.zIndex = "auto";
        ele.style.boxShadow = "none";
    };
    
    const setFromLoc = (rank, file) => {
        fromLoc.value = {rank: rank, file: file};
        from = false;
    };

    const setToLoc = (rank, file) => {
        toLoc.value = {rank: rank, file: file};
        from = true;
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
    }

    const showToast = () => {
        const toast = document.getElementById("toast");
        const toastObj = new bootstrap.Toast(toast);
        toastObj.show();
    };

    const changeVals = (rank, file) => {
        if (from) {
            setFromLoc(rank, file);
            checkValidityOfFromLoc(rank, file) ? highlightSquare(rank, file) : showToast();
        }
        else {
            setToLoc(rank, file)
            movePiece();
            dehighlightSquare();
            emitfn();
            resetFromAndTo();
        }
    };
</script>

<template>
    <div class = "container-fluid" style = "padding-right: 0px;">
        <div class = "row">
            <div class = "col-1 filerankintersection"></div>
            <div class = "col rank center" style = "height: 20px; width: 70px;" v-for = "rank in ranks">
                {{ rank }}
            </div>
            <div class = "col-1 filerankintersection"></div>
        </div>
        <div v-for = "file in files" class = "row">
            <div class = "col-1 center file">
                {{file}}
            </div>
            <div v-for = "rank in ranks" class = "col p-0 square " :id = "`${rank}${file}`">
                <Square :rank = "rank" :file = "file" :piece = "trackPiecesFromPos[`${rank}${file}`]" @clicked = "changeVals"/>
            </div>
            <div class = "col-1 center file">
                {{file}}
            </div>
        </div>
        <div class = "row">
            <div class = "col-1 filerankintersection"></div>
            <div class = "col rank center" v-for = "rank in ranks">
                {{ rank }}
            </div>
            <div class = "col-1 filerankintersection"></div>
        </div>
    </div>
    <div class = "toast position-fixed bottom-0 end-0 bg-secondary p-2" id = "toast">
        <div class = "toast-header">
            <strong class = "me-auto">
                Invalid Move!
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
    .rank {
        width: 60px;
        height: 20px;
    }
    .file {
        width: 20px;
        height: 73px;
    }
    .filerankintersection {
        width: 20px;
        height: 20px;
    }
    .square {
        width: 70px;
        height: 73px;
    }
</style>