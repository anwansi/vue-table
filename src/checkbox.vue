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
        }
    },
    data() {
        return {
            checked : false
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
            this.checked = ! this.checked;
            this.$emit('click', this.checked);
            this.$emit('change', this.checked);
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
    left:10%;
    top:10%;
    width:80%;
    height:80%;
    background-image:url('./assets/checkmark.png');
    background-size:contain;
}

</style>
