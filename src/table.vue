<template>
  <div :class="['anwansi_table', { dark }]">
    <div class="utils upper">
      <div class="utils upper_left">
      </div>
      <div class="utils upper_right">
        <div class="pagination">
          <paginator :rowCount="rowCount"
                     :pageSizes="pageSizes"
                     :pageSize="pageSize"
                     :currentPage="currentPage"
                     :linkSpan="pageLinkSpan"
                     :allowAll="allowAllPages"
                     @click-page="handleClickPaginatorPage"
                     @page-size="handlePaginatorPageSize"/>
        </div>
      </div>
    </div>
    <table :class="['anwansi_table', { dark }]">
      <thead>
        <tr>
          <head-cell v-for="column in columnState"
                     :key="column.id"
                     :column="column"
                     @click="handleClickColumn(column.id)"></head-cell>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowData, i) in pagedData" :key="i">
          <body-cell v-for="colDef in columnState"
                     :key="colDef.id"
                     :column="colDef"
                     :cellData="rowData.data[colDef.id]"
                     @select="handleCellSelect(colDef, rowData.id, $event)"></body-cell>
        </tr>
      </tbody>
    </table>
    <div class="utils lower">
      <div class="utils lower_left">
      </div>
      <div class="utils lower_right">
        <div class="pagination">
          <paginator :rowCount="rowCount"
                     :pageSizes="pageSizes"
                     :pageSize="pageSize"
                     :currentPage="currentPage"
                     :linkSpan="pageLinkSpan"
                     :allowAll="allowAllPages"
                     @click-page="handleClickPaginatorPage"
                     @page-size="handlePaginatorPageSize"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import validation from './validation';
import HeadCell from './head-cell';
import BodyCell from './body-cell';
import Paginator from './paginator';

export default {
    name       : 'Table',
    components : { BodyCell, HeadCell, Paginator },
    data() {
        return {
            hiddenColumns    : {},
            sortColumnId     : '',
            sortAscending    : true,
            currentPage      : 1,
            pageSize         : 5,
            pageLinkSpan     : 2
        };
    },
    props : {
        dark : {
            type    : Boolean,
            default : false
        },
        canSelect : {
            type    : Boolean,
            default : true
        },
        pageSizes : {
            type    : Array,
            default : () => [5, 25, 200]
        },
        allowAllPages : {
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
                let hidden  = false;
                let sortDir = '';
                if (column.hidden || this.hiddenColumns[column.id]) {
                    hidden = true;
                }

                if (column.id === this.sortColumnId) {
                    sortDir = this.sortAscending ? 'asc' : 'desc';
                }

                return Object.assign({
                    hidden,
                    sortDirection : sortDir
                }, column);
            });

            if (this.canSelect) {
                cols.unshift({
                    id     : "_select",
                    name   : "",
                    system : true,
                    align  : 'center'
                });
            }

            return cols;
        },
        rowCount() {
            return (this.rows || []).length;
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
        },
        pagedData() {
            const data = this.sortedRowData;
            const size = this.pageSize;

            if (isNaN(parseInt(size))) {
                return data;
            }

            const start = Math.max(this.currentPage - 1, 0) * size;
            const end   = start + size;

            return data.slice(start, end);
        }
    },
    methods : {
        columnById(id) {
            return this.columns.find(item => item.id === id);
        },
        handleCellSelect(colDef, rowId, selected) {
            if (colDef.system && colDef.id === '_select') {
                this.$emit('select-row', colDef.id, rowId, selected);
            }
        },
        handleClickColumn(columnId) {
            if (this.sortColumnId === columnId) {
                this.sortAscending = ! this.sortAscending;
            } else {
                this.sortColumnId  = columnId;
                this.sortAscending = true;
            }
        },
        handleClickPaginatorPage(page) {
            this.currentPage = page;
        },
        handlePaginatorPageSize(size) {
            this.pageSize = size;
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

div.anwansi_table {
    display:inline-block;
}

.utils {
    display:flex;
    justify-content:space-between;
}

.utils.lower {
    align-items:flex-end;
}

.utils.upper {
    align-items:flex-start;
}

.utils.lower > *,
.utils.upper > * {
    flex-grow:1;
}

.utils.lower_left, .utils.upper_left,
.utils.lower_right, .utils.upper_right {
    display:flex;
}

.utils.upper_right, .utils.lower_right {
    justify-content:flex-end;
}

.utils.upper_left, .utils.lower_left {
    justify-content:flex-start;
}

</style>
