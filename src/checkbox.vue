<template>
  <div :class="['checkbox', { dark, checked, disabled : isDisabled }]" @click="handleClick">
    <div class="icon"></div>
  </div>
</template>

<script>

export default {
    name  : 'Checkbox',
    props : {
        dark : {
            type    : Boolean,
            default : false
        },
        disabled : {
            type    : Boolean,
            default : false
        },
        checked : {
            type    : Boolean,
            default : false
        }
    },
    data() {
        return {
        };
    },
    computed : {
        isDisabled() {
            return this.disabled;
        }
    },
    methods : {
        handleClick(event) {
            if (this.isDisabled) {
                return;
            }
            this.$emit('click', this.checked);
        }
    }
};

</script>

<style scoped>

.checkbox {
    display:inline-block;
    width:12px;
    height:12px;
    margin:0px;
    padding:0px;
    vertical-align:top;
    position:relative;
    top:2px;
    border:1px solid #B2B2B2;
    background-color:#F5F5F5;
}

.checkbox.dark {
    border-color:#4C4C4C;
    background-color:#191919;
}

.checkbox.checked {
    background-color:#004CFF;
    border-color:#004CFF;
}

.checkbox:not(.disabled) {
    cursor:pointer;
}

.checkbox.checked .icon {
    position:absolute;
    left:0%;
    top:0%;
    width:100%;
    height:100%;
    background-image:url('./assets/checkmark.png');
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;
    transform-origin:50% 50%;
    transform:scaleX(0.8) scaleY(0.9);
}

</style>
