import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function App() {
  const [result, setResult] = useState('초기값');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    socket.on('audio_text', (data) => {
      console.log('Received audio_text:', data.audio_text);
      setResult(data.audio_text);
    });

    return () => {
      socket.off('audio_text');
    };
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = e => {
          chunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { 'type': 'audio/wav' });
          const reader = new FileReader();

          reader.onload = event => {
            const audioData = event.target.result;
            socket.emit('audio_data', audioData);
          };

          reader.readAsArrayBuffer(blob);
          chunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setRecording(true);

        const intervalId = setInterval(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.start();
          }
        }, 5000);

        mediaRecorderRef.current.intervalId = intervalId;
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      clearInterval(mediaRecorderRef.current.intervalId);
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <strong>정확한 접수를 위해 녹음버튼을 눌러주세요</strong>
        </p>
        <button onClick={startRecording} disabled={recording}>
          녹음 시작
        </button>
        <button onClick={stopRecording} disabled={!recording}>
          녹음 중지
        </button>
        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
