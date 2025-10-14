(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter - Wait for document to be ready
  $(document).ready(function () {
    if ($.fn.counterUp) {
      $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000,
      });
    }
  });

  // Header carousel - Fixed for RTL
  $(document).ready(function () {
    if ($.fn.owlCarousel) {
      $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
        rtl: true,
        onInitialized: function (event) {
          // Fix dot positioning after initialization
          setTimeout(function () {
            $(".header-carousel .owl-dots").css({
              right: "auto",
              left: "30px",
              display: "flex",
              flexDirection: "column",
            });
          }, 100);
        },
      });

      // Testimonials carousel - Fixed for RTL
      $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        rtl: true,
        navText: [
          '<i class="bi bi-arrow-right"></i>',
          '<i class="bi bi-arrow-left"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
        },
      });

      // Custom carousel dots functionality - Only if custom dots exist
      if ($(".carousel-dot").length > 0) {
        $(".carousel-dot").click(function () {
          var index = $(this).data("index");
          $(".header-carousel").trigger("to.owl.carousel", [index, 300]);
        });

        $(".header-carousel").on("changed.owl.carousel", function (event) {
          var current = event.item.index;
          $(".carousel-dot").removeClass("active").css({
            width: "45px",
            height: "45px",
          });
          $('.carousel-dot[data-index="' + current + '"]')
            .addClass("active")
            .css({
              width: "60px",
              height: "60px",
            });
        });
      }
    }
  });

  // Portfolio isotope and filter - Wait for document ready
  $(document).ready(function () {
    if ($.fn.isotope) {
      var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");
        portfolioIsotope.isotope({ filter: $(this).data("filter") });
      });
    }
  });

  // Lightbox initialization
  $(document).ready(function () {
    // Initialize lightbox for portfolio items
    if (typeof lightbox !== "undefined" && $.fn.lightbox) {
      $('[data-lightbox="portfolio"]').lightbox();
    }

    // Alternative lightbox if the above doesn't work
    $('[data-lightbox="portfolio"]').on("click", function (e) {
      e.preventDefault();
      var imageUrl = $(this).attr("href");
      // Create a simple lightbox if no lightbox library is available
      if (typeof lightbox === "undefined") {
        $("body").append(
          '<div class="modal fade" id="imageModal" tabindex="-1">' +
            '<div class="modal-dialog modal-lg">' +
            '<div class="modal-content">' +
            '<div class="modal-body text-center">' +
            '<img src="' +
            imageUrl +
            '" class="img-fluid" alt="">' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
        $("#imageModal").modal("show");
        $("#imageModal").on("hidden.bs.modal", function () {
          $(this).remove();
        });
      }
    });
  });
})(jQuery);
