const progress = document.querySelector(".progress");
const backgroundVideo = document.querySelector(".site-video-bg");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

function startBackgroundVideo() {
  if (!backgroundVideo) {
    return;
  }

  backgroundVideo.muted = true;
  backgroundVideo.volume = 0;
  backgroundVideo.play().catch(() => {});
}

if (backgroundVideo) {
  startBackgroundVideo();
  backgroundVideo.addEventListener("loadeddata", startBackgroundVideo, { once: true });
  backgroundVideo.addEventListener("canplay", startBackgroundVideo, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      startBackgroundVideo();
    }
  });
  window.setTimeout(startBackgroundVideo, 600);
}

updateProgress();
