

document.addEventListener("DOMContentLoaded", function() {

  var container = document.getElementById("drag-container");
  dragend = new Dragend(container, {
    afterInitialize: function() {

      document.body.addEventListener('touchmove', function(e) { 
        e.preventDefault(); 
        var xa = x
        var x = Math.floor( e.touches[0].clientY );
        __("monosynth").ramp(x,0.01,"frequency",xa);
      });

      container.style.visibility = "visible";

  		var voice_button = document.getElementById('touch-synth')
  		var impulse1 = document.getElementById('panel-201')
  		var impulse2 = document.getElementById('panel-202')
  		var impulse3 = document.getElementById('panel-203')
  		var impulse4 = document.getElementById('panel-204')
      var drum1 = document.getElementById('drum1')
  		var voicetog = false

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

      ///////PAGE 2/////////

      impulse1.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#kick").adsr("trigger")
      })
      impulse1.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#kick").adsr("release")
      })
      impulse2.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#bass").adsr("trigger")
      })
      impulse2.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#bass").adsr("release")
      })
      impulse3.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#snare").adsr("trigger")
      })
      impulse3.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#snare").adsr("release")
      })
      impulse4.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#hihat").adsr("trigger")
      })
      impulse4.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#hihat").adsr("release")
      })

      ///////PAGE 3/////////

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
    }
  });
}, false)