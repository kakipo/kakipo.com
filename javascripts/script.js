$(document).ready(function() {

  resize();
  draw_canvas();

  $(window).bind("resize", function() {
    resize();
    draw_canvas();
  });

  function resize() {
    var w = $(window).width();
    var h = $(window).height();

    $("#myCanvas").attr("width", w);
    $("#myCanvas").attr("height", h);
  }

  function draw_canvas() {

    var canvas = document.getElementById('myCanvas');
    var cW = canvas.getAttribute("width");
    var cH = canvas.getAttribute("height");
    var cell_size = 10;

    if(!canvas || !canvas.getContext) {
      return false;
    }
    var ctx = canvas.getContext('2d');
    var cvs = new Canvas(cW, cH, cell_size);

    upd_status(cvs);
    print(cvs);

    var agent = navigator.userAgent;
    if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1) {
      canvas.ontouchstart = function(e) {
        e.preventDefault();
        upd_status(cvs);
        print(cvs);
      }
      canvas.ontouchmove = function(e) {
        e.preventDefault();
        upd_status(cvs);
        print(cvs);
      }
      canvas.ontouchend = function(e) {
        e.preventDefault();
        upd_status(cvs);
        print(cvs);
      }
    } else {
      canvas.onmousemove = function(e) {
        upd_status(cvs);
        print(cvs);
      }
    }



    // A B C
    // D E F
    // H I J

    function upd_status(cvs) {

      for(var i = 0; i < cvs.rows; i++) {

        var row = cvs.cells[i];

        for(var j = 0; j < cvs.cols; j++) {

          var cell = row[j]; // E
          var cell_A = cvs.cells[i - 1 < 0 ? cvs.rows - 1 : i - 1][j - 1 < 0 ? cvs.cols - 1 : j - 1];
          var cell_B = cvs.cells[i - 1 < 0 ? cvs.rows - 1 : i - 1][j];
          var cell_C = cvs.cells[i - 1 < 0 ? cvs.rows - 1 : i - 1][j + 1 >= cvs.cols ? 0 : j + 1];

          var cell_D = cvs.cells[i][j - 1 < 0 ? cvs.cols - 1 : j - 1];
          var cell_F = cvs.cells[i][j + 1 >= cvs.cols ? 0 : j + 1];

          var cell_H = cvs.cells[i + 1 >= cvs.rows ? 0 : i + 1][j - 1 < 0 ? cvs.cols - 1 : j - 1];
          var cell_I = cvs.cells[i + 1 >= cvs.rows ? 0 : i + 1][j];
          var cell_J = cvs.cells[i + 1 >= cvs.rows ? 0 : i + 1][j + 1 >= cvs.cols ? 0 : j + 1];

          var other_live = cell_A.status + cell_B.status + cell_C.status + cell_D.status + cell_F.status + cell_H.status + cell_I.status + cell_J.status

          if(cell.status == 1) {
            if(other_live <= 1) {
              //cell.status = 0;
              cell.nextStatus = 0;
            } else if(other_live >= 4) {
              // cell.status = 0;
              cell.nextStatus = 0;
              }
          } else {
            //if(other_live == 3 || other_live == 4) {
            if(other_live == 3) {
              // cell.status = 1;
              cell.nextStatus = 1;
            }
          }

          // mutation
          if(cell.nextStatus == 0) {
            cell.extPeriod++;
          }else {
            cell.extPeriod = 0;
          }
          if(80 < cell.extPeriod && cell.nextStatus == 0) {
            cell.color = colorHex3(cell.color, 10);
            // cell.nextStatus = 1;
            cell.nextStatus = Math.round(Math.random()-0.49999);
            // if(120 < cell.extPeriod) {
            //   cell.color = "888";
            // }
          }
        }
      }
    }

    function colorHex3(str, n) {
      return "#" + ((parseInt(str.substring(1), 16)) % 4096 + n).toString(16);
    }

    function print(cvs) {

      for(var i = 0; i < cvs.rows; i++) {

        var row = cvs.cells[i];
        var y = i * cvs.cell_size;
        for(var j = 0; j < cvs.cols; j++) {

          var x = j * cvs.cell_size;

          var cell = row[j];

          //if(cell.status == 1) {
          if(cell.nextStatus == 1) {
            ctx.fillStyle = cell.color;
            ctx.fillRect(x, y, cvs.cell_size, cvs.cell_size);
          } else {
            //ctx.fillStyle = "#FFFFFF";
            ctx.clearRect(x, y, cvs.cell_size, cvs.cell_size);
          }
          cell.status = cell.nextStatus;
        }
      }
    }

    function Canvas(x, y, cell_size) {
      this.x = x;
      this.y = y;
      this.cell_size = cell_size;

      var rows = Math.floor(y / cell_size);
      var cols = Math.floor(x / cell_size);

      this.rows = rows;
      this.cols = cols;

      var cells = new Array(rows);

      for(var i = 0; i < rows; i++) {

        var row = new Array(cols);

        for(var j = 0; j < cols; j++) {

          var status = Math.round(Math.random());
          var color = "#aaa";

          row[j] = new Cell(i, j, color, status);
        }

        cells[i] = row;
      }

      this.cells = cells;
    }

    function Cell(x, y, color, status) {

      this.x = x;
      this.y = y;
      this.color = color;
      this.status = status;
      this.nextStatus = status;
      this.extPeriod = 0;

    }
  }

});