<template>
  <custom-tabs
    v-model="currentTab"
    :tabs="tabs"
  >
    <template
      v-for="(tab, tabIndex) in tabs"
      :key="tabIndex"
      #[`content-${tabIndex}`]
    >
      <v-container
        fluid
        :class="{
          'mt-8':
            !isTopLeftSlotActive &&
            !tab.btnsConfig?.length &&
            computedFiltersConfig.length,
        }"
      >
        <v-row>
          <v-col
            v-if="isTopLeftSlotActive"
            :cols="tab.topLeftColProps?.cols || 6"
            :md="tab.topLeftColProps?.md || 6"
            :sm="tab.topLeftColProps?.sm || 6"
            :class="{ 'py-0': $vuetify.display.xs }"
            v-bind="tab.topLeftColProps"
          >
            <slot
              :name="`topLeft${tabIndex}`"
              v-bind="tab"
            />
          </v-col>
          <v-col
            v-if="tab.btnsConfig?.length"
            :cols="isTopLeftSlotActive ? 6 : 12"
            class="d-flex flex-wrap justify-end ga-2"
          >
            <custom-btn
              v-for="(btn, btnIdx) in tab.btnsConfig"
              :key="btnIdx"
              :id="`${snakeCase(tab.title)}_${snakeCase(btn.title)}`"
              color="#d2d4d7"
              density="comfortable"
              v-bind="btn"
              @click="btn.onClick"
            >
              {{ btn.title }}
            </custom-btn>
          </v-col>
        </v-row>

        <div
          v-if="computedFiltersConfig.length"
          class="border-md mt-1 py-5"
        >
          <v-row
            v-for="(fieldsArray, filterIdx) in computedFiltersConfig"
            :key="filterIdx"
            class="w-100 ga-32"
            style="justify-self: center"
            justify="center"
          >
            <v-col
              v-for="(field, fieldIdx) in fieldsArray"
              :key="fieldIdx"
              :cols="field.cols || 6"
              :md="field.md || 3"
              :sm="field.sm || 4"
              v-bind="field.colProps"
            >
              <component
                v-if="field.config?.mask?.length"
                v-model="filtersPayload[field.vModel]"
                :id="field.id"
                :is="field.component"
                v-bind="field.props"
                v-mask="field.config?.mask || []"
                @update:modelValue="filtersChanged"
              />
              <component
                v-else-if="field.component"
                v-model="filtersPayload[field.vModel]"
                :id="field.id"
                :is="field.component"
                v-bind="field.props"
                @update:modelValue="filtersChanged"
              />
              <custom-btn
                v-if="field.showRunBtn"
                id="run-btn"
                color="#d2d4d7"
                density="compact"
                :text-bold="false"
                @click="onRunClick"
              >
                Run
              </custom-btn>
            </v-col>
          </v-row>
        </div>

        <v-row class="mt-1">
          <v-col
            v-if="!tab.hideSearchBar"
            cols="12"
            md="3"
            sm="6"
            class="d-flex ga-3 my-3"
            :class="{ 'mb-0': $vuetify.display.smAndDown }"
          >
            <custom-field
              v-model="filtersPayload.search"
              :id="`${tab.title}-search`"
              placeholder="Quick Search"
              append-inner-icon="mdi-magnify"
              class="w-100"
              hide-details
              clearable
              @update:modelValue="handleOnSearchChange"
              @click:appendInner="handleOnSearchChange"
            />
            <help-menu
              v-if="!tab.hideHelpMenu"
              v-bind="tab.helpMenuProps"
            />
          </v-col>
          <v-col
            v-if="slots[`searchRow${tabIndex}`]"
            cols="12"
            md="8"
            class="d-flex align-center justify-end"
          >
            <slot :name="`searchRow${tabIndex}`" />
          </v-col>

          <v-col
            cols="12"
            class="py-0"
          >
            <custom-data-table
              :id="`${tab.title}_${tabIndex}_table`"
              :loading="isLoading"
              :no-data-text="
                tab.tableProps?.noDataText || 'Data not found!'
              "
              v-bind="tab.tableProps"
              v-on="tab.tableProps?.events || {}"
            >
            </custom-data-table>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-tabs>
</template>

<script setup>
import { cloneDeep, debounce, snakeCase } from 'lodash';

import HelpMenu from '@/components/HelpMenu.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomDataTable from '@/shared/components/CustomDataTable.vue';
import CustomTabs from '@/shared/components/CustomTabs.vue';
import CustomSelect from '@/shared/components/CustomSelect.vue';
import { ref, computed, useSlots, onMounted } from 'vue';
import { VCheckbox } from 'vuetify/components';

const emits = defineEmits([
  'update:tab',
  'update:filters',
  'update:search',
  'run:clicked',
]);

const slots = useSlots();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    default: [],
  },
  tab: {
    type: Number,
    default: 0,
  },
  items: {
    type: Array,
    default: [],
  },
  headers: {
    type: Array,
    default: [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const filtersPayload = ref({});

const DEFAULT_FILTER_KEY_VALUE_PAIRS = {
  estimator: {
    cols: 6,
    md: 3,
    sm: 4,
    vModel: 'estimator',
    id: 'estimator',
    component: CustomSelect,
    props: {
      items: [],
      clearable: true,
      hideDetails: true,
      label: 'Estimator',
      itemTitle: 'firstName',
      itemValue: '_id',
    },
  },
  insurance: {
    cols: 6,
    md: 3,
    sm: 4,
    vModel: 'insuranceSearch',
    id: 'insurance_search_field',
    component: CustomField,
    props: {
      clearable: true,
      hideDetails: true,
      label: 'Insurance',
    },
  },
  days: {
    cols: 6,
    md: 3,
    sm: 4,
    vModel: 'days',
    id: 'days_select_option',
    component: CustomSelect,
    props: {
      clearable: true,
      hideDetails: true,
      label: 'Select Days',
      placeholder: 'Select Days',
      items: [
        // { title: '-', value: null },
        { title: '1 - 10 Days', value: '1' },
        { title: '11 - 20 Days', value: '11' },
        { title: '21 - 30 Days', value: '21' },
        { title: '31 - 40 Days', value: '31' },
        { title: '41 - 50 Days', value: '41' },
        { title: '51 - 60 Days', value: '51' },
      ],
    },
  },
  saveAsDefault: {
    cols: 6,
    md: 3,
    sm: 4,
    vModel: 'saveAsDefault',
    id: 'save_default_checkbox',
    component: VCheckbox,
    showRunBtn: true,
    props: {
      hideDetails: true,
      label: 'Save As Default',
      color: 'blue',
      density: 'compact',
      class: '',
      // onClick: (e) => {
      //   updateLocalStorage(e.target.checked);
      // },
    },
  },
};
const DEFAULT_FILTERS_CONFIG = {
  ESTIMATOR: DEFAULT_FILTER_KEY_VALUE_PAIRS.estimator,
  INSURANCE: DEFAULT_FILTER_KEY_VALUE_PAIRS.insurance,
  DAYS: DEFAULT_FILTER_KEY_VALUE_PAIRS.days,
  SAVE_AS_DEFAULT: DEFAULT_FILTER_KEY_VALUE_PAIRS.saveAsDefault,
};

const localStorageKey = computed(() => {
  return `${props.id}::default-values`;
});
const currentTab = computed({
  get() {
    return props.tab;
  },
  set(val) {
    emits('update:tab', val);
  },
});
const isTopLeftSlotActive = computed(() => {
  return !!slots[`topLeft${props.tab - 1}`];
});
const computedFiltersConfig = computed(() => {
  const tab = props.tabs[currentTab.value - 1];
  return (
    tab.filters?.map((filter) => {
      if (filter.fields.length === 1) {
        filter.fields = [{}].concat(filter.fields);
      }
      return filter.fields.map((field) => {
        const config = {
          ...field,
          ...DEFAULT_FILTERS_CONFIG[field.name],
        };
        if (config) {
          config.props = {
            ...config.props,
            ...field.config,
          };
          config.cols = field.cols || config.cols;
          return config;
        }
        return field;
      });
      // const config = DEFAULT_FILTERS_CONFIG[filter.name];
      // if (config) {
      //   config.props = {
      //     ...config.props,
      //     ...filter.config,
      //   };
      //   config.cols = filter.cols || config.cols;
      //   return config;
      // }
      // return filter;
    }) || []
  );
});

const updateLocalStorage = (checked) => {
  if (checked) {
    const value = cloneDeep(filtersPayload.value);
    delete value.saveAsDefault;
    localStorage.setItem(
      localStorageKey.value,
      JSON.stringify(value)
    );
  } else {
    localStorage.setItem(localStorageKey.value, '{}');
  }
};
const onRunClick = () => {
  emits('run:clicked', filtersPayload.value);
  updateLocalStorage(filtersPayload.value.saveAsDefault);
};
const filtersChanged = () => {
  const value = cloneDeep(filtersPayload.value);
  delete value.saveAsDefault;
  const isFilterEmpty = Object.values(value).every((val) => !val);
  if (isFilterEmpty) {
    emits('update:search', value);
  }
};

const handleOnSearchChange = debounce(() => {
  emits('update:search', filtersPayload.value);
}, 500);

onMounted(() => {
  const value = JSON.parse(
    localStorage.getItem(localStorageKey.value) ?? '{}'
  );
  if (Object.values(value).length) {
    value.saveAsDefault = true;
    filtersPayload.value = value;
    emits('run:clicked', filtersPayload.value);
  }
});
</script>

<style lang="scss">
.w-80 {
  width: 80%;
}
.w-65 {
  width: 65%;
}
.ga-32 {
  gap: 120px !important;
}
</style>
