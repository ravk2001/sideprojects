class CaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super(); this.samples = new Float32Array(16000); this.offset = 0; this.active = true;
    this.ratio = (typeof sampleRate === 'number' ? sampleRate : 16000) / 16000;
    this.weight = 0; this.sum = 0;
    this.port.onmessage = ({ data }) => {
      if (data.command === 'pause' || data.command === 'stop') { this.flush(); this.active = false; this.weight = 0; this.sum = 0; }
      if (data.command === 'resume') this.active = true;
      this.port.postMessage({ ack: data.token });
    };
  }
  flush() {
    if (this.offset) { const samples = this.samples.slice(0, this.offset); this.port.postMessage({ samples }, [samples.buffer]); this.offset = 0; }
  }
  process(inputs) {
    if (this.active && inputs[0]?.[0]) {
      const channels = inputs[0];
      for (let i = 0; i < channels[0].length; i++) {
        let sample = 0; for (const channel of channels) sample += channel[i] / channels.length;
        let remaining = 1;
        while (remaining > 1e-8) {
          const portion = Math.min(remaining, this.ratio - this.weight);
          this.sum += sample * portion; this.weight += portion; remaining -= portion;
          if (this.weight >= this.ratio - 1e-8) {
            this.samples[this.offset++] = this.sum / this.ratio;
            this.weight = 0; this.sum = 0;
            if (this.offset === this.samples.length) this.flush();
          }
        }
      }
    }
    return true;
  }
}
registerProcessor('capture-processor', CaptureProcessor);
