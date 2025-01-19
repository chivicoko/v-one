
<script>
import FooterView from '@/components/FooterView.vue';
import LoadingView from '@/components/LoadingView.vue';
import NavbarView from '@/components/NavbarView.vue';
import MobileNavView from '@/components/MobileNavView.vue';
import { ref } from 'vue';

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'HomeView',
  components: { LoadingView, NavbarView, MobileNavView, FooterView, },
  methods: {
    ...mapActions('products', ['getProductById']),
  },
  setup() {
    const isMobileNavOpen = ref(false);

    // Function to toggle the mobile navigation visibility
    const toggleMobileNav = () => {
      isMobileNavOpen.value = !isMobileNavOpen.value;
    };

    return {
      isMobileNavOpen,
      toggleMobileNav
    };
  },
  computed: {
    ...mapGetters('products', ['product']),
    ...mapGetters('products', ['loading']),
  },
  created() {
    this.getProductById();
  }
}

</script>

<template>
    <!-- <div v-if="error" class="error-message text-red-500">{{ error }}</div> -->
    <div v-if="loading" class="h-screen w-screen flex items-center justify-center text-2xl">
      <LoadingView />
    </div>

    <div v-else>
        <MobileNavView :isOpen="isMobileNavOpen" @close="toggleMobileNav" />
          
        <header class="w-full h-full py-[20px] px-[24px] md:py-[30px] md:px-[34px] lg:py-[50px] lg:px-[64px] flex flex-col gap-6">
              <NavbarView />
      
              <div class="flex items-center justify-center gap-6 shadow-md border rounded-[10px]" id="productImage">
                  <img :src="product.image || '/src/assets/images/imagePlaceholder.jpeg'" :alt="product.title" class="h-[300px] sm:h-[480px] rounded-[10px]">
              </div>
          </header>
      
          <main class="p-[26px] pb-24 sm:p-[44px] md:p-[64px]">
              <div class="flex items-start flex-col lg:flex-row gap-20">
                  <div class="w-full lg:w-2/3 flex flex-col items-start justify-start gap-8 md:gap-12">
                      <div class="flex flex-col gap-3">
                          <h2 class="text-[18px] md:text-[24px] font-bold" id="productTitle">{{product.title}}</h2>
                          <div class="flex items-center gap-6 flex-wrap">
                              <span class="flex items-center gap-2">
                                  <img src="/src/assets/images/Calendar.svg" alt="search icon" class="w-[24px] h-[24px]">
                                  <span>Sunday, October 3rd, 2023</span>
                              </span>
                              <span class="flex items-center gap-2">
                                  <img src="/src/assets/images/Time.svg" alt="search icon" class="w-[24px] h-[24px]">
                                  <span>6PM</span>
                              </span>
                          </div>
                          <div class="flex items-center gap-2">
                              <img src="/src/assets/images/Location.svg" alt="search icon" class="w-[24px] h-[24px]">
                              <span>Race Course, 8/9 Marina, Onikan, Lagos Lagos, 4aa Force Rd, Lagos Island 102273, Lagos</span>
                          </div>
                          <div class="flex items-center gap-2">
                              <img src="/src/assets/images/User.svg" alt="search icon" class="w-[24px] h-[24px]">
                              <span>FK, Jollz</span>
                          </div>
                      </div>
      
                      <div class="text-[16px] flex flex-col gap-2 md:gap-4">
                          <h2 class="font-bold">Event description</h2>
                          <p id="productDescription">{{product.description}}</p>
                      </div>
      
                      <div class="text-[16px] flex flex-col gap-2 md:gap-4">
                          <h2 class="font-bold">Tickets Pricing</h2>
                          <div class="flex items-center gap-3 md:gap-12 flex-wrap">
                              <p class="flex flex-col gap-1">
                                  <span class="text-[18px] md:text-[20px]">Price</span>
                                  <span class="text-[16px] text-[#9B51E0]" id="productPrice">${{product.price}}</span>
                              </p>
                              <p class="flex flex-col gap-1">
                                  <span class="text-[18px] md:text-[20px]">Category</span>
                                  <span class="text-[16px] text-[#9B51E0]" id="productCategory">{{product.category}}</span>
                              </p>
                              <p class="flex flex-col gap-1">
                                  <span class="text-[18px] md:text-[20px]">Rating</span>
                                  <span class="text-[16px] text-[#9B51E0]" id="productRate">4.5(343)</span>
                                  <!-- <span class="text-[16px] text-[#9B51E0]" id="productRate">{{product.rating}}({{product.rating}})</span> -->
                              </p>
                          </div>
                      </div>
      
                      <button class="SignupBtn bg-[#783EAD] font-semibold py-[12px] px-[24px] text-white rounded-[10px]">Buy now</button>
                  </div>
      
                  <div class="w-full lg:w-1/3 flex flex-col gap-12 justify-center">
                      <div class="text-[16px] flex flex-col gap-5">
                          <h2 class="font-bold">Contact Organizers</h2>
                          <div class="flex gap-5">
                              <img src="/src/assets/images/Vector.svg" alt="search icon" class="w-[32px] h-[32px]">
                              <img src="/src/assets/images/icon_rounded_twitterbird.svg" alt="search icon" class="w-[32px] h-[32px]">
                              <img src="/src/assets/images/Vector (1).svg" alt="search icon" class="w-[32px] h-[32px]">
                          </div>
                      </div>
      
                      <div class="text-[16px] flex flex-col gap-5">
                          <h2 class="font-bold">Directions</h2>
                          <div class="flex gap-6">
                              <img src="/src/assets/images/Rectangle 5.png" alt="search icon" class="w-full md:w-[400px] h-[452px]">
                          </div>
                      </div>
                  </div>
      
              </div>
          </main>
        <FooterView/>
    </div>
</template>
