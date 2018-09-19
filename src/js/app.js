import $ from 'jquery';
import Chartist from 'Chartist';
import Swiper from 'swiper';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';
import '../../node_modules/jquery-popup-overlay/jquery.popupoverlay';
import '../../node_modules/snazzy-info-window/dist/snazzy-info-window.min';

$(document).ready(function() {
  //----------- TABS-MAPS -------------
  $('.tabs__wrap').hide();
  $('.tabs__wrap:first').show();
  $('.tabs ul a:first').addClass('active');

  $('.tabs ul a').click(function(event) {
    event.preventDefault();
    $('.tabs ul a').removeClass('active');
    $(this).addClass('active');
    $('.tabs__wrap').hide();

    var selectTab = $(this).attr('href');
    $(selectTab).fadeIn();
  });

  //-------------- DIAGRAM--------------
  $('.ct-series').click(function() {
    $('.ct-series').removeClass('active');
    $(this).addClass('active');
  });
  //--------------- HAMBURGER ------------

  $('.slide__head').click(function() {
    $('.slide__head').removeClass('active');
    $(this).addClass('active');
    $(this).next().slideToggle();
    $('.slide__toggle').not($(this).next()).slideUp();

  });
  $('input[type="tel"]').mask('+7 (000) 000-00-00');
  //-------------- VALIDATOR + FORM --------------
  jQuery.validator.addMethod('phoneno', function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');

  $('.form').each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: 'Введите Ваше имя',
        tel: 'Введите Ваш телефон',
        email: 'Введите Ваш E-mail',
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find('input[name=name]').val(),
          tel: jQuery('.form-' + index).find('input[name=tel]').val(),
          email: jQuery('.form-' + index).find('input[name=email]').val()
        };
        ajaxSend('.main-form-' + index, t);
      }
    });
    $('.modal').popup({
      transition: 'all 0.3s',
      onclose: function() {
        $(this).find('label.error').remove();
      }
    });
  });
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('#form').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  };
  //--------------- ANCHOR ------------
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }

  });
  //---------- NAV-HAMBURGER ------------
  $('.nav__button, .nav ul li a').click(function() {
    $('.navigation__wrapper').toggleClass('active'),
    $('.nav__button').toggleClass('active');
  });

});
var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
});

var swiperTwo = new Swiper('.swiper-container-two', {
  slidesPerView: 4,
  centeredSlides: true,
  spaceBetween: 0,
  loop: true,
  breakpoints: {
    575: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
    1400: {
      slidesPerView: 3,
    }
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
//---------- GOOGLE-MAP ---------------
var map;
function initMap() {
  var uluru = {lat: 43.5964027, lng: 39.7338516};
  map = new google.maps.Map(document.getElementById('map'), {
    center: uluru,
    zoom: 14,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'saturation': 36
          },
          {
            'color': '#333333'
          },
          {
            'lightness': 40
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'color': '#ffffff'
          },
          {
            'lightness': 16
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#fefefe'
          },
          {
            'lightness': 20
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#fefefe'
          },
          {
            'lightness': 17
          },
          {
            'weight': 1.2
          }
        ]
      },
      {
        'featureType': 'administrative.locality',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f5f5'
          },
          {
            'lightness': 20
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f5f5'
          },
          {
            'lightness': 21
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dedede'
          },
          {
            'lightness': 21
          },
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#caac68'
          },
          {
            'lightness': 17
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#ffffff'
          },
          {
            'lightness': 29
          },
          {
            'weight': 0.2
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#ffffff'
          },
          {
            'lightness': 18
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#ffffff'
          },
          {
            'lightness': 16
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f2f2f2'
          },
          {
            'lightness': 19
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e9e9e9'
          },
          {
            'lightness': 17
          }
        ]
      }
    ]
  });
}
initMap();


var data = {
  labels: [['2017'],['2018'],['2016']],
  series: [{
    value: 40,
    name: 'Series 1',
    className: 'my-custom-class-one',
    meta: 'Meta One'
  }, {
    value: 30,
    name: 'Series 2',
    className: 'my-custom-class-two',
    meta: 'Meta Two'
  }, {
    value: 40,
    name: 'Series 3',
    className: 'my-custom-class-three  active',
    meta: 'Meta Three'
  }]
};

var options = {
  showLabel: false,
  chartPadding: 50,
  classNames: {
    chartPie: 'ct-chart-pie',
    series: 'ct-series',
    slicePie: 'ct-slice-pie',
    label: 'ct-label'
  },
  // labelInterpolationFnc: function(value) {
  //   return value[0];
  // }
};

var responsiveOptions = [
  ['screen and (min-width: 575px)', {
    width: 300,
    chartPadding: 50,
    labelOffset: 10,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 768px)', {
    width: 450,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 992px)', {
    width: 500,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 1300px)', {
    width: 600,
    labelInterpolationFnc: function(value) {
      return value;
    }
  }]
];


new Chartist.Pie('.ct-chart', data, options, responsiveOptions);



