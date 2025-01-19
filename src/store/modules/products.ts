import axios from "axios";
import { useRoute } from "vue-router";

const state = {
    products: [],
    product: {},
    loading: true,
    error: null
};

const getters = {
    allProducts: state => state.products,
    product: state => state.product,
    loading: state => state.loading,
    error: state => state.error
};

const actions = {
    async getAllProducts({commit}) {
        commit("setLoading", true);
  
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
            
            // Check for successful response and valid data format
            if (res.status === 200 && Array.isArray(res.data)) {
                commit("setProducts", res.data);
                // console.log(res.data);
            } else {
                throw new Error('Unexpected response format');
            }

            commit("setLoading", false);
        } catch (error) {
            commit("setError", error.message);
            commit("setLoading", false);
        } finally {
            commit("setLoading", false);
        }
    },

    async getProductById({commit}) {
        commit("setLoading", true);
  
        const route = useRoute();
        const productId = route.params.id;

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`);
            
            // Check for successful response and valid data format
            if (res.status === 200) {
                commit("setProduct", res.data);
                // console.log(res.data);
            } else {
                throw new Error('Unexpected response format');
            }

            commit("setLoading", false);
        } catch (error) {
            commit("setError", error.message);
            commit("setLoading", false);
        } finally {
            commit("setLoading", false);
        }
    },
};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    setProduct(state, product) {
        state.product = product;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setError(state, error) {
        state.error = error;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};