window.onload = () => {
  let base = $("#base");
  base.hide();
  $.ajax("/data/maquinas.json").done((data) => {
    for (let item of data) {
      let clone = base.clone();

      clone.find("img").attr("src", item.productImage);
      clone.find("a").attr("href", item.productImage);
      clone.find("#productName").html(item.productCompleteName);
      clone.show();

      base.before(clone);
    }
  });

  $(".owl-carousel").owlCarousel({
    center: true,
    items: 2,
    loop: true,
    margin: 30,
    autoWidth:true,
    video: true,
    videoWidth: true
  });

  var playerSettings = {
    controls: ["play-large"],
    fullscreen: { enabled: false },
    resetOnEnd: true,
    hideControls: true,
    clickToPlay: true,
    keyboard: false,
  };

  const players = Plyr.setup(".js-player", playerSettings);

  players.forEach(function (instance, index) {
    instance.on("play", function () {
      players.forEach(function (instance1, index1) {
        if (instance != instance1) {
          instance1.pause();
        }
      });
    });
  });

  $(".video-section").on("translated.owl.carousel", function (event) {
    players.forEach(function (instance, index1) {
      instance.pause();
    });
  });
};
