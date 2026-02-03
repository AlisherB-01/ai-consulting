import { ref, readonly } from 'vue';

export function useSpeechRecognition() {
  const isListening = ref(false);
  const transcript = ref('');
  const error = ref(null);


  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    error.value = "Web Speech API is not supported in this browser.";
    return { isListening, transcript, error, start: () => {}, stop: () => {} };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false; 
  recognition.interimResults = false; 
  recognition.lang = 'en-US'; 

  recognition.onstart = () => { isListening.value = true; };
  recognition.onend = () => { isListening.value = false; };
  recognition.onerror = (event) => {
    error.value = event.error;
    isListening.value = false;
  };

  recognition.onresult = (event) => {
    transcript.value = event.results[0][0].transcript;
  };

  const start = () => {
    transcript.value = '';
    error.value = null;
    recognition.start();
  };

  const stop = () => recognition.stop();

  return { isListening, transcript, error, start, stop };
}