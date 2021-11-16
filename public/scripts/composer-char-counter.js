$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    const charLimit = 140;
    const charCount = charLimit - $(this).val().length;
    const counter = $(this).parent().find(".counter");

    counter.text(charCount);
    if (charCount >= 0) {
      counter.removeClass("exceedCharLimit");
    } else {
      counter.addClass("exceedCharLimit");
    }
  });
});
