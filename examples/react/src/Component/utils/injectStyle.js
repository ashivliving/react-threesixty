const injectStyle = (style) => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
};
  
export default injectStyle;