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
  import { useRoute } from 'vue-router';
  import { getPageRes } from '~/helper';
  export default {
    data() {
      return {
        data: null,
      };
    },
    methods: {
      async fetchData() {
        let response = await getPageRes(`${window.location.pathname}`);
        this.data = response;
      },
    },
    mounted() {
      this.fetchData();
    },
  };
</script>
