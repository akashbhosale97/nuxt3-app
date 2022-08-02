<template>
  <main>
    <div v-for="obj in filteredObj" :key="obj.uid" class="individual">
      {{ obj }}
    </div>
  </main>
</template>

<script>
  import { getEntry } from '../sdk';
  function filterObject(inputObject) {
    const unWantedProps = [
      '_version',
      'ACL',
      '_owner',
      '_in_progress',
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'publish_details',
    ];
    for (const key in inputObject) {
      unWantedProps.includes(key) && delete inputObject[key];
      if (typeof inputObject[key] !== 'object') {
        continue;
      }
      inputObject[key] = filterObject(inputObject[key]);
    }
    return inputObject;
  }
  export default {
    data() {
      return {
        data: '',
        filteredObj: {},
      };
    },
    methods: {
      async fetchData() {
        await getEntry().then((val) => (this.data = val));
        this.filteredObj = filterObject(this.data);
      },
    },
    mounted() {
      this.fetchData();
    },
  };
</script>

<style scoped>
  main {
    padding: 0 50px;
    letter-spacing: 2px;
    font-size: 20px;
  }
  .individual {
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 10px;
    margin: 10px 0;
    overflow: hidden;
  }
</style>
