import React from 'react'
import ThreeSixtyViewer from './Component/ThreeSixtyViewer';

const App = () => {
    const imageArr = [...Array(35)].map((ite, index) => {
        return `https://spinny-images.s3.ap-south-1.amazonaws.com/temp-assets/nexon-360/${index + 1}.jpg`;
    });

    const handleImageChange = (image_index) => {
        console.log('image change', image_index)
    }

    return (
        <React.Fragment>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ThreeSixtyViewer image={imageArr} width='auto' height='600' autoPlay={false} speed={100} containerName="three-sixty-viewer" handleImageChange={(e) => handleImageChange(e)} />
            </div>
        </React.Fragment>
    )
}

export default App