<template>
  <transition name="fade" mode="out-in">
    <div v-if="comic" class="comic-container" key="comic">
      <h1 class="title">{{ comic.title }}</h1>
      <div class="img-container">
        <img class="img" :src="comic.img" :alt="comic.alt" />
      </div>
      <p>{{ comic.alt }}</p>
      <div class="rating">
        <h2>Rate this comic:</h2>
        <p v-if="comic.rating">You rated this comic: 
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= comic.rating }">★</span>
        </p>
        <div v-else>
          <span v-for="n in 5" :key="n" class="star" @click="rateComic(n)">★</span>
        </div>
      </div>
      <div class="container-buttons">
        <button class="button btn" @click="fetchComic">Get Random Comic</button>
      </div>
    </div>
    <div v-else class="loading-container" key="loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </transition>

  <div class="search-container">
    <input 
      type="text" 
      v-model="comicId" 
      placeholder="Enter comic ID" 
      @input="validateInput"
    />
    <button class="button btn" @click="fetchComicById">Get Comic by ID</button>
  </div>
</template>



<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'XkcdComic',
  setup() {
    const store = useStore();
    const comic = computed(() => store.state.comic);
    const comicId = ref('');

    const rateComic = (ratingValue) => {
      if (comic.value) {
        store.dispatch('setRating', { comicId: comic.value.num, rating: ratingValue });
      }
    };

    const fetchComic = () => {
      store.dispatch('fetchRandomComic');
    };

    const fetchComicById = () => {
      const id = parseInt(comicId.value, 10);
      if (id && id > 0 && id <= 9999) {
        store.dispatch('fetchComicById', id);
      } else {
        alert('Please enter a valid comic ID (1-9999).');
      }
    };

    const validateInput = (event) => {
      comicId.value = event.target.value.replace(/\D/g, '').slice(0, 4);
    };

    onMounted(() => {
      fetchComic();
    });

    return { comic, rateComic, fetchComic, fetchComicById, comicId, validateInput };
  },
};
</script>

<style scoped>
  @import '../assets/styles.css';
</style>