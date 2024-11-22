import { html, css, LitElement } from 'lit';

export class WhisperAudio extends LitElement {
  static styles = css`
    audio {
      width: 100%;
    }
  `;

  static properties = {
    url: {type: String},
  };

  updateTime(time) {
    window.dispatchEvent(
      new CustomEvent("update-time", {
        detail: {
          time
        }
      })
    );
  }

  render() {
    if (this.url) {
      const audio = document.createElement('audio');
      audio.src = this.url;
      audio.controls = true;
      audio.ontimeupdate = (_) => this.updateTime(audio.currentTime);

      window.addEventListener('update-player-time', e => audio.currentTime = e.detail.time);

      return html`${audio}`;
    }
  }
}

