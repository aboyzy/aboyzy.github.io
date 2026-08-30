/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;
        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 120) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 135) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});

/**
 * LivePhotos integration for Hexo
 * This script handles the integration of Apple's LivePhotosKit.js
 */

(function() {
  // 当文档加载完成后执行
  document.addEventListener('DOMContentLoaded', function() {
    // 查找所有带有live-photo类的元素
    var livePhotoElements = document.querySelectorAll('.live-photo');

    if (livePhotoElements.length > 0) {
      // 如果页面上有实况照片元素，才加载LivePhotosKit.js
      var script = document.createElement('script');
      script.src = 'https://cdn.apple-livephotoskit.com/lpk/1/livephotoskit.js';
      script.onload = function() {
        // LivePhotosKit.js加载完成后，初始化所有实况照片
        initializeLivePhotos(livePhotoElements);
      };
      document.head.appendChild(script);
    }
  });

  // 初始化所有实况照片元素
  function initializeLivePhotos(elements) {
    elements.forEach(function(element) {
      // 获取照片和视频的URL
      var photoSrc = element.getAttribute('data-photo-src');
      var videoSrc = element.getAttribute('data-video-src');

      if (photoSrc && videoSrc) {
        // 创建LivePhotosKit播放器
        var player = LivePhotosKit.Player(element);

        // 设置照片和视频源
        player.photoSrc = photoSrc;
        player.videoSrc = videoSrc;

        // 添加鼠标悬停事件来播放实况照片
        element.addEventListener('mouseenter', function() {
          player.play();
        });

        element.addEventListener('mouseleave', function() {
          player.pause();
        });

        // 添加触摸事件支持（移动设备）
        element.addEventListener('touchstart', function() {
          player.play();
        });

        element.addEventListener('touchend', function() {
          player.pause();
        });

        // 添加样式
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.style.display = 'inline-block';
      }
    });
  }
})();