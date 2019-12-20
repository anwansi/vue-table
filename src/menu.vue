<template>
  <div :class="['menu', { dark, open }]">
    <div class="icon" @click="handleClickIcon">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div class="items" ref="itemsNode">
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
        items : {
            type    : Array,
            default : () => []
        }
    },
    data() {
        return {
            open : false
        };
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
            const classes = ['menu_item'];

            switch (item.iconClass) {
                case 'edit':
                case 'delete':
                    classes.push(item.iconClass);
                    break;
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
        },
        handleClickDoc() {
            if (this.$el.contains(event.target)) {
                return;
            }

            this.open = false;
        },
        handleClickIcon(event) {
            this.open = ! this.open;
        }
    }
};

</script>

<style scoped>

.menu {
    position:relative;
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
    transition:top 200ms;
    cursor:pointer;
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
    background-color:rgba(255, 255, 255, 0.5);
    backdrop-filter:blur(5px);
    box-shadow:1px 1px 2px 2px rgba(0, 0, 0, 0.2);
    opacity:0;
    z-index:-1;
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

.menu:active > .icon {
    top:1px;
}

.menu:hover .dot {
    background-color:#000000;
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
    flex-grow:0;
    flex-shrink:0;
    width:18px;
    height:18px;
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
    margin-right:10px;
}

.menu .menu_item .label {
    font-size:14px;
}

.menu .menu_item.enabled:hover {
    background-color:rgba(0, 0, 0, 0.65);
}

.menu .menu_item.enabled:hover .label {
    color:#FFFFFF;
}

.menu .menu_item.delete .icon,
.menu.dark .menu_item.enabled.delete:hover .icon {
    background-image:url('./assets/delete-black.png');
}

.menu .menu_item.edit .icon,
.menu.dark .menu_item.enabled.edit:hover .icon {
    background-image:url('./assets/edit-black.png');
}

.menu.dark .menu_item.delete .icon,
.menu .menu_item.enabled.delete:hover .icon {
    background-image:url('./assets/delete-white.png');
}

.menu.dark .menu_item.edit .icon,
.menu .menu_item.enabled.edit:hover .icon {
    background-image:url('./assets/edit-white.png');
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
