import { html, css, LitElement } from 'lit';

export class WhisperSegment extends LitElement {
  static properties = {
    text: { type: String },
    start: { type: Number },
    end: { type: Number },
    words: { type: Array },
    selected: { type: Boolean }
  };

  static styles = css`
    .segment {
      border: 2px solid #333;
      padding: 5px;
      margin: 2px;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
    }

    .selected {
      background-color: #555;
      border-color: black;
    }

    .times {
      width: 325px;
      float: left;
      color: lightgray;
      margin-right: 10px;
    }

    .words {
      width: 100%;
    }
  `

  constructor() {
    super();

    this.selected = false;

    const that = this;
    window.addEventListener('update-time', e => that.updateTime(e.detail.time));
  }

  updateTime(time) {
    if ((time >= this.start) && (time <= this.end)) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  render() {
    if (this.words) {
      return html`
        <li class="${this.selected ? 'selected' : ''} segment">
          <div class="times">${hms(this.start)} - ${hms(this.end)}</div>
          <div class="words">
          ${this.words.map(w =>
            html`<whisper-word title="${w.probability}" word="${w.word}" start="${w.start}" end="${w.end}" probability="${w.probability}" />`
          )}
          </div>
        </li>
      `;
    }
  }
}

function hms(secs) {
  const h = Math.trunc(secs / 60 / 60);
  const m = Math.trunc((secs - (h * 60)) / 60);
  const s = Math.trunc(secs) - (h * 60 + m * 60);

  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function pad(i) {
  return String(i).padStart(2, '0');
}
