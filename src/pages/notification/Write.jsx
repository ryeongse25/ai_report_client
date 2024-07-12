import { Container, FullContainer } from "../../components/CommonStyles";
import Header from "../../components/header/Header";
import Editor from "../../components/notification/Editor";

const Write = () => {
  return <>
    <Header />
    <div style={{minWidth: '1040px'}}>
      <Container>
        <Editor />
      </Container>
    </div>
  </>
}

export default Write;