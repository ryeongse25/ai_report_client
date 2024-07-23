import React, { useState, useEffect, useRef } from 'react';

import { ReactMic } from 'react-mic';
import { convertToWav } from '../../utils/report';

import './Report.css';
import io from 'socket.io-client';
import Overlay from '../../components/call/Overlay';
import CallModal from '../../components/call/CallModal';
import { GoBackBtn } from '../../components/CommonStyles';

const socket = io('http://localhost:5000', {
  transports: ['websocket']
});

const Report4 = () => {
  const [result, setResult] = useState('');
  const [ttsText, setTtsText] = useState('');
  const [recording, setRecording] = useState(false);
  const [ttsFinished, setTtsFinished] = useState(false);
  const [chat, setChat] = useState([{ text: '녹음 버튼을 누르고 신고를 시작해주세요.', isUser: false }]);

  const [done, setDone] = useState(false);
  const [address, setAddress] = useState('서울 강서구 화곡동 980-16');
  const [place, setPlace] = useState('강서구청')
  const [time, setTime] = useState(new Date('2024-07-19 07:48:39.428767'))
  const [content, setContent] = useState('불이 크게 일고 있고 사람들이 숨을 쉬지 못하는 상황입니다.');
  const [lat, setLat] = useState(37.45978574975834);
  const [lng, setLng] = useState(126.9511239870991);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // 백 -> 프론트 소켓
  useEffect(() => {
    socket.on('audio_text', (data) => {
      console.log('Received audio_text:', data);
      setResult(data);
      setChat(prevChat => [...prevChat, { text: data, isUser: true }]);
      playTts(data);
    });

    return () => {
      socket.off('audio_text');
    };
  }, []);

  // 녹음 시작
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = e => {
          chunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          await processChunks();
        };

        mediaRecorderRef.current.start();
        setRecording(true);
        recognitionRef.current.start();
        startSilenceTimer();
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
      });
  };

  // 녹음 끝
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      recognitionRef.current.stop();
      setRecording(false);
      clearTimeout(silenceTimerRef.current);
    }
  };

  const processChunks = async () => {
    const blob = new Blob(chunksRef.current, { 'type': 'audio/webm' });
    const arrayBuffer = await blob.arrayBuffer();
    const audioData = new Uint8Array(arrayBuffer);
    const wavBuffer = await convertToWav(audioData);
    socket.emit('audio_data', wavBuffer);
    chunksRef.current = [];
  };

  const startSilenceTimer = () => {
    silenceTimerRef.current = setTimeout(async () => {
      stopRecording();
      playTts(ttsText);
    }, 3000);
  };

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimerRef.current);
    startSilenceTimer();
  };

  // tts
  const playTts = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  // stt
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Web Speech API is not supported by this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'ko-KR';

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setResult(finalTranscript || interimTranscript);
      if (finalTranscript) {
        setChat(prevChat => [...prevChat, { text: finalTranscript, isUser: true }]);
        // socket.emit('audio_text', { audio_text: finalTranscript });
      }
      resetSilenceTimer();
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech Recognition Error', event.error);
    };
  }, []);

  return (
    <div className="report-container">
      {done && <>
        <Overlay />
        <CallModal address={address} place={place} time={time} content={content} lat={lat} lng={lng} />
      </>}
      <GoBackBtn />
      <div className="recording-container">
        <div className="bold-text">정확한 접수를 위해 녹음버튼을 눌러주세요</div>
        <div className="react-mic-container">
          <ReactMic
            record={recording}
            className="sound-wave"
            mimeType="audio/wav"
            strokeColor="#444445"
            backgroundColor="#ffffff" />
        </div>
        <div className="button-container">
          {!recording ? 
            <button className="btn-border" onClick={startRecording} disabled={recording}>
              <div className="circle" />
            </button> :
            <button className="btn-border" onClick={stopRecording} disabled={!recording}>
              <div className="square" />
            </button>
          }
        </div>
      </div>
      <div className="chat-container">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.isUser ? 'user' : 'system'}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report4;
