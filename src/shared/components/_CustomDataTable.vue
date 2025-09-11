<template>
  <v-data-table
    :id="id"
    v-bind="$attrs"
    ref="customDataTable"
    class="no-select"
    :class="{
      'custom-data-table': !normalizeTable,
      'normalized-data-table': normalizeTable,
    }"
    color="primary"
    mobile-breakpoint="100"
    :items-per-page-options="[
      { value: 10, title: '10' },
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
    ]"
    :hide-default-footer="hideDefaultFooter"
    :headers="[
      // {
      //   title: '',
      //   value: '$$link',
      //   sortable: false,
      //   minWidth: '20px',
      //   width: '20px',
      // },
      ...computedHeaders,
    ]"
    :items="tableItems"
    @update:options="sortItems"
  >
    <template #item.$$link="{ item, column }">
      <router-link
        :to="
          getLinkPath({
            item,
            column,
            linkPrefix: column.linkPrefix,
          })
        "
        class="d-flex justify-center"
      >
        <v-img
          :src="getImageUrl('icons/openicon.png')"
          max-width="22"
          width="22"
          class="cursor-pointer"
        >
          <!-- <v-menu
              width="125"
              activator="parent"
            >
              <v-list
                class="rounded-md"
                density="compact"
              >
                <v-list-item
                  v-for="(action, index) in column.actions || [
                    { title: 'Update' },
                  ]"
                  :key="index"
                  :to="
                    getLinkPath({
                      item,
                      column,
                      linkPrefix: column.linkPrefix,
                    })
                  "
                >
                  <v-list-item-title class="text-center">
                    {{ action.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
        </v-img>
      </router-link>
    </template>

    <template #item.$$default="{ item, column }">
      {{ getValue({ item, column }) }}
    </template>

    <template #item.$$percentage="{ item, column }">
      {{ getValue({ item, column, append: '%' }) }}
    </template>

    <template #item.$$boolean="{ item, column }">
      <v-icon
        v-if="column.getValue(item)"
        size="small"
      >
        {{ column.getValue(item) ? 'mdi-check-bold' : '' }}
      </v-icon>
    </template>

    <!-- <template #item.$$amount="{ item, column }">
        <shared-amount-value
          :amount="getValue({ item, column, defaultValue: 0 })"
        />
      </template> -->

    <template #item.$$toggle="{ item, column }">
      <div class="toggle-switch">
        <v-switch
          v-model="item[column.valueFrom]"
          color="primary"
          inset
          hide-details
          @update:modelValue="(e) => $emit('on-toggle', e, item)"
        />
      </div>
    </template>
    <template #item.$$redirectedTo="{ item, column }">
      <a
        v-if="column.getPath(item).path"
        class="text-primary cursor-pointer"
        @click="redirectedToPath(column.getPath(item))"
      >
        {{ getValue({ item, column }) }}
      </a>
      <span v-else-if="column.getPath(item).value">
        {{ getValue({ item, column }) }}
      </span>
      <span v-else> N/A </span>
    </template>
    <!-- <template #item.isRoundTrip="{ item }">
            {{ item.childOf ? "Yes" : "No" }}
          </template> -->

    <template #item.$$chip="{ item, column }">
      <v-chip
        variant="flat"
        :color="getStatusColor(item[column.valueFrom])"
      >
        {{ getValue({ item, column, operations: ['titleCase'] }) }}
      </v-chip>
    </template>

    <template #item.$$phoneNumber="{ item, column }">
      {{ formatPhoneNumber(getValue({ item, column })) }}
    </template>

    <template #item.$$date="{ item, column }">
      {{ formatDate(getValue({ item, column })) }}
    </template>

    <template #item.$$convertCase="{ item, column }">
      <v-tooltip
        v-if="column.isTooltip"
        location="top"
        color="black"
      >
        <template #activator="{ props }">
          <div
            v-bind="props"
            class="truncate"
          >
            {{ getValueForToolTip({ item, column }) }}
          </div>
        </template>
        <p>
          {{ getValueForToolTip({ item, column }) }}
        </p>
      </v-tooltip>
      <span v-else>
        {{ getValueForToolTip({ item, column }) }}
      </span>
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
import _, { isBoolean } from 'lodash';
import moment from 'moment';
import { getImageUrl } from '@/composables';

export default {
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
  },
  data: () => ({
    tableItems: [],
  }),
  computed: {
    computedHeaders() {
      return this.headers
        .filter((x) => !x.hideHeader)
        .map((header) => {
          const returnValue = header;
          returnValue.sortable = isBoolean(header.sortable)
            ? header.sortable
            : true;
          if (returnValue.sortable) {
            returnValue.key = header.valueFrom;
          }
          if (header.value === '$$link') {
            returnValue.sortable = false;
            returnValue.cellProps = {
              class: 'table-link-wrapper',
            };
          }
          console.log(returnValue, 'returnValue');
          return returnValue;
        });
    },
    headersToHideInTable() {
      return this.headers.filter(
        (h) => !h.hideHeader && h.title !== 'Actions'
      );
    },
  },
  watch: {
    items() {
      this.tableItems = this.items;
    },
  },
  methods: {
    getImageUrl,
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
        defaultValue = '-',
      } = {},
      ...args
    ) {
      if (column.getValue && typeof column.getValue === 'function') {
        return column.getValue(item, column);
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

      return value ? `${preAppend}${value}${append}` : defaultValue;
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
        if (subString in object) {
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

      console.log(sortBy, 'sortBy');

      if (sortBy.length) {
        const sortKey = sortBy[0].key || 'firstName';
        const sortOrder = sortBy[0].order;
        items.sort((a, b) => {
          const aValue = a[sortKey] || a.firstName;
          const bValue = b[sortKey] || b.firstName;

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

          console.log(sort, 'sort');
          return sortOrder === 'desc' ? -sort : sort;
        });
      }

      const paginated = items.slice(start, end);
      this.$emit('update:items', paginated);
      this.tableItems = paginated;
    },
  },
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
        background-color: rgba(var(--custom-table-header-color));
        background-color: #ccdff0;
        color: #125991;

        border: 1px solid var(--custom-table-stroke);
        font-weight: bolder !important;
        // min-width: 90px;

        span {
          font-size: 14px !important;
        }
      }
    }

    tbody {
      .v-data-table__td {
        border: 1px solid var(--custom-table-stroke);
        border-bottom: 1px solid var(--custom-table-stroke) !important;
        font-size: 14px !important;
        // min-width: 90px;
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

          &:hover {
            background-color: #eeeeee;
          }
        }
      }
    }
  }

  .v-data-table-footer {
    .v-data-table-footer__items-per-page {
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
    font-size: 12px !important;
  }
}

.toggle-switch {
  .v-selection-control {
    display: flex;
    justify-content: center;
  }
}
</style>
