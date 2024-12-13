<template>
    <nav class="flex items-center justify-between bg-white rounded-xl py-[0.6rem] px-[0.9rem] lg:rounded-2xl lg:py-[1rem] lg:px-[1.5rem] bg-opacity-80">
      <div class="logo flex items-center gap-1 sm:gap-2">
        <RouterLink to="/" class="text-[20px] sm:text-[24px] md:text-[29px] lg:text-[32px] font-bold text-[#432361]">rendezvous</RouterLink>
      </div>
      <MobileNavView :isOpen="isMobileNavOpen" @close="toggleMobileNav" />
      <div class="tabs hidden md:flex">
        <ul class="flex items-center gap-[0.2rem] md:gap-[0.7rem]">
          <li><button class="py-[0.2rem] px-[0.3rem] lg:py-[0.5rem] lg:px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300">Discover</button></li>
          <li><button class="py-[0.2rem] px-[0.3rem] lg:py-[0.5rem] lg:px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300">About us</button></li>
          <li><button class="py-[0.2rem] px-[0.3rem] lg:py-[0.5rem] lg:px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300">FAQs</button></li>
          <li><button class="py-[0.2rem] px-[0.3rem] lg:py-[0.5rem] lg:px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300">Contact us</button></li>
        </ul>
      </div>
      <div class="btns flex items-center gap-2 lg:gap-4">
        <button class="loginBtn hidden sm:block py-2 px-4 lg:px-5 text-[#783EAD] font-semibold border-transparent hover:border-[#783EAD] transition-transform duration-300">Log in</button>
        <button class="SignupBtn hidden sm:block bg-[#783EAD] py-[8px] lg:py-[12px] px-[16px] lg:px-[24px] font-semibold text-white rounded-[7px] lg:rounded-[10px]">Sign up</button>
      </div>

      <!-- Hamburger menu for mobile -->
      <button 
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700" 
          aria-controls="navbar-default" aria-expanded="false" @click="toggleMobileNav">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
    </nav>
  </template>
  
  <script>
  import { ref } from 'vue';
  import MobileNavView from './MobileNavView.vue';
  
  export default {
    name: 'NavbarView',
    components: {
      MobileNavView
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
    }
  };
  </script>
  