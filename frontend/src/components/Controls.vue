<script setup>

</script>

<template>
    <div class = "container-fluid">
        <div class = "row controls gx-2 border rounded-5 my-2 p-2">
            <div class = "col center rounded-5 controls-effect" style = "padding-top: 3px;">
                <img src = "/images/fastbackward.svg">
            </div>
            <div class = "col center rounded-5 controls-effect" style = "padding-top: 3px;">
                <img src = "/images/backward.svg">
            </div>
            <div class = "col center rounded-5 controls-effect" style = "padding-top: 3px;">
                <img src = "/images/forward.svg">
            </div>
            <div class = "col center rounded-5 controls-effect" style = "padding-top: 3px;">
                <img src = "/images/fastforward.svg">
            </div>
        </div>
    </div>
</template>

<style scoped>
    @media(max-width: 575px) {
        .controls {
            height: 50px;
            width: 88vw;
        }
        img {
            height: 20px;
            width: 20px;
        }
    }
    @media (min-width: 576px) {
        .controls {
            height: 70px;
            width: 45vw;
        }
        img {
            height: 30px;
            width: 30px;
        }
    }
    .controls-effect {
        position: relative;
        margin: 5px;
        border-radius: 15px;
        z-index: 1;
    }
    .controls-effect:hover {
        color: white;
    }
    .controls-effect::before {
        content: "";
        position: absolute;
        color: white;
        background-color: transparent;
        border-radius: 10px;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: all 0.5s linear;
        z-index: -1;
    }
    .controls-effect:hover::before {
        background-color: black;
    }
    .controls-effect:hover img {
    filter: invert(100%);
    }
</style>