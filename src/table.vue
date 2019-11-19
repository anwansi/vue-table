<template>
  <table class="anwansi_table">
    <thead>
      <head-row :columns="columnState" />
    </thead>
    <tbody>
      <body-row v-for="(rowData, i) in sortedRowData"
                :key="i"
                :columns="columnState"
                :rowData="rowData"
                @select-row="handleSelectRow(rowData, $event)"/>
    </tbody>
  </table>
</template>

<script>

import validation from './validation';
import HeadRow from './head-row';
import BodyRow from './body-row';

export default {
    components : { BodyRow, HeadRow },
    data() {
        return {
            hiddenColumns : {}
        };
    },
    props : {
        canSelect : {
            type    : Boolean,
            default : true
        },
        columns : {
            type    : Array,
            default : () => [],
            validator(value) {
                return value.every(item => {
                    return validation.validateColumnDef(item);
                });
            }
        },
        rows : {
            type    : Array,
            default : () => [],
            validator(value) {
                return value.every(item => {
                    return (typeof item === 'object');
                });
            }
        }
    },
    computed : {
        columnState() {
            const cols = this.columns.map(column => {
                let hidden = false;
                if (column.hidden || this.hiddenColumns[column.id]) {
                    hidden = true;
                }

                return Object.assign({ hidden }, column);
            });

            if (this.canSelect) {
                cols.unshift({
                    id     : "_select",
                    name   : "",
                    system : true
                });
            }

            return cols;
        },
        sortedRowData() {
            const rowData = this.rows.slice();
            return rowData;
        }
    },
    methods : {
        handleSelectRow(rowData, selected) {
        }
    }
};

</script>

<style scoped>
</style>
