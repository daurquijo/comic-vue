<template>
  <div id="component-container">
    <XkcdComic />
  </div>
</template>

<script>
import XkcdComic from './components/XkcdComic.vue';

export default {
  name: 'App',
  components: {
    XkcdComic,
  },
};
</script>