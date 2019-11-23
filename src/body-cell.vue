<template>
  <td :class="cellClasses" :style="cellStyle">
    <div class="cell_content">
      <input v-if="generateSelect"
             ref="select"
             type="checkbox"
             @change="handleChangeCheckbox"/>
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
import formatter from './format';
import validation from './validation';

export default {
    name        : "BodyCell",
    components  : { BooleanDisplay },
    props       : {
        column : {
            type    : Object,
            default : () => {},
            validator(value) {
                return validation.validateColumnDef(value);
            }
        },
        cellData : {
            type    : Object,
            default : () => ({})
        }
    },
    computed : {
        generateSelect() {
            const column = this.column;
            return (column.system && column.id === '_select');
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
            let result = null;

            if (this.column.type === 'boolean') {
                const format = this.column.format || {};
                const value  = !! this.cellData.value;

                let text = value ? 'True' : 'False';

                if (format.booleanTextMap) {
                    text = format.booleanTextMap[value ? 'true' : 'false'];
                }

                result = { value, text };
            }

            return result;
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
        isSelected() {
            return this.$refs.select.checked;
        },
        handleChangeCheckbox(event, foo) {
            this.$emit('select', this.isSelected());
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
