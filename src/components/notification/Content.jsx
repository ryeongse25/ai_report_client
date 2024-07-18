import { useEffect, useRef } from "react";

const Content = ({content}) => {
  const containerRef = useRef();

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const fragment = document.createDocumentFragment();
    
    while (doc.body.firstChild) {
      fragment.appendChild(doc.body.firstChild);
    }
        
    if (containerRef.current) {
        containerRef.current.appendChild(fragment);
    }
  })

  return (
    <div ref={containerRef}></div>
  )
}

export default Content;