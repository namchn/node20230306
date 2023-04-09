if (!window.App) {
  App = {};
}
if (!App.start) {
  App.start = {};
}

$(function () {
  var startApp = new App.start.test();

  startApp.init();
});

App.start.test = function () {
  var self;

  return {
    init: function () {
      self = this;

      //내용 토글
      self.toggle(); //center 클릭
    },

    //FAQ 답변 toggle 메소드
    toggle: function () {
      $(".center").click(function () {
        var $this = $(this);
        var alt = $this.find("img").attr("alt");

        console.log($this.find("img").attr("alt"));

        $("h1").text(alt);

        //alert("start!");
        //$this.closest('.b-quest-box').next('.b-ans-box').slideToggle(0);
      });
    },
  };
};
