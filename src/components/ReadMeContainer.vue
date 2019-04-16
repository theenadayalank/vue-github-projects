<template>
  <section> 
    <div v-html="readMeContent"></div>
  </section>
</template>

<script>
  import 'github-markdown-css';

  export default {
    name: 'read-me-container',
    props: ['readMeContent']
  }
</script>

<style>
</style>
