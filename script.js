// Magnetic parallax — name follows cursor with lag
const name = document.querySelector('.name');
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  targetX = (e.clientX - cx) / cx * 8;
  targetY = (e.clientY - cy) / cy * 5;
});

function lerp(a, b, t) { return a + (b - a) * t; }

function tick() {
  currentX = lerp(currentX, targetX, 0.06);
  currentY = lerp(currentY, targetY, 0.06);
  if (name) {
    name.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }
  requestAnimationFrame(tick);
}

tick();

// Letter-by-letter scramble on hover
const words = document.querySelectorAll('.word');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

words.forEach(word => {
  const original = word.textContent;
  let frame = 0;
  let raf;

  word.addEventListener('mouseenter', () => {
    cancelAnimationFrame(raf);
    frame = 0;

    const scramble = () => {
      word.textContent = original
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < frame / 2) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      frame++;
      if (frame < original.length * 2 + 8) {
        raf = requestAnimationFrame(scramble);
      } else {
        word.textContent = original;
      }
    };

    scramble();
  });

  word.addEventListener('mouseleave', () => {
    cancelAnimationFrame(raf);
    word.textContent = original;
  });
});
