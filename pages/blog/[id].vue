<template>
  <main>
    <template v-if="banner">
      <BlogBanner
        v-show="banner !== null"
        :data="banner?.page_components[0].hero_banner"
      />
    </template>
    <template v-if="data">
      <div
        class="blog-container"
        :data-pageref="data.uid"
        data-contenttype="blog_post"
        :data-locale="data.locale"
      >
        <div class="blog-detail">
          <h2>{{ data.title }}</h2>
          <span>
            {{ data.date }},
            <strong>{{ data.author[0].title }}</strong>
          </span>
          <p v-html="data.body" />
        </div>
        <div v-if="data" class="blog-column-right">
          <div class="related-post">
            <h2>{{ banner.page_components[2].widget.title_h2 }}</h2>
            <template v-for="(blog, index) in data.related_post" :key="index">
              <div>
                <NuxtLink :key="index" :to="blog.url">
                  <h4>{{ blog.title }}</h4>
                </NuxtLink>
                <p v-html="blog.body.slice(0, 80)" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script lang="ts">
  import { getBlogPostRes, getPageRes } from '~/helper';
  import { onEntryChange } from '~/sdk';
  import BlogBanner from '../../components/BlogBanner.vue';
  export default {
    components: {
      BlogBanner,
    },
    data() {
      return {
        banner: null,
        data: null,
        date: null,
      };
    },
    methods: {
      async fetchBannerData() {
        let response = await getPageRes('/blog');
        this.banner = response;
      },
      async fetchBlogPost() {
        let response = await getBlogPostRes(`${window.location.pathname}`);
        this.data = response;
      },
    },
    mounted() {
      onEntryChange(this.fetchBlogPost);
      this.fetchBannerData();
    },
  };
</script>
