/**
 * generateBlooms(options)
 *
 * options:
 *  - selector: string (container selector), default '.bloomy-background'
 *  - count: number of blooms to generate (default 6)
 *  - palette: array of CSS color strings (default nice pastel set)
 *  - sizeRange: [minPx, maxPx] (default [200, 600])
 *  - blurRange: [minPx, maxPx] (default [60, 180])
 *  - opacityRange: [min, max] (default [0.12, 0.45])
 *  - allowOverflowPct: number (% outside viewport allowed), default 10
 *  - animate: boolean default false. If true, each bloom gets a slow randomized animation
 *  - clearBefore: boolean default true - remove existing blooms before generating
 */
function generateBlooms(options = {}) {
  const opt = Object.assign(
    {
      selector: ".bloomy-background",
      count: 6,
      palette: [
        "rgb(255, 105, 180)",
        "rgb(100, 149, 237)",
        "rgb(255, 200, 0)",
        "rgb(0, 200, 180)",
        "rgb(180, 100, 255)",
      ],
      sizeRange: [200, 600],
      blurRange: [60, 180],
      opacityRange: [0.2, 0.5],
      allowOverflowPct: 10,
      animate: false,
      clearBefore: true,
    },
    options
  );

  const container = document.querySelector(opt.selector);
  if (!container) {
    console.warn("generateBlooms: container not found for selector", opt.selector);
    return;
  }

  if (opt.clearBefore) {
    container.querySelectorAll(".bloom").forEach((el) => el.remove());
  }

  const rnd = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  for (let i = 0; i < opt.count; i++) {
    const el = document.createElement("div");
    el.className = "bloom";
    if (opt.animate) {
      el.classList.add("animate");
      const dur = rnd(8, 18).toFixed(2) + "s";
      const delay = rnd(-5, 5).toFixed(2) + "s";
      el.style.animationDuration = dur;
      el.style.animationDelay = delay;
    }

    const size = Math.round(rnd(...opt.sizeRange));
    const blur = Math.round(rnd(...opt.blurRange));
    const opacity = rnd(...opt.opacityRange).toFixed(3);

    const overflow = opt.allowOverflowPct;
    const leftPct = rnd(-overflow, 100 + overflow).toFixed(2) + "%";
    const topPct = rnd(-overflow, 100 + overflow).toFixed(2) + "%";

    const color = pick(opt.palette);

    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--blur", `${blur}px`);
    el.style.setProperty("--opacity", opacity);
    el.style.setProperty("--color", color);
    el.style.left = leftPct;
    el.style.top = topPct;

    container.appendChild(el);
  }
}

generateBlooms();

generateBlooms({
  count: 10,
  animate: true,
  sizeRange: [250, 700],
  blurRange: [80, 220],
});
