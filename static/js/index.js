window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

let ballTable = (function () {
  let tabContainer = document.getElementById('results-tabs-1');
  let tabs = tabContainer.querySelectorAll('li');
  let tabsContent = document.querySelectorAll('.tabs-balls-1')

  let video_videos = [
    ["./static/videos/comfree-videos/mpc/cube_1.mp4",
     "./static/videos/comfree-videos/mpc/cube_2.mp4",
     "./static/videos/comfree-videos/mpc/cube_3.mp4",
     "./static/videos/comfree-videos/mpc/cube_4.mp4"],
    ["./static/videos/comfree-videos/mpc/duck_1.mp4",
     "./static/videos/comfree-videos/mpc/duck_2.mp4",
     "./static/videos/comfree-videos/mpc/duck_3.mp4",
     "./static/videos/comfree-videos/mpc/duck_4.mp4"],
    ["./static/videos/comfree-videos/mpc/spam_1.mp4",
     "./static/videos/comfree-videos/mpc/spam_2.mp4",
     "./static/videos/comfree-videos/mpc/spam_3.mp4",
     "./static/videos/comfree-videos/mpc/spam_4.mp4"],
    ["./static/videos/comfree-videos/mpc/cylinder_1.mp4",
     "./static/videos/comfree-videos/mpc/cylinder_2.mp4",
     "./static/videos/comfree-videos/mpc/cylinder_3.mp4",
     "./static/videos/comfree-videos/mpc/cylinder_4.mp4"]
  ];

  let deactvateAllTabs = function () {
    tabs.forEach(function (tab) {
      tab.classList.remove('is-active');
    });
  };

  let activateTabsContent = function (tab) {
    let tabId = getIndex(tab);
    for (i = 0; i < tabsContent.length; i++) {
      let videoContainer = tabsContent[i];
      let videoSource = videoContainer.children[0]
      videoSource.src = video_videos[tabId][i];
      console.log(videoSource.src);
      videoContainer.load();
    }
  };

  let getIndex = function (el) {
    return [...el.parentElement.children].indexOf(el);
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      deactvateAllTabs();
      tab.classList.add('is-active');
      activateTabsContent(tab);
    });
  })

  tabs[0].click();
});


$(document).ready(function() {

  ballTable();

})


let ballHand = (function () {
  let tabContainer = document.getElementById('results-tabs-2');
  let tabs = tabContainer.querySelectorAll('li');
  let videoElement = document.querySelector('.tabs-hands-2');

  let video_paths = [
    "./static/videos/comfree-videos/retargeting/retargeting_cartwheels.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_martial_arts.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_dance.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_getup.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_pushbox.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_n1_sprint.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_n1_runback.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_t1_sprint.mp4",
    "./static/videos/comfree-videos/retargeting/retargeting_t1_skip.mp4"
  ];

  let deactivateAllTabs = function () {
    tabs.forEach(function (tab) {
      tab.classList.remove('is-active');
      tab.querySelector('a').style.backgroundColor = '#dbdbdb';
      tab.querySelector('a').style.color = '#363636';
    });
  };

  let activateTab = function (tab) {
    tab.classList.add('is-active');
    tab.querySelector('a').style.backgroundColor = '#3273dc';
    tab.querySelector('a').style.color = 'white';
  };

  let updateVideo = function (tabId) {
    let videoSource = videoElement.children[0];
    videoSource.src = video_paths[tabId];
    console.log(videoSource.src);
    videoElement.load();
  };

  let getIndex = function (el) {
    return [...el.parentElement.children].indexOf(el);
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      deactivateAllTabs();
      activateTab(tab);
      updateVideo(getIndex(tab));
    });
  })

  tabs[0].click();
});


$(document).ready(function() {

  ballHand();

})
