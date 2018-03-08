

document.addEventListener("DOMContentLoaded", function() {

  var container = document.getElementById("drag-container");
  dragend = new Dragend(container, {
    afterInitialize: function() {

      var detune = 0
      var currentpitch = 90
      document.body.addEventListener('touchmove', function(e) { 
        e.preventDefault(); 
        var lastpitch = currentpitch
        var currentpitch = Math.floor( e.touches[0].clientY );
        console.log(currentpitch)
        __("monosynth").ramp(currentpitch,0.01,"frequency",lastpitch);
      });

      container.style.visibility = "visible";

  		var voice_button = document.getElementById('touch-synth')

      FastClick.attach(document.body);

      ///////PAGE 1/////////

      voice_button.addEventListener('touchstart', function(event) {
        cracked.unlock()
        this.classList.add("active")
        __("monosynth").monosynth("noteOn",60);
      })
  		voice_button.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("monosynth").monosynth("noteOff")
  		})


      var drums = document.getElementsByClassName('drum-sample')
      // You have to call the arrays forEach method
      Array.prototype.forEach.call(drums, function(el, i) { 
        var id = "#" + el.id
        el.addEventListener('touchstart', function(event) {
          el.classList.add("active")
          __(id).start()
        })
        el.addEventListener('touchend', function(event) {
          __(id).ramp([1,0],[0.05])
          setTimeout(function(){ 
            __(id).stop()
            __("#samplergain").attr({"gain": 1}) }, 50);
            el.classList.remove("active")
        })
      });

  		__().sine({frequency:180}).adsr({id:"bass",envelope:[0.1, 0.1, 1]}).lowpass(120).compressor({release:0}).dac();
  		__().sine(80).adsr({id:"kick",envelope:[0.1, 0.1, 1]}).connect("compressor");
  		__().pink().adsr({id:"snare",envelope:[0.1, 0.1, 1]}).connect("compressor");
  		__().white().adsr({id:"hihat",envelope:[0.1, 0.1, 1]}).connect("compressor");
      __().monosynth().connect("compressor").play();
      __().sampler({path:"/triofun-ios/samples/1_clapogg.mp3", id: "drum1", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/2_clapogg.mp3", id: "drum2", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/3_clapogg.mp3", id: "drum3", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/4_clapogg.mp3", id: "drum4", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/5_wormbassds.mp3", id: "drum5", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/6_feedthisds.mp3", id: "drum6", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/7_grumpybuzzardds.mp3", id: "drum7", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/8_eelbassds.mp3", id: "drum8", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/9_clavogg.mp3", id: "drum9", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.mp3", id: "drum10", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/11_Trtomds.mp3", id: "drum11", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/12_hatds.mp3", id: "drum12", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/13_crashogg.mp3", id: "drum13", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/14_FisaCymds.mp3", id: "drum14", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/15_Cymbalds.mp3", id: "drum15", loop:true}).connect("#samplergain");
      __().sampler({path:"/triofun-ios/samples/16_hihatopenedogg.mp3", id: "drum16", loop:true}).connect("#samplergain");

  		cracked.soundLoaded = function(x) {
        console.log("sample loaded", x)
  		}

      var onError = function(err) {
        console.log('The following error occured: ' + err);
      }

      function handleOrientation(event) {
        var x = event.beta;  // In degree in the range [-180,180]

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x >  90) { x =  90};
        if (x < -90) { x = -90};
        x += 90;
        
        xMax = 180;
        xMin = 0;

        yMax = 30;
        yMin = 10;

        percent = (inputY - yMin) / (yMax - yMin);
        outputX = percent * (xMax - xMin) + xMin;

        __("monosynth").attr({"detune":outputX})
      }

      window.addEventListener('deviceorientation', handleOrientation);
    }
  });
}, false)