import axios from "axios";
import { useRoute } from "vue-router";

// Define types for State, Product, and CartItem
interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface State {
  cart: CartItem[];
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const state: State = {
  cart: [],
  products: [],
  product: null,
  loading: true,
  error: null,
};

// Getters
const getters = {
  cartItems: (state: State): CartItem[] => state.cart,
  cartItemCount: (state: State): number => state.cart.length,
  cartItemsPriceSum: (state: State): number => {
    return Math.round(
      state.cart.reduce((total, item) => total + item.quantity * item.price, 0) * 100
    ) / 100;
  },
  allProducts: (state: State): Product[] => state.products,
  product: (state: State): Product | null => state.product,
  loading: (state: State): boolean => state.loading,
  error: (state: State): string | null => state.error,
};

// Actions
const actions = {
  async getAllProducts({ commit }) {
    commit("setLoading", true);
    try {
    //   const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
    //   if (res.status === 200 && Array.isArray(res.data)) {
    //     commit("setProducts", res.data);
    //   } else {
    //     throw new Error("Unexpected response format");
    //   }

      const products = JSON.parse(localStorage.getItem("products") || "[]");

      if (products.length < 1) {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
        // console.log(res);
        if (res.status === 200 && Array.isArray(res.data)) {
          localStorage.setItem("products", JSON.stringify(res.data));
          commit("setProducts", res.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } else {
        commit("setProducts", products);
      }
    } catch (error: any) {
      commit("setError", error.message);
    } finally {
      commit("setLoading", false);
    }
  },

  async getProductById({ commit }) {
    commit("setLoading", true);
    const route = useRoute();
    const productId = route.params.id;

    try {
      const products = JSON.parse(localStorage.getItem("products") || "[]");

      const product = products.find((m) => m.id === productId);
      if (product) {
        commit("setProduct", product);
      } else {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`);
        if (res.status === 200) {
          commit("setProduct", res.data);
        } else {
          throw new Error("Unexpected response format");
        }
      }
    } catch (error: any) {
      commit("setError", error.message);
    } finally {
      commit("setLoading", false);
    }
  },

  addToCart({ commit }, productId) {
    const product = state.products.find((product) => product.id === productId);
    if (product) {
      const cartItem = state.cart.find((item) => item.id === productId);
      if (!cartItem) {
        commit("addToCart", product);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        commit("removeCartItem", productId);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    } else {
      commit("setError", "Product not found!");
    }
  },
  

  increaseQuantity({ commit }, productId) {
    commit("increaseCartItemQuantity", productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },

  decreaseQuantity({ commit }, productId) {
    commit("decreaseCartItemQuantity", productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },

  loadCart({ commit }) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    commit("setCart", cart);
  },

  removeFromCart({ commit }, productId) {
    commit("removeCartItem", productId);
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },

  clearCart({ commit }) {
    commit("setCart", []);
    localStorage.removeItem("cart");
  },
};

// Mutations
const mutations = {
  setProducts(state: State, products: Product[]) {
    state.products = products;
  },
  setProduct(state: State, product: Product) {
    state.product = product;
  },
  setLoading(state: State, loading: boolean) {
    state.loading = loading;
  },
  setError(state: State, error: string) {
    state.error = error;
  },
  addToCart(state: State, product: Product) {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (!existingProduct) {
      state.cart.push({ ...product, quantity: 1 });
    } else {
      alert(`"${product.title}" is already in the cart.`);
    }
  },
  increaseCartItemQuantity(state: State, productId: number) {
    const cartItem = state.cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    }
  },
  decreaseCartItemQuantity(state: State, productId: number) {
    const cartItem = state.cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity < 1) {
        state.cart = state.cart.filter((item) => item.id !== productId);
      }
    }
  },
  removeCartItem(state: State, productId: number) {
    state.cart = state.cart.filter((item) => item.id !== productId);
  },
  setCart(state: State, cartItems: CartItem[]) {
    state.cart = cartItems;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
