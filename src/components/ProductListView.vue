<script>
  import { tableHead } from '@/utils/data';
  import { RouterLink } from 'vue-router';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ProductListView',
    components: { RouterLink },
    data() {
      return {
        tableHead: tableHead,
        productsPerPage: 5,
        currentPage: 1,
      };
    },
    methods: {
      ...mapActions('products', ['getAllProducts']),
      handleRowsPerPageChange() {
        this.currentPage = 1; // Reset to the first page when the number of rows per page changes
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
      }
    },
    computed: {
      ...mapGetters('products', ['allProducts']),
      paginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        return this.allProducts.slice(startIndex, startIndex + this.productsPerPage);
      },
      totalPages() {
        return Math.ceil(this.allProducts.length / this.productsPerPage);
      },
    },
    created() {
      // this.getAllProducts();
    }
  };
</script>

<template>
  <div class="w-full overflow-x-scroll custom-scrollbar">
    <table class="min-w-full custom-scrollbar">
      <thead class="bg-transparent rounded-xl">
        <tr class="border bg-neutral-300 rounded-[4px]">
          <th v-for="item in tableHead" :key="item.id" class="pl-6 py-3 text-left text-[#432361] uppercase text-xs font-bold tracking-wider">{{ item.title }}</th>
        </tr>
      </thead>
      <tbody class="bg- divide-y-[.8rem] divide-y-transparent">
        <tr
          v-for="product in paginatedProducts"
          :key="product.id"
          class="rounded-[4px] my-2"
        >
          <td class="relative pl-6 py-2 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">{{ product.id }}</td>
          <td class="relative pl-6 py-2 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">
            <RouterLink :to="`product-details/${product.id}`" class="text-[#432361] font-semibold">{{ product.title }}</RouterLink>
          </td>
          <td class="relative pl-6 py-2 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">
            <img :src="product.image || '/src/assets/images/imagePlaceholder.jpeg'" :alt="product.title" class="size-12 object-contain rounded-full">
          </td>
          <td class="relative pl-6 py-2 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">{{ product.price }}</td>
          <td class="relative pl-6 py-2 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">{{ product.category }}</td>
          <td class="relative pl-4 text-[#6A7E8A] text-[15px] whitespace-nowrap w-2">
            <button class="p-2 rounded-sm">
              <img src="/src/assets/images/add-to-cart-svgrepo-com.svg" :alt="product.title" class="size-6 object-contain">
            </button>
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
          class="span bg-neutral-200 rounded-sm px-1 py-1 outline-none focus:ring-1 ring-[#432361]"
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
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 font-semibold bg-neutral-200 rounded-md">&lt;</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 font-semibold bg-neutral-200 rounded-md">&gt;</button>
    </div>
  </div>
</template>
