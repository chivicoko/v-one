
<script>
import FooterView from '@/components/FooterView.vue';
import LoadingView from '@/components/LoadingView.vue';
import NavbarView from '@/components/NavbarView.vue';
import MobileNavView from '@/components/MobileNavView.vue';
import { products } from '@/utils/data';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: { LoadingView, NavbarView, MobileNavView, FooterView, RouterLink, },
  data: function() {
  return {
      products,
      products2: {},
      loading: false,
      error: null,
    };
  },
  methods: {
    async getProducts() {
      this.loading = true;
      this.error = null;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);

        // Check for successful response and valid data format
        if (res.status === 200 && Array.isArray(res.data)) {
          this.products2 = res.data;
          // console.log(this.products2);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        this.error = error.message || 'Error fetching products';
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },

  },
  mounted() {
    this.getProducts();
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
    // ...mapState({
    //   count: 'count'
    // })
    count () {
      return this.$store.state.count
    }
  },
}

// console.log(this.count);

</script>

<template>
    <div v-if="loading" class="h-screen w-screen flex items-center justify-center text-2xl">
      <LoadingView />
    </div>

    <div v-else>
      <MobileNavView :isOpen="isMobileNavOpen" @close="toggleMobileNav" />
        
      <header class="h-[640px]">
          <div class="relative w-full h-full py-[20px] px-[24px] md:py-[30px] md:px-[34px] lg:py-[50px] lg:px-[64px] bg-cover bg-center" style="background-image: url(../src/assets/images/computer11.jpg);">
              <div class="bg-black h-full w-full absolute inset-0 bg-opacity-80"></div>
              <div class="relative z-10 flex flex-col justify-between h-full w-full">
                  
                  <NavbarView/>
          
                  <div class="bottom flex items-end justify-center lg:justify-between flex-wrap lg:flex-nowrap gap-6 pb-[32px]">
                      <p class="text-white text-[20px] sm:text-[25px] xl:text-[32px] text-center lg:text-start w-full lg:w-1/2 md:px-6 lg:px-10 xl:pr-44">Ready to Rock? Discover the Hottest Events Here - Your Calendar's New Best Friend!</p>
                      <div class="searchArea w-full lg:w-1/2 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center bg-white p-[20px] lg:p-[20px] xl:p-[24px] rounded-[20px]">
                          <div class="searchInput w-full md:w-1/2 lg:w-full xl:w-1/2 border-r-0 border-b-2 md:border-r-2 md:border-b-0 lg:border-r-0 lg:border-b-2 xl:border-b-0 xl:border-r-2 flex items-center gap-4 py-[12px]">
                              <img src="/src/assets/images/Search.svg" alt="search icon" class="w-[16px] h-[16px]">
                              <input type="text" placeholder="Search for an event" class="w-full">
                          </div>
                          <div class="categorySearch mt-2 md:mt-auto lg:mt-2 xl:mt-auto w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center justify-between pl-2 md:pl-4 xl:pl-10">
                              <select class="w-[60%] lg:w-[60%] xl:w-auto border-b md:border-b-0 lg:border-b xl:border-b-0" name="" id="">
                                  <option value="Categories">Categories</option>
                                  <option value="Status">Status</option>
                                  <option value="Organization">Organization</option>
                                  <option value="Date">Date</option>
                              </select>
          
                              <button class="searchBtn py-[12px] px-[24px] font-semibold text-white bg-[#783EAD] rounded-[10px]">Search</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </header>
    
      <main class="p-[26px] pb-0 sm:p-[38px] md:p-[46px] lg:p-[64px]">
          <div class="headArea flex items-center justify-between flex-wrap gap-1 sm:gap-3 pb-10 md:pb-[64px]">
              <h2 class="text-[32px] text-black">Trending events</h2>
              <button class="trendingBtn flex items-center gap-2 text-[#432361] text-[16px]">
                  View all trending events
                  <img src="/src/assets/images/Arrow--up-right.svg" alt="search icon" class="icon">
              </button>
          </div>
    
          <div v-if="products2 && products2 !== 0" class="w-full">
            <div class="cards w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6" id="cards">
                <!-- Product Cards -->
              <div v-for="product in products2" :key="product.id" class="flex flex-col border rounded-[10px] shadow-md">
                <div class="header flex items-center justify-center py-4">
                    <img :src="product.image || '/src/assets/images/imagePlaceholder.jpeg'" :alt="product.title" class="h-[240px] object-contain rounded-t-[9px] transition-transform duration-300 ease-in-out transform hover:scale-105">
                </div>
                <div class="body flex flex-col gap-4 py-4 px-6">
                    <div class="flex flex-col gap-0">
                        <p class="text-[16px] truncate font-bold">{{product.title}}</p>
                        <p class="text-[14px] font-semibold">
                            <span>Sun, Oct 3rd</span>
                            <span class="h-4 w-4 bg-black rounded-full"></span>
                            <span>6pm</span>
                        </p>
                    </div>
                    <p class="text-[14px]">{{product.description.slice(0,300)}}...</p>
                    <RouterLink :to="`product-details/${product.id}`" class="trendingBtn font-semibold flex items-center gap-2 text-[#432361] text-[14px] pb-4 px-2">
                        View details
                        <img src="/src/assets/images/Arrow--up-right.svg" alt="arrow icon" class="icon">
                    </RouterLink>
                </div>
              </div>
      
            </div>
          </div>
          <div v-else class="w-full">
            <p class="text-center text-xl font-semibold">No products available at the moment</p>
          </div>
    
          <div class="discover-section flex flex-col lg:flex-row items-start gap-10 py-[125px]">
              <div class="w-full lg:w-1/3 flex flex-col items-start justify-start gap-8">
                  <h3 class="text-[26px] sm:text-[32px] font-semibold">Discover a World of Events Tailored Just for You.</h3>
                  <button class="bg-[#783EAD] py-[12px] px-[24px] text-white font-semibold rounded-[10px] text-[16px]">View all events</button>
              </div>
              <div class="w-full lg:w-2/3 flex flex-col md:flex-row items-start justify-start gap-6 flex-wrap lg:flex-nowrap xl:flex-wrap">
                  <div class="border w-full md:w-[48%] h-[240px] rounded-[10px] relative bg-cover bg-center transform transition-transform duration-300 hover:-rotate-3 shadow-md hover:shadow-2xl">
                    <img src="/src/assets/images/1677169008054.jpg" alt="search icon" class="w-full h-full rounded-[10px] relative" />
                    <div class="bg-black h-full w-full absolute top-0 left-0 rounded-[10px] bg-opacity-10 flex items-center justify-center">
                      <span class="text-xl font-semibold text-white shadow-lg">Online Events</span>
                    </div>
                  </div>
                  <div class="border w-full md:w-[48%] h-[240px] rounded-[10px] relative bg-cover bg-center transform transition-transform duration-300 hover:-rotate-3 shadow-md hover:shadow-2xl">
                    <img src="/src/assets/images/computer16.jpg" alt="search icon" class="w-full h-full rounded-[10px] relative" />
                    <div class="bg-black h-full w-full absolute top-0 left-0 rounded-[10px] bg-opacity-10 flex items-center justify-center">
                      <span class="text-xl font-semibold text-white shadow-lg">Physical Events</span>
                    </div>
                  </div>
                  <div class="border w-full md:w-[48%] h-[240px] rounded-[10px] relative bg-cover bg-center transform transition-transform duration-300 hover:-rotate-3 shadow-md hover:shadow-2xl">
                    <img src="/src/assets/images/computer17.jpg" alt="search icon" class="w-full h-full rounded-[10px] relative" />
                    <div class="bg-black h-full w-full absolute top-0 left-0 rounded-[10px] bg-opacity-10 flex items-center justify-center">
                      <span class="text-xl font-semibold text-white shadow-lg">Hybrid Events</span>
                    </div>
                  </div>
              </div>              
          </div>
      </main>
    
      <!-- <footer class="w-full flex flex-col md:flex-row gap-12 lg:gap-96 bg-[#432361] px-[24px] md:px-[64px] py-[56px] pb-20 text-white">
          <div class="w-full md:w-1/3">
              <h2 class="text-[32px] font-semibold">rendezvous</h2>
              <p class="text-[16px]">Your Personal Event Sherpa: Curating Awesome, One Click at a Time.</p>
          </div>
          <div class="w-2/3 flex gap-12 lg:gap-28 flex-wrap lg:flex-nowrap">
              <div class="flex flex-col gap-3 w-full md:w-auto">
                  <h3 class="text-[20px]">Feature</h3>
                  <a href="#" class="text-[16px] whitespace-nowrap">Events discovery</a>
                  <a href="#" class="text-[16px] whitespace-nowrap">Ticketing</a>
              </div>
              <div class="flex flex-col gap-3 w-full md:w-auto">
                  <h3 class="text-[20px]">Company</h3>
                  <a href="#" class="text-[16px] whitespace-nowrap">About us</a>
                  <a href="#" class="text-[16px] whitespace-nowrap">FAQs</a>
                  <a href="#" class="text-[16px] whitespace-nowrap">Careers</a>
                  <a href="#" class="text-[16px] whitespace-nowrap">Support</a>
              </div>
              <div class="flex flex-col items-start justify-normal gap-3 w-full md:w-auto">
                  <h3 class="text-[20px]">Contact us</h3>
                  <a href="#" class="text-[16px] whitespace-nowrap">info@events.com</a>
                  <a href="#" class="text-[16px] whitespace-nowrap">+234 701 345 6789</a>
                  <a href="#" class="text-[16px] w-full">Race Course, 8/9 Marina, Onikan, Lagos Lagos, 4aa Force Rd, Lagos Island 102273, Lagos</a>
              </div>
          </div>
      </footer> -->
    
      <FooterView/>
    </div>
</template>
