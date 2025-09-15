<template>
  <v-data-table
    :id="id"
    v-model="selectedItems"
    ref="customDataTable"
    :class="{
      'custom-data-table': !normalizeTable,
      'normalized-data-table': normalizeTable,
    }"
    color="primary"
    mobile-breakpoint="100"
    :hover="rowClickable"
    :page-text="`Showing ${itemsPerPageOptions.start} to ${itemsPerPageOptions.end} of ${totalItems}`"
    :items-per-page-options="[
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
    ]"
    :hide-default-footer="hideDefaultFooter"
    :headers="computedHeaders"
    :items="items"
    v-bind="$attrs"
    @update:options="sortItems"
  >
    <template #header.data-table-select="{ column }">
      <div class="d-flex justify-center">
        <v-checkbox
          :model-value="selectedItems.length === tableItems.length"
          hide-details
          color="blue"
          density="compact"
          :indeterminate="
            selectedItems.length > 0 &&
            selectedItems.length !== tableItems.length
          "
          style="width: 25px"
          @update:modelValue="tableHeaderSelectClicked"
        />
      </div>
    </template>
    <template #item="{ item, index }">
      <tr
        class="v-data-table__tr"
        :class="{ 'cursor-pointer': rowClickable }"
        @click="() => $emit('click:row', { item, index })"
      >
        <td
          v-if="Object.keys($attrs).includes('show-select')"
          class="v-data-table__td v-data-table-column--align-center"
        >
          <v-checkbox
            :id="`selectable-item-${index}`"
            :model-value="
              selectedItems.findIndex((i) => i._id === item._id) !==
              -1
            "
            hide-details
            color="blue"
            density="compact"
            style="width: 25px"
            @update:modelValue="() => itemSelected(item)"
          />
        </td>
        <td
          v-for="col in computedHeaders"
          :key="col.value"
          class="v-data-table__td"
          :class="[
            `v-data-table-column--align-${col.align || 'start'}`,
          ]"
          v-bind="col.cellProps"
        >
          <template v-if="col.value === '$$numbering'">
            {{ index + 1 }}
          </template>

          <template v-else-if="col.value === '$$link'">
            <router-link
              :to="
                col.onClick
                  ? ''
                  : getLinkPath({
                      item,
                      column: col,
                      linkPrefix: col.linkPrefix,
                    })
              "
              class="d-flex justify-center"
              @click="() => col.onClick && col.onClick({ item })"
            >
              <v-img
                :src="getImageUrl('icons/openicon.png')"
                max-width="22"
                width="22"
                class="cursor-pointer"
              />
            </router-link>
          </template>

          <template v-else-if="col.value === '$$default'">
            {{ getValue({ item, column: col, index }) }}
          </template>

          <template v-else-if="col.value === '$$scrollable'">
            <div class="scrollable">
              {{ getValue({ item, column: col, index }) }}
            </div>
          </template>

          <template v-else-if="col.value === '$$percentage'">
            {{ getValue({ item, column: col, append: '%' }) }}
          </template>

          <template v-else-if="col.value === '$$boolean'">
            <v-icon
              v-if="col.getValue(item)"
              size="small"
            >
              {{ col.getValue(item) ? 'mdi-check-bold' : '' }}
            </v-icon>
          </template>

          <template v-else-if="col.value === '$$toggle'">
            <div class="toggle-switch">
              <v-switch
                v-model="item[col.valueFrom]"
                color="primary"
                inset
                hide-details
                @update:modelValue="
                  (e) => $emit('on-toggle', e, item)
                "
              />
            </div>
          </template>

          <template v-else-if="col.value === '$$redirectedTo'">
            <a
              v-if="col.getPath(item).path"
              class="text-primary cursor-pointer"
              @click="redirectedToPath(col.getPath(item))"
            >
              {{ getValue({ item, column: col }) }}
            </a>
            <span v-else-if="col.getPath(item).value">
              {{ getValue({ item, column: col }) }}
            </span>
            <span v-else> N/A </span>
          </template>

          <template v-else-if="col.value === '$$chip'">
            <v-chip
              variant="flat"
              :color="getStatusColor(item[col.valueFrom])"
            >
              {{
                getValue({
                  item,
                  column: col,
                  operations: ['titleCase'],
                })
              }}
            </v-chip>
          </template>

          <template v-else-if="col.value === '$$phoneNumber'">
            {{ formatPhoneNumber(getValue({ item, column: col })) }}
          </template>

          <template v-else-if="col.value === '$$date'">
            {{ formatDate(getValue({ item, column: col })) }}
          </template>

          <template v-else-if="col.value === '$$inputField'">
            <custom-field
              :id="`${col.valueFrom}-input`"
              v-model="item[col.valueFrom]"
              v-bind="col.fieldProps"
            />
          </template>

          <template v-else-if="col.value === '$$checkbox'">
            <div class="d-flex justify-center">
              <v-checkbox
                :id="`${col.valueFrom}-input`"
                v-model="item[col.valueFrom]"
                hide-details
                color="blue"
                density="compact"
                style="width: 25px"
                v-bind="col.fieldProps"
              />
            </div>
          </template>

          <template v-else>
            {{ getValue({ item, column: col }) }}
          </template>
        </td>
      </tr>
    </template>

    <template
      v-for="(index, name) in $slots"
      #[name]="data"
    >
      <slot
        :name="name"
        v-bind="data"
      />
    </template>
  </v-data-table>
</template>
<script>
import _, { cloneDeep, isBoolean, isEqual, merge } from 'lodash';
import moment from 'moment';
import { getImageUrl } from '@/composables';
import CustomField from '@/shared/components/CustomField.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    CustomField,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    dataTableSetting: {
      type: Boolean,
      default: false,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: false,
    },
    normalizeTable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Record',
    },
    actions: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    colorEvenRows: {
      type: Boolean,
      default: true,
    },
    rowClickable: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Array],
      default: () => {},
    },
  },
  data: () => ({
    currentPage: 1,
    itemsPerPageOptions: {
      start: 1,
      end: 10,
    },
    tableItems: [],
    selectedItems: [],
  }),
  computed: {
    computedHeaders() {
      const headerDefaultProps = {
        $$link: {
          sortable: false,
          cellProps: {
            class: 'table-link-wrapper',
          },
        },
        $$inputField: {
          sortable: false,
          cellProps: {
            style: {
              paddingBlock: '5px !important',
            },
          },
        },
        $$phoneNumber: {
          sortable: false,
          cellProps: {
            style: {
              textWrap: 'nowrap',
            },
          },
        },
      };

      return this.headers
        .filter((x) => !x.hideHeader)
        .map((header) => {
          const defaultProps = headerDefaultProps[header.value] ?? {};
          defaultProps.sortable =
            header.sortable ?? defaultProps.sortable ?? true;

          return {
            ...header,
            key: defaultProps.sortable ? header.valueFrom : undefined,
            cellProps: {
              ...defaultProps.cellProps,
              ...header.cellProps,
            },
            headerProps: {
              align: 'center',
              ...header.headerProps,
            },
          };
        });
    },
    headersToHideInTable() {
      return this.headers.filter(
        (h) => !h.hideHeader && h.title !== 'Actions'
      );
    },
    totalItems() {
      return this.items.length;
    },
  },
  watch: {
    items(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.tableItems = newVal;
      }
    },
    selectedItems(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.$emit('update:modelValue', newVal);
      }
    },
  },
  methods: {
    getImageUrl,
    tableHeaderSelectClicked(checked) {
      if (checked) {
        this.selectedItems = cloneDeep(this.tableItems);
      } else {
        this.selectedItems = [];
      }
    },
    itemSelected(item) {
      if (
        this.selectedItems.findIndex((i) => i._id === item._id) === -1
      ) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems = this.selectedItems.filter(
          (i) => i._id !== item._id
        );
      }
    },
    formatString(value, convertFuncName) {
      return _[convertFuncName](value);
    },
    formatPhoneNumber(phone) {
      const cleaned = phone.replace(/\D+/g, '');
      return `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6, 10)}`;
    },
    formatDate(date) {
      const newDate = new Date(date);
      return moment(newDate)
        .tz('America/New_York')
        .format('MM/DD/YYYY - hh:mm A');
    },
    openImageComponent(item) {
      this.$refs[`imageButton_${item.id}`].$refs.imageBtn.$el.click();
    },
    redirectedToPath(item) {
      if (item.newTab) {
        // return this.$$window.open(item.path);
      }
      return this.$router.push(item.path);
    },
    getLinkPath({ item = {}, column = {}, linkPrefix = '' }) {
      let value = this.getNestedValueFromObject(
        item,
        column.valueFrom
      );
      if (linkPrefix) {
        value = `${linkPrefix}/${value}`;
      }
      return `/${value}`;
    },
    getValue(
      {
        item = {},
        column = {},
        append = '',
        preAppend = '',
        operations = [],
        index = null,
        defaultValue = '-',
      } = {},
      ...args
    ) {
      if (column.getValue && typeof column.getValue === 'function') {
        return column.getValue(item, column, index);
      }
      let value = this.getNestedValueFromObject(
        item,
        column.valueFrom
      );

      if (!value && column.secondaryKey) {
        value = this.getNestedValueFromObject(
          item,
          column.secondaryKey
        );
      }

      if (operations.length) {
        value = operations.reduce((acc, operation) => {
          if (this[operation]) {
            acc = this[operation](acc, ...args);
          } else if (_[operation]) {
            acc = _[operation](acc, ...args);
          }
          return acc;
        }, value);
      }
      if (value) {
        return `${preAppend}${value}${append}`;
      }
      column.align = 'center';
      return defaultValue;
    },
    getValueForToolTip(obj = {}) {
      const value = this.getValue(obj);
      return obj?.header?.valueFrom
        ? this.formatString(value, obj?.header?.convertInto)
        : value;
    },
    getNestedValueFromObject(object, string = '') {
      string = string
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '')
        .split('.');
      for (let i = 0; i < string.length; ++i) {
        let subString = string[i];
        if (typeof object === 'object' && subString in object) {
          object = object[subString];
          if (!object) return;
        } else {
          return;
        }
      }
      return object;
    },
    sortItems({ page, itemsPerPage, sortBy }) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const items = this.items.slice();
      this.currentPage = page;
      this.itemsPerPageOptions.start = start + 1;
      this.itemsPerPageOptions.end = end;

      if (sortBy.length) {
        const sortKey = sortBy[0].key;
        const sortOrder = sortBy[0].order;
        items.sort((a, b) => {
          const aValue = a[sortKey];
          const bValue = b[sortKey];

          let sort;

          if (
            typeof aValue === 'number' &&
            typeof bValue === 'number'
          ) {
            sort = aValue - bValue; // Numeric sorting
          } else {
            sort = String(aValue).localeCompare(
              String(bValue),
              undefined,
              { numeric: true, sensitivity: 'base' }
            );
          }

          return sortOrder === 'desc' ? -sort : sort;
        });
      }

      const paginated = items.slice(start, end);
      this.$emit('update:items', paginated);
      this.tableItems = paginated;
    },
  },
  created() {
    if (!this.colorEvenRows) {
      this.$nextTick(() => {
        const tablesRef = this.$refs.customDataTable.$el;
        tablesRef.style.setProperty(
          '--custom-table-stroke',
          '#bdbdbd'
        );
        tablesRef.style.setProperty(
          '--custom-table-even-row-bg-color',
          'white'
        );
      });
    }
    this.selectedItems = this.modelValue;
  },

  mounted() {
  console.log('Component mounted. Table is ready.');

  // Example: Log all item IDs
  this.items.forEach(item => {
    console.log(`Item ID:::::::::::::::::::::::::: ${item._id}`);
  });

  // You can also log selectedItems or currentPage
  console.log('Current Page:', this.currentPage);
  console.log('Selected Items:', this.selectedItems);
}

};
</script>

<style lang="scss">
.custom-data-table {
  --custom-table-stroke: #eeeeee;
  // --custom-table-even-row-bg-color: #e3eeff;
  --custom-table-even-row-bg-color: #f2f7fd;
  --v-table-row-height: 37.8px !important;
  --custom-table-header-color: var(--v-theme-primary);

  .v-table__wrapper {
    padding-bottom: 8px;
    border-radius: 5px;

    thead {
      th {
        background-color: rgba(
          var(--custom-table-header-color)
        ) !important;
        // background-color: #ccdff0;
        color: #222 !important;

        border: 1px solid var(--custom-table-stroke);
        font-weight: bolder !important;
        // min-width: 90px;

        span {
          font-size: 16px !important;
        }
      }
    }

    tbody {
      .v-data-table__td {
        border: 1px solid var(--custom-table-stroke);
        border-bottom: 1px solid var(--custom-table-stroke) !important;
        font-size: 16px !important;

        padding: 0 16px !important;
        transition-duration: 0.28s;
        transition-property: box-shadow, opacity, background, height;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        min-width: fit-content;

        .scrollable {
          max-height: 90px;
          overflow-y: auto;
          white-space: normal;
          word-break: break-word;
          padding: 5px;
        }
      }

      .v-data-table-rows-no-data {
        td {
          text-align: center;
          font-weight: bold;
          color: rgba(var(--v-theme-error));
        }
      }

      .v-data-table-rows-loading {
        td {
          text-align: center;
          font-weight: bold;
        }
      }

      tr:nth-child(even) {
        background-color: var(--custom-table-even-row-bg-color);
      }

      .table-link-wrapper {
        padding: 0 !important;

        > a {
          padding: 8px 16px !important;
          cursor: pointer;
          height: 100%;

          &:hover {
            background-color: #eeeeee;
          }
        }
      }
    }
  }

  .v-data-table-footer {
    .v-data-table-footer__info {
      margin-right: auto;
    }
  }
}

.normalized-data-table {
  .v-table__wrapper {
    thead {
      th {
        padding-inline: 3px !important;
        border-inline: 1px solid #63636336 !important;
        border-bottom: 1px solid #63636336 !important;

        span {
          text-align: center;
          font-weight: 600 !important;
          font-size: 16px !important;
          color: #222 !important;
        }
      }
    }
    tbody {
      .v-data-table__td {
        padding-inline: 3px !important;
        border-inline: 1px solid #63636336 !important;
        border-bottom: 1px solid #63636336 !important;

        font-size: 16px !important;
        text-align: center;
      }
    }
  }
}

.v-data-table-header__content {
  span {
    font-size: 16px !important;
  }
}

.toggle-switch {
  .v-selection-control {
    display: flex;
    justify-content: center;
  }
}
</style>
