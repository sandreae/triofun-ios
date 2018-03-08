

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

  		var voice_button = document.getElementById('panel-101')
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
      impulse3.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#hihat").adsr("release")
      })

      ///////PAGE 3/////////

      drum1.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#drum1").start()
      })
  		drum1.addEventListener('touchend', function(event) {
        var self = this
        stopSample(self)
  		})

      var stopSample = function(self){
        var id = "#" + self.id
        self.classList.remove("active")
        __(id).ramp([1,0],[0.1])
        setTimeout(function(){ 
          __(id).stop()
          __("#samplergain").attr({"gain": 1}) }, 100);
      }


  		__().sine({frequency:180}).adsr({id:"bass",envelope:[0.1, 0.1, 1]}).lowpass(120).compressor({release:0}).dac();
  		__().sine(80).adsr({id:"kick",envelope:[0.1, 0.1, 1]}).connect("compressor");
  		__().pink().adsr({id:"snare",envelope:[0.1, 0.1, 1]}).connect("compressor");
  		__().white().adsr({id:"hihat",envelope:[0.1, 0.1, 1]}).connect("compressor");
      __().monosynth().connect("compressor").play();
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum1", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum2", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum3", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum4", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum5", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum6", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum7", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum8", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum9", loop:true}).gain({id: "samplergain"}).connect("dac");
      __().sampler({path:"/triofun-ios/samples/10_Trtomds.wav", id: "drum10", loop:true}).gain({id: "samplergain"}).connect("dac");

  		cracked.soundLoaded = function(x) {
        console.log("sample loaded", x)
  		}

      var onError = function(err) {
        console.log('The following error occured: ' + err);
      }
    }
  });
}, false)