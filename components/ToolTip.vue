<template>
  <div class="Tooltip-Wrapper" :onmouseenter="showTip" :onmouseleave="hideTip">
    <slot />
    <div ref="toolTipRef" class="Tooltip-Tip top none">{{ content }}</div>
  </div>
</template>

<script setup></script>

<script lang="ts">
  export default {
    props: ['content'],
    data() {
      return {};
    },
    methods: {
      showTip() {
        this.$refs['toolTipRef'].style.display = 'block';
      },
      hideTip() {
        this.$refs['toolTipRef'].style.display = 'none';
      },
    },
  };
</script>

<style></style>
