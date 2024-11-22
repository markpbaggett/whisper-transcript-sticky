# \<whisper-transcript>

This web-component lets you view the JSON output of [Whisper](https://github.com/openai/whisper) to graphically examine the probability of each word. You will want to run whisper with the `--word_stamps` turned on:

```
$ whisper --model large-v3 --word_timestamps True media.mp3
```

## Installation

```bash
npm i whisper-transcript
```

## Usage

```html
<script type="module">
  import 'whisper-transcript/whisper-transcript.js';
</script>

<whisper-transcript audio="media.mp3" url="media.json"></whisper-transcript>
```

## Develop

```bash
npm start
```
