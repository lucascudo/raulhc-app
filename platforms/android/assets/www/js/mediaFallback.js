window.Media = function(src, mediaSuccess, mediaError, mediaStatus){
  // src: A URI containing the audio content. (DOMString)
  // mediaSuccess: (Optional) The callback that executes after a Media object has completed the current play, record, or stop action. (Function)
  // mediaError: (Optional) The callback that executes if an error occurs. (Function)
  // mediaStatus: (Optional) The callback that executes to indicate status changes. (Function)

  if (typeof Audio !== "function" && typeof Audio !== "object") {
    console.warn("HTML5 Audio is not supported in this browser");
  }
  var sound = new Audio();
  sound.src = src;
  sound.addEventListener("ended", mediaSuccess, false);
  sound.load();

  return {
    // Returns the current position within an audio file (in seconds).
    getCurrentPosition: function(mediaSuccess, mediaError){ mediaSuccess(sound.currentTime); },
    // Returns the duration of an audio file (in seconds) or -1.
    getDuration: function(){ return isNaN(sound.duration) ? -1 : sound.duration; },
    // Start or resume playing an audio file.
    play: function(){ sound.play(); },
    // Pause playback of an audio file.
    pause: function(){ sound.pause(); },
    // Releases the underlying operating system's audio resources. Should be called on a ressource when it's no longer needed !
    release: function(){},
    // Moves the position within the audio file.
    seekTo: function(milliseconds){}, // TODO
    // Set the volume for audio playback (between 0.0 and 1.0).
    setVolume: function(volume){ sound.volume = volume; },
    // Start recording an audio file.
    startRecord: function(){},
    // Stop recording an audio file.
    stopRecord: function(){},
    // Stop playing an audio file.
    stop: function(){ sound.pause(); if(mediaSuccess){mediaSuccess();} } // TODO
  };
};