

document.addEventListener("DOMContentLoaded", function() {

  var container = document.getElementById("drag-container");
  dragend = new Dragend(container, {
    afterInitialize: function() {

      document.body.addEventListener('touchmove', function(e) { 
        e.preventDefault(); 
        var xa = x
        var x = Math.floor( event.touches[0].clientY );
        __("monosynth").ramp(x,0.01,"frequency",xa);
      });

      container.style.visibility = "visible";

  		var voice_button = document.getElementById('panel-101')
  		var drum1 = document.getElementById('panel-201')
  		var drum2 = document.getElementById('panel-202')
  		var drum3 = document.getElementById('panel-203')
  		var drum4 = document.getElementById('panel-204')
  		var voicetog = false

      FastClick.attach(document.body);

      voice_button.addEventListener('touchstart', function(event) {
        cracked.unlock()
        this.classList.add("active")
        __("monosynth").monosynth("noteOn",60);
      })
  		voice_button.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("monosynth").monosynth("noteOff")
  		})

      drum1.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#kick").adsr("trigger")
      })
      drum1.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#kick").adsr("release")
      })
      drum2.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#bass").adsr("trigger")
      })
      drum2.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#bass").adsr("release")
      })
      drum3.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#snare").adsr("trigger")
      })
      drum3.addEventListener('touchend', function(event) {
        this.classList.remove("active")
        __("#snare").adsr("release")
      })
      drum4.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#hihat").adsr("trigger")
      })
  		drum4.addEventListener('touchend', function(event) {
        this.classList.remove("active")
  			__("#hihat").adsr("release")
  		})

  		__().sine({frequency:180}).adsr({id:"bass",envelope:[0.1, 0.1, 1]}).lowpass(120).compressor({release:0}).dac();
  		__().sine(80).adsr({id:"kick",envelope:[0.1, 0.1, 1]}).connect("compressor");
  		__().pink().adsr({id:"snare",envelope:[0.1, 0.1, 1]}).connect("compressor");
  		__().white().adsr({id:"hihat",envelope:[0.1, 0.1, 1]}).connect("compressor");
      __().monosynth().connect("compressor").play();

  		cracked.soundLoaded = function(x) {
        console.log("sample loaded", x)
  		}

      var onError = function(err) {
        console.log('The following error occured: ' + err);
      }
    }
  });
}, false)