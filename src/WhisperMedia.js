import { html, css, LitElement } from 'lit';

export class WhisperMedia extends LitElement {
  static styles = css`
    audio {
      width: 100%;
    }

    video {
      max-height: 200px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  `;

  static properties = {
    audio: { type: String },
    video: { type: String }
  };

  updateTime(time) {
    window.dispatchEvent(
      new CustomEvent("update-time", {
        detail: { time }
      })
    );
  }

  async firstUpdated() {
    const videoEl = this.shadowRoot.querySelector('video');
    const audioEl = this.shadowRoot.querySelector('audio');
    const media = videoEl || audioEl;

    if (!media) return;

    media.ontimeupdate = () => this.updateTime(media.currentTime);
    window.addEventListener('update-player-time', e => media.currentTime = e.detail.time);

    if (this.video && videoEl && this.video.endsWith('.m3u8')) {
      const canPlayNative = videoEl.canPlayType('application/vnd.apple.mpegurl');

      if (canPlayNative) {
        videoEl.src = this.video;
      } else {
        try {
          const { default: Hls } = await import('https://cdn.jsdelivr.net/npm/hls.js@latest');
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(this.video);
            hls.attachMedia(videoEl);
          } else {
            console.error('HLS.js is not supported in this browser.');
          }
        } catch (err) {
          console.error('Failed to load HLS.js or attach stream:', err);
        }
      }
    }
  }

  render() {
    if (this.audio) {
      return html`<audio src=${this.audio} controls preload="auto"></audio>`;
    }

    if (this.video) {
      const isM3U8 = this.video.endsWith('.m3u8');
      const canPlayNative = document.createElement('video').canPlayType('application/vnd.apple.mpegurl');
      const src = (!isM3U8 || canPlayNative) ? this.video : '';

      return html`<video .src=${src} controls preload="auto"></video>`;
    }

    return html``;
  }
}
