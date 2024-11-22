# \<whisper-transcript>

This web-component lets you view the JSON output of [Whisper](https://github.com/openai/whisper) to graphically examine the probability of each word. You will want to run whisper with the `--word_stamps` turned on:

```
$ whisper --model large-v3 --word_timestamps True media.mp3
```

You can see a demo at https://edsu.github.io/whisper-transcript

## Installation

```bash
yarn install whisper-transcript
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
yarn start
```
