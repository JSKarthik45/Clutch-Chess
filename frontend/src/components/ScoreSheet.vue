<script setup>
    const props = defineProps({
        currentMoveNo: Number,
        movesArr: Array,
        route: Object,
        t1: Object, 
    });
    import Modal from "@/components/Modal.vue";
    import {ref, onMounted} from "vue";

    let settings = ref(null);
    onMounted(() => {
        props.t1.fromTo(settings.value, {
            y: -200, 
        }, {
            y: 0, 
            duration: 2, 
            ease: "bounce",
        }, 0.5)
    });
</script>

<template>
    <Modal title = "Game Settings" id = "botsettings">
        <div class = "text-center">
            <h5 class = "d-inline">
                Colour
            </h5>
            &nbsp;
            <div class = "d-inline">
                <input type = "radio" name = "colour" id = "colour1" class = "form-check-input" checked>
                <label for = "colour1" class = "form-check-label ms-1">
                    White
                </label>
                &nbsp;
                <input type = "radio" name = "colour" id = "colour2" class = "form-check-input">
                <label for = "colour2" class = "form-check-label ms-1">
                    Black
                </label>
            </div>
        </div>
        <br/>
        <div class = "text-center">
            <h5 class = "d-inline">
                Time 
            </h5>
            <input type = "number" placeholder = "In Minutes"/>
        </div>
        <br/>
        <div class = "text-center">
            <h5 class = "d-inline">
                Increment
            </h5>
            <input type = "number" placeholder = "In Seconds"/>
        </div>
    </Modal>
    <Modal title = "Game Settings" id = "playsettings">
        <div class = "text-center">
            <h5 class = "d-inline">
                Colour
            </h5>
            &nbsp;
            <div class = "d-inline">
                <input type = "radio" name = "playcolour" id = "playcolour1" class = "form-check-input" checked>
                <label for = "playcolour1" class = "form-check-label ms-1">
                    White
                </label>
                &nbsp;
                <input type = "radio" name = "playcolour" id = "playcolour2" class = "form-check-input">
                <label for = "playcolour2" class = "form-check-label ms-1">
                    Black
                </label>
            </div>
        </div>
        <br/>
        <div class = "text-center">
            <h5 class = "d-inline">
                Time 
            </h5>
            <input type = "number" placeholder = "In Minutes"/>
        </div>
        <br/>
        <div class = "text-center">
            <h5 class = "d-inline">
                Increment
            </h5>
            <input type = "number" placeholder = "In Seconds"/>
        </div>
        <br/>
        <div class = "text-center">
            <h5 class = "d-inline">
                Room No.
            </h5>
            <input type = "number"/>
        </div>
    </Modal>
    <Modal title = "Select Opening" id = "selectopening">

    </Modal>
    <Modal title = "FEN" id = "fen">
        <div class = "text-center">
            <h5 class = "d-inline">
                Enter FEN
            </h5>
            <input type = "text"/>
        </div>
        <br/>
        <div class = "text-center">
            <h5 class = "d-inline">
                Current FEN
            </h5>
            <input type = "text"/>
        </div>
    </Modal>
    <div class = "container-fluid text-center">
        <div ref = "settings">
            <h5 v-if = "movesArr.length != 0" class = "text-center">
                {{ Math.floor(currentMoveNo) - 1 }} Moves
            </h5>
            <button v-else-if = "route.path === '/bot' || route.path === '/'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#botsettings">
                Game Settings <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "route.path === '/play'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#playsettings">
                Game Settings <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "route.path === '/openings'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#selectopening">
                Select Opening <img src = "/images/edit.svg"/>
            </button>
            <button v-else-if = "route.path === '/practice'" class = "text-center button-effect" data-bs-toggle = "modal" data-bs-target = "#fen">
                FEN <img src = "/images/edit.svg"/>
            </button>
        </div>
        <div style = "height: 370px; overflow-y: auto;" class = "scroll" ref = "scoresheet">
            <table v-if = "movesArr.length != 0" id = "logMoves" class = "table table-striped table-bordered table-hover text-center">
                <thead>
                    <tr>
                        <th>
                            Move
                        </th>
                        <th>
                            White
                        </th>
                        <th>
                            Black
                        </th>
                    </tr>
                </thead>
                <tr v-for = "(move, index) in movesArr">
                    <td class = "colour2">
                        {{ index + 1 }}
                    </td>
                    <td class = "colour1">
                        {{ move.W }}
                    </td>
                    <td class = "colour2">
                        {{ move.B }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
    thead th {
        position: sticky;
        top: 0;
        background: #f1f1f1;
        z-index: 1;
    }
</style>