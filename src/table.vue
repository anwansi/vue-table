<template>
  <div :class="['anwansi_table', { dark, refreshing }]">
    <div class="utils upper">
      <div class="utils upper_left">
        <div class="table_menu">
          <table-menu :dark="dark"
                      :items="tableMenuItems"
                      @click-item="handleTableMenuItemClick"/>
        </div>
        <button class="refresh"
                v-if="refreshActionOn"
                :title="refreshLabel"
                :disabled="isRefreshDisabled"
                @click="$emit('refresh')"></button>
        <button class="add"
                v-if="addActionOn"
                :title="addLabel"
                :disabled="isAddDisabled"
                @click="$emit('add')"></button>
        <div v-if="caption" class="caption">{{ caption }}</div>
      </div>
      <div class="utils upper_right">
        <div class="pagination">
          <paginator :rowCount="rowCount"
                     :pageSizes="pageSizes"
                     :pageSize="pageSize"
                     :currentPage="currentPage"
                     :linkSpan="pageLinkSpan"
                     :allowAll="allowAllPages"
                     :dark="dark"
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
                     :dark="dark"
                     @click="handleClickColumn(column.id)"
                     @select-all="handleSelectAll"
                     @select-none="handleSelectNone"
                     @select-reverse="handleSelectReverse"></head-cell>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dataItem, i) in pagedRowData" :key="i">
          <body-cell v-for="colDef in columnState"
                     :key="colDef.id"
                     :column="colDef"
                     :rowDataItem="dataItem"
                     :cellData="dataItem.data[colDef.id]"
                     :dark="dark"
                     :selected="dataItem.selected"
                     @select="handleCellSelect(colDef, dataItem, $event)"
                     @menu-item="handleMenuItemClick(dataItem.id, $event)"></body-cell>
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
                     :dark="dark"
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
import TableMenu from './menu';
import Paginator from './paginator';

export default {
    name       : 'Table',
    components : { BodyCell, HeadCell, TableMenu, Paginator },
    data() {
        return {
            hiddenColumns    : {},
            sortColumnId     : '',
            sortAscending    : true,
            rowData          : [],
            currentPage      : 1,
            pageSize         : 10,
            pageLinkSpan     : 2
        };
    },
    props : {
        caption : {
            type    : String,
            default : ''
        },
        dark : {
            type    : Boolean,
            default : false
        },
        enableSelect : {
            type    : Boolean,
            default : false
        },
        enableRowMenus : {
            type    : Boolean,
            default : false
        },
        pageSizes : {
            type    : Array,
            default : () => [10, 50, 200]
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
        },
        defaultSort : {
            type : Array
        },
        addActionOn : {
            type    : Boolean,
            default : false
        },
        addActionEnabled : {
            type    : Boolean,
            default : true
        },
        addLabel : {
            type    : String,
            default : "Add"
        },
        refreshActionOn : {
            type    : Boolean,
            default : false
        },
        refreshActionEnabled : {
            type    : Boolean,
            default : true
        },
        refreshLabel : {
            type    : String,
            default : "Refresh"
        },
        refreshing : {
            type    : Boolean,
            default : false
        }
    },
    mounted() {
        const defSort = this.defaultSort || [];

        if (defSort && defSort.length) {
            const colId = defSort[0] || '';
            const valid = this.columns.some(colDef => (colDef.id === colId));

            if (valid) {
                this.sortColumnId  = colId;
                this.sortAscending = (defSort.length >= 2) ? !! defSort[1]
                                                           : true;
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

            if (this.enableRowMenus) {
                cols.unshift({
                    id     : "_menu",
                    name   : "",
                    system : true,
                    align  : 'center'
                });
            }

            if (this.enableSelect) {
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
            return this.rowData.length;
        },
        pagedRowData() {
            const size = this.pageSize;

            if (isNaN(parseInt(size))) {
                return this.rowData;
            }

            const start = Math.max(this.currentPage - 1, 0) * size;
            const end   = start + size;

            return this.rowData.slice(start, end);
        },
        pagedRowIds() {
            return this.pagedRowData.map(data => data.id);
        },
        tableMenuItems() {
            const items = [];

            if (this.refreshActionOn) {
                items.push({
                    event     : 'refresh',
                    label     : 'Refresh',
                    iconClass : 'refresh',
                    disabled  : ! this.refreshActionEnabled
                });
            }

            if (this.addActionOn) {
                items.push({
                    event     : 'add',
                    label     : 'Add',
                    iconClass : 'plus',
                    disabled  : ! this.addActionEnabled
                });
            }

            return items;
        },
        isRefreshDisabled() {
            return this.refreshing || ! this.refreshActionEnabled;
        },
        isAddDisabled() {
            return this.refreshing || ! this.addActionEnabled;
        }
    },
    watch : {
        rows : {
            immediate : true,
            handler(newValue) {
                this.rowData = (newValue || []).slice();
                this.sortRowData();
            }
        },
        sortColumnId : {
            immediate : true,
            handler(newValue) {
                this.sortRowData();
            }
        },
        sortAscending : {
            immediate : true,
            handler(newValue) {
                this.sortRowData();
            }
        }
    },
    methods : {
        columnById(id) {
            return this.columns.find(item => item.id === id);
        },
        handleMenuItemClick(rowId, eventCode) {
            this.$emit('row-menu-item', { rowId, eventCode });
        },
        handleTableMenuItemClick(eventCode) {
            this.$emit('table-menu-item', { eventCode });
        },
        handleCellSelect(colDef, rowDataItem, selected) {
            this.$set(rowDataItem, "selected", ! rowDataItem.selected);

            if (colDef.system && colDef.id === '_select') {
                this.$emit('select-row', rowDataItem.id, rowDataItem.selected);
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
        handleSelectAll() {
            this.selectAll();
        },
        handleSelectNone() {
            this.selectNone();
        },
        handleSelectReverse() {
            this.selectReverse();
        },
        handleClickPaginatorPage(page) {
            this.currentPage = page;
            this.selectNone();
        },
        handlePaginatorPageSize(size) {
            this.pageSize = size;
            this.selectNone();
        },
        selectAll() {
            this.selectEachRow((item, pagedIds) => {
                if (item.id && pagedIds.includes(item.id)) {
                    return true;
                } else {
                    return false;
                }
            });
        },
        selectNone() {
            this.selectEachRow((item, pagedIds) => false);
        },
        selectReverse() {
            this.selectEachRow((item, pagedIds) => {
                if (item.id && pagedIds.includes(item.id)) {
                    return ! item.selected;
                } else {
                    return false;
                }
            });
        },
        selectEachRow(callback) {
            const pagedIds = this.pagedRowIds;
            this.rowData.forEach(item => {
                this.$set(item, 'selected', callback(item, pagedIds));
            });
        },
        sortRowData() {
            if (this.sortColumnId) {
                const column = this.columnById(this.sortColumnId);
                if (column) {
                    this.rowData.sort((a, b) => {
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
                        this.rowData.reverse();
                    }
                }
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

div.anwansi_table {
    display:inline-block;
    color:#000000;
    font-size:0px;
}

div.anwansi_table.dark {
    color:#FFFFFF;
}

.utils {
    display:flex;
    justify-content:space-between;
}

.utils.lower {
    align-items:flex-start;
    padding-top:5px;
}

.utils.upper {
    padding-bottom:5px;
    align-items:flex-end;
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

.utils.upper_right, .utils.upper_left {
    align-items:flex-end;
}

.utils.lower_right, .utils.lower_left {
    align-items:flex-start;
}

div.anwansi_table th,
div.anwansi_table td {
    font-size:14px;
}

div.anwansi_table td {
    padding:2px 5px;
}

div.anwansi_table div.caption {
    font-size:24px;
    line-height:24px;
    height:24px;
    margin:0px 10px 0px 15px;
}

div.anwansi_table .table_menu {
    position:relative;
    top:-2px;
}

div.anwansi_table button {
    --btn-icon-size:18px;
    width:var(--btn-icon-size);
    height:var(--btn-icon-size);
    margin:0px 0px 0px 10px;
    padding:0px;
    background-repeat:no-repeat;
    background-size:auto calc(2 * var(--btn-icon-size));
    background-position-x:100px;
    background-position-y:0px;
    background-color:transparent;
    background-image:url('./assets/table-sprite.png');
    border:0px;
    cursor:pointer;
    position:relative;
    top:-2px;
    transition:top 250ms, opacity 500ms;
}

div.anwansi_table.dark button {
    background-position-y:calc(-1 * var(--btn-icon-size));
}

div.anwansi_table button:first-child {
    margin-left:0px;
}

div.anwansi_table button:active {
    top:-1px;
}

div.anwansi_table button.add {
    background-position-x:calc(-1 * var(--btn-icon-size));
}

div.anwansi_table button.refresh {
    background-position-x:calc(0 * var(--btn-icon-size));
}

div.anwansi_table.refreshing button,
div.anwansi_table button:disabled {
    opacity:0.35;
}

div.anwansi_table.refreshing button {
    transform-origin:50% 50%;
}

div.anwansi_table.refreshing button.refresh {
    animation-name:vt-button-rotate;
    animation-iteration-count:infinite;
    animation-timing-function:linear;
    animation-duration:1000ms;
    animation-fill-mode:forwards;
}

@keyframes vt-button-rotate {
    0% { transform:rotate(360deg) }
    50% { transform:rotate(180deg) }
    100% { transform:rotate(0deg) }
}

</style>
