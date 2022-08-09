<template>
  <div class="Tooltip-Wrapper" :onmouseenter="showTip" :onmouseleave="hideTip">
    <slot />
    <div id="toolTipRef" class="Tooltip-Tip top none">{{ content }}</div>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['content'],
    data() {
      return {};
    },
    methods: {
      showTip() {
        //@ts-ignore
        document.getElementById('toolTipRef').style.display = 'block';
      },
      hideTip() {
        //@ts-ignore
        document.getElementById('toolTipRef').style.display = 'none';
      },
    },
  };
</script>

<style></style>
