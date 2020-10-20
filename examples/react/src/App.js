import React, { useState, useRef } from 'react'
import ThreeSixtyViewer from './Component/ThreeSixtyViewer';

const App = () => {
    const imageArr = [...Array(35)].reduce((acc, ite, index) => {
        acc.push({
            "image_url": `https://spinny-images.s3.ap-south-1.amazonaws.com/temp-assets/nexon-360/${index + 1}.jpg`
        })
        return acc;
    }, []);

    const [updateIndex, setUpdateIndex] = useState(0);
    // const inputRef = useRef(0);

    const handleImageChange = (image_index) => {
        console.log('image change', image_index)
    }

    // const handleInputChange = (value) => {
    //     if (value && value > 0 && value < imageArr.length) {
    //         setUpdateIndex(value)
    //     }
    // }

    return (
        <React.Fragment>
            <div style={{ width: '100vw', height: '100vh' }}>
                {/* <input type="number" ref={inputRef} onChange={() => handleInputChange(inputRef.current.value)} /> */}
                <ThreeSixtyViewer imageArr={imageArr} imageKey="image_url" width='auto' height='600' autoPlay={false} speed={100} containerName="three-sixty-viewer" startIndex={0} updateIndex={updateIndex} handleImageChange={(e) => handleImageChange(e)} />
            </div>
        </React.Fragment>
    )
}

export default App