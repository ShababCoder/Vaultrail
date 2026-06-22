/* ==========================================================================
   VaultRail — shared utilities (used on every page)
   ========================================================================== */

// ---- Mobile nav toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }

  // ---- Footer year ----
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

// ---- Query param helpers ----
function vrGetParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---- Lightweight session state (so the demo flow can pass data between pages) ----
const VaultState = {
  set(key, value) {
    try { sessionStorage.setItem('vr_' + key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  },
  get(key, fallback = null) {
    try {
      const raw = sessionStorage.getItem('vr_' + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
};

// ---- Simulated processing engine ----
// Drives a spinner + progress bar through a short sequence of status messages,
// then reveals a result panel. Built for a demo: every flow ends in an honest
// "demo checkpoint" message rather than a real backend response.
function runProcessingSequence({ statusEl, fillEl, messages, totalMs = 7000, onDone }) {
  const stepMs = totalMs / messages.length;
  let i = 0;
  let elapsed = 0;

  if (statusEl) statusEl.textContent = messages[0];

  const tick = setInterval(() => {
    elapsed += 100;
    const pct = Math.min(100, (elapsed / totalMs) * 100);
    if (fillEl) fillEl.style.width = pct + '%';

    const targetStep = Math.min(messages.length - 1, Math.floor(elapsed / stepMs));
    if (targetStep !== i) {
      i = targetStep;
      if (statusEl) statusEl.textContent = messages[i];
    }

    if (elapsed >= totalMs) {
      clearInterval(tick);
      if (typeof onDone === 'function') onDone();
    }
  }, 100);
}
