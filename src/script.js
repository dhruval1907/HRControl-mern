const overlay = document.querySelector("overlay");
window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const pos = `${x}px ${y}px`;
    overlay.style.maskImage = `radial-gradient(circle 120px at ${pos}, transparent 0%, black 150px)`;
    overlay.style.webkitMaskImage = overlay.style.maskImage;
});