<script setup>
    const props = defineProps({
        currentMoveNo: Number,
        movesArr: Array,
    });
</script>

<template>
    <div class = "container-fluid text-center" style = "height: 62vh;">
        <div style = "height: 61vh; margin-top: 10px; overflow-y: auto;" class = "scroll" ref = "scoresheet">
            <table style = "table-layout: fixed;" v-if = "movesArr.length != 0" id = "logMoves" class = "table table-striped table-bordered table-hover text-center">
                <colgroup>
                    <col>
                    <col>
                    <col>
                </colgroup>
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
    /* Default desktop widths */
#logMoves col:nth-child(1) {
  width: 14%;
}
#logMoves col:nth-child(2),
#logMoves col:nth-child(3) {
  width: 43%;
}

/* Mobile widths */
@media (max-width: 575px) {
  #logMoves col:nth-child(1) {
    width: 30%;
  }
  #logMoves col:nth-child(2),
  #logMoves col:nth-child(3) {
    width: 35%;
  }
}
</style>