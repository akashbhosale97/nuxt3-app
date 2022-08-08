<template>
  <main>
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <ClientOnly>
      <Devtools />
    </ClientOnly>
    <div
      class="blog-container"
      :data-pageref="data.uid"
      data-contenttype="blog_post"
      :data-locale="data.locale"
    >
      <div class="blog-detail">
        <h2>{{ data.title }}</h2>
        <span>
          {{ moment(data.date) }}, <strong>{{ data.author[0].title }}</strong>
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
  </main>
</template>

<script lang="ts">
  import BlogBanner from '../../components/BlogBanner.vue';
  // import Stack, { onEntryChange } from '../../sdk'
  export default {
    components: {
      BlogBanner,
    },
    data() {
      return {
        banner: null,
        singlePost: null,
      };
    },
  };
</script>
