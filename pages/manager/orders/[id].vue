<template>

  <main>
    <FixedLeftColumn>
      <template v-slot:fixed>
        123
      </template>
      <template v-slot:default>
        <StatusCard class="status-card" status="success">№: {{ route.params.id }}</StatusCard>
      </template>
    </FixedLeftColumn>
  </main>
</template>

<script setup lang="ts">
import { FixedLeftColumn } from "~/shared/ui/templates";
import StatusCard from "~/shared/ui/status-card/index.vue";

const route = useRoute();

</script>
<script setup lang="ts">
</script>