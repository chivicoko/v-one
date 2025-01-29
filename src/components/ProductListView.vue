<script>
  import { tableHead } from '@/utils/data';
  import { RouterLink } from 'vue-router';
  import { mapGetters, mapActions } from 'vuex';
  import AddToCartIcon from '@/components/icons/AddToCartIcon.vue';

  export default {
    name: 'ProductListView',
    components: { RouterLink, AddToCartIcon },
    data() {
      return {
        tableHead: tableHead,
        productsPerPage: 5,
        currentPage: 1,
      };
    },
    methods: {
      ...mapActions('products', ['getAllProducts', 'addToCart', 'increaseQuantity', 'decreaseQuantity']),
      handleRowsPerPageChange() {
        this.currentPage = 1;
      },
      goToPage(pageNumber) {
        this.currentPage = pageNumber;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
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
      paginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        return this.allProducts.slice(startIndex, startIndex + this.productsPerPage);
      },
      totalPages() {
        return Math.ceil(this.allProducts.length / this.productsPerPage);
      },
      isProductInCart() {
        return (productId) => this.cartItems.some((item) => item.id === productId);
      },
    },
  };
</script>

<template>
  <div class="w-full overflow-x-scroll custom-scrollbar">
    <table class="min-w-full custom-scrollbar">
      <thead class="bg-transparent rounded-xl">
        <tr class="border bg-neutral-300 rounded-[4px]">
          <th v-for="item in tableHead" :key="item.id" :class="`${item.title === 'Action' ? 'text-center' : 'text-left'} pl-6 py-3 text-[#432361] uppercase text-xs font-bold tracking-wider`">{{ item.title }}</th>
        </tr>
      </thead>
      <tbody class="bg- divide-y-[.8rem] divide-y-transparent">
        <tr
          v-for="product in paginatedProducts"
          :key="product.id"
          class="rounded-[4px] my-2"
        >
          <td class="relative pl-6 py-2 text-[15px] whitespace-nowrap w-2">{{ product.id }}</td>
          <td class="relative pl-6 py-2 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">
            <RouterLink :to="`product-details/${product.id}`" class="">
              <img :src="product.image || '/src/assets/images/imagePlaceholder.jpeg'" :alt="product.title" class="size-12 object-contain rounded-full">
            </RouterLink>
          </td>
          <td class="relative pl-6 py-2 text-[15px] whitespace-nowrap w-2">
            <RouterLink :to="`product-details/${product.id}`" class="text-[#432361] font-semibold">{{ product.title }}</RouterLink>
          </td>
          <td class="relative pl-6 py-2 text-[15px] whitespace-nowrap w-2">{{ product.price }}</td>
          <td class="relative pl-6 py-2 text-[15px] whitespace-nowrap w-2">{{ product.category }}</td>
          <td class="relative pl-4 text-[15px] whitespace-nowrap w-2">
            <button
              @click="cartBtnToggle(product.id)"
              :class="`${isProductInCart(product.id) ? 'hidden' : 'block'} w-full flex items-center justify-center`"
            > 
              <span class="p-2 hover:bg-neutral-200 rounded-full transition-all duration-200 ease-in-out">
                <AddToCartIcon />
              </span>
            </button>

            <div :class="`${isProductInCart(product.id) ? 'block' : 'hidden'} flex items-center justify-between px-2`">
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="pagination mt-6 flex flex-col md:flex-row items-center justify-between">
    <div class="pages flex items-center justify-between gap-3">
      <span>Showing</span>
      <div class="select-container">
        <select
          v-model="productsPerPage"
          @change="handleRowsPerPageChange"
          class="span bg-neutral-200 rounded-md px-1 py-1 "
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
      <span>out of {{ allProducts.length }}</span>
    </div>

    <div class="flex items-center gap-2 mt-4 md:mt-0">
      <button @click="prevPage" :disabled="currentPage === 1" :class="`${disabled === true ? 'bg-neutral-50' : 'bg-neutral-200'} px-3 py-1 font-semibold rounded-md`">&lt;</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" :class="`${disabled === true ? 'bg-neutral-50' : 'bg-neutral-200'} px-3 py-1 font-semibold rounded-md`">&gt;</button>
    </div>
  </div>
</template>
