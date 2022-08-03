<template>
  <header class="header" v-if="headerData">
    <template v-if="headerData.notification_bar.show_announcement">
      <div class="note-div">
        <span
          v-html="
            headerData.notification_bar.announcement_text.children[0]
              .children[0].text
          "
        />
      </div>
    </template>
    <div class="max-width header-div">
      <div class="wrapper-logo">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="headerData.title"
          to="/"
        >
          <img
            class="logo"
            :src="headerData.logo.url"
            :alt="headerData.title"
          />
        </NuxtLink>
      </div>
      <input id="menu-btn" type="checkbox" class="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon" />
      </label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
          <li
            v-for="navItems in headerData.navigation_menu"
            :key="navItems.title"
            class="nav-li"
          >
            <NuxtLink :to="navItems.page_reference[0].url">
              {{ navItems.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- <div class="json-preview">
        <Tooltip content="JSON Preview" direction="top"></Tooltip>
      </div> -->
    </div>
  </header>
</template>

<script>
  import { getHeaderRes } from '~/helper';
  export default {
    data() {
      return {
        headerData: null,
      };
    },
    methods: {
      async fetchHeaderData() {
        let response = await getHeaderRes();
        this.headerData = response;
      },
    },
    mounted() {
      this.fetchHeaderData();
    },
  };
</script>
