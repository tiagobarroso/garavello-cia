/*
    Everything is loaded including images.
*/
window.onload = () => {
  
  $("body").addClass("loaded");

  let base = $("#base");
  base.hide();

  $.ajax("/data/videos.json").done((data) => {

    for (let item of data) {
      let clone = base.clone();

      clone.find("video").attr("src", item.url);
      clone.find("a").attr("href", item.productImage);
      clone.find("h2").html(item.productName);
      clone.find(".tm-figure-description").html(item.productCompleteName);
      clone.show();
      clone.on('click', () => {openModal(item.nome, item.url)})

      base.before(clone);
    }

  });

  $('#videoModal').on('hidden.bs.modal', function (e) {
    const videoModal = $('#videoModal');
    videoModal.find("video")[0].pause();
  })
}

function openModal (nome, src) { 
  const videoModal = $('#videoModal');
  videoModal.find("#modalLabel").html(nome);
  videoModal.find("source").attr("src", src);
  videoModal.find("video")[0].load();
  videoModal.find("video")[0].play();
  videoModal.modal('show');
}


