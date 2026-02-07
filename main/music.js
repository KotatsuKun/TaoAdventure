/*
  MusicController: Preloads tracks, routes audio through Web Audio API for
  volume control and smooth crossfades. Exposes simple API and wires UI.
*/

const TRACKS = {
  '1': 'Tian Guan Ci Fu OST&BGM 17 桃源.mp3',
  '2': '入云间 - 《天官赐福》动画配乐.mp3',
  '3': '心魔 - 《天官赐福》动画配乐.mp3',
  '4': '飞升 - 《天官赐福》动画配乐.mp3',
  '5': '与君山 - 《天官赐福》动画配乐.mp3'
};

class MusicController {
  constructor(tracks, opts = {}) {
    this.tracks = tracks;
    this.context = null;
    this.masterGain = null;
    this.audioEls = {};
    this.gainNodes = {};
    this.current = null;
    this.ready = false;
    this.fadeTime = opts.fadeTime || 1.0;
    this.defaultVolume = (typeof opts.volume === 'number') ? opts.volume : 0.55;
  }

  async init() {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = this.defaultVolume;
      this.masterGain.connect(this.context.destination);
    }

    const loadPromises = Object.entries(this.tracks).map(([id, file]) => {
      const audio = new Audio(file);
      audio.preload = 'auto';
      audio.loop = true;
      audio.crossOrigin = 'anonymous';

      const source = this.context.createMediaElementSource(audio);
      const gain = this.context.createGain();
      gain.gain.value = 0;
      source.connect(gain);
      gain.connect(this.masterGain);

      this.audioEls[id] = audio;
      this.gainNodes[id] = gain;

      return new Promise((resolve) => {
        const onReady = () => resolve(id);
        audio.addEventListener('canplaythrough', onReady, { once: true });
        // also resolve after a timeout to avoid blocking forever
        setTimeout(() => resolve(id), 5000);
      });
    });

    await Promise.all(loadPromises);
    this.ready = true;
  }

  async ensureContext() {
    if (!this.context) await this.init();
    if (this.context.state === 'suspended') await this.context.resume();
  }

  async playTrack(id) {
    if (!this.tracks[id]) return;
    await this.ensureContext();

    const targetAudio = this.audioEls[id];
    const targetGain = this.gainNodes[id];

    if (!targetAudio) return;

    const now = this.context.currentTime;

    if (this.current === id) {
      // toggle resume if paused
      if (targetAudio.paused) await targetAudio.play();
      return;
    }

    // start new track at zero gain
    targetGain.gain.cancelScheduledValues(now);
    targetGain.gain.setValueAtTime(0, now);
    try { await targetAudio.play(); } catch (e) {}
    targetGain.gain.linearRampToValueAtTime(1, now + this.fadeTime);

    // fade out previous
    if (this.current) {
      const prev = this.current;
      const prevGain = this.gainNodes[prev];
      prevGain.gain.cancelScheduledValues(now);
      prevGain.gain.setValueAtTime(prevGain.gain.value || 1, now);
      prevGain.gain.linearRampToValueAtTime(0, now + this.fadeTime);
      setTimeout(() => {
        try { this.audioEls[prev].pause(); } catch (e) {}
      }, (this.fadeTime + 0.05) * 1000);
    }

    this.current = id;
    this._updateTrackName();
  }

  togglePlayPause() {
    if (!this.current) return; // nothing loaded
    const audio = this.audioEls[this.current];
    if (!audio) return;
    if (audio.paused) audio.play(); else audio.pause();
  }

  stop() {
    Object.values(this.audioEls).forEach(a => { try { a.pause(); a.currentTime = 0; } catch (e) {} });
    this.current = null;
    this._updateTrackName();
  }

  setVolume(percent) {
    const v = Math.max(0, Math.min(1, percent));
    if (this.masterGain) this.masterGain.gain.value = v;
    try { localStorage.setItem('tao-volume', String(v)); } catch (e) {}
  }

  getVolume() { return this.masterGain ? this.masterGain.gain.value : this.defaultVolume; }

  _updateTrackName() {
    const el = document.getElementById('music-track');
    if (!el) return;
    if (!this.current) el.textContent = 'No track';
    else el.textContent = this.tracks[this.current];
  }
}

// Initialize controller, wire volume slider and handle data-attribute clicks
window.addEventListener('DOMContentLoaded', async () => {
  const saved = parseFloat(localStorage.getItem('tao-volume'));
  const controller = new MusicController(TRACKS, { volume: isNaN(saved) ? 0.55 : saved, fadeTime: 1.0 });
  window.musicController = controller;

  const volEl = document.getElementById('music-volume');
  if (volEl) {
    volEl.value = Math.round((isNaN(saved) ? 0.55 : saved) * 100);
    volEl.addEventListener('input', (e) => {
      const v = Number(e.target.value) / 100;
      controller.setVolume(v);
    });
  }

  // Preload tracks in background (doesn't autoplay)
  controller.init().catch(() => {});

  // Use event delegation to handle any button with data-track or data-action
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const track = btn.dataset.track;
    const action = btn.dataset.action;
    if (track) {
      controller.playTrack(String(track));
    } else if (action === 'stop') {
      controller.stop();
    }
  });
});