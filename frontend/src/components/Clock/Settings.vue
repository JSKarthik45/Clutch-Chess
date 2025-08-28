<script setup>
    const emit = defineEmits(["clicked", "timeChanged", "incChanged"]);

    const emitFn1 = (event) => {
        emit("timeChanged", event.target.value);
    };
    const emitFn2 = (event) => {
        emit("incChanged", event.target.value);
    };
    import {ref, onMounted} from "vue";
    const props = defineProps({
        time: Number, 
        inc: Number, 
        t1: Object, 
    });
    let settings = ref(null);
    onMounted(() => {
        props.t1.fromTo(settings.value, {
            opacity: 0,
            y: -100,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
        }, 1)
    })
</script>

<template>
    <div class = "media" ref = "settings">
        <div class = "row">
            <div class="col center">
                <div>
                    <strong class = "form-label mx-1">
                        Time (In Minutes)
                    </strong>
                    <input type = "number" class = "form-control form-control-sm" :value = "time" @change = "emitFn1"/>
                </div>
            </div>
            <div class="col center">
                <div>
                    <strong class = "form-label mx-1">
                        Increment (In Seconds)
                    </strong>
                    <input type = "number" class = "form-control form-control-sm" :value = "inc" @change = "emitFn2"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .media {
        box-shadow: 0 0 2px black;
    }
    @media (max-width: 575px) { /* Phone */
        .media {
            border-radius: 10px;
            margin-bottom: 10px;
            height: 90px;
        }
        .col {
            margin: 0px 10px;
        }
    }
    @media (min-width: 576px) { /* Desktop */
        .media {
            margin-top: 15px;
            border-radius: 15px;
            height: 65px;
        }
        .col {
            margin: 0px 50px;
        }
    }
    .btn {
        width: 100%;
        border-radius: 200px;
    }
</style>