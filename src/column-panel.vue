<template>
  <div :class="['column_panel', { dark }]">
    <div class="controls">
      <div v-if="configColumns.length" class="control"><span class="link" @click="handleSelectAll">All</span> <span class="separator"></span> <span class="link" @click="handleSelectNone">None</span><span class="separator"></span> <span class="link" @click="handleSelectReverse">Reverse</span></div>
    </div>
    <div class="columns_list" :style="{ columns : layoutColumnCount }">
      <div class="column_item"
           v-for="column in configColumns"
           :key="column.id">
        <div class="control">
          <checkbox :dark="dark"
                    :checked="! column.hidden"
                    @click="handleClickCheckbox(column)"/>
        </div>
        <div class="meta">
          <div class="column_name">{{ column.name }}</div>
          <div class="column_desc" v-if="column.description">{{ column.description }}</div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button @click="handleClickOk"
              type="button">OK</button>
    </div>
  </div>
</template>

<script>

import Checkbox from './checkbox';

export default {
    name        : "ColumnPanel",
    components  : { Checkbox },
    props       : {
        columns : {
            type : Array
        },
        dark : {
            type    : Boolean,
            default : false
        }
    },
    computed : {
        configColumns() {
            return this.columns.filter(item => ! item.system);
        },
        layoutColumnCount() {
            const colCt = this.configColumns.length;

            if (colCt > 5) {
                if (colCt > 10) {
                    return 3;
                }
                return 2;
            }
            return 1;
        }
    },
    methods : {
        handleClickOk(event) {
            this.$emit('complete');
        },
        handleClickCheckbox(column) {
            this.$emit('toggle-column', column.id);
        },
        handleSelectAll() {
            this.configColumns.forEach(column => {
                this.$emit('show-column', column.id);
            });
        },
        handleSelectNone() {
            this.configColumns.forEach(column => {
                this.$emit('hide-column', column.id);
            });
        },
        handleSelectReverse() {
            this.configColumns.forEach(column => {
                this.$emit('toggle-column', column.id);
            });
        }
    }
};

</script>

<style scoped>

.column_panel {
    padding:20px;
    background-color:rgba(255, 255, 255, 0.5);
    backdrop-filter:blur(5px);
    box-shadow:1px 1px 2px 2px rgba(0, 0, 0, 0.2);
}

.column_panel.dark {
    background-color:rgba(102, 102, 102, 0.5);
    box-shadow:none;
}

.column_panel .controls {
    padding-bottom:10px;
}

.column_panel .controls > .control {
    font-size:14px;
}

.column_panel .controls > .control > .link {
    cursor:pointer;
    color:#004CFF;
}

.column_panel .controls > .control > .separator {
    padding:4px 0px;
    margin:0px 10px;
    border-left:1px solid #666666;
}

.column_panel .column_item {
    display:flex;
    flex-wrap:nowrap;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
}

.column_panel .control {
    padding:1px 5px;
}

.column_panel .column_name {
    font-size:16px;
}

.column_panel .column_desc {
    font-size:12px;
    font-style:italic;
    max-width:100px;
}

.column_panel .buttons {
    padding-top:20px;
    display:flex;
    flex-wrap:nowrap;
    flex-direction:row;
    justify-content:center;
    align-items:flex-end;
}

.column_panel button {
    font-size:14px;
    background-color:#004CFF;
    border:1px solid #004CFF;
    color:#FFFFFF;
    cursor:pointer;
}

</style>
