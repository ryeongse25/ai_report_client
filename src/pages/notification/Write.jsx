import { useEffect, useState } from "react";
import { cancelAlert } from "../../utils/swal";

import Header from "../../components/header/Header";
import Editor from "../../components/notification/Editor";
import { Container } from "../../components/CommonStyles";
import { writeNotification } from "../../apis/notification";
import { getUser } from "../../apis/user";

const Write = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = (title) => {
    setTitle(title);
  }

  const onChangeContent = (content) => {
    setContent(content);
  }

  // 글쓰기 취소
  const cancelWriting = () => {
    cancelAlert('글 작성을 취소하시겠습니까?', '예 클릭시 작성 중인 내용이 사라지게 됩니다.', '예', '아니요')
  }

  useEffect(() => {
    getUser().then((res) => setId(res.id));
  }, [])

  return <>
    <Header />
    <div style={{minWidth: '1040px', marginBottom: '50px'}}>
      <Container>
        <Editor onChangeTitle={onChangeTitle} onChangeContent={onChangeContent} />
        <div className='btns'>
          <button onClick={cancelWriting}>취소</button>
          <button onClick={() => writeNotification(id, title, content)}>글쓰기</button>
        </div>
      </Container>
    </div>
  </>
}

export default Write;