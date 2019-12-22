<template>
  <div :class="['menu', { dark, open, disabled }]">
    <div class="icon" @click="handleClickIcon" ref="iconNode">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div class="items" ref="itemsNode" :style="{ top : menuOffset }">
      <div :class="menuItemClass(item)"
           v-for="(item, i) in items"
           :key="i"
           @click="handleMenuItemClick(item)">
        <div class="icon" :style="menuIconStyle(item)"></div>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import listen from './listen';

export default {
    name    : "Menu",
    props   : {
        dark : {
            type    : Boolean,
            default : false
        },
        disabled : {
            type    : Boolean,
            default : false
        },
        items : {
            type    : Array,
            default : () => []
        }
    },
    data() {
        return {
            open       : false,
            menuOffset : ''
        };
    },
    watch : {
        disabled : {
            immediate : true,
            handler(newValue) {
                if (newValue) {
                    this.open = false;
                }
            }
        }
    },
    mounted() {
        this.docClick = listen.add(
            document, "click", this.handleClickDoc.bind(this)
        );
    },
    beforeDestroy() {
        if (this.docClick) {
            this.docClick.remove();
            this.docClick = null;
        }
    },
    methods : {
        menuItemClass(item) {
            if (item.separator) {
                return ['menu_item_separator'];
            }

            const classes = ['menu_item'];

            if (item.iconClass) {
                classes.push(item.iconClass);
            }

            if (item.disabled) {
                classes.push('disabled');
            } else {
                classes.push('enabled');
            }

            return classes;
        },
        menuIconStyle(item) {
            const style = {};

            const url = item.iconUrl;
            if (url) {
                style.backgroundImage = `url('${url}')`;
            }

            return style;
        },
        handleMenuItemClick(item) {
            if (item.disabled) {
                return;
            }

            this.$emit('click-item', item.eventCode);
            this.open = false;
        },
        handleClickDoc() {
            if (this.$el.contains(event.target)) {
                return;
            }

            this.open = false;
        },
        handleClickIcon(event) {
            if (this.disabled) {
                this.open = false;
                return;
            }

            let menuOffset  = '';

            const iconDims = this.$refs.iconNode.getBoundingClientRect();
            const menuDims = this.$refs.itemsNode.getBoundingClientRect();

            const space = window.innerHeight - iconDims.y;
            const ht    = menuDims.height + 20;

            if (ht > space) {
                menuOffset = `${- Math.ceil(ht - space)}px`;
            }

            this.menuOffset = menuOffset;
            this.open       = ! this.open;
        }
    }
};

</script>

<style scoped>

.menu {
    position:relative;
    opacity:1;
    transition:opacity 1000ms;
}

.menu > .icon {
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
    transition:top 200ms, transform 500ms;
    cursor:pointer;
    transform-origin:50% 50%;
}

.menu.open > .icon {
    transform:rotate(90deg);
}

.menu .dot {
    width:3px;
    height:3px;
    border-radius:50%;
    background-color:#808080;
    transition:background-color 500ms;
    margin:3px 0px 0px;
}

.menu .dot:first-child {
    margin-top:0px;
}

.menu > .items {
    position:absolute;
    top:0px;
    left:0px;
    max-height:300px;
    overflow-y:auto;
    background-color:rgba(255, 255, 255, 0.5);
    backdrop-filter:blur(5px);
    box-shadow:1px 1px 2px 2px rgba(0, 0, 0, 0.2);
    opacity:0;
    z-index:-1;
    transform:translateX(15px);
    transition:opacity 500ms, z-index 0ms 500ms;
}


@supports not (backdrop-filter:blur(5px)) {
    .menu > .items {
        background-color:rgba(255, 255, 255, 0.85);
    }
}

.menu.open > .items {
    z-index:1;
    opacity:1;
    transition:opacity 500ms, z-index 0ms 0ms;
}

.menu:not(.disabled):active > .icon {
    top:1px;
}

.menu:not(.disabled):hover .dot {
    background-color:#000000;
}

.menu.disabled {
    opacity:0.5;
}

.menu .menu_item_separator {
    background-color:#808080;
    height:1px;
    margin:5px 0px;
}

.menu .menu_item {
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    justify-content:flex-start;
    align-items:center;
    padding:7px;
    margin-top:1px;
    transition:background-color 250ms;
}

.menu .menu_item:first-child {
    margin-top:0px;
}

.menu .menu_item.enabled {
    cursor:pointer;
}

.menu .menu_item.disabled {
    opacity:0.35;
}

.menu .menu_item .icon {
    --mi-icon-size:18px;
    flex-grow:0;
    flex-shrink:0;
    width:18px;
    height:18px;
    background-position-x:0px;
    background-position-y:0px;
    background-size:auto calc(var(--mi-icon-size) * 2);
    background-repeat:no-repeat;
    background-image:url('./assets/table-sprite.png');
    margin-right:10px;
}

.menu .menu_item .icon,
.menu.dark .menu_item.enabled:hover .icon {
    background-position-y:calc(var(--mi-icon-size) * 0);
}

.menu.dark .menu_item .icon,
.menu .menu_item.enabled:hover .icon {
    background-position-y:calc(var(--mi-icon-size) * -1);
}

.menu .menu_item .label {
    font-size:14px;
    white-space:nowrap;
}

.menu .menu_item.enabled:hover {
    background-color:rgba(0, 0, 0, 0.65);
}

.menu .menu_item.enabled:hover .label {
    color:#FFFFFF;
}

.menu .menu_item.refresh .icon {
    background-position-x:calc(var(--mi-icon-size) * 0);
}

.menu .menu_item.plus .icon {
    background-position-x:calc(var(--mi-icon-size) * -1);
}

.menu .menu_item.delete .icon {
    background-position-x:calc(var(--mi-icon-size) * -2);
}

.menu .menu_item.edit .icon {
    background-position-x:calc(var(--mi-icon-size) * -3);
}

.menu .menu_item.camera .icon {
    background-position-x:calc(var(--mi-icon-size) * -4);
}

.menu .menu_item.cart .icon {
    background-position-x:calc(var(--mi-icon-size) * -5);
}

.menu .menu_item.clock .icon {
    background-position-x:calc(var(--mi-icon-size) * -6);
}

.menu .menu_item.gear .icon {
    background-position-x:calc(var(--mi-icon-size) * -7);
}

.menu .menu_item.power .icon {
    background-position-x:calc(var(--mi-icon-size) * -8);
}

.menu .menu_item.play .icon {
    background-position-x:calc(var(--mi-icon-size) * -9);
}

.menu .menu_item.pause .icon {
    background-position-x:calc(var(--mi-icon-size) * -10);
}

.menu .menu_item.null .icon {
    background-position-x:calc(var(--mi-icon-size) * -11);
}

.menu .menu_item.share .icon {
    background-position-x:calc(var(--mi-icon-size) * -12);
}

.menu .menu_item.link .icon {
    background-position-x:calc(var(--mi-icon-size) * -13);
}

.menu .menu_item.data .icon {
    background-position-x:calc(var(--mi-icon-size) * -14);
}

.menu .menu_item.controls .icon {
    background-position-x:calc(var(--mi-icon-size) * -15);
}

.menu .menu_item.lock .icon {
    background-position-x:calc(var(--mi-icon-size) * -16);
}

.menu .menu_item.key .icon {
    background-position-x:calc(var(--mi-icon-size) * -17);
}

.menu .menu_item.target .icon {
    background-position-x:calc(var(--mi-icon-size) * -18);
}

.menu .menu_item.filter .icon {
    background-position-x:calc(var(--mi-icon-size) * -19);
}

.menu .menu_item.chip .icon {
    background-position-x:calc(var(--mi-icon-size) * -20);
}

.menu .menu_item.help .icon {
    background-position-x:calc(var(--mi-icon-size) * -21);
}

.menu .menu_item.document .icon {
    background-position-x:calc(var(--mi-icon-size) * -22);
}

.menu .menu_item.column .icon {
    background-position-x:calc(var(--mi-icon-size) * -23);
}

.menu.dark:hover .dot {
    background-color:#FFFFFF;
}

.menu.dark > .items {
    background-color:rgba(102, 102, 102, 0.5);
    border-color:rgba(255, 255, 255, 0.35);
    box-shadow:none;
}


@supports not (backdrop-filter:blur(5px)) {
    .menu.dark > .items {
        background-color:rgba(102, 102, 102, 0.85);
    }
}

.menu.dark .menu_item.enabled:hover {
    background-color:rgba(255, 255, 255, 1);
}

.menu.dark .menu_item.enabled:hover .label {
    color:#000000;
}

</style>
