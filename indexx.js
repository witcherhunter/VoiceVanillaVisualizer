const audio1 = new Audio('https://dl4.download1music.ir/Music/2020/Mohsen%20Ebrahimzadeh/Mohsen%20Ebrahimzadeh%20-%20Doneh%20Doneh%202%20128.mp3');

audio1.addEventListener("loadeddata", function () {
  // The "loadeddata" event is fired when audio data is loaded and ready to play
  audio1.play();
  audio1.addEventListener("playing", function () {
    console.log("Audio is playing:", audio1.src);
  });
  audio1.addEventListener("ended", function () {
    console.log("Audio ended");
  });
});

audio1.addEventListener("error", function () {
  console.error("Error loading the audio");
});
