import React, { useEffect, useRef, useState } from 'react'
import ThreeSixty from '@mladenilic/threesixty.js';

const ThreeSixtyViewer = (props) => {
    const { image } = props;
    const viewerRef = useRef(null);
    const [showViewer, setShowViewer] = useState(false);

    const preloadImages = (urls, allImagesLoadedCallback) => {
        var loadedCounter = 0;
        var toBeLoadedNumber = urls.length;
        urls.forEach(function (url) {
            preloadImage(url, function () {
                loadedCounter++;
                if (loadedCounter == toBeLoadedNumber) {
                    allImagesLoadedCallback();
                }
            });
        });
        function preloadImage(url, anImageLoadedCallback) {
            var img = new Image();
            img.onload = anImageLoadedCallback;
            img.src = url;
        }
    }

    useEffect(() => {
        if (viewerRef) {
            const threesixty = new ThreeSixty(viewerRef.current, {
                ...props
            });
            preloadImages(Array.isArray(image) ? image : [image], () => {
                threesixty.play();
                setShowViewer(true);
            });
            return () => {
                if (viewerRef) {
                    threesixty.destroy();
                }
            }
        }
    }, [])

    return <>
        <div ref={viewerRef} style={{
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}>
        </div>
    </>
}

export default ThreeSixtyViewer
