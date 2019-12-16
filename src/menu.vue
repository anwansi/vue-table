<template>
  <div :class="['menu', { dark }]">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>

export default {
    name    : "Menu",
    props   : {
        dark : {
            type    : Boolean,
            default : false
        }
    }
};

</script>

<style scoped>

.menu {
    height:18px;
    width:12px;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
    top:0px;
    transition:top 200ms;
    cursor:pointer;
}

.menu > .dot {
    width:3px;
    height:3px;
    border-radius:50%;
    background-color:#808080;
    transition:background-color 500ms;
    margin:3px 0px 0px;
}

.menu > .dot:first-child {
    margin-top:0px;
}

.menu:active {
    top:1px;
}

.menu:hover > .dot {
    background-color:#000000;
}

.menu.dark:hover > .dot {
    background-color:#FFFFFF;
}

</style>
