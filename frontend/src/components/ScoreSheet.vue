<script setup>
    const props = defineProps({
        currentMoveNo: Number,
        movesArr: Array,
    });
</script>

<template>
    <div class = "container-fluid">
        <div class = "text-start">
            No. Of Moves: {{ Math.floor(currentMoveNo) - 1 }}
        </div>
        <div style = "height: 300px; overflow-y: auto;">
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
                    <td>
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

</style>