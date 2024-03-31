<template>
  <main>
    <FixedLeftColumn>
      <template v-slot:fixed>
        <div class="block filter-items">
          <InputDate range :model-value="date" placeholder="Период" />
          <Search
            :search-query="state.searchQuery"
            :search-types="searchTypes"
            placeholder="Введите номер фотосесии"
            search-type="2"
            select-display-value="icon"
            @submit="args => console.log('submit')"
          />
          <div class="filter-items__search-toggles">
            <Toggle>
              Все
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-crown" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-thumbs-down" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-thumbs-up" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-briefcase" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-cloud-upload" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-truck" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-money-bill-alt" />
            </Toggle>
            <Toggle>
              <i class="icon icon_small icon-ruble" />
            </Toggle>
          </div>
        </div>
        <div class="block filter-items">
          <Select :items="options" />
          <Button color="purple">Показать</Button>
          <Button color="gray">Сбросить</Button>
        </div>
      </template>
      <template v-slot:default>
        <div class="status-list">
          <Empty without-image>Заказов еще нет</Empty>
          <StatusCard status="success">123123</StatusCard>
          <StatusCard status="success">123123</StatusCard>
          <StatusCard status="success">123123</StatusCard>
        </div>
      </template>
    </FixedLeftColumn>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import FixedLeftColumn from "~/shared/ui/templates/fixed-left-column.vue";
import InputDate from "~/shared/ui/inputs/input-date/index.vue";
import Select from "~/shared/ui/select/index.vue";
import Search from "~/shared/ui/search/index.vue";
import Button from "~/shared/ui/button/index.vue";
import Empty from "~/shared/ui/empty/index.vue";
import StatusCard from "~/shared/ui/status-card/index.vue";
import type { SearchType } from "~/shared/ui/search/type";
import type { SelectItems } from "~/shared/ui/select/types";

import { internalAPIFetch } from "~/shared/api/internal/instance";


const date = ref([new Date(), new Date()]);
const state = reactive({ searchQuery: "", date: [new Date(), new Date()] });
watch(state, (value) => {
  console.log("search", value);
});
const searchTypes: Record<string, SearchType> = {
  "1": {
    title: "lol1",
    placeholder: "loler1"
  }, "2": {
    title: "lol2",
    placeholder: "loler2"
  }
};

async function log() {
  const res = await internalAPIFetch("orders.getTest", {
    query: {
      // year:2023,
      // search_type: 'psid',
      // search_value: '',
    }
  });
  console.log("lol", res.response.data.orders);
}

log();
const options: SelectItems = [{ value: "1", title: "asdasdas" }, { value: "2", title: "lol" }];
</script>

<style lang="scss">
@import "~/shared/assets/styles/pages/orders/orders";
</style>
