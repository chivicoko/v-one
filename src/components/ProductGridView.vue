<script>
import { RouterLink } from 'vue-router';
import { mapGetters, mapActions } from 'vuex';
import AddToCartIcon from '@/components/icons/AddToCartIcon.vue';

export default {
  name: 'HomeView',
  components: { RouterLink, AddToCartIcon },
  props: {
    product: Object,
  },
  data() {
    return {
      productView: 'grid',
    };
  },
  methods: {
    ...mapActions('products', ['getAllProducts', 'addToCart', 'increaseQuantity', 'decreaseQuantity']),
    cartBtnToggle(productId) {
      this.addToCart(productId);
    },
    cartItemQuantity(productId) {
      const cartItem = this.cartItems.find((item) => item.id === productId);
      return cartItem ? cartItem.quantity : 0;
    },
  },
  computed: {
    ...mapGetters('products', ['allProducts', 'cartItems']),
    isProductInCart() {
      return (productId) => this.cartItems.some((item) => item.id === productId);
    },
  },
};
</script>

<template>
  <div class="cards w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6" id="cards">

    <div v-for="product in allProducts" :key="product.id" class="flex flex-col border rounded-[10px] shadow-md">
      <div class="header flex items-center justify-center py-4">
        <img
          :src="product.image || '/src/assets/images/imagePlaceholder.jpeg'"
          :alt="product.title"
          class="h-[240px] object-contain rounded-t-[9px] transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div class="body flex flex-col gap-4 py-4 px-6">
        <div class="flex flex-col gap-0">
          <p class="text-[16px] line-clamp-1 font-bold">{{ product.title }}</p>
          <p class="text-[14px] font-semibold">
            <span>Sun, Oct 3rd</span>
            <span class="h-4 w-4 bg-black rounded-full"></span>
            <span>6pm</span>
          </p>
        </div>
        <p class="text-[14px] line-clamp-3">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <RouterLink :to="`product-details/${product.id}`" class="trendingBtn font-semibold flex items-center gap-2 text-[#432361] text-[14px] p-2 group">
            View details
            <img
              src="/src/assets/images/Arrow--up-right.svg"
              alt="arrow icon"
              class="icon transform group-hover:rotate-45 group-hover:translate-x-2 transition-all duration-200 ease-in-out"
            />
          </RouterLink>

          <button
            @click="cartBtnToggle(product.id)"
            :class="`${isProductInCart(product.id) ? 'hidden' : 'block'} size-12 p-2 hover:bg-neutral-200 rounded-full transition-all duration-200 ease-in-out`"
          >
            <AddToCartIcon />
          </button>

          <div :class="`${isProductInCart(product.id) ? 'block' : 'hidden'} flex items-center justify-between gap-2 px-2 py-1`">
            <button
              @click="decreaseQuantity(product.id)"
              class="h-fit px-2 pb-1 flex items-center justify-center hover:bg-neutral-200 rounded-full transition-all duration-200 ease-in-out text-2xl"
            >
              -
            </button>
            <span class="p-2 flex items-center justify-center bg-[#432361] text-white rounded-full transition-all duration-200 ease-in-out text-base">
              {{ cartItemQuantity(product.id) }}
            </span>
            <button
              @click="increaseQuantity(product.id)"
              class="px-2 pb-1 flex items-center justify-center hover:bg-neutral-200 rounded-full transition-all duration-200 ease-in-out text-2xl"
            >
              +
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
