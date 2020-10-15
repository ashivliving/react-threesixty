import React from 'react'
import ThreeSixtyViewer from './Component/ThreeSixtyViewer';

const App = () => {
    const imageArr = [...Array(35)].reduce((acc, ite, index) => {
        acc.push({
            "image_url": `https://spinny-images.s3.ap-south-1.amazonaws.com/temp-assets/nexon-360/${index + 1}.jpg`
        })
        return acc;
    }, []);

    const handleImageChange = (image_index) => {
        console.log('image change', image_index)
    }

    return (
        <React.Fragment>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ThreeSixtyViewer imageArr={imageArr} imageKey="image_url" width='auto' height='600' autoPlay={false} speed={100} containerName="three-sixty-viewer" handleImageChange={(e) => handleImageChange(e)} />
            </div>
        </React.Fragment>
    )
}

export default App