<template>
  <td :class="cellClasses" :style="cellStyle">
    <div class="cell_content">
      <checkbox v-if="generateSelect"
                ref="checkBox"
                :dark="dark"
                :checked="selected"
                @click="handleClickCheckbox"/>
      <template v-else-if="generateMenu">
        <local-menu v-if="hasMenu"
                    :dark="dark"
                    :items="menuItems"
                    @click-item="handleMenuItemClick"/>
      </template>
      <template v-else-if="booleanDisplay">
        <boolean-display :value="booleanDisplay.value" :text="booleanDisplay.text" />
      </template>
      <template v-else-if="displayDash">&mdash;</template>
      <template v-else-if="displayNa"><span class="na">na</span></template>
      <template v-else>{{ display }}</template>
    </div>
  </td>
</template>

<script>

import BooleanDisplay from './boolean-display';
import Checkbox from './checkbox';
import formatter from './format';
import LocalMenu from './menu';
import validation from './validation';

export default {
    name        : "BodyCell",
    components  : { BooleanDisplay, Checkbox, LocalMenu },
    props       : {
        dark : {
            type    : Boolean,
            default : false
        },
        column : {
            type    : Object,
            default : () => {},
            validator(value) {
                return validation.validateColumnDef(value);
            }
        },
        rowDataItem : {
            type    : Object,
            default : () => ({})
        },
        cellData : {
            type    : Object,
            default : () => ({})
        },
        selected : {
            type    : Boolean,
            default : false
        }
    },
    data() {
        return {};
    },
    computed : {
        generateSelect() {
            const column = this.column;
            return (column.system && column.id === '_select');
        },
        generateMenu() {
            const column = this.column;
            return (column.system && column.id === '_menu');
        },
        hasMenu() {
            if (this.rowDataItem && 'enableRowMenu' in this.rowDataItem) {
                if (! this.rowDataItem.enableRowMenu) {
                    return false;
                }
            }

            if (! this.menuItems.length) {
                return false;
            }

            return true;
        },
        menuItems() {
            const items = [];

            if (this.rowDataItem) {
                const delItem  = this.rowDataItem.deleteMenuItem || '';
                const editItem = this.rowDataItem.editMenuItem   || '';

                if (['disabled', 'enabled'].includes(editItem)) {
                    items.push({
                        iconClass : 'edit',
                        label     : "Edit",
                        eventCode : "row-edit",
                        disabled  : (editItem === 'disabled')
                    });
                }

                if (['disabled', 'enabled'].includes(delItem)) {
                    items.push({
                        iconClass : 'delete',
                        label     : "Delete",
                        eventCode : "row-delete",
                        disabled  : (delItem === 'disabled')
                    });
                }
            }

            return items;
        },
        cellStyle() {
            const column = this.column;

            let align = '';

            if ('align' in column) {
                switch (column.align) {
                    case 'right':
                    case 'center':
                    case 'left':
                        align = column.align;
                        break;
                }
            } else {
                switch (column.type) {
                    case 'number':
                        align = 'right';
                        break;
                    default:
                        align = 'left';
                        break;
                }
            }

            return {
                display   : this.column.hidden ? 'none' : '',
                textAlign : align
            };
        },
        booleanDisplay() {
            if ('displayValue' in this.cellData) {
                return null;
            }

            if (this.column.type !== 'boolean') {
                return null;
            }

            const format = this.column.format || {};
            if (! format.booleanIcon) {
                return false;
            }

            const value = this.cellData.value;
            if (value === true || value === false) {
                let text = value ? 'True' : 'False';

                if (format.booleanTextMap) {
                    text = format.booleanTextMap[value ? 'true' : 'false'];
                }

                return { value, text };
            }

            return null;
        },
        displayDash() {
            const display = this.display;
            if (display === null || display === undefined || display === '') {
                if (this.column.emptyDash) {
                    return true;
                }
            }
            return false;
        },
        displayNa() {
            const display = this.display;
            if (display === null || display === undefined || display === '') {
                if (this.column.emptyNa) {
                    return true;
                }
            }
            return false;
        },
        display() {
            if ('displayValue' in this.cellData) {
                return this.cellData.displayValue;
            }


            const value  = this.cellData.value;
            const format = this.column.format || {};

            let result = `${value || ''}`;

            if (this.column.type === 'string') {
                if (format.stringUpper) {
                    result = (value || '').toUpperCase();
                } else if (format.stringLower) {
                    result = (value || '').toLowerCase();
                } else if (format.stringTitle) {
                    result = formatter.titleCase(value || '');
                }
            } else if (this.column.type === 'number') {
                if (format.numberInteger) {
                    const num = parseInt(value);
                    if (isNaN(num)) {
                        result = '';
                    } else if (format.numberFormat) {
                        result = formatter.formatInteger(Math.round(num));
                    } else {
                        result = `${Math.round(num)}`;
                    }
                }
            }

            return result;
        },
        cellClasses() {
            const column  = this.column;
            const classes = [];

            if (column.system) {
                classes.push('system');
                if (column.id === '_select') {
                    classes.push('select');
                }
            } else {
                classes.push('configured');
            }

            return classes;
        }
    },
    methods : {
        handleClickCheckbox() {
            this.$emit('select');
        },
        handleMenuItemClick(eventCode) {
            this.$emit('menu-item', eventCode);
        }
    }
};

</script>

<style scoped>

.na {
    font-variant:small-caps;
    color:#808080;
}

</style>
