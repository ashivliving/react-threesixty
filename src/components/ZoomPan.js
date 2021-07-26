import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const ZoomPan = ({ handleZoomChange, isDesktop, isZoomIn, children, handleZoomAction, showZoomOption, styles, zoomButtonStyle }) => {
  if (isDesktop) {
    return (
      <TransformWrapper
        pan={{ disabled: (!isZoomIn) ? true : false }}
        zoomIn={{ step: 10 }}
        zoomOut={{ step: 10 }}
        pinch={{ disabled: true }}
        wheel={{ step: 50, disabled: true }}
        doubleClick={{ disabled: true }}
        defaultScale={1}
        defaultPositionX={0}
        defaultPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, scale }) => (
          <>
            <TransformComponent>
              {children}
            </TransformComponent>
            {
              showZoomOption && (
                <div style={styles.zoomOption}>
                  <button style={{...styles.zoomButton, ...zoomButtonStyle}} onClick={(event) => {
                    zoomIn(event)
                    handleZoomAction('zoom-in', scale);
                  }}>&#43;</button>
                  <button style={{...styles.zoomButton, ...zoomButtonStyle}} onClick={(event) => {
                    zoomOut(event)
                    setTimeout(() => { if (scale < 1.5) zoomOut(event) })
                    handleZoomAction('zoom-out', scale);
                  }}>&minus;</button>
                  <button style={{...styles.zoomButton, ...zoomButtonStyle}} onClick={(event) => {
                    resetTransform(event)
                    setTimeout(() => { resetTransform(event) })
                    handleZoomAction('zoom-close', scale)
                  }}>&times;</button>
                </div>
              )
            }
          </>
        )}
      </TransformWrapper>
    )
  }

  return (
    <TransformWrapper
      doubleClick={{ disabled: false }}
      pan={{ disabled: (!isZoomIn) ? true : false }}
      zoomIn={{ step: 50 }}
      wheel={{ step: 50 }}
      doubleClick={{ mode: 'reset' }}
      defaultScale={1}
      defaultPositionX={0}
      defaultPositionY={0}
      onZoomChange={(e) => handleZoomChange(e)}
    >
      <TransformComponent>
        {children}
      </TransformComponent>
    </TransformWrapper>
  )
}
export default ZoomPan