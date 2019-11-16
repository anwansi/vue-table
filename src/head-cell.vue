<template>
  <th :style="cellStyle">{{ column.name }}</th>
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
        cellStyle() {
            return {
                display : this.column.hidden ? 'none' : ''
            };
        }
    },
    methods : {
    }
};

</script>

<style scoped>
</style>
