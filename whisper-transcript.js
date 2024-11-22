import { WhisperTranscript } from './src/WhisperTranscript.js';
import { WhisperSegment } from './src/WhisperSegment.js';
import { WhisperWord } from './src/WhisperWord.js';
import { WhisperMedia } from './src/WhisperMedia.js';

window.customElements.define('whisper-transcript', WhisperTranscript);
window.customElements.define('whisper-segment', WhisperSegment);
window.customElements.define('whisper-word', WhisperWord);
window.customElements.define('whisper-media', WhisperMedia);
