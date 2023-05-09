
$(document).ready(function () {
  //Initialize popover component
  $(function () {
    $('[data-toggle="popover"]').popover();
  });

  $(".flipper").click(function () {
    var target = $(event.target);

    if (target.is("a")) {
      //follow that link
      return true;
    } else {
      $(this).toggleClass("flip");
    }

    return false;
  });

  $(".v-flipper").click(function () {
    $(this).toggleClass("v-flip");
  });

  //Set the date we're counting down to
  var utcCountDownDate = new Date("05/12/2023 21:30:00 UTC");
  const countDownDate = utcCountDownDate.getTime();

  //Update the count down every 1 second
  var run = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Outputs the result
    $(".days").html(days);
    $(".hours").html(hours);
    $(".minutes").html(minutes);
    $(".seconds").html(seconds);

    // If the count down is over, write counter to 0 
    if (distance < 0) {
      clearInterval(run);

      $(".days").html(0);
      $(".hours").html(0);
      $(".minutes").html(0);
      $(".seconds").html(0);
    }
  }, 1000);

  var Query = "globalazurelatam";

  TweetJs.Search(Query,
    function (data) {
      var tpl = $("#tplItem").html();
      data.statuses.forEach(item => item.created_at = item.created_at.substring(4, 10));
      var strHtml = Mustache.render(tpl, data);
      $("#divResults").html(strHtml);
    });

  convertEnglishDatesToSpanish();
});

function convertEnglishDatesToSpanish() {

  waitForElement("#sessionize > ul > li.sz-tabs__item > a[data-sztz-l='Thursday']", function () {
    let tabs = document.getElementsByClassName("sz-tabs__item");
    tabs[0].firstElementChild.innerHTML = "Viernes";
    tabs[1].firstElementChild.innerHTML = "Sabado";

    let titles = document.getElementsByClassName("sz-day__title");
    titles[0].innerHTML = "Viernes 12 de Mayo del 2023";
    titles[1].innerHTML = "Sabado 13 de Mayo del 2023";
  });
}

function waitForElement(elementPath, callBack) {
  var interval = setInterval(function () {
    if ($(elementPath).length) {
      callBack(elementPath, $(elementPath));
      clearInterval(interval);
    }
  }, 100)
}