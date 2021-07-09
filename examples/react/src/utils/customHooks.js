import { useEffect } from "react";

export const useStyle = cssString => {
  useEffect(() => {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(cssString));
    document.head.appendChild(style);
  }, [cssString])
}