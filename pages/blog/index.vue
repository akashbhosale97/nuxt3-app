<template>
  <main v-if="banner">
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale"
    >
      <div class="blog-column-left" v-if="blogList">
        <template v-for="(list, index) in blogList.slice(0, 3)" :key="index">
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
                {{ list.date }},
                <template v-if="list.author">
                  <strong>{{ list.author[0].title }}</strong>
                </template>
              </p>
              <template v-if="list.body">
                <p v-html="list.body.slice(0, 250)" />
              </template>
              <NuxtLink :to="list.url">
                <span>Read more --&gt;</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <template v-if="archived">
          <template v-for="(component, index) in archived" :key="index">
            <NuxtLink :to="component.url">
              <div>
                <h4>{{ component.title }}</h4>
                <p v-html="component.body.slice(0, 80)" />
              </div>
            </NuxtLink> </template
        ></template>
      </div>
    </div>
  </main>
</template>

<script>
  import { getBlogListRes, getPageRes } from '~/helper';
  import moment from 'moment';
  export default {
    data() {
      return {
        banner: null,
        blogList: null,
        archived: [],
      };
    },
    methods: {
      async fetchData() {
        let response = await getPageRes('/blog');
        this.banner = response;
      },
      async fetchBlogList() {
        await getBlogListRes()
          .then((response) => (this.blogList = response))
          .then((blog) => {
            blog.map((single) => {
              if (single.is_archived) this.archived.push(single);
            });
          });
      },
    },
    mounted() {
      this.fetchData();
      this.fetchBlogList();
    },
  };
</script>
