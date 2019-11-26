<template>
  <th :class="cellClasses"
      :style="cellStyle"
      @click="handleClick">
    <div class="content">
      <div v-if="canSort" class="pre_content"></div>
      <div class="cell_content">{{ column.name }}</div>
      <div v-if="canSort" class="post_content"></div>
    </div>
  </th>
</template>

<script>

import validation from './validation';

export default {
    name    : "HeadCell",
    props   : {
        column : {
            type    : Object,
            default : () => {},
            validator(value) {
                return validation.validateColumnDef(value);
            }
        }
    },
    computed : {
        systemColumn() {
            return (this.column && this.column.system);
        },
        cellStyle() {
            const result = {
                display : this.column.hidden ? 'none' : ''
            };

            if (! this.systemColumn) {
                result.cursor = 'pointer';
            }

            return result;
        },
        canSort() {
            return ! this.systemColumn;
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

            if (column.system) {
                classes.push('system');
                if (column.id === '_select') {
                    classes.push('select');
                }
            } else {
                classes.push('configured');
            }

            return classes;
        }
    },
    methods : {
        handleClick(event) {
            if (this.canSort) {
                this.$emit('click');
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

th.sort_desc .post_content {
    transform:scaleY(-1);
}

.cell_content {
    margin:auto 3px;
}

</style>
