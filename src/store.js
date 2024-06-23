import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            comics: [],
            comic: null,
        };
    },
    mutations: {
        SET_COMICS(state, comics) {
            state.comics = comics;
        },
        SET_COMIC(state, comic) {
            state.comic = comic;
        },
        SET_RATING(state, { comicId, rating }) {
            const comicToUpdate = state.comics.find(comic => comic.num === comicId);
            if (comicToUpdate) {
                comicToUpdate.rating = rating;
            }

            if (state.comic && state.comic.num === comicId) {
                state.comic.rating = rating;
            }
        }
    },
    actions: {
        async fetchRandomComic({ commit, state }) {
            try {
                const currentComicResponse = await axios.get('/api/info.0.json');
                const maxNum = currentComicResponse.data.num;
                const randomNum = Math.floor(Math.random() * maxNum) + 1;
                let comicResponse = {};
                if (state.comics.find(comic => comic.num === randomNum)) {
                    comicResponse = state.comics.find(comic => comic.num === randomNum);
                    commit('SET_COMIC', comicResponse);
                } else {
                    comicResponse = await axios.get(`/api/${randomNum}/info.0.json`);
                    commit('SET_COMIC', comicResponse.data);
                    commit('SET_COMICS', [...state.comics, comicResponse.data]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async fetchComicById({ commit, state }, comicId) {
            try {
                let comicResponse = {};
                if (state.comics.find(comic => comic.num === comicId)) {
                    comicResponse = state.comics.find(comic => comic.num === comicId);
                    commit('SET_COMIC', comicResponse);
                } else {
                    comicResponse = await axios.get(`/api/${comicId}/info.0.json`);
                    commit('SET_COMIC', comicResponse.data);
                    commit('SET_COMICS', [...state.comics, comicResponse.data]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        setRating({ commit }, { comicId, rating }) {
            commit('SET_RATING', { comicId, rating });
        }
    }
});

export default store;