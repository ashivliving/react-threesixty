import React from 'react';

const style = {
  wrapper: (hotspot) => ({
    position: 'absolute',
    zIndex: 1,
    top: `${hotspot.top * 100}%`,
    left: `${hotspot.left * 100}%`,
    display: hotspot.display ? 'block' : 'none',
    transform: 'translate(-50%, -50%)',
    ...Object.assign({}, hotspot.ui ? {} : {
      content: '',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'blue'
    })
  })
}

/**
 * 
 * @param { Array<{ left: string; top: string; dentAngle: string; display: boolean; ui: * }> } hotspots 
 * @param {*} hotspotUI - UI we want to render
 * @param { Function } clickHandler - click handler for hotspot
 */
const ThreeSixtyHotspots = ({ hotspots, clickHandler }) => {
  return hotspots.map((hotspot, index) => (
    <div key={index} style={style.wrapper(hotspot)} onClick={() => clickHandler && clickHandler(hotspot)}>{hotspot.ui ? hotspot.ui : <></>}</div>
  ))
}

export default ThreeSixtyHotspots;