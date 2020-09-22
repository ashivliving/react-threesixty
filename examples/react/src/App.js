import React, { useRef } from 'react'
import { ThreeSixtyViewer } from 'react-threesixty'

const App = () => {
    const imageArr = [...Array(35)].map((ite, index) => {
        return `https://spinny-images.s3.ap-south-1.amazonaws.com/temp-assets/nexon-360/${index + 1}.jpg`;
    });
    const viewerRef = useRef(null);

    return (
        <React.Fragment>
            <ThreeSixtyViewer image={imageArr} viewerRef={viewerRef} width='auto' height='600' />
        </React.Fragment>
    )
}

export default App