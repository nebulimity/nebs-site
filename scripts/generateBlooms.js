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
      sizeRange: [400, 900],
      blurRange: [0, 0],
      opacityRange: [0.15, 0.3],
      allowOverflowPct: 20,
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
      el.style.animationDuration = rnd(8, 18).toFixed(2) + "s";
      el.style.animationDelay = rnd(-5, 5).toFixed(2) + "s";
    }

    const size = Math.round(rnd(...opt.sizeRange));
    const blur = Math.round(rnd(...opt.blurRange));
    const opacity = rnd(...opt.opacityRange).toFixed(3);
    const overflow = opt.allowOverflowPct;
    const leftPct = rnd(-overflow, 100 + overflow).toFixed(2) + "%";
    const topPct = rnd(-overflow, 100 + overflow).toFixed(2) + "%";

    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--blur", `${blur}px`);
    el.style.setProperty("--opacity", opacity);
    el.style.setProperty("--color", pick(opt.palette));
    el.style.left = leftPct;
    el.style.top = topPct;

    container.appendChild(el);
  }
}

generateBlooms({
  count: 10,
  animate: true,
  sizeRange: [500, 1000],
  blurRange: [10, 20],
});
