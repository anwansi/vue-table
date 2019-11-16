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
                { id : 'make',  name : 'Make' },
                { id : 'model', name : 'Model' }
            ],
            rows : [
                {
                    make  : { value : 'Chevrolet' },
                    model : { value : 'Caprice Classic' }
                },
                {
                    make  : { value : 'Pontiac' },
                    model : { value : 'Firebird' }
                }
            ]
        };
    }
};

</script>

<style>

table.anwansi_table {
    font-family:avenir, "helvetica neue", helvetica, arial, sans-serif;
}
</style>
