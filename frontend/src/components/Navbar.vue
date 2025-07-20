<script setup>
    import { ref, onMounted } from "vue";
    const props = defineProps({
        items: Array,
        t1: Object,
    })

    let navbar = ref(null);
    onMounted(() => {
        props.t1.fromTo(navbar.value, {
            opacity: 0,
            y: -100,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
        }, 0.5)
    })
</script>
<template>
    <nav class = "navbar navbar-expand-lg" ref = "navbar">   
        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class = "navbar-toggler-icon"></span>
        </button>
        <div class = "collapse navbar-collapse" id = navbarSupportedContent>
            <ul class = "navbar-nav">
                <li class = "nav-item fw-semibold" v-for = "item in props.items">
                    <RouterLink class = "nav-link" :to = "item.link" :class = "{activeBorder: item.active}">
                        <img :src = "`/images/${item.label}.svg`"/>
                        {{ item.label }}
                    </RouterLink>
                </li>
                <RouterLink to = "/" class = "nav-link">
                    <img :src = "`/images/favicon.svg`"/>
                </RouterLink>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
    .navbar {
        padding: 0px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        border: 2px solid black;
        z-index: 100;
        box-shadow: 0 0 10px black;
    }
    @media(max-width: 575px) {
        .navbar {
            margin-top: 10px;
            margin-bottom: 5px;
            width: 93vw;
        }
        img {
            height: 30px;
            width: 30px;
        }
    }
    @media(min-width: 576px) {
        .navbar {
            position: fixed;
            top: 10px;
            left: 50vw;
            width: 49vw;
        }
        img {
            height: 40px;
            width: 40px;
        }
    }
    ul { 
        list-style-type: none;
        padding: 0px;
    }
    .activeBorder {
        box-shadow: inset 0 0 10px black;
        border-radius: 10px;
    }
    .nav-link {
        position: relative;
        margin: 5px;
        border-radius: 15px;
        z-index: 1;
    }
    .nav-link:hover {
        color: white;
    }
    .nav-link::before {
        content: "";
        position: absolute;
        color: white;
        background-color: transparent;
        border-radius: 15px;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: all 0.5s linear;
        z-index: -1;
    }
    .nav-link:hover::before {
        background-color: black;
    }
    .nav-link:hover img {
    filter: invert(100%);
}
</style>
