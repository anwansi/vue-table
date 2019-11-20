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
            const col = this.column;
            return (col.system && col.id === '_select');
        },
        cellStyle() {
            return {
                display : this.column.hidden ? 'none' : ''
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
</style>
