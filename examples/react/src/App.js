import React, { useState, useRef } from 'react'
import ThreeSixtyViewer from './Component/ThreeSixtyViewer';
import { data } from './constants';

const App = () => {
    const [updateIndex, setUpdateIndex] = useState(0);
    return (
        <React.Fragment>
            <div style={{ width: '100%', height: '100%' }}>
                {/* <input type="number" ref={inputRef} onChange={() => handleInputChange(inputRef.current.value)} /> */}
                {data.map((it, index) => index !== 3 &&
                    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} key={index}>
                        <ThreeSixtyViewer
                            showZoomOption={true}
                            imageArr={it.imgArr}
                            imageKey="uri"
                            zoomImageKey="uri"
                            width='auto'
                            height='100%'
                            autoPlay={false}
                            speed={100}
                            containerName={"three-sixty-viewer-" + index}
                            startIndex={0}
                            updateIndex={updateIndex}
                            hotspots={it.dentArr}
                        />
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default App