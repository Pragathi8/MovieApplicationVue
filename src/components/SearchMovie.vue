<template>
    <v-container v-if="loading">
        <div class="text-center">
        <v-progress-circular
            indeterminate
            :size="150"
            :width="8"
            color="green">
        </v-progress-circular>
        </div>
    </v-container>

  <v-container v-else-if="noData">
    <div class="text-center">
    <h2>No Movie in API with {{this.name}}</h2>
    </div>
  </v-container>

    <v-container v-else grid-list-xl>
        <v-layout wrap>
            <v-flex md3 sm4 mb-2
                v-for="(item,index) in wholeResponse"
                :key="index">
                <v-card>
                    <v-img
                        :src= "item.poster_path"
                        aspect-ratio="1"
                    ></v-img>

                    <v-card-title class="text-truncate" style="display: block;">{{item.title}}</v-card-title>

                    <v-card-text>
                        <div class="black--text">
                            <div>
                                <span class="font-weight-medium">Release Date:</span> 
                                <span>{{item.release_date}}</span>
                            </div>
                            <div>
                                <span class="font-weight-medium">Original Language:</span>
                                <span>{{item.original_language}}</span>
                            </div>
                            <div>
                                <span class="font-weight-medium">No. of votes:</span>
                                <span>{{item.vote_count}}</span>
                            </div>
                            <div>
                                <span class="font-weight-medium">Popularity:</span>
                                <span>{{item.popularity}}</span>
                            </div>
                            <div>
                                <span class="font-weight-medium">IMDB-id:</span>
                                <span>{{item.id}}</span>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn text
                        color="green"
                        @click="singleMovie(item.id)"
                        >View</v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    props: ['name'],
    data() {
        return {
            movieData: [],
            loading: true,
            noData: false
        }
    },
    watch: {
        name (value) {
            this.name = value;
            this.fetchMovieCollection(this.name);
        } 
    },
    mounted() {
        this.fetchMovieCollection(this.name);
    },
    methods: {
        singleMovie (id) {
            this.$router.push('/movie/' + id)
        },
        fetchMovieCollection(value) {
            axios.get('/search/movie?api_key=d8eecaac5959d18c132c8df4ba1f50cb&query='+ value)
            .then( response => {
                if( response.data ) {
                    let movies = response.data.results;
                    movies.forEach(movie => {
                        let posterPath = movie.poster_path;
                        movie.poster_path = 'https://image.tmdb.org/t/p/w500'+posterPath;
                    });
                    this.wholeResponse = response.data.results;
                    this.loading = false;
                    this.noData = false;
                } else {
                    this.loading = false;
                    this.noData = true;
                }
            })
            .catch( error => {
                console.log( error )
            })
        }
    }
}
</script>

<style scoped>
  .v-progress-circular {
        margin: 1rem
  }
</style>