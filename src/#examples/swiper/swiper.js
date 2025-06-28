import Swiper from "swiper";
import { Navigation } from "swiper/modules";

function createSwiper(swiperContainer, parameters) {
  // all params: https://swiperjs.com/swiper-api#parameters
  const swiper = new Swiper(`${swiperContainer}-swiper`, {
    modules: [Navigation], // all modules: https://swiperjs.com/swiper-api#modules
    grabCursor: true, // Default: false (boolean). This option may a little improve desktop usability. If true, user will see the "grab" cursor when hover on Swiper.
    spaceBetween: 20, // Default: 0 (string | number). Distance between slides in px.
    // slidesPerView: "1", // Default: 1 (number | 'auto'). Number of slides per view (slides visible at the same time on slider's container).
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 3,
      },
    },
    navigation: {
      prevEl: `${swiperContainer}-button-prev`,
      nextEl: `${swiperContainer}-button-next`,
    },
    ...parameters,
  });

  // all events: https://swiperjs.com/swiper-api#events
}

createSwiper(".reviews");

// createSwiper(".example", {
//   slidesPerView: "auto",
//   spaceBetween: 16,
//   breakpoints: {
//     768: {
//       slidesPerView: 2.3,
//       spaceBetween: 32,
//     },
//   },
// });
