

document.addEventListener("DOMContentLoaded", function() {

  var container = document.getElementById("demo");
  dragend = new Dragend(container, {
    afterInitialize: function() {
      container.style.visibility = "visible";

  		var voice_button = document.getElementById('panel-101')
  		var drum1 = document.getElementById('panel-201')
  		var drum2 = document.getElementById('panel-202')
  		var drum3 = document.getElementById('panel-203')
  		var drum4 = document.getElementById('panel-204')
  		var voicetog = false

      FastClick.attach(document.body);

  		voice_button.addEventListener('click', function(event) {
        cracked.unlock()
  		})

  		drum1.addEventListener('touchstart', function(event) {
        this.classList.add("active")
  			__("#bass").adsr("trigger")
  			setInterval(function() {event.target.classList.remove("active")}, 500)
  		})
  		drum2.addEventListener('touchstart', function(event) {
        this.classList.add("active")
  			__("#kick").adsr("trigger")
  			setInterval(function() {event.target.classList.remove("active")}, 500)
  		})
  		drum3.addEventListener('touchstart', function(event) {
        this.classList.add("active")
  			__("#snare").adsr("trigger")
  			setInterval(function() {event.target.classList.remove("active")}, 500)
  		})
      drum4.addEventListener('touchstart', function(event) {
        this.classList.add("active")
        __("#hihat").adsr("trigger")
      })
  		drum4.addEventListener('touchend', function(event) {
        this.classList.remove("active")
  			__("#hihat").adsr("release")
  		})

  		__().sine({frequency:180}).adsr({id:"bass",envelope:0.8}).lowpass(120).compressor({release:0}).dac();
  		__().sine(80).adsr({id:"kick",envelope:0.5}).connect("compressor"); //100ms envelope
  		__().pink().adsr({id:"snare",envelope:0.3}).connect("compressor"); //50ms
  		__().white().adsr({id:"hihat",envelope:[0.1, 0.1, 1]}).connect("compressor").play(); //10ms

  		cracked.soundLoaded = function(x) {
        console.log("sample loaded", x)
  		}

      var onError = function(err) {
        console.log('The following error occured: ' + err);
      }
    }
  });
}, false)