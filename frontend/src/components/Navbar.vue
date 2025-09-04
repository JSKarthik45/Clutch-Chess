<script setup>
    import { ref, onMounted } from "vue";

    const props = defineProps({
        items: Array,
        t1: Object,
        isNavOpen: Boolean,
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
        <button class="navbar-toggler border-0 shadow-none w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <div class = "center" >
                <RouterLink class = "" to = "/" style = "text-decoration: none;">
                    <img :src = "`/images/ClutChess.svg`" style = "width: 30px; height: 30px;"/>
                    <h1 style = "display: inline; color: black;" class = "center">
                        ClutChess
                    </h1>
                </RouterLink>
                &nbsp;
                <span class = "navbar-toggler-icon" style = "width: 30px; height: 30px;"></span>
            </div>    
        </button>
        <div :class="['collapse', 'navbar-collapse', { show: props.isNavOpen }]" id="navbarSupportedContent">
            <ul class = "navbar-nav center">
                <li class = "nav-item fw-semibold" v-for = "item in props.items">
                    <RouterLink class = "nav-link" :to = "item.link" :class = "{activeBorder: item.active}">
                        <img :src = "`/images/${item.label}.svg`"/>
                        {{ item.label }}
                    </RouterLink>
                </li>
                <RouterLink 
    to="/" 
    class="desktop-logo d-none d-sm-flex align-items-center nav-link"
  >
    <img src="/images/ClutChess.svg" alt="ClutChess Logo" style="height:40px; width:40px;" />
  </RouterLink>
            </ul>
        </div>
    </nav>
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
        backdrop-filter: blur(2px);
        border: 2px solid black;
        z-index: 10000;
        box-shadow: 0 0 10px black;
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
            left: 50vw;
            width: 49vw;
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
