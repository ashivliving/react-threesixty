import React, { useEffect, useRef, useState, memo } from 'react'
import ThreeSixty from '@ashivliving/threesixty-js';

const ThreeSixtyViewer = (props) => {
    const { image, autoPlay } = props;
    const viewerRef = useRef(null);
    const [showViewer, setShowViewer] = useState(false);

    const preloadImages = (urls, allImagesLoadedCallback) => {
        var loadedCounter = 0;
        var toBeLoadedNumber = urls.length;
        urls.forEach(function (url) {
            preloadImage(url, function () {
                loadedCounter++;
                if (loadedCounter === toBeLoadedNumber) {
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
                if (autoPlay) {
                    threesixty.play();
                }
                setShowViewer(true);
            });
            return () => {
                if (viewerRef) {
                    threesixty.destroy();
                }
            }
        }
    }, [image])

    return <>
        <div ref={viewerRef} style={{
            position: 'relative'
        }}>
        </div>
    </>
}

export default memo(ThreeSixtyViewer)
