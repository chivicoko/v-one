<template>
    <nav 
      class="tabs fixed left-0 top-0 flex flex-col items-center justify-center gap-6 md:hidden bg-white w-screen h-screen z-[1000] transform transition-transform duration-300"
      :class="{ 'translate-y-0': isOpen, '-translate-y-full': !isOpen }"
      id="navbar-default">
      <ul class="flex relative h-full w-full flex-col items-center justify-center gap-[0.7rem]">
        <button id="cancel" class="absolute top-4 right-8" tabindex="1" @click="closeNav">❌</button>
        <li><button class="py-[0.5rem] px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300" tabindex="1">Discover</button></li>
        <li><button class="py-[0.5rem] px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300" tabindex="1">About us</button></li>
        <li><button class="py-[0.5rem] px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300" tabindex="1">FAQs</button></li>
        <li><button class="py-[0.5rem] px-[1rem] border-b-2 text-[16px] font-semibold text-[#432361] border-transparent hover:border-[#783EAD] transition-transform duration-300" tabindex="1">Contact us</button></li>
      </ul>
      <div class="btns flex flex-col items-center gap-4 mb-24">
        <button class="loginBtn py-2 px-4 lg:px-5 text-[#783EAD] font-semibold border-transparent hover:border-[#783EAD] transition-transform duration-300">Log in</button>
        <button class="SignupBtn bg-[#783EAD] py-[8px] lg:py-[12px] px-[16px] lg:px-[24px] font-semibold text-white rounded-[7px] lg:rounded-[10px]">Sign up</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MobileNavView',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closeNav() {
        this.$emit('close');
      }
    }
  };
  </script>
  