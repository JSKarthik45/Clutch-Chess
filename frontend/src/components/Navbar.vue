<script setup>
    import { ref, onMounted, computed, watch } from "vue";
    import { useRoute } from 'vue-router'

    const props = defineProps({
        items: Array,
        t1: Object,
        isNavOpen: Boolean,
    })

    let navbar = ref(null);

    onMounted(() => {
        props.t1.restart();
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

    const route = useRoute()
    const root = document.documentElement
    const appnav = ref(false)

    function applyLayout(isApp) {
        if (isApp) {
            root.style.setProperty('--left', '50vw')
            root.style.setProperty('--width', '49vw')
        } else {
            root.style.setProperty('--left', '2vw')
            root.style.setProperty('--width', '96vw')
        }
        appnav.value = isApp
    }

    function isAppPath(p){
        return p.startsWith('/app') || p === '/bot' || p === '/play' || p === '/practice' || p === '/clock'
    }

    // initialize based on current path
    applyLayout(isAppPath(route.path))

    // update when route changes
    watch(() => route.path, (p) => {
        applyLayout(isAppPath(p))
    })

    // Add computed for boxShadow
    const boxShadow = computed(() => {
        return appnav.value
            ? "0 0 10px black"
            : "0 10px 15px rgb(115, 149, 82), 0 10px 30px 0 rgb(235, 236, 208)";
    });
</script>
<template>
    <div v-if="appnav">
        <nav class="navbar navbar-expand-sm" ref="navbar" :style="{ boxShadow: boxShadow }">   
            <button class="navbar-toggler border-0 shadow-none w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <div class = "mt-1">
                    <RouterLink class = "" to = "/" style = "text-decoration: none;">
                        <img :src = "`/images/ClutChess.svg`" style = "width: 30px; height: 30px;" class = "mb-1"/>
                        <h2 style = "display: inline; color: black;">
                            Clutch Chess
                        </h2>
                    </RouterLink>
                    <span class = "navbar-toggler-icon mb-1" style = "width: 30px; height: 30px;"></span>
                </div>    
            </button>
            <div :class="['collapse', 'navbar-collapse', { show: props.isNavOpen }]" id="navbarSupportedContent">
                <ul class = "navbar-nav">
                    <li class = "nav-item fw-semibold" v-for = "item in props.items">
                        <RouterLink class = "nav-link" :to = "item.link" :class = "{activeBorder: item.active}">
                            <img :src = "`/images/${item.label}.svg`"/>
                            {{ item.label }}
                        </RouterLink>
                    </li>
                    <div class="center">
                        <RouterLink to="/" class="desktop-logo d-none d-sm-flex align-items-center nav-link">
                            <img src="/images/ClutChess.svg" alt="ClutChess Logo" style="height:40px; width:40px;" />
                        </RouterLink>
                    </div>
                </ul>
            </div>
        </nav>
    </div>
    <div v-else>
        <nav class="navbar navbar-expand-md" ref="navbar" :style="{ boxShadow: boxShadow }">   
            <button class="navbar-toggler border-0 shadow-none w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <div class = "mt-1">
                    <RouterLink class = "" to = "/" style = "text-decoration: none;">
                        <img :src = "`/images/ClutChess.svg`" style = "width: 30px; height: 30px;" class = "mb-1"/>
                        <h2 style = "display: inline; color: black;">
                            Clutch Chess
                        </h2>
                    </RouterLink>
                    <span class = "navbar-toggler-icon mb-1" style = "width: 30px; height: 30px;"></span>
                </div>      
            </button>
            <div :class="['collapse', 'navbar-collapse', { show: props.isNavOpen }]" id="navbarSupportedContent">
                <ul class = "navbar-nav center">
                    <RouterLink to="/" class="desktop-logo d-none d-sm-flex align-items-center nav-link">
                        <img src="/images/ClutChess.svg" alt="ClutChess Logo" style="height:35px; width:35px;"/>
                        &nbsp;
                        <div class = "center mt-2">
                            <h3 style = "display: inline; font-weight: 700;">
                                Clutch Chess
                            </h3>
                        </div>
                    </RouterLink>
                    <li class = "nav-item fw-semibold" v-for = "item in props.items">
                        <a href="/app" v-if="item.label === 'App'" class = "nav-link">
                            <img :src = "`/images/${item.label}.svg`"/>
                            {{ item.label }}
                        </a>
                        <RouterLink v-else class = "nav-link" :to = "item.link" :class = "{activeBorder: item.active}">
                            <img :src = "`/images/${item.label}.svg`"/>
                            {{ item.label }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style scoped>
@media(min-width: 576px) {
  .desktop-logo {
    display: flex !important;
  }
}

@media(max-width: 575px) {
}
    .navbar {
        padding: 0px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(8px);
        border: 1px solid black;
        z-index: 10000;
        /* box-shadow is now set dynamically */
        pointer-events: auto;
    }
    @media(max-width: 575px) {
        .navbar {
            width: auto;
            border-radius: 0px;
            margin-bottom: 5px;
        }
        img {
            height: 30px;
            width: 30px;
        }
        .navbar-nav {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap;   /* Allow wrapping to next line on overflow */
    column-gap: 10px;
  }
  .nav-item {
    flex: 0 1 auto;  /* Allow items to shrink if needed */
  }
  .nav-link {
    /* add these lines or override */
    display: flex;
    align-items: center;
    padding: 3px 12px;
  }
    }
    @media(min-width: 576px) {
        .navbar {
            position: fixed;
            top: 15px;
        }
        img {
            height: 40px;
            width: 40px;
        }
        .navbar-nav{
            margin-left: auto;
            margin-right: auto;
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
