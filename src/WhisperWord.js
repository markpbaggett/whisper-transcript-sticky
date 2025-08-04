import { html, css, LitElement } from 'lit';

export class WhisperWord extends LitElement {

  static properties = {
    word: {type: String},
    probability: {type: Number},
    score: {type: Number},
    start: {type: Number},
    end: {type: Number},
    selected: {type: Boolean}
  }

  static styles = css`
    span.word {
      cursor: pointer;
    }

    span.selected {
      text-decoration: underline;
    }

    span.mediocre {
      color: yellow;
    }

    span.poor {
      color: orange;
    }

    span.terrible {
      color: red;
    }
  `;

  constructor() {
    super();

    this.addEventListener('click', _ => this.updatePlayerTime());
  }

  connectedCallback() {
    super.connectedCallback();

    const that = this;
    window.addEventListener('update-time', e => that.updateTime(e.detail.time));
  }

  updatePlayerTime() {
    window.dispatchEvent(
      new CustomEvent("update-player-time", {
        detail: {
          time: this.start
        }
      })
    );
  }

  updateTime(time) {
    if ((time >= this.start) && (time <= this.end)) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  getCssClass() {
    let style = this.selected ? 'selected ' : '';

    const confidence = this.score ?? this.probability ?? 0;
    console.log(this);

    if (confidence > 0.9) {
      style += 'good';
    } else if (confidence > 0.7) {
      style += 'mediocre';
    } else if (confidence > 0.5) {
      style += 'poor';
    } else {
      style += 'terrible';
    }

    return style;
  }

  render() {
    return html`
      <span
        data-start="${this.start}"
        data-end="${this.end}"
        class="word ${this.getCssClass()}">
        ${this.word}
      </span>
    `
  }
}
