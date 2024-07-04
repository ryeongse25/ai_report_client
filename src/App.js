import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function App() {
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState('초기값');

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
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onStop = (recordedBlob) => {
    console.log('Recorded Blob:', recordedBlob);
    const reader = new FileReader();
    reader.onload = event => {
      const audioData = event.target.result;
      socket.emit('audio_data', audioData);
    };
    reader.readAsArrayBuffer(recordedBlob.blob);
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
          녹음 마침
        </button>
        <ReactMic
          record={recording}
          className="sound-wave"
          onStop={onStop}
          mimeType="audio/wav"
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
