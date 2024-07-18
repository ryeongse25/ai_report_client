import axios from 'axios';

const access = localStorage.getItem('access');
const SERVER_URL = 'http://localhost:8000/post/';

// 전체 공지사항 가져오기
export const getNotice = () => {
  return axios.get(SERVER_URL + 'postlist/', {
    headers: {
      Authorization: access
    }
  })
  .then((res) => {return res.data})
  .catch((error) => console.log(error))
}

// 공지사항 글쓰기
export const writeNotification = (id, title, content) => {
  axios.post(SERVER_URL + 'postcreate/', {id, title, content}, {
    headers: {
      Authorization: access
    }
  })
  .then((res) => console.log(res))
  .catch((error) => console.log(error))
}