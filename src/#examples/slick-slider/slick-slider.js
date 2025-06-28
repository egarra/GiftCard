import $ from "jquery";
import "slick-carousel";

// Commented values - these are the default values
$(".reviews-slider").slick({
  // accessibility: true, // Enables tabbing and arrow key navigation
  // adaptiveHeight: false, // Enables adaptive height for single slide horizontal carousels.
  // appendArrows: $(element), // Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
  // appendDots: $(element), // Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
  // arrows: true, // Prev/Next Arrows
  // asNavFor: null, // Set the slider to be the navigation of other slider (Class or ID Name)
  // autoplay: false, // Enables Autoplay
  // autoplaySpeed: 3000, // Autoplay Speed in milliseconds
  // centerMode: false, // Enables centered view with partial prev/next slides. Use with odd numbered slidesToShow counts.
  // centerPadding: '50px', // Side padding when in center mode (px or %)
  // cssEase: 'ease', // CSS3 Animation Easing
  // customPaging: function(slider, i) {
  //     return $('<button type="button" />').text(i + 1);
  // }, // Custom paging templates
  // dots: false, // Show dot indicators
  // dotsClass: 'slick-dots', // Class for slide indicator dots container
  // draggable: true, // Enable mouse dragging
  // easing: 'linear', // Add easing for jQuery animate. Use with easing libraries or default easing methods
  // edgeFriction: 0.35, // Resistance when swiping edges of non-infinite carousels
  // fade: false, // Enable fade
  // focusOnSelect: false, // Enable focus on selected element (click)
  // focusOnChange: false,
  // initialSlide: 0, // Slide to start on
  // lazyLoad: 'ondemand', // Set lazy loading technique. Accepts 'ondemand' or 'progressive'
  // pauseOnHover: true, // Pause Autoplay On Hover
  // pauseOnFocus: true, // Pause Autoplay On Focus
  // pauseOnDotsHover: false, // Pause Autoplay when a dot is hovered
  // respondTo: 'window', // Width that responsive object responds to. Can be 'window', 'slider' or 'min' (the smaller of the two)
  // rows: 1, // Setting this to more than 1 initializes grid mode. Use slidesPerRow to set how many slides should be in each row.
  // rtl: false, // Change the slider's direction to become right-to-left
  // slide: '', // Element query to use as slide
  // slidesPerRow: 1, // With grid mode intialized via the rows option, this sets how many slides are in each grid row. dver
  // slidesToShow: 1, // # of slides to show
  // slidesToScroll: 1, // # of slides to scroll
  // speed: 500, // Slide/Fade animation speed
  // swipe: true, // Enable swiping
  // swipeToSlide: false, // Allow users to drag or swipe directly to a slide irrespective of slidesToScroll
  // touchMove: true, // Enable slide motion with touch
  // touchThreshold: 5, // To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider
  // useCSS: true, // Enable/Disable CSS Transitions
  // useTransform: true, // Enable/Disable CSS Transforms
  // variableWidth: false, // Variable width slides
  // vertical: false, // Vertical slide mode
  // verticalSwiping: false, // Vertical swipe mode
  // waitForAnimate: true, // Ignores requests to advance the slide while animating
  // zIndex: 1000, // Set the zIndex values for slides, useful for IE9 and lower
  infinite: false, // Infinite loop sliding
  mobileFirst: true, // Responsive settings use mobile first calculation
  prevArrow: ".reviews-prev-btn",
  nextArrow: ".reviews-next-btn",
  responsive: [
    // Object containing breakpoints and settings objects. Enables settings sets at given screen width. Set settings to "unslick" instead of an object to disable slick at a given breakpoint.
    {
      breakpoint: 767.98,
      settings: {
        slidesToShow: 2,
        variableWidth: true,
      },
    },
    // {
    //   breakpoint: 1279.98,
    //   settings: "unslick",
    // },
  ],
});
