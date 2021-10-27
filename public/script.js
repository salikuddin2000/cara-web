window.onscroll = function () {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
      document.getElementById("caraHeading").style.marginTop = "10px";

        document.getElementById("caraHeading").style.fontSize = "55px";

      document.getElementById("caraHeading").style.position = "fixed";
    //   document.getElementById("header").style.position = "fixed";
    //   document.getElementById("header").style.height = "4rem";
      // document.getElementById("header").style.boxShadow = "0 2px 15px -2px rgba(0,0,0,0.2)";
      // document.getElementById("header").style.zIndex = 100000;
      // document.getElementById("sliderWrapper").style.zIndex = 100000;
      // document.getElementById("header").style.backgroundColor = "white";

    } else {
      document.getElementById("caraHeading").style.fontSize = "100px";
      document.getElementById("header").style.height = "200px";
      document.getElementById("caraHeading").style.marginTop = "70px";
      document.getElementById("caraHeading").style.position = "relative";
    }
  }