<template>
  <tr>
    <head-cell v-for="colDef in columns"
               :key="colDef.id"
               :column="colDef"
               @click="handleClickCell(colDef.id)"></head-cell>
  </tr>
</template>

<script>

import validation from './validation';
import HeadCell from './head-cell';

export default {
    name        : "HeadRow",
    components  : { HeadCell },
    props       : {
        columns : {
            type    : Array,
            default : () => [],
            validator(value) {
                return value.every(item => {
                    return validation.validateColumnDef(item);
                });
            }
        }
    },
    data() {
        return {
        };
    },
    computed : {
    },
    methods : {
        handleClickCell(columnId) {
            this.$emit('click-column', columnId);
        }
    }
};

</script>

<style scoped>
</style>
