
<script>
import FooterView from '@/components/FooterView.vue';
import LoadingView from '@/components/LoadingView.vue';
import NavbarView from '@/components/NavbarView.vue';
import MobileNavView from '@/components/MobileNavView.vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';
import { ref } from 'vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'CartView',
  components: { LoadingView, NavbarView, MobileNavView, FooterView, TrashIcon, },
  methods: {
    ...mapActions('products', ['addToCart', 'loadCart', 'removeFromCart', 'clearCart', 'increaseQuantity', 'decreaseQuantity']),
  },
  setup() {
    const isMobileNavOpen = ref(false);

    const toggleMobileNav = () => {
      isMobileNavOpen.value = !isMobileNavOpen.value;
    };

    return {
      isMobileNavOpen,
      toggleMobileNav
    };
  },
  computed: {
    ...mapGetters('products', ['cartItems', 'loading', 'cartItemsPriceSum']),
  },
  created() {
    this.loadCart();
  }
}

</script>

<template>
  <div v-if="loading" class="h-screen w-screen flex items-center justify-center text-2xl">
    <LoadingView />
  </div>

  <div v-else>
    <MobileNavView :isOpen="isMobileNavOpen" @close="toggleMobileNav" />
      
    <header class="w-full h-full pt-[20px] md:pt-[30px] px-[24px] md:px-[34px] lg:px-[64px]">
      <NavbarView/>
    </header>
    
    <main class="p-[26px] pb-0 sm:p-[38px] md:p-[46px] lg:p-[64px]">
      <div class="headArea flex items-center justify-between flex-wrap gap-1 sm:gap-3 pb-10 md:pb-[64px]">
        <h2 class="text-[32px] text-black">Cart Items</h2>
        <button class="trendingBtn flex items-center gap-2 text-[#432361] text-[16px]">
            View all trending events
            <img src="/src/assets/images/Arrow--up-right.svg" alt="search icon" class="icon">
        </button>
      </div>
        
      <div class="flex gap-8">
        <div class="w-3/4">
          <div v-if="cartItems.length > 0" class="w-full space-y-6">
            <div
              v-for="product in cartItems"
              :key="product.id"
              class="w-full rounded-2xl border p-2 flex items-center gap-12"
            >
              <div class="w-1/4 text-[#6A7E8A] text-[15px] whitespace-nowrap">
                <RouterLink :to="`product-details/${product.id}`" class="">
                  <img :src="product.image || '/src/assets/images/imagePlaceholder.jpeg'" :alt="product.title" class="w-60 object-contain">
                </RouterLink>
              </div>
    
              <div class="w-3/4 flex flex-col justify-center items-start gap-2">
                <p class="text-xl">
                  <RouterLink :to="`product-details/${product.id}`" class="text-[#432361] font-semibold whitespace-wrap w-full">{{ product.title }}</RouterLink>
                </p>
                
                <p class="whitespace-wrap text-[15px]"><strong>Description: </strong> {{ product.description }}</p>
    
                <div class="flex items-center gap-12">
                  <p class="whitespace-wrap text-[15px]"><strong>Price: </strong> {{ product.price }}</p>
                  <p class="whitespace-wrap text-[15px] capitalize"><strong>Category: </strong> {{ product.category }}</p>
                </div>
    
                <div class="flex items-center gap-12">
                  <p class="whitespace-wrap text-[15px]"><strong>Quantity: </strong> {{ product.quantity }}</p>
                  <p class="whitespace-wrap text-[15px]"><strong>Rate: </strong> {{ product.rating.rate }} ({{ product.rating.count }})</p>
                </div>
    
                <div class="w-full flex items-center gap-3 justify-between mt-4 pr-4">
                  <div class="flex items-center justify-between gap-2 px-2">
                    <button @click="decreaseQuantity(product.id)" class="px-2 pb-1 flex items-center justify-center hover:bg-neutral-200 rounded-full transition-all duration-200 ease-in-out text-3xl">-</button>
                    <span class="p-2 flex items-center justify-center bg-[#432361] text-white rounded-full transition-all duration-200 ease-in-out text-2xl">{{ product.quantity }}</span>
                    <button @click="increaseQuantity(product.id)" class="px-2 pb-1 flex items-center justify-center hover:bg-neutral-200 rounded-full transition-all duration-200 ease-in-out text-3xl">+</button>
                  </div>
      
                  <button @click="removeFromCart(product.id)" class="w-fit whitespace-nowrap py-2 px-4 flex items-center justify-center gap-3 text-white bg-red-700 hover:bg-red-600 rounded-md transition-all duration-200 ease-in-out">
                    <span class=""><TrashIcon /></span>
                    <span class="font-semibold">Remove from cart</span>
                  </button>
                </div>

              </div>
            </div>

            <button v-if="cartItems.length > 0" @click="clearCart" class="py-1 px-4 flex items-center justify-center text-white bg-red-700 hover:bg-red-600 rounded-md transition-all duration-200 ease-in-out text-lg font-semibold">
              Clear cart
            </button>
          </div>
    
          <div v-else class="w-full">
            <p class="text-center text-xl font-semibold">No products in the cart at the moment</p>
          </div>
        </div>

        <div class="w-1/4 h-fit p-4 border rounded-xl">
          <h2 class="font-semibold text-2xl py-2">Summary</h2>
          <div class="border-y py-4 space-y-2">
            <p class="text-lg flex items-center justify-between"><span class="font-semibold">Subtotal: </span> ${{cartItemsPriceSum.toFixed(2)}}</p>
            <p class="text-lg flex items-center justify-between"><span class="font-semibold">Delivery: </span> ${{ (cartItems.length > 0 ? 1000.00 : 0.00).toFixed(2) }}</p>
          </div>
          <p class="border-b py-2 text-lg flex items-center justify-between"><span class="font-semibold">Total: </span> ${{(cartItemsPriceSum + (cartItems.length > 0 ? 1000.00 : 0.00)).toFixed(2)}}</p>

          <div class="my-8">
            <p>Do you have a discount?</p>
            <div class="w-full flex items-center gap-2">
              <input type="text" placeholder="discount code" class="w-2/3 border-2 placeholder:uppercase rounded-lg py-2 px-1 border-[#783EAD]">
              <button class="bg-[#783EAD] py-[8px] lg:py-[8px] px-[16px] lg:px-[24px] font-semibold text-white text-xl capitalize rounded-[7px] lg:rounded-[10px] w-1/3">
                apply
              </button>
            </div>
          </div>

          <button class="bg-[#783EAD] py-[8px] lg:py-[12px] px-[16px] lg:px-[24px] font-semibold text-white text-xl rounded-[7px] lg:rounded-[10px] w-full mt-2">
            Checkout
          </button>
        </div>
      </div>
    </main>
  
    <FooterView/>
  </div>
</template>
