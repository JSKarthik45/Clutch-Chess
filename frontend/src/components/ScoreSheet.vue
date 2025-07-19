<script setup>
    const props = defineProps({
        currentMoveNo: Number,
        movesArr: Array,
        route: Object,
    });
</script>

<template>
    <div class = "container-fluid text-center">
        <h5 v-if = "movesArr.length != 0" class = "text-center">
            {{ Math.floor(currentMoveNo) - 1 }} Moves
        </h5>
        <button v-else-if = "route.path === '/bot' || route.path === '/'" class = "text-center button-effect">
            Game Settings <img src = "/images/edit.svg"/>
        </button>
        <button v-else-if = "route.path === '/play'" class = "text-center button-effect">
            Game Settings <img src = "/images/edit.svg"/>
        </button>
        <button v-else-if = "route.path === '/openings'" class = "text-center button-effect">
            Select Opening <img src = "/images/edit.svg"/>
        </button>
        <input type = "text" v-else-if = "route.path === '/practice'" class = "text-center" placeholder = "FEN">
        <div style = "height: 370px; overflow-y: auto;">
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