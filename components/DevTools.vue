<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">JSON Preview</h2>
          <div
            class="tooltip-wrapper"
            @:click="copyObject(JSON.stringify(response))"
          >
            <div class="tooltip-copy">
              <img src="../static/copy.svg" class="copyIcon" alt="copy icon" />
              <div v-if="componentKey > 0" class="tooltip-top-copy">
                {{ messageCopied }}
              </div>
              <div v-else class="tooltip-top-copy">
                {{ messageCopy }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre v-if="json" id="jsonViewer">
              <JsonViewer :value="json" theme="jv-light" />
          </pre>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  import {
    getBlogListRes,
    getFooterRes,
    getHeaderRes,
    getPageRes,
  } from '~/helper';

  function filterObject(inputObject) {
    const unWantedProps = [
      '$',
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
    components: { JsonViewer },
    data() {
      return {
        json: null,
        url: window.location.pathname,
      };
    },
    methods: {
      async getPageData() {
        let res;
        if (this.url.includes('/blog')) {
          res = await getPageRes('/blog');
          return res;
        } else {
          res = await getPageRes(this.url);
          return res;
        }
      },
      async getBlogListData() {
        if (this.url.includes('/blog')) {
          return getBlogListRes();
        }
      },
      async getData() {
        Promise.all([
          getHeaderRes(),
          this.getPageData(),
          getFooterRes(),
          this.getBlogListData(),
        ])
          .then((values) => filterObject(values))
          .then((json) => {
            if (this.url.includes('/blog')) {
              this.json = {
                Header: json[0],
                Page: json[1],
                Footer: json[2],
                BlogList: json[3],
              };
            } else {
              this.json = {
                Header: json[0],
                Page: json[1],
                Footer: json[2],
              };
            }
          });
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>
