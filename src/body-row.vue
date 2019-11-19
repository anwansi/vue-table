<template>
  <tr>
    <body-cell v-for="colDef in columns"
               :key="colDef.id"
               :column="colDef"
               :cellData="cellData(colDef)"
               @select="handleCellSelect(colDef, $event)"></body-cell>
  </tr>
</template>

<script>

import validation from './validation';
import BodyCell from './body-cell';

export default {
    name        : "BodyRow",
    components  : { BodyCell },
    props       : {
        columns : {
            type    : Array,
            default : () => [],
            validator(value) {
                return value.every(item => {
                    return validation.validateColumnDef(item);
                });
            }
        },
        rowData : {
            type    : Object,
            default : () => ({})
        }
    },
    data() {
        return {
        };
    },
    computed : {
    },
    methods : {
        cellData(colDef) {
            return (this.rowData || {})[colDef.id];
        },
        handleCellSelect(colDef, selected) {
            if (colDef.system && colDef.id === '_select') {
                this.$emit('select-row', selected);
            }
        }
    }
};

</script>

<style scoped>
</style>
