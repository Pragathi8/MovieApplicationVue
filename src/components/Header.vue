<template>
    <v-toolbar style="max-height: 60px;">
      <v-toolbar-title class="headline text-uppercase">
        <router-link
        to='/'
        tag='span'
        style='cursor: pointer'>
        Movie Man
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field
          label='Movie Name'
          v-model='searchString'
          >
        </v-text-field>
        </v-flex>
      <v-btn
        text
        :disabled="!dataAvailable"
        @click="searchMovie"
      >
       <span class="mr-2">Search</span>
      </v-btn>
    </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchMovie () {
      this.$router.push('/search/' + this.searchString)
      this.searchString = ''
    }
  },
  computed: {
    dataAvailable () {
      return this.searchString !== null && this.searchString !== ''
    }
  }
}
</script>