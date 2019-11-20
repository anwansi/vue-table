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
                    id     : 'country',
                    name   : 'Country',
                    type   : 'string',
                    format : { stringUpper : true }
                },
                {
                    id     : 'owned',
                    name   : 'Owned',
                    type   : 'boolean',
                    format : {
                        booleanTextMap : { 'true' : 'Yes', 'false' : 'No' }
                    }
                }
            ],
            rows : [
                {
                    year    : { value : 1980 },
                    make    : { value : 'chevrolet' },
                    model   : { value : 'caprice classic' },
                    country : { value : 'usa' },
                    owned   : { value : true }
                },
                {
                    year    : { value : 1989 },
                    make    : { value : 'pontiac' },
                    model   : { value : 'firebird' },
                    country : { value : 'uk' },
                    owned   : { value : false }
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
