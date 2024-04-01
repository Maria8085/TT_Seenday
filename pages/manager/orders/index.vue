<template>
  <main>
    <FixedLeftColumn>
      <template v-slot:fixed>
        <div class="block filter-items">
          <InputDate
            label="Период" :model-value="state.date" range placeholder="Период"
            @update:model-value="handleDateUpdate" />
          <Search
            :search-query="state.searchQuery"
            :search-types="searchTypeOptions"
            :search-type="state.searchType"
            placeholder="Введите номер фотосесии"
            select-display-value="icon"
            @update:search-query="handleSearchQueryUpdate"
            @update:search-type="handleSearchTypeUpdate"
            @submit="args => console.log('submit')"
          />
          <div class="filter-items__search-toggles">
            <Toggle v-for="toggle in toggleOptions" :key="toggle.value" class="toggle" :value="toggle.value">
              <template v-if="'icon' in toggle">
                <i :class="`icon icon_small ${toggle.icon}`" />
              </template>
              <template v-else>{{ toggle.content }}</template>
            </Toggle>
          </div>
        </div>
        <div class="block filter-items">
          <Select label="Год" :items="yearOptions" :model-value="state.year" @update:model-value="handleYearUpdate" />
          <Button color="purple" @click="handleSearch">Показать</Button>
          <Button color="gray" @click="handleCancel">Сбросить</Button>
        </div>
      </template>
      <template v-slot:default>
        <div class="status-list">
          <Loader v-if="loading" />
          <template v-else>
            <!--            <Empty v-if="!orders">Заказов еще нет</Empty>-->
            <StatusCard v-for="order in orders" :key="order.id" class="status-card" status="success">№: {{ order.id }}
            </StatusCard>
          </template>
        </div>
      </template>
    </FixedLeftColumn>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "@vueuse/core";

import FixedLeftColumn from "~/shared/ui/templates/fixed-left-column.vue";
import InputDate from "~/shared/ui/inputs/input-date/index.vue";
import Select from "~/shared/ui/select/index.vue";
import Search from "~/shared/ui/search/index.vue";
import Button from "~/shared/ui/button/index.vue";
import Loader from "~/shared/ui/spinner-loader/index.vue";
// import Empty from "~/shared/ui/empty/index.vue";
import StatusCard from "~/shared/ui/status-card/index.vue";

import {
  DATE_FORMAT,
  defaultState,
  searchTypeOptions,
  toggleOptions,
  yearOptions
} from "~/pages/manager/orders";
import type { OrderType, StateType } from "~/pages/manager/orders/types";

import { internalAPIFetch } from "~/shared/api/internal/instance";

const orders = ref<OrderType[]>([]);
const loading = ref<boolean>(false);
const state = reactive<StateType>({ searchQuery: "", date: [], year: "2022", searchType: "order_number" });

function handleSearch() {
  getOrders();
}

function handleCancel() {
  state.year = defaultState.year;
  state.searchQuery = defaultState.searchQuery;
  state.searchType = defaultState.searchType;
  state.date = defaultState.date;
}

function handleSearchQueryUpdate(newValue: string) {
  state.searchQuery = newValue;
}

function handleDateUpdate(newValue: any) {
  state.date = newValue;
}

function handleSearchTypeUpdate(newValue: any) {
  state.searchType = newValue;
}

function handleYearUpdate(newValue: any) {
  state.year = newValue;
}

async function getOrders() {
  loading.value = true;
  const res = await internalAPIFetch<{ response: { data: { orders: OrderType[] } } }>("orders.getTest", {
    query: {
      date_start: state.date[0] && formatDate(state.date[0], DATE_FORMAT),
      date_finish: state.date[1] && formatDate(state.date[1], DATE_FORMAT),
      search_value: state.searchQuery,
      search_type: state.searchType,
      year: state.year
    }
  });
  loading.value = false;
  orders.value = res.response.data.orders;
}

onMounted(() => {
  handleSearch();
});
</script>

<style lang="scss">
@import "~/shared/assets/styles/pages/orders/orders";
</style>
