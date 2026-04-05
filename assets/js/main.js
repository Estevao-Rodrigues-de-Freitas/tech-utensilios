// Disable animation on mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (!isMobile) {
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 30;
const images = [];
let loaded = 0;

// Way of frames
const framePath = i =>
  `assets/images/framesCityBackground/c_${String(i + 1).padStart(4, "0")}.webp`;


// Adjust on canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Preload of frames
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = framePath(i);
  img.onload = () => {
    loaded++;
    if (loaded === frameCount) {
      render(0);
      requestAnimationFrame(update);
    }
  };
  images.push(img);
}

// Render of frames
function render(index) {
  const img = images[index];
  if (!img) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = (canvas.width - img.width * scale);
  const y = (canvas.height - img.height * scale);

  ctx.drawImage(
    img,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

// Loop with scroll
function update() {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  if (maxScroll <= 0) {
    render(0);
    requestAnimationFrame(update);
    return;
  }

  const scrollProgress = window.scrollY / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.round(scrollProgress * (frameCount - 1))
  );

  render(frameIndex);

  requestAnimationFrame(update);
}
}