<script setup>

    import Time from "@/components/Clock/Time.vue";

    const emit = defineEmits(["changePlayer"]);

    const props = defineProps({
        isCurrentPlayerWhite: Boolean, 
        whiteRemTime: Number, 
        blackRemTime: Number, 
        t1: Object, 
    });

    const emitFn = () => {
        emit('changePlayer', props.isCurrentPlayerWhite);
    }

    import { ref, onMounted } from "vue";

    let clock = ref(null);

    onMounted(() => {
        props.t1.restart();
        props.t1.fromTo(clock.value, {
            scale: 0, 
        }, {
            scale: 1, 
            duration: 1, 
            ease: "power1.out",
        }, 0)
    });

</script>

<template>
    <div class="center" ref = "clock">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 clock-container center" id = "clock">
            <div class="col time-col">
                <Time player = "White" :active = "isCurrentPlayerWhite" :time = "whiteRemTime" id = "White Time" @clicked = "emitFn"/>
            </div>
            <div class="col controls-col center">
                <slot/>
            </div>
            <div class="col time-col">
                <Time player = "Black" :active = "!isCurrentPlayerWhite" :time = "blackRemTime" id = "Black Time" @clicked = "emitFn"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
    .clock-container {
        width: 98%;
        box-shadow: 0px 0px 5px black;
        transition: all 0.3s ease;
    }
    @media(max-width: 991px) { /* phone */
        .clock-container {
            margin: 10px;
            padding: 10px 2px;
            border-radius: 50px;
        }
        .controls-col {
            height: 80px;
        }
        #clock:fullscreen {
            background-color: white;
            box-shadow: inset 0 0 10px black;
        }
    }
    @media(min-width: 992px) { /* desktop */
        .clock-container {
            margin: 10px 0px;
            padding: 10px;
            border-radius: 100px;
        }
        .time-col {
            width: 47%;
        }
        .controls-col {
            width: 6%;
            height: 300px;
        }
        
        #clock:fullscreen {
            color: white;
        }
    }
</style>