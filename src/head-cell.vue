<template>
  <th :style="cellStyle"
      @click="handleClick">{{ column.name }}</th>
</template>

<script>

import validation from './validation';

export default {
    name    : "HeadCell",
    props   : {
        column : {
            type    : Object,
            default : () => {},
            validator(value) {
                return validation.validateColumnDef(value);
            }
        }
    },
    computed : {
        systemColumn() {
            return (this.column && this.column.system);
        },
        cellStyle() {
            const result = {
                display : this.column.hidden ? 'none' : ''
            };

            if (! this.systemColumn) {
                result.cursor = 'pointer';
            }

            return result;
        }
    },
    methods : {
        handleClick(event) {
            if (this.systemColumn) {
                return;
            }
            this.$emit('click');
        }
    }
};

</script>

<style scoped>
</style>
