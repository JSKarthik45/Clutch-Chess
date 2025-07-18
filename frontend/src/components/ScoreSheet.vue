<script setup>
    const props = defineProps({
        currentMoveNo: Number,
        movesArr: Array,
    });
</script>

<template>
    <div class = "container-fluid">
        <h5 class = "text-center">
            {{ Math.floor(currentMoveNo) - 1 }} Moves
        </h5>
        <div style = "height: 370px; overflow-y: auto;">
            <table id = "logMoves" class = "table table-striped table-bordered table-hover text-center">
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