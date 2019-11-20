<template>
  <div :class="['bool_display', { true : value, false : ! value }]">
    <div class="icon"></div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>

export default {
    name    : "BooleanDisplay",
    props   : {
        value : {
            type     : Boolean,
            required : true
        },
        text : {
            type    : String,
            default : ''
        }
    }
};

</script>

<style scoped>

.bool_display {
    display:flex;
    flex-wrap:nowrap;
    justify-content:flex-start;
    align-items:baseline;
}

.bool_display .icon {
    width:12px;
    height:12px;
    border-radius:6px;
}

.bool_display.true .icon {
    background-color:#33CC33;
}

.bool_display.false .icon {
    background-color:#CC0000;
}

.bool_display .text {
    font-size:14px;
    padding-left:5px;
}


</style>
