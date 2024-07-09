import React, { useState, useEffect, useRef } from 'react';
import { ReactMic } from 'react-mic'; 
import io from 'socket.io-client';

import styled from 'styled-components'
import { FullContainer, GoBackBtn } from '../components/CommonStyles';

const socket = io('http://localhost:5000', {
  transports: ['websocket']
});

const RecordBox = styled.div`
  width: 550px;
  height: 350px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
  border-radius: 20px;
  color: #db0948;
  background-color: #d9d9d9;
`;

const BtnBorder = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: red;
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  background-color: red;
`;

const Report = () => {
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

  // wav 변환
  const encodeWAV = (audioBuffer) => {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1;
    const bitDepth = 16;

    let buffers = [];
    for (let i = 0; i < numChannels; i++) {
      buffers.push(audioBuffer.getChannelData(i));
    }

    const interleaved = interleave(buffers);
    const buffer = new ArrayBuffer(44 + interleaved.length * 2);
    const view = new DataView(buffer);

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + interleaved.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    floatTo16BitPCM(view, 44, interleaved);

    return buffer;
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const interleave = (buffers) => {
    const length = buffers[0].length;
    const result = new Float32Array(length * buffers.length);

    let inputIndex = 0;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < buffers.length; j++) {
        result[inputIndex++] = buffers[j][i];
      }
    }
    return result;
  };

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  };

  return (
    <FullContainer>
      <GoBackBtn />
      <div>
        <RecordBox>
          <p style={{ marginBottom: "40px" }}>
            <b>정확한 접수를 위해 녹음버튼을 눌러주세요</b>
          </p>
          <div style={{ width: "300px", overflow: "hidden", margin: "0 auto" }}>
            <ReactMic
            record={recording}
            className="sound-wave"
            mimeType="audio/wav"
            strokeColor="#444445"
            backgroundColor="#d9d9d9" />
          </div>
        </RecordBox>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!recording ? 
            <BtnBorder onClick={startRecording} disabled={recording}>
              <Circle />
            </BtnBorder> :
            <BtnBorder onClick={stopRecording} disabled={!recording}>
              <Square />
            </BtnBorder>
          }
        </div>
      </div>
    </FullContainer>
  );
}

export default Report;
