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

  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12 mr-1 ml-1>
        <v-card>
            <v-carousel hide-delimiters cycle dark interval=1000>
                <v-carousel-item
                v-for="(poster,i) in posters"
                :key="i"
                :src="poster"
                ></v-carousel-item>
            </v-carousel>

            <v-card-title primary-title>
                <h2 class="headline mb-0">{{singleMovie.title}}
                    <span class="font-weight-regular">--{{singleMovie.release_date}}</span>
                </h2>
            </v-card-title>

            <v-rating class="ml-4"
                    :value="singleMovie.vote_average/2"
                    color="amber"
                    half-increments
                    dense
                    size="14"
                    readonly
                    ></v-rating>

            <div class="grey--text ml-4">{{ singleMovie.vote_average/2 }} ({{ singleMovie.vote_count }})</div>

            <v-card-text>
                <div class="black--text">
                    <p>{{ singleMovie.overview}} </p>
                    <div v-if="crew.actors.length > 0">
                        <h3>Actors:</h3>{{crew.actors.join(',')}}
                    </div>
                    <br>
                    <div v-if="crew.director.length > 0">
                        <h3 >director:</h3>{{crew.director.join(',')}}
                    </div>
                    <div v-if="crew.producer.length > 0">
                        <h3>producer:</h3> {{crew.producer.join(',')}}
                    </div>
                </div>
            </v-card-text>

            <v-btn class="ml-4" 
                        rounded 
                        color="primary" 
                        dark 
                        @click="visitHomePage(singleMovie.homepage)"
                        >Visit Page
            </v-btn>

            <v-card-actions style="padding-left: 0;">
                <v-btn class="ml-4" 
                        rounded 
                        color="green" 
                        dark 
                        @click="back" 
                        style="min-width: 120px;"
                        >back
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    data() {
        return {
            singleMovie: '',
            loading: true,
            crew: {
                producer: [],
                director: [],
                actors: []
            },
            posters: []
        }
    },
    mounted() {
        axios.get('/movie/'+this.id+'?api_key=d8eecaac5959d18c132c8df4ba1f50cb')
        .then(response => {
            let posterPath = response.data.poster_path;
            response.data.poster_path = 'https://image.tmdb.org/t/p/w500'+posterPath;
            this.posters.push(response.data.poster_path);
            if(response.data.belongs_to_collection) {
                posterPath = 'https://image.tmdb.org/t/p/w500'+response.data.belongs_to_collection.poster_path;
                this.posters.push(posterPath);
            }
            posterPath = 'https://image.tmdb.org/t/p/w500'+response.data.backdrop_path;
            this.posters.push(posterPath);
            this.singleMovie = response.data;
            this.crew = this.getCrewDetails(this.id);
        })
        .catch(error => {
            console.log(error);
        })
        this.loading = false;
    },
    methods: {
        getCrewDetails(movieId) {
            var crew= {
                    producer: [],
                    director: [],
                    actors: []
                };
            axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=d8eecaac5959d18c132c8df4ba1f50cb')
            .then(response => {
                var crewMembers = response.data.crew,
                actors = response.data.cast;
                crewMembers.forEach(crewMember => {
                    if(crewMember.job == 'Producer') {
                        crew.producer.push(crewMember.name);
                    } else if(crewMember.jod == 'Director') {
                        crew.director.push(crewMember.name);
                    }
                });
                actors.forEach(actor => {
                    crew.actors.push(actor.name);
                })
            })
            .catch(error => {
                console.log(error);
            })
            return crew;
        },
        back () {
            this.$router.push('/')
        },
        visitHomePage(url) {
            window.open(url, "_blank"); 
        }
    }
}
</script>