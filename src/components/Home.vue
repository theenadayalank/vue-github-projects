<template>
  <section>
    <div class="container">

      <div class="project-list-container scroll-container">
        <h3 class="title text-center">Fetch Github Projects</h3> 
        <div class="divider"></div>

        <div class="form-container">
          <div class="form-group">
            <label>Github Username</label>
            <input v-model="userName" v-on:keyup.enter=" fetchGithubUsers(userName) " class="form-control" placeholder="Enter username">
          </div>
          
          <button class="btn btn-primary" :class="{ disabled:isFetchingRepos }" @click=" fetchGithubUsers(userName)" :disabled="isFetchingRepos">
            <span v-if="isFetchingRepos">
              <img :src="require('@/assets/svgs/spin.svg')" class="icon spinner valign-sub" alt="Spinner"> &nbsp;
            </span>
            FETCH
          </button>
        </div>


        <div v-if="repositoryList.length" class="project-list">
          <ul>
            <li 
              v-for="repo in repositoryList"
              :key="repo.id"
            >
              <ProjectItem
                :owner = "userName"
                :repoName = "repo.name"
                :setReadMeContent = " setReadMeContent "
              />
            </li>
          </ul>
        </div>
      </div>

      <div class="readme-container scroll-container">
        <ReadMeContainer :readMeContent ="readMeContent" />
      </div>

    </div>
  </section>
</template>

<script>
  import networkMixin from '@/mixins/network';
  import ProjectItem from '@/components/ProjectItem';
  import ReadMeContainer from '@/components/ReadMeContainer';

  export default {
    name: 'Home',
    mixins: [networkMixin],
    components: {
      ProjectItem,
      ReadMeContainer
    },
    data() {
      return {
        userName: '',
        readMeContent: '',
        repositoryList: [],
        isFetchingRepos: false
      }
    },
    methods: {
      setReadMeContent(content) {
        this.readMeContent = content;
      },

      fetchGithubUsers() {
        let { userName = '' } = this || {};
        if(!userName) {
          alert('Please enter a valid GitHub Username');
          return;
        }

        let urlToFetchGithubRepos = `users/${userName}/repos`;
        this.isFetchingRepos = true;

        return this.makeNetworkRequest(urlToFetchGithubRepos)
        .then(response => response.json())
        .then((response = []) => {
          this.isFetchingRepos = false;
          this.repositoryList = response;
        }).catch(() => {
          this.isFetchingRepos = false; 
        })
      }
    }
  }
</script>

<style lang="scss">

  .title {
    color: #555;
    margin-bottom: 10px;
  }

  .divider {
    background-color: #03c4eb;
    height: 3px;
    width: 50px;
    margin: 0 auto 10px;
  }

  .container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .project-list-container {
    float: left;
    width: 30%;
    background: #f4fcff;

    .form-container {
      padding-left: 30px;
      padding-right: 30px;
    }

    .project-list {
      border-top: 1px solid #EEE;
      margin-top: 1rem;
    }
  }

  .readme-container {
    float: right;
    width: 70%;
    border-left: 2px solid #EEE;
    padding: 30px;
  }

  .scroll-container {
    height: 100vh;
    overflow-y: scroll;
  }
</style>
