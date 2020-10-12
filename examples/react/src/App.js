import React, { useRef } from 'react'
import { ThreeSixtyViewer } from 'react-threesixty';
import { Pannellum } from "pannellum-react";

const App = () => {
    const imageArr = [...Array(35)].map((ite, index) => {
        return `https://spinny-images.s3.ap-south-1.amazonaws.com/temp-assets/nexon-360/${index + 1}.jpg`;
    });
    const panoramaImage = 'https://spinny-images.s3.ap-south-1.amazonaws.com/temp-assets/nexon-360/interior-temp.jpg'
    const viewerRef = useRef(null);

    return (
        <React.Fragment>
            <ThreeSixtyViewer image={imageArr} width='auto' height='600' />
            {/* <Pannellum
                width="100%"
                height="500px"
                image={panoramaImage}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                onLoad={() => {
                    console.log("panorama loaded");
                }}
            /> */}
        </React.Fragment>
    )
}

export default App