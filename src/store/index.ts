// store/index.ts
import { createStore } from 'vuex';
import products from './modules/products';

// Create and export the Vuex store
const store = createStore({
  modules: {
    products
  }
});

export default store;
