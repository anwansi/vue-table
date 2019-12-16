<template>
  <th :class="cellClasses"
      :style="cellStyle"
      @click="handleClick">
    <div class="content">
      <div v-if="canSort" class="pre_content"></div>
      <div v-if="isSelectColumn" class="cell_content">
        <div class="select all"
             title="Select all rows"
             @click="handleClickAll"></div>
        <div class="select reverse"
             title="Reverse selections"
             @click="handleClickReverse"></div>
        <div class="select none"
             title="Unselect all rows"
             @click="handleClickNone"></div>
      </div>
      <div v-if="isMenuColumn" class="cell_content"></div>
      <div v-else class="cell_content">{{ column.name }}</div>
      <div v-if="canSort" class="post_content"></div>
    </div>
  </th>
</template>

<script>

import validation from './validation';

export default {
    name    : "HeadCell",
    props   : {
        dark : {
            type    : Boolean,
            default : false
        },
        column : {
            type    : Object,
            default : () => {},
            validator(value) {
                return validation.validateColumnDef(value);
            }
        }
    },
    computed : {
        isSystemColumn() {
            return (this.column && this.column.system);
        },
        isSelectColumn() {
            return (this.isSystemColumn && this.column.id === '_select');
        },
        isMenuColumn() {
            return (this.isSystemColumn && this.column.id === '_menu');
        },
        cellStyle() {
            const result = {
                display : this.column.hidden ? 'none' : ''
            };

            if (! this.isSystemColumn) {
                result.cursor = 'pointer';
            }

            return result;
        },
        canSort() {
            return ! this.isSystemColumn;
        },
        cellClasses() {
            const column  = this.column;
            const classes = [];

            switch (column.sortDirection) {
                case 'asc':
                    classes.push('sort_asc');
                    break;
                case 'desc':
                    classes.push('sort_desc');
                    break;
            }

            if (this.isSystemColumn) {
                classes.push('system');
                if (this.isSelectColumn) {
                    classes.push('select');
                }
                if (this.isMenuColumn) {
                    classes.push('menu');
                }
            } else {
                classes.push('configured');
            }

            if (this.dark) {
                classes.push('dark');
            }

            return classes;
        }
    },
    methods : {
        handleClick(event) {
            if (this.canSort) {
                this.$emit('click');
            }
        },
        handleClickAll(event) {
            if (this.isSelectColumn) {
                this.$emit('select-all');
            }
        },
        handleClickNone(event) {
            if (this.isSelectColumn) {
                this.$emit('select-none');
            }
        },
        handleClickReverse(event) {
            if (this.isSelectColumn) {
                this.$emit('select-reverse');
            }
        }
    }
};

</script>

<style scoped>

.content {
    display:flex;
    flex-wrap:nowrap;
    justify-content:center;
    align-items:center;
}

.pre_content,
.post_content {
    flex-grow:0;
    flex-shrink:0;
    width:8px;
    height:0px;
}

th.sort_asc .post_content,
th.sort_desc .post_content {
    width:0px;
    border-width:8px 4px 0px 4px;
    border-style:solid;
    border-color:#333333 transparent transparent transparent;
    transform-origin:50% 50%;
    transition:transform 500ms;
}

th.sort_asc.dark .post_content,
th.sort_desc.dark .post_content {
    border-top-color:#CCCCCC;
}

th.sort_desc .post_content {
    transform:scaleY(-1);
}

.cell_content {
    margin:auto 3px;
}

th.select .cell_content {
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:flex-start;
}

.cell_content > .select {
    width:10px;
    height:10px;
    font-size:0px;
    border:1px solid #333333;
    margin:1px;
    cursor:pointer;
    position:relative;
    top:0px;
}

.cell_content > .select:active {
    top:1px;
}

.cell_content > .select.all {
    background-color:#333333;
}

.cell_content > .select.none {
}

.cell_content > .select.reverse {
    background-image:linear-gradient(to right, rgba(51, 51, 51, 0) 50%, rgba(51, 51, 51, 1) 50%);
}

th.dark .cell_content > .select {
    border-color:#E6E6E6;
}

th.dark .cell_content > .select.all {
    background-color:#E6E6E6;
}

th.dark .cell_content > .select.none {
}

th.dark .cell_content > .select.reverse {
    background-image:linear-gradient(to right, rgba(230, 230, 230, 0) 50%, rgba(230, 230, 230, 1) 50%);
}


</style>
