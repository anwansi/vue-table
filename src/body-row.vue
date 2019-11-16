<template>
  <tr>
    <body-cell v-for="colDef in columns"
               :key="colDef.id"
               :column="colDef"
               :cellData="cellData(colDef)"></body-cell>
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
        }
    }
};

</script>

<style scoped>
</style>
