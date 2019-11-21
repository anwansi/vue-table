<template>
  <div id="app">
    <h1>Table Demo</h1>
    <vue-table :columns="columns" :rows="rows" />
  </div>
</template>

<script>

import VueTable from './table';

export default {
    name        : "App",
    components  : { VueTable },
    data() {
        return {
            columns : [
                {
                    id     : 'year',
                    name   : 'Year',
                    type   : 'number',
                    format : { numberInteger : true }
                },
                {
                    id     : 'make',
                    name   : 'Make',
                    type   : 'string',
                    format : { stringTitle : true }
                },
                {
                    id     : 'model',
                    name   : 'Model',
                    type   : 'string',
                    format : { stringTitle : true }
                },
                {
                    id     : 'trim',
                    name   : 'Trim',
                    type   : 'string',
                    format : { stringUpper : true }
                },
                {
                    id     : 'mileage',
                    name   : 'Mileage',
                    type   : 'number',
                    format : { numberInteger : true, numberFormat : true }
                },
                {
                    id     : 'domestic',
                    name   : 'Domestic',
                    type   : 'boolean',
                    format : {
                        booleanTextMap : { 'true' : 'Yes', 'false' : 'No' }
                    }
                }
            ],
            rows : [
                {
                    year     : { value : 1986 },
                    make     : { value : 'chevrolet' },
                    model    : { value : 'caprice classic' },
                    trim     : { value : '', displayValue : '' },
                    mileage  : { value : 172191 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1989 },
                    make     : { value : 'pontiac' },
                    model    : { value : 'trans am' },
                    trim     : { value : 'gta' },
                    mileage  : { value : 119774 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1990 },
                    make     : { value : 'honda' },
                    model    : { value : 'accord' },
                    trim     : { value : 'dx' },
                    mileage  : { value : 98394 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 2004 },
                    make     : { value : 'ford' },
                    model    : { value : 'f-150' },
                    trim     : { value : 'xlt' },
                    mileage  : { value : 57510 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1983 },
                    make     : { value : 'volkswagen' },
                    model    : { value : 'rabbit' },
                    trim     : { value : '', displayValue : '' },
                    mileage  : { value : 198987 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 2008 },
                    make     : { value : 'mercury' },
                    model    : { value : 'sable' },
                    trim     : { value : 'ls' },
                    mileage  : { value : 70481 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1988 },
                    make     : { value : 'nissan' },
                    model    : { value : 'pulsar' },
                    trim     : { value : 'nx' },
                    mileage  : { value : 151312 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 1982 },
                    make     : { value : 'oldsmobile' },
                    model    : { value : 'delta 88' },
                    trim     : { value : 'royale', displayValue : 'Royale' },
                    mileage  : { value : 216673 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 2001 },
                    make     : { value : 'toyota' },
                    model    : { value : 'camry' },
                    trim     : { value : 'xle' },
                    mileage  : { value : 83306 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 1991 },
                    make     : { value : 'buick' },
                    model    : { value : 'century' },
                    trim     : { value : '', displayValue : '' },
                    mileage  : { value : 124991 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1993 },
                    make     : { value : 'cadillac' },
                    model    : { value : 'fleetwood' },
                    trim     : { value : '', displayValue : '' },
                    mileage  : { value : 97772 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 2003 },
                    make     : { value : 'lincoln' },
                    model    : { value : 'town car' },
                    trim     : { value : 'signature series', displayValue : 'Signature Series' },
                    mileage  : { value : 60138 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1988 },
                    make     : { value : 'mazda' },
                    model    : { value : '323' },
                    trim     : { value : 'gt-x' },
                    mileage  : { value : 101188 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 1999 },
                    make     : { value : 'gmc', displayValue : 'GMC' },
                    model    : { value : 'yukon' },
                    trim     : { value : 'slt' },
                    mileage  : { value : 235006 },
                    domestic : { value : true }
                },
                {
                    year     : { value : 1987 },
                    make     : { value : 'mercedes' },
                    model    : { value : '500sel', displayValue : '500SEL' },
                    trim     : { value : '', displayValue : '' },
                    mileage  : { value : 16299 },
                    domestic : { value : false }
                },
                {
                    year     : { value : 2000 },
                    make     : { value : 'audi' },
                    model    : { value : 'tt', displayValue : 'TT' },
                    trim     : { value : '', displayValue : '' },
                    mileage  : { value : 89092 },
                    domestic : { value : false }
                }
            ]
        };
    }
};

</script>

<style>

table.anwansi_table {
    border-collapse:collapse;
    font-family:avenir, "helvetica neue", helvetica, arial, sans-serif;
    font-size:0px;
}

table.anwansi_table th {
    font-size:14px;
    padding:0px 15px;
}

table.anwansi_table td {
    padding:0px;
    transition:background-color 250ms;
}

table.anwansi_table td > div.cell_content {
    font-size:14px;
    padding:3px 0px;
}

table.anwansi_table td.system.select > div.cell_content {
    padding:3px 3px;
}

table.anwansi_table td.configured > div.cell_content {
    padding:3px 10px;
}

table.anwansi_table tr:hover td {
    background-color:rgba(51, 102, 255, 0.1);
}

</style>
