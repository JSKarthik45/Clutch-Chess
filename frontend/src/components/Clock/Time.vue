<script setup>

    const emit = defineEmits(["clicked"]);

    const props = defineProps({
        player: String, 
        active: Boolean, 
        time: Number, 
    });

    /*let startTime = new Date(Date.now());
    onUpdated(() => {
        startTime = new Date(Date.now());
        console.log(startTime, "starttime")
    });

    const emitFn = () => {
        let endTime = new Date(Date.now());
        console.log(endTime, "endtime")
        console.log((endTime - startTime) / 1000, "diff");
        emit('clicked', (endTime - startTime) / 1000)
    }*/
    const emitFn = () => {
        emit('clicked');
    };

    const formatTime = (time) => {
        let mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        let secsby2 = Math.floor((time % 1) * 100);
        if(mins == 0) {
            return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${secsby2.toString().padStart(2, "0")}`;
        } 
        else {
            return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        
    };

</script>

<template>
    <div class = "time-container no-select" :class = "[ active ? 'btn' : '', 
                                                        player === 'White' ? 'rotated' : '', 
                                                        active && player === 'White' ? 'leftboxshadow colour1' : '', 
                                                        active && player === 'Black' ? 'rightboxshadow colour2' : '', 
                                                        ]" 
                                                        v-on="active ? { click: emitFn } : {}">
        <h3 class = "text-center" style = "height: 10%;">
            {{ player }}
        </h3>
        <h1 class = "center" style = "height: 90%;">
            {{ formatTime(time) }}
        </h1>
    </div>
</template>

<style scoped>

    @media(max-width: 991px) { /* phone */
        .rotated {
            transform: rotate(180deg);
        }
        h1 {
            font-size: 4rem;
        }
        .leftboxshadow {
            box-shadow: 0 2px 10px black;
        }
        .rightboxshadow {
            box-shadow: 0 2px 10px black;
        }
        .time-container {
            border-radius: 50px;
            height: 34vh;
        }
    }
    @media(min-width: 992px) { /* desktop */
        h1 {
            font-size: 6rem;
            font-weight: bold;
        }
        .leftboxshadow {
            box-shadow: -2px 0 10px black;
        }
        .rightboxshadow {
            box-shadow: 2px 0 10px black;
        }
        .time-container {
            border-radius: 100px;
            /*height: 70vh;*/
            height: 79vh;
        };
    }
    .no-select {
        user-select: none;
    }
    
    .time-container {
        width: 100%;
        transition: all 0.3s ease;
    }
    .colour1 {
        background-color: rgb(235, 236, 208);
        /*background-color: rgb(240, 211, 179);*/
        transition: background-color 1s ease-out;
    }
    .colour2 {
        background-color: rgb(115, 149, 82);
        /*background-color: rgb(190, 100, 48);*/
        transition: background-color 1s ease-out;
    }

    .colour1:hover {
        background-color: rgb(201, 202, 164);
    }
    .colour2:hover {
        background-color: rgb(92, 122, 61);
    }
</style>