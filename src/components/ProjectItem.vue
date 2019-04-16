<template>
  <section class="project-item">
    <span class="btn-link cursor-pointer" @click=" fetchReadMeData(owner, repoName) ">
      {{repoName}}
    </span>
  </section>
</template>

<script>
  import networkMixin from '@/mixins/network';

  export default {
    name: 'project-item',
    props: ['owner', 'repoName', 'setReadMeContent'],
    mixins: [networkMixin],
    methods: {
      fetchReadMeData(owner = '',repoName = '') {
        let url = `repos/${owner}/${repoName}/readme`;
        let options = {
          headers: {
            'Accept': 'application/vnd.github.v3.html+json'
          }
        }
        return this.makeNetworkRequest(url, options)
        .then(response => response.text())
        .then((response) => {
          this.setReadMeContent(response);
        }).catch(() => {
          console.error(response); //eslint-disable-line
        })
      }
    }
  }
</script>

<style scoped>
  .project-item {
    padding: 5px 0;
  }
</style>
