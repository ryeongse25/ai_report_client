import styled from 'styled-components'
import { useEffect, useRef } from "react";

const ContentBox = styled.div`
  img {
    width: 100%;
  }
`

const Content = ({content}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const fragment = document.createDocumentFragment();
      
      while (doc.body.firstChild) {
        fragment.appendChild(doc.body.firstChild);
      }
      
      if (containerRef.current) {
        containerRef.current.appendChild(fragment);
      }
    }
  }, [content])

  return (
    <ContentBox ref={containerRef}></ContentBox>
  )
}

export default Content;