<template>
  <table class="anwansi_table">
    <thead>
      <head-row :columns="columnState"
                @click-column="handleClickColumn" />
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
            hiddenColumns : {},
            sortColumnId  : '',
            sortAscending : true
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

            if (this.sortColumnId) {
                const column = this.columnById(this.sortColumnId);
                if (column) {
                    rowData.sort((a, b) => {
                        const valueA = a.data[column.id].value;
                        const valueB = b.data[column.id].value;

                        switch (column.type) {
                            case 'boolean':
                                return this._compareBoolean(valueA, valueB);
                                break;
                            case 'number':
                                return this._compareNumber(valueA, valueB);
                                break;
                            case 'string':
                            default:
                                return this._compareString(valueA, valueB);
                                break;
                        }
                    });
                    if (! this.sortAscending) {
                        rowData.reverse();
                    }
                }
            }
            return rowData;
        }
    },
    methods : {
        columnById(id) {
            return this.columns.find(item => item.id === id);
        },
        handleSelectRow(rowData, selected) {
        },
        handleClickColumn(columnId) {
            if (this.sortColumnId === columnId) {
                this.sortAscending = ! this.sortAscending;
            } else {
                this.sortColumnId  = columnId;
                this.sortAscending = true;
            }
        },
        _compareBoolean(valueA, valueB) {
            const boolA = !! valueA;
            const boolB = !! valueB;

            if (!! boolA === !! boolB) {
                return 0;
            }

            if (boolA) {
                return -1;
            } else {
                return 1;
            }
        },
        _coerceNumber(value) {
            if ((value === '') || (value === null) || (value === undefined)) {
                return Number.NaN;
            }
            return Number(value);
        },
        _compareNumber(valueA, valueB) {
            const numA = this._coerceNumber(valueA);
            const numB = this._coerceNumber(valueB);

            if (isNaN(numA) && isNaN(numB)) {
                return 0;
            }

            if (isNaN(numA)) {
                return 1;
            }

            if (isNaN(numB)) {
                return -1;
            }

            if (numA < numB) {
                return -1;
            } else if (numA > numB) {
                return 1;
            }

            return 0;
        },
        _parseString(value) {
            return (value || '').replace(/(\d+)/g, ' $1 ').trim().split(/\s/);
        },
        _compareString(valueA, valueB) {
            const partsA = this._parseString(valueA);
            const partsB = this._parseString(valueB);

            const lenA = partsA.length;
            const lenB = partsB.length;

            const size = Math.min(lenA, lenB);

            for (let i = 0; i < size; i++) {
                const valA = partsA[i];
                const valB = partsB[i];

                if (valA === valB) {
                    continue;
                }

                const numA = this._coerceNumber(valA);
                const numB = this._coerceNumber(valB);

                if (isNaN(numA) || isNaN(numB)) {
                    return valA.toLowerCase().localeCompare(valB.toLowerCase());
                } else {
                    if (numA < numB) {
                        return -1;
                    } else if (numA > numB) {
                        return 1;
                    }
                }
            }

            if (lenA !== lenB) {
                return (lenA < lenB) ? -1 : 1;
            }

            return 0;
        }
    }
};

</script>

<style scoped>
</style>
