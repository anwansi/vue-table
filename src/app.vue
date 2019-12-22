<template>
  <div id="app" :class="{ dark }">
    <div class="options">
      <div class="option">
        <label>
          <input ref="darkInput"
                 type="checkbox"
                 @change="handleChangeDark" />
          Dark
        </label>
      </div>
      <div class="option">
        <label>
          <input ref="selectInput"
                 type="checkbox"
                 checked
                 @change="handleChangeSelect" />
          Enable Row Selection
        </label>
      </div>
      <div class="option">
        <label>
          <input ref="rowMenuInput"
                 type="checkbox"
                 checked
                 @change="handleChangeRowMenu" />
          Enable Row Menu
        </label>
      </div>
      <div class="option">
        <div class="header"><span class="bold">Refresh</span> Action</div>
        <label>
          <input ref="refreshActionOnInput"
                 type="checkbox"
                 checked
                 @change="handleChangeRefreshActionOn" />
          Expose
        </label>
        <label>
          <input ref="refreshActionEnabledInput"
                 type="checkbox"
                 checked
                 @change="handleChangeRefreshActionEnabled" />
          Enable
        </label>
      </div>
      <div class="option">
        <div class="header"><span class="bold">Add</span> Action</div>
        <label>
          <input ref="addActionOnInput"
                 type="checkbox"
                 checked
                 @change="handleChangeAddActionOn" />
          Expose
        </label>
        <label>
          <input ref="addActionEnabledInput"
                 type="checkbox"
                 checked
                 @change="handleChangeAddActionEnabled" />
          Enable
        </label>
      </div>
    </div>
    <h1>Table Demo</h1>
    <vue-table :caption="caption"
               :dark="dark"
               :columns="columns"
               :rows="rows"
               :defaultSort="defaultSort"
               :addActionOn="addActionOn"
               :addActionEnabled="addActionEnabled"
               :refreshActionOn="refreshActionOn"
               :refreshActionEnabled="refreshActionEnabled"
               :enableSelect="enableSelect"
               :enableRowMenus="enableRowMenus"
               :refreshing="tableRefreshing"
               @add="handleTableAdd"
               @refresh="handleTableRefresh"
               @row-menu-item="handleRowMenuItem"
               @table-menu-item="handleTableMenuItem"/>
  </div>
</template>

<script>

import VueTable from './table';

export default {
    name        : "App",
    components  : { VueTable },
    data() {
        return {
            caption                 : "Cars for Sale",
            dark                    : false,
            defaultSort             : ['year', false],
            tableRefreshing         : false,
            addActionOn             : true,
            refreshActionOn         : true,
            enableSelect            : true,
            enableRowMenus          : true,
            addActionEnabled        : true,
            refreshActionEnabled    : true,
            columns                 : [
                {
                    id      : 'year',
                    name    : 'Year',
                    type    : 'number',
                    format  : { numberInteger : true },
                    emptyNa : true
                },
                {
                    id     : 'make',
                    name   : 'Make',
                    type   : 'string',
                    format : { stringTitle : true }
                },
                {
                    id      : 'model',
                    name    : 'Model',
                    type    : 'string',
                    format  : { stringTitle : true },
                    emptyNa : true
                },
                {
                    id      : 'trim',
                    name    : 'Trim',
                    type    : 'string',
                    format  : { stringUpper : true },
                    emptyNa : true
                },
                {
                    id        : 'mileage',
                    name      : 'Mileage',
                    type      : 'number',
                    format    : { numberInteger : true, numberFormat : true },
                    emptyDash : true
                },
                {
                    id     : 'domestic',
                    name   : 'Domestic',
                    type   : 'boolean',
                    format : {
                        booleanIcon    : true,
                        booleanTextMap : { 'true' : 'Yes', 'false' : 'No' }
                    },
                    emptyNa : true
                }
            ],
            rows : [
                {
                    id   : 'auto001',
                    data : {
                        year     : { value : 1986 },
                        make     : { value : 'chevrolet' },
                        model    : { value : 'caprice classic' },
                        trim     : { value : '' },
                        mileage  : { value : 172191 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto002',
                    data : {
                        year     : { value : 1989 },
                        make     : { value : 'pontiac' },
                        model    : { value : 'trans am' },
                        trim     : { value : 'gta' },
                        mileage  : { value : 119774 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto003',
                    data : {
                        year     : { value : 1990 },
                        make     : { value : 'honda' },
                        model    : { value : 'accord' },
                        trim     : { value : 'dx' },
                        mileage  : { value : 98394 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto004',
                    data : {
                        year     : { value : 2004 },
                        make     : { value : 'ford' },
                        model    : { value : 'f-150' },
                        trim     : { value : 'xlt' },
                        mileage  : { value : 57510 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'enabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto005',
                    data : {
                        year     : { value : 1983 },
                        make     : { value : 'volkswagen' },
                        model    : { value : 'rabbit' },
                        trim     : { value : '' },
                        mileage  : { value : 198987 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto006',
                    data : {
                        year     : { value : 2008 },
                        make     : { value : 'mercury' },
                        model    : { value : 'sable' },
                        trim     : { value : 'ls' },
                        mileage  : { value : 70481 },
                        domestic : { value : true }
                    },
                    enableRowMenu  : true,
                    editMenuItem   : 'enabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto007',
                    data : {
                        year     : { value : 1988 },
                        make     : { value : 'nissan' },
                        model    : { value : 'pulsar' },
                        trim     : { value : 'nx' },
                        mileage  : { value : 151312 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto008',
                    data : {
                        year     : { value : 1982 },
                        make     : { value : 'oldsmobile' },
                        model    : { value : 'delta 88' },
                        trim     : { value : 'royale', displayValue : 'Royale' },
                        mileage  : { value : 216673 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto009',
                    data : {
                        year     : { value : 2001 },
                        make     : { value : 'toyota' },
                        model    : { value : 'camry' },
                        trim     : { value : 'xle' },
                        mileage  : { value : 83306 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'enabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto010',
                    data : {
                        year     : { value : 1991 },
                        make     : { value : 'buick' },
                        model    : { value : 'century' },
                        trim     : { value : '' },
                        mileage  : { value : 124991 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto011',
                    data : {
                        year     : { value : 1993 },
                        make     : { value : 'cadillac' },
                        model    : { value : 'fleetwood' },
                        trim     : { value : '' },
                        mileage  : { value : 97772 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto012',
                    data : {
                        year     : { value : 2003 },
                        make     : { value : 'lincoln' },
                        model    : { value : 'town car' },
                        trim     : { value : 'signature series', displayValue : 'Signature Series' },
                        mileage  : { value : 60138 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'enabled',
                    deleteMenuItem : 'enabled',
                    enableRowMenus : false
                },
                {
                    id   : 'auto013',
                    data : {
                        year     : { value : 1988 },
                        make     : { value : 'mazda' },
                        model    : { value : '323' },
                        trim     : { value : 'gt-x' },
                        mileage  : { value : 101188 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto014',
                    data : {
                        year     : { value : 1999 },
                        make     : { value : 'gmc', displayValue : 'GMC' },
                        model    : { value : 'yukon' },
                        trim     : { value : 'slt' },
                        mileage  : { value : 235006 },
                        domestic : { value : true }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'enabled'
                },
                {
                    id   : 'auto015',
                    data : {
                        year     : { value : 1987 },
                        make     : { value : 'mercedes' },
                        model    : { value : '500sel', displayValue : '500SEL' },
                        trim     : { value : '' },
                        mileage  : { value : 16299 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'disabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto016',
                    data : {
                        year     : { value : 2000 },
                        make     : { value : 'audi' },
                        model    : { value : 'tt', displayValue : 'TT' },
                        trim     : { value : '' },
                        mileage  : { value : 89092 },
                        domestic : { value : false }
                    },
                    editMenuItem   : 'enabled',
                    deleteMenuItem : 'disabled'
                },
                {
                    id   : 'auto017',
                    data : {
                        year     : { value : null },
                        make     : { value : 'yugo' },
                        model    : { value : null },
                        trim     : { value : null },
                        mileage  : { value : null },
                        domestic : { value : null }
                    },
                    editMenuItem    : 'disabled',
                    deleteMenuItem  : 'disabled',
                    customMenuItems : [
                        {
                            iconClass : 'plus',
                            label     : "Augment",
                            eventCode : 'add'
                        },
                        {
                            iconClass : 'refresh',
                            label     : "Recycle",
                            eventCode : 'recyle'
                        },
                        {
                            iconClass : 'camera',
                            label     : "Take Photo",
                            eventCode : 'photo'
                        },
                        {
                            iconClass : 'cart',
                            label     : "Add to Cart",
                            eventCode : 'cart'
                        },
                        {
                            iconClass : 'clock',
                            label     : "Reset Clock",
                            eventCode : 'clock'
                        },
                        {
                            iconClass : 'gear',
                            label     : "Repair",
                            eventCode : 'repair'
                        },
                        {
                            iconClass : 'power',
                            label     : "Power Up",
                            eventCode : 'power'
                        },
                        {
                            iconClass : 'play',
                            label     : "Play",
                            eventCode : 'play'
                        },
                        {
                            iconClass : 'pause',
                            label     : "Pause",
                            eventCode : 'pause'
                        },
                        {
                            iconClass : 'null',
                            label     : "Null",
                            eventCode : 'null'
                        },
                        {
                            iconClass : 'share',
                            label     : "Share",
                            eventCode : 'share'
                        },
                        {
                            iconClass : 'link',
                            label     : "Link",
                            eventCode : 'link'
                        },
                        {
                            iconClass : 'data',
                            label     : "Data",
                            eventCode : 'data'
                        },
                        {
                            iconClass : 'controls',
                            label     : "Controls",
                            eventCode : 'controls'
                        },
                        {
                            iconClass : 'lock',
                            label     : "Lock",
                            eventCode : 'lock'
                        },
                        {
                            iconClass : 'key',
                            label     : "Key",
                            eventCode : 'key'
                        },
                        {
                            iconClass : 'target',
                            label     : "Target",
                            eventCode : 'target'
                        },
                        {
                            iconClass : 'filter',
                            label     : "Filter",
                            eventCode : 'filter'
                        },
                        {
                            iconClass : 'chip',
                            label     : "Chip",
                            eventCode : 'chip'
                        },
                        {
                            iconClass : 'help',
                            label     : "Help",
                            eventCode : 'help'
                        },
                        {
                            iconClass : 'document',
                            label     : "Document",
                            eventCode : 'document'
                        }
                    ]
                }
            ]
        };
    },
    watch : {
        dark : {
            immediate : true,
            handler(newValue) {
                document.documentElement.classList.toggle('dark', newValue);
            }
        }
    },
    methods : {
        handleChangeDark(event) {
            this.dark = this.$refs.darkInput.checked;
        },
        handleChangeSelect(event) {
            this.enableSelect = this.$refs.selectInput.checked;
        },
        handleChangeRowMenu(event) {
            this.enableRowMenus = this.$refs.rowMenuInput.checked;
        },
        handleChangeRefreshActionOn(event) {
            this.refreshActionOn = this.$refs.refreshActionOnInput.checked;
        },
        handleChangeRefreshActionEnabled(event) {
            this.refreshActionEnabled = this.$refs.refreshActionEnabledInput.checked;
        },
        handleChangeAddActionOn(event) {
            this.addActionOn = this.$refs.addActionOnInput.checked;
        },
        handleChangeAddActionEnabled(event) {
            this.addActionEnabled = this.$refs.addActionEnabledInput.checked;
        },
        handleTableAdd() {
            const auto = this.rows.find(item => (item.id === 'auto999'));
            if (auto) {
                return;
            }

            this.tableRefreshing = true;

            setTimeout(() => {
                this.rows.push({
                    id   : 'auto999',
                    data : {
                        year     : { value : 2019 },
                        make     : { value : 'audi' },
                        model    : { value : 's5' },
                        trim     : { value : 'prestige', displayValue : 'Prestige' },
                        mileage  : { value : 18000 },
                        domestic : { value : false }
                    }
                });
                this.addActionEnabled = false;
                this.tableRefreshing  = false;
            }, 2000);
        },
        handleTableRefresh() {
            this.tableRefreshing = true;
            setTimeout(() => { this.tableRefreshing = false; }, 2000);
        },
        handleRowMenuItem(args) {
            let action = '';
            if (args.eventCode === 'row-edit') {
                action = "Edit";
            } else if (args.eventCode === 'row-delete') {
                action = "Delete";
            }

            if (action) {
                const row = this.rows.find(item => item.id === args.rowId);

                if (row) {
                    const parts = [
                        row.data.year.value, row.data.make.value,
                        row.data.model.value
                    ].filter(item => !! item);

                    alert(`${action} ${parts.join(' ')}`);
                }
            }
        },
        handleTableMenuItem(args) {
            // Do something here to respond to table menu items
        }
    }
};

</script>

<style>

html {
    background-color:#FFFFFF;
    height:100%;
    padding:0px;
    margin:0px;
}

html.dark {
    background-color:#000000;
}

body {
    color:#333333;
    font-family:avenir, "helvetica neue", helvetica, arial, sans-serif;
    height:100%;
    padding:0px;
    margin:0px;
}

html.dark body {
    color:#FFFFFF;
}

.bold {
    font-weight:bold;
}

.options {
    columns:3;
}

.options .option {
    padding:0px;
}

.options .option .header {
    border-bottom:1px solid #CCCCCC;
}

.options .option label {
    display:block;
    white-space:nowrap;
}

#app {
    padding:10px 20px;
}

div.anwansi_table > table {
    border-collapse:collapse;
    font-family:avenir, "helvetica neue", helvetica, arial, sans-serif;
    font-size:0px;
}

div.anwansi_table > table th {
    font-size:14px;
    line-height:14px;
    font-weight:normal;
    padding:5px 15px;
    background-color:#E5E5E5;
    border:1px solid #CCCCCC;
    vertical-align:bottom;
}

div.anwansi_table > table td {
    padding:0px;
    transition:background-color 250ms;
    vertical-align:top;
    border-bottom:1px solid #E5E5E5;
}

div.anwansi_table > table td:first-child {
    border-left:1px solid #E5E5E5;
}

div.anwansi_table > table td:last-child {
    border-right:1px solid #E5E5E5;
}

div.anwansi_table > table td > div.cell_content {
    font-size:14px;
    padding:3px 0px;
}

div.anwansi_table > table td.configured > div.cell_content {
    padding:3px 10px;
}

div.anwansi_table > table tr:hover td {
    background-color:rgba(51, 102, 255, 0.1);
}

div.anwansi_table > table th.system.select,
div.anwansi_table > table th.system.menu {
    padding:5px;
}

div.anwansi_table > table td.system > div.cell_content {
    padding:3px 3px;
}

div.anwansi_table.dark > table th {
    background-color:#333333;
    border-color:#666666;
}

div.anwansi_table.dark > table td {
    border-color:#4C4C4C;
}

</style>
