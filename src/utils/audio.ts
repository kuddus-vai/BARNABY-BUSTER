// Web Audio API Acoustic Synthesizer for Buster's Real Funny Dog Barks
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Helper to create a quick acoustic breath/throat noise puff
function createThroatPuff(ctx: AudioContext, time: number, duration: number, volume: number, cutoff = 800) {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(cutoff, time);
  filter.Q.setValueAtTime(2.5, time);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(time);
}

// 1. "The Sneaky 2 AM Boof" - Soft, suspicious, muffled chest boof at the coat rack
export function playLowBoof(volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Deep muffled fundamental
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(130, now);
  osc.frequency.exponentialRampToValueAtTime(65, now + 0.22);

  // Muffled snout filter
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(260, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 1.2, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  // Add low guttural breath
  createThroatPuff(ctx, now, 0.2, volume * 0.4, 300);

  osc.start(now);
  osc.stop(now + 0.25);
}

// 2. "The Husky Drama Tantrum" - Hilarious dramatic operatic howling argument
export function playHuskyDramaTantrum(volume = 0.35) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const subOsc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Vibrato LFO for that dramatic husky whining shake
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(6.5, now);
  lfoGain.gain.setValueAtTime(28, now);
  lfo.connect(osc.frequency);

  osc.type = 'sawtooth';
  subOsc.type = 'triangle';

  // Pitch envelope: dramatic rise, operatic wobble, long whiny drop
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(580, now + 0.15);
  osc.frequency.linearRampToValueAtTime(520, now + 0.35);
  osc.frequency.exponentialRampToValueAtTime(210, now + 0.75);

  subOsc.frequency.setValueAtTime(160, now);
  subOsc.frequency.exponentialRampToValueAtTime(290, now + 0.15);
  subOsc.frequency.exponentialRampToValueAtTime(105, now + 0.75);

  // Vocal formant filter (mimicking dog snout "A-WOOOO-OOOH")
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(650, now);
  filter.frequency.linearRampToValueAtTime(950, now + 0.2);
  filter.frequency.exponentialRampToValueAtTime(450, now + 0.75);
  filter.Q.setValueAtTime(3.2, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.08);
  gain.gain.setValueAtTime(volume * 0.9, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.78);

  osc.connect(filter);
  subOsc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  lfo.start(now);
  osc.start(now);
  subOsc.start(now);
  lfo.stop(now + 0.8);
  osc.stop(now + 0.8);
  subOsc.stop(now + 0.8);
}

// 3. "Squirrel Frenzy Yips" - Triple rapid staccato barking (YAP-YAP-YAP!)
export function playRapidSquirrelYips(volume = 0.35) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const delays = [0, 0.14, 0.28];
  delays.forEach((delay, idx) => {
    const t = now + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const pitch = 480 + idx * 40;
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.1);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, t);
    filter.Q.setValueAtTime(2.2, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    createThroatPuff(ctx, t, 0.09, volume * 0.3, 1400);

    osc.start(t);
    osc.stop(t + 0.12);
  });
}

// 4. "The Talking Dog (Row-Row-Row!)" - Funny Chewbacca style dog talking back
export function playTalkingDog(volume = 0.38) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const syllables = [
    { start: 0, dur: 0.18, freq: 240, target: 360 },
    { start: 0.16, dur: 0.2, freq: 380, target: 440 },
    { start: 0.34, dur: 0.35, freq: 420, target: 170 }
  ];

  syllables.forEach((s) => {
    const t = now + s.start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(s.freq, t);
    osc.frequency.exponentialRampToValueAtTime(s.target, t + s.dur);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, t);
    filter.frequency.linearRampToValueAtTime(900, t + s.dur * 0.5);
    filter.frequency.linearRampToValueAtTime(500, t + s.dur);
    filter.Q.setValueAtTime(3.5, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + s.dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    createThroatPuff(ctx, t, s.dur * 0.8, volume * 0.25, 600);

    osc.start(t);
    osc.stop(t + s.dur + 0.02);
  });
}

// 5. "Demand Bark for Bacon" - Whimper that instantly erupts into an impatient BORK!
export function playDemandBark(volume = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // 1. High whimper
  const whimper = ctx.createOscillator();
  const whimperGain = ctx.createGain();
  whimper.type = 'sine';
  whimper.frequency.setValueAtTime(750, now);
  whimper.frequency.exponentialRampToValueAtTime(980, now + 0.15);

  whimperGain.gain.setValueAtTime(0, now);
  whimperGain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.04);
  whimperGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  whimper.connect(whimperGain);
  whimperGain.connect(ctx.destination);
  whimper.start(now);
  whimper.stop(now + 0.17);

  // 2. Exploding demand BORK!
  const borkTime = now + 0.16;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(390, borkTime);
  osc.frequency.exponentialRampToValueAtTime(140, borkTime + 0.2);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, borkTime);
  filter.Q.setValueAtTime(2.0, borkTime);

  gain.gain.setValueAtTime(0, borkTime);
  gain.gain.linearRampToValueAtTime(volume * 1.3, borkTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, borkTime + 0.22);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  createThroatPuff(ctx, borkTime, 0.2, volume * 0.4, 750);

  osc.start(borkTime);
  osc.stop(borkTime + 0.24);
}

// 6. "Subwoofer Mastiff Ruff" - Deep 120-lb big dog floor-shaking woof
export function playBigChonkerWoof(volume = 0.45) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  // Subwoofer low fundamental
  osc1.frequency.setValueAtTime(160, now);
  osc1.frequency.exponentialRampToValueAtTime(70, now + 0.28);

  osc2.frequency.setValueAtTime(80, now);
  osc2.frequency.exponentialRampToValueAtTime(45, now + 0.28);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(380, now);
  filter.Q.setValueAtTime(1.8, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume * 1.4, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  createThroatPuff(ctx, now, 0.25, volume * 0.5, 450);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.32);
  osc2.stop(now + 0.32);
}

// Universal utilities used across app
export function playSqueak(volume = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(2600, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(1800, now + 0.16);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.22);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.23);
}

export function playBark(volume = 0.35) {
  playDemandBark(volume);
}

export function playZoomie(volume = 0.3) {
  playRapidSquirrelYips(volume);
}

export function playCrunch(volume = 0.25) {
  playLowBoof(volume);
}

export function playChaChing(volume = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc2.type = 'sine';
  osc1.frequency.setValueAtTime(987.77, now);
  osc2.frequency.setValueAtTime(1318.51, now + 0.08);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.45);
  osc2.start(now + 0.08);
  osc2.stop(now + 0.45);
}
