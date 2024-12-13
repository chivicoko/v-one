
<script >

export default {
  name: 'FooterView',
};
</script>

<template>
  <footer class="w-full flex flex-col md:flex-row gap-12 lg:gap-96 bg-[#432361] px-[24px] md:px-[64px] py-[56px] pb-20 text-white">
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
  </footer>
</template>
