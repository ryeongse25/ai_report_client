import axios from 'axios';

const Report2 = () => {
    const startRecording = () => {
        axios.post('http://localhost:8000/stt/start-recording/')
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    }

    const stopRecording = () => {
        axios.post('http://localhost:8000/stt/stop-recording/')
        .then((res) => console.log(res))
        .catch((error) => console.error(error))
    }

    return <>
    <button onClick={startRecording}>start</button>
    <button onClick={stopRecording}>stop</button>
    </>
}

export default Report2;