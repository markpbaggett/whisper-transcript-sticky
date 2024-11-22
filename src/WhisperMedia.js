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
    }
  `;

  static properties = {
    audio: {type: String},
    video: {type: String}
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
    let media = null;
    if (this.audio) {
      media = document.createElement('audio', this.audio);
      media.src = this.audio;
    } else {
      media = document.createElement('video', this.video);
      media.src = this.video;
    }

    if (media) {
      media.controls = true;
      media.preload = "auto";
      media.ontimeupdate = (_) => this.updateTime(media.currentTime);
      window.addEventListener('update-player-time', e => media.currentTime = e.detail.time);

      return html`${media}`;
    }
  }
}

