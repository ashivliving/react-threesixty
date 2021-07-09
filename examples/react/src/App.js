import React, { useState, useRef } from 'react'
import { useStyle } from '../src/utils/customHooks';
import ThreeSixtyViewer from './Component/ThreeSixtyViewer';
import { data } from './constants';
import convertDentData from './utils/convertDentData';

const App = () => {
    const [updateIndex, setUpdateIndex] = useState(0);
    // const inputRef = useRef(0);

    useStyle('.react-transform-component, .react-transform-element { height : 100%; width: 100%} ');

    return (
        <React.Fragment>
            <div style={{ display: 'grid', gridTemplateColumns: 'calc(50vw - 16px) calc(50vw - 16px)', gridTemplateRows: `repeat(${Math.ceil(Object.keys(data).length / 4)}, calc(50vh) calc(50vh))`, columnGap: '16px', rowGap: '32px' }}>
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
                            hotspots={convertDentData(it.dentArr, it.carData)}
                        />
                        <div>
                            {it.carData && <a style={{ padding: '0 16px' }} href={'https://spinny.com' + it.carData.url} target="_blank">Product link: {it.carData.id}</a>}
                            <span>width: {it.carData.width}, height: {it.carData.height}, length: {it.carData.length}</span>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default App