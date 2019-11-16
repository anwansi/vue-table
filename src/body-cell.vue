<template>
  <td :style="cellStyle">{{ rowDisplay }}</td>
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
        cellStyle() {
            return {
                display : this.column.hidden ? 'none' : ''
            };
        },
        rowDisplay() {
            if ('displayValue' in this.cellData) {
                return this.cellData.displayValue;
            }

            return `${this.cellData.value || ''}`;
        }
    },
    methods : {
    }
};

</script>

<style scoped>
</style>
