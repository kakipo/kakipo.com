---
layout: home
---

<div id="gol-container" style="position:relative; width:100%; height:160px; overflow:hidden; margin-bottom:2rem;">
  <canvas id="gol-canvas" style="display:block;"></canvas>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="/assets/js/jquery.ca2d.min.js"></script>
<script>
$(document).ready(function() {
  function initCanvas() {
    var container = $("#gol-container");
    var w = container.width();
    var h = container.height();

    $("#gol-canvas").attr("width", w);
    $("#gol-canvas").attr("height", h);
    $("#gol-canvas").removeData("ca2d");

    $("#gol-canvas").ca2d({
      color: function(state) {
        return state == 1 ? "#dfdfdf" : "#fafafa";
      }
    });
    $("#gol-canvas").ca2d("step");
  }

  $(window).on("resize", function() {
    initCanvas();
  });

  initCanvas();

  var agent = navigator.userAgent;
  if (agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1) {
    $("#gol-canvas").on("touchstart touchmove touchend", function(e) {
      e.preventDefault();
      $(this).ca2d("step");
    });
  } else {
    $("#gol-canvas").on("mousemove", function(e) {
      $(this).ca2d("step");
    });
  }
});
</script>

# kakipo

ソフトウェアエンジニア / 起業家 / 投資家
広島 → カリフォルニア → 東京

---

## Now

- 起業・事業運営
- エンジェル投資
- 屋久島のホテル運営

## Food

ペスカタリアン。魚・乳製品・卵は食べる。肉（哺乳類・鳥類）は食べない。

## Links

- [X (Twitter)](https://x.com/kakipo)
- [Facebook](https://www.facebook.com/kensuke.naito)
- [GitHub](https://github.com/kakipo)
- [LinkedIn](https://www.linkedin.com/in/kakipo)
- [Email](mailto:kakipo@gmail.com)

---

*Last updated: 2026-03-14*
