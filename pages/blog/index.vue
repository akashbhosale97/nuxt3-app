<template>
  <main v-if="banner">
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale"
    >
      <div class="blog-column-left">
        <template v-for="(list, index) in recentBlog" :key="index">
          <div class="blog-list">
            <NuxtLink :to="list.url">
              <img
                alt="blog img"
                class="blog-list-img"
                :src="list.featured_image.url"
              />
            </NuxtLink>
            <div class="blog-content">
              <NuxtLink :to="list.url">
                <h3>{{ list.title }}</h3>
              </NuxtLink>
              <p>
                {{ moment(list.date) }},
                <strong>{{ list.author[0].title }}</strong>
              </p>
              <p v-html="list.body.slice(0, 250)" />
              <NuxtLink :to="list.url">
                <span>Read more --&gt;</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <template v-for="(component, index) in archivedList" :key="index">
          <NuxtLink :to="component.url">
            <div>
              <h4>{{ component.title }}</h4>
              <p v-html="component.body.slice(0, 80)" />
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
  import { getBlogListRes, getPageRes } from '~/helper';
  export default {
    data() {
      return {
        banner: null,
        blogList: null,
      };
    },
    methods: {
      async fetchData() {
        let response = await getPageRes('/blog');
        this.banner = response;
      },
      async fetchBlogList() {
        let response = await getBlogListRes();
        this.blogList = response;
        console.log(response);
      },
    },
    mounted() {
      this.fetchData();
      this.fetchBlogList();
    },
  };
</script>
