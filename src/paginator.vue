<template>
  <div :class="['paginator', { dark }]">
    <div class="section sizes" v-if="showSizes">
      Show
      <div class="size" v-for="(item, i) in pageSizeMeta" :key="i">
        <span v-if="item.size === pageSize">{{ item.label }}</span>
        <span v-else
              class="clickable"
              @click="handleClickSize(item.all, item.size)">{{ item.label }}</span>
      </div>
    </div>
    <div class="section range" v-if="showRange && paged">{{ pageRange }}</div>
    <div class="section links" v-if="showNav && multiplePages">
      <span class="previous" @click="handleClickPrevious"></span>
      <template v-for="(item, i) in linkMeta">
        <span v-if="item.spacer" class="spacer"
              :key="`spacer-${i}`">&hellip;</span>
        <span v-else-if="item.page"
              :key="`pagelink-${i}`"
              :class="['page', { current : item.current, clickable : ! item.current }]"
              @click="handleClickPage(item.page)">{{ item.page }}</span>
      </template>
      <span class="next" @click="handleClickNext"></span>
    </div>
  </div>
</template>

<script>

export default {
    name    : 'Paginator',
    data() {
        return {};
    },
    props : {
        dark : {
            type    : Boolean,
            default : false
        },
        showSizes : {
            type    : Boolean,
            default : true
        },
        showRange : {
            type    : Boolean,
            default : true
        },
        showNav : {
            type    : Boolean,
            default : true
        },
        rowCount : {
            type    : Number,
            default : 0
        },
        pageSize : {
            type    : Number,
            default : 10
        },
        pageSizes : {
            type    : Array,
            default : () => [10, 25, 100],
            validator(value) {
                return value.every(item => {
                    const size = parseInt(item);
                    return ! isNaN(size) && (size === item);
                });
            }
        },
        allowAll : {
            type    : Boolean,
            default : true
        },
        currentPage : {
            type    : Number,
            default : 1
        },
        linkSpan : {
            type    : Number,
            default : 1
        }
    },
    computed : {
        pageCount() {
            if (this.pageSize) {
                return Math.ceil(this.rowCount / this.pageSize);
            }

            return 1;
        },
        multiplePages() {
            return this.pageCount > 1;
        },
        paged() {
            return ! isNaN(parseInt(this.pageSize));
        },
        pageRange() {
            if (this.pageSize) {
                const size  = this.pageSize || 1;
                const first = Math.max(this.currentPage - 1, 0) * size + 1;
                const last  = Math.min(first + size - 1, this.rowCount);

                if (first === last) {
                    return `${first} / ${this.rowCount}`;
                }
                return `${first} - ${last} / ${this.rowCount}`;
            }

            return '';
        },
        pageSizeMeta() {
            const links = this.pageSizes.map(size => ({
                size,
                label : `${size}`
            }));

            if (this.allowAll) {
                links.push({
                    all   : true,
                    label : 'All'
                });
            }

            return links;
        },
        linkMeta() {
            const curPage   = this.currentPage;
            const pageCount = this.pageCount;
            const items     = [];

            const min = Math.max(curPage - this.linkSpan, 1);
            const max = Math.min(curPage + this.linkSpan, pageCount);

            for (let i = min; i <= max; i++) {
                items.push({
                    page    : i,
                    current : (curPage === i)
                });
            }

            if (items.length) {
                const head = items[0].page;
                const tail = items[items.length - 1].page;

                if (head > 1) {
                    if (head > 2) {
                        items.unshift({ spacer : true });
                    }
                    items.unshift({
                        page    : 1,
                        current : (curPage === 1)
                    });
                }

                if (tail < pageCount) {
                    if (tail < (pageCount - 1)) {
                        items.push({ spacer : true });
                    }
                    items.push({
                        page    : pageCount,
                        current : (curPage === pageCount)
                    });
                }
            }

            return items;
        }
    },
    methods : {
        handleClickSize(all, size) {
            if (size === this.pageSize) {
                return;
            }
            this.$emit('click-page', 1);
            this.$emit('page-size', all ? null : size);
        },
        handleClickPrevious(event) {
            if (this.currentPage <= 1) {
                return;
            }

            this.$emit('click-page', this.currentPage - 1);
        },
        handleClickNext(event) {
            if (this.currentPage >= this.pageCount) {
                return;
            }

            this.$emit('click-page', this.currentPage + 1);
        },
        handleClickPage(page) {
            this.$emit('click-page', page);
        }
    }
};

</script>

<style scoped>

.paginator {
    padding:5px 3px;
    display:flex;
    flex-wrap:nowrap;
    align-items:flex-end;
    font-size:0px;
}

.clickable {
    color:#3366CC;
    cursor:pointer;
    text-decoration:underline;
}

.section {
    margin-left:25px;
}

.links {
    display:flex;
    justify-content:center;
    align-items:center;
}

.links .spacer {
    font-size:10px;
    padding:0px 5px;

}

.links .previous,
.links .next {
    width:0px;
    height:0px;
    cursor:pointer;
}

.links .previous {
    border-style:solid;
    border-width:5px 5px 5px 0px;
    border-color:transparent #333333 transparent transparent;
    margin-right:5px;
}

.links .next {
    border-style:solid;
    border-width:5px 0px 5px 5px;
    border-color:transparent transparent transparent #333333;
    margin-left:5px;
}

.links .page {
    font-size:12px;
    padding:0px 3px;
}

.links .page:not(.clickable) {
    color:#333333;
}

.dark .links .page:not(.clickable) {
    color:#CCCCCC;
}

.dark .links .previous {
    border-right-color:#CCCCCC;
}

.dark .links .next {
    border-left-color:#CCCCCC;
}

.sizes {
    font-size:12px;
    display:flex;
    flex-wrap:nowrap;
}

.sizes > .size {
    margin:0px 5px;
}

.range {
    font-size:12px;
}

</style>
