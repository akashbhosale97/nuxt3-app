<template>
  <RenderComponents
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entry-uid="data.uid"
    :locale="data.locale"
  />
</template>

<script>
  import { getPageRes } from '~/helper';
  import { onEntryChange } from '~/sdk';

  export default {
    data() {
      return {
        data: null,
      };
    },
    methods: {
      async fetchData() {
        let response = await getPageRes('/');
        this.data = response;
      },
    },
    mounted() {
      onEntryChange(this.fetchData);
    },
  };
</script>
