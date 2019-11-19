<template>
  <td :style="cellStyle">
    <input v-if="generateSelect"
           ref="select"
           type="checkbox"
           @change="handleChangeCheckbox"/>
    <template v-else>{{ display }}</template>
  </td>
</template>

<script>

import validation from './validation';

export default {
    name    : "BodyCell",
    props   : {
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
        display() {
            if ('displayValue' in this.cellData) {
                return this.cellData.displayValue;
            }

            return `${this.cellData.value || ''}`;
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
