const audioContext = new AudioContext();

const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
const file = document.getElementById("filleupload");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analayzer;

container.addEventListener("click", function () {
  //  وقتی که صفحه رو رفرش میکنی کد مشکل میخوره  باید یک بار سیو کنی و دوباره ران بگیری ازش!!!
  const audio1 = document.getElementById("audio1");
  audio1.src =
    audio1.play();
  if (audioSource) {
    audioSource.disconnect();
  } else {
    audioSource = audioContext.createMediaElementSource(audio1);
  }
});

file.addEventListener("change", function () {
  const files = this.files;
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(files[0]);
  audio1.load();
  audio1.play();

  analayzer = audioContext.createAnalyser();
  audioSource.connect(analayzer);
  analayzer.connect(audioContext.destination);
  analayzer.fftSize = 16384;
  //32768
  const bufferLength = analayzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    //Create shape of bars
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analayzer.getByteFrequencyData(dataArray);
    visulizer(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

let currentColor = getRandomColor(); // Initial color

function visulizer(bufferLength, x, barWidth, barHeight, dataArray) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i + (Math.PI * 2) / bufferLength);

    // Set the fill style to the current color
    ctx.fillStyle = currentColor;

    // Draw the rectangle
    ctx.fillRect(0, 0, barWidth, barHeight);

    // Draw a rectangle to create a gap at the bottom
    const gapHeight = 30; // Adjust the gap height as needed
    ctx.fillStyle = "white"; // Set the color of the gap
    ctx.fillRect(0, barHeight - gapHeight, barWidth, gapHeight);

    x += barWidth;
    ctx.restore();
  }
}

// Function to get a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Example of changing the color when the song changes
function changeSong() {
  currentColor = getRandomColor();
  // Additional logic to change the audio source or perform other actions
}

// Call changeSong() when you want to change the song
