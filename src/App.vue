<template>
  <div id="app" class="container">
    <!-- display error message -->
    <div class="row" v-if="error">
      <div class="col-12 div alert alert-danger">
        Une erreur est survenue lors du chargement de la page. Merci de la recharger.
      </div>
    </div>

    <!-- tab header construtor -->
    <TabsHeader
      v-bind:window="window"
      v-bind:elephants="elephants"
    />

    <!-- content tab -->
    <div v-if="currentElephant !== null" class="row p-3 border border-dark border-top-0 mb-3 mx-3" id="content">
      <div class="col-sm-3">
        <a :href="currentElephant.wikilink">
          <img :src="currentElephant.image" :alt="currentElephant.name" class="img-fluid img-circle rounded-circle">
        </a>
      </div>
      <div class="col-sm-9 my-auto">
        <div class="d-block">
          <a :href="currentElephant.wikilink" class="btn">{{ currentElephant.name }}</a>
        </div>
        <div class="d-block text-muted">
          <p>{{ currentElephant.note }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import TabsHeader from './components/TabsHeader.vue'
import randomIndex from './lib/randomIndex.js'

export default {
  name: 'App',
  components: { TabsHeader },
  data () {
    return {
      elephants: null, // init when mounted
      randomElephantId: null, // elephant id generate randomly when mounted, method randomizeElephant, computed currentElephant
      error: false, // global error message
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    // add event listener on window for data.window config
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    // clean event listener on window resize
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    // init datas from api
    axios
      .get('elephants.json')
      .then((elephants) => {
        // set elephants datas
        this.elephants = elephants.data

        // set random elephants id
        this.randomElephantId = randomIndex(elephants.data.length)
      })
      .catch(error => {
        console.log(error)
        this.error = true
      })
  },
  methods: {
    // set window data
    handleResize: function () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  },
  computed: {
    // get the current elephant to display
    currentElephant: function () {
      if (this.elephants && this.randomElephantId) {
        return this.elephants[this.randomElephantId]
      } else {
        return null
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
