<script setup>
  defineProps({
    logo: String,
    brand: String,
    items: Array,
  });

  window.onscroll = () => {
    let navbar = document.getElementById("navbar");
    if(window.scrollY > 80) {
        navbar.style.height = "40px";
    }
    else {
        navbar.style.height = "80px";
    }
  }

</script>
<template>
    <div class = "container-fluid fixed-top">
        <nav class = "navbar navbar-expand-lg" id = "navbar">   
            <div class = "navbar-brand">
                <a href = "/" class = "d-inline">
                    <img :src = "logo" alt = "Logo"/>
                </a>
                <div class = "d-inline fw-bold">
                    {{ brand }}
                </div>
            </div>
            <button class="navbar-toggler border-0 shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class = "navbar-toggler-icon"></span>
            </button>
            <div class = "collapse navbar-collapse" id = navbarSupportedContent>
                <ul class = "navbar-nav">
                    <li class = "nav-item fw-semibold" v-for = "item in items">
                        <a class = "nav-link" :class = "{active: item.active}" :href = "item.link">
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style scoped>
    .navbar {
        background-color: rgba(233, 233, 233, 0);
        backdrop-filter: blur(15px);
        box-shadow: 0 0 5px rgb(0, 0, 0);
        height: 80px;
        transition: box-shadow 0.5s ease, height 0.5s ease;
        opacity: 0.9;
    }
    @media (min-width: 992px) { 
        .navbar-collapse {
            display: flex;
            justify-content: end;
        }
        .navbar {
            border-radius: 35px;
            margin: 20px;
            padding: 10px 10px;
        }
        .nav-item {
            box-shadow: 0 0 0px white;
            background-color: none;
            transition: box-shadow 0.5s ease, background-color 1s ease;
            width: auto;
            margin: 0px 5px;
            border-radius: 5px;
            text-align: center;
        }
        .nav-item:hover {
            box-shadow: 0 0 5px  rgb(0, 0, 0);
            background-color:  rgb(133, 175, 216);
        }
    }
    @media (max-width: 991px) {
        .navbar-collapse {
            text-align: center;
            border: 1px solid black;
            border-radius: 20px;
            margin-top: 20px;
        }
    }
    .navbar:hover {
        box-shadow: 0 0 10px rgb(0, 0, 0);
    }
</style>
