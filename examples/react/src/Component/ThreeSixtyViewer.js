import React, { useEffect, useRef, useState, memo } from 'react'
import ThreeSixty from '@ashivliving/threesixty-js';

const ThreeSixtyViewer = (props) => {
    const { imageArr, imageKey = 'image_url', autoPlay, handleImageChange, containerName = 'reactThreesixtyContainer' } = props;
    const viewerRef = useRef(null);

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

    const imageChange = (e) => {
        if (e && e.detail && e.detail.image_index && handleImageChange) {
            handleImageChange({
                index: e.detail.image_index,
                item: imageArr[e.detail.image_index]
            });
        }
    }

    useEffect(() => {
        document.addEventListener(`${containerName}_image_changed`, imageChange);
        return () => {
            document.removeEventListener(`${containerName}_image_changed`, imageChange);
        }
    }, []);

    useEffect(() => {
        if (viewerRef) {
            const threesixty = new ThreeSixty(viewerRef.current, {
                image: imageArr.map(ite => ite[imageKey]),
                ...props
            });
            preloadImages(imageArr.map(ite => ite[imageKey]), () => {
                if (autoPlay) {
                    threesixty.play();
                }
            });
            return () => {
                if (viewerRef) {
                    threesixty.destroy();
                }
            }
        }
    }, [imageArr])

    return <>
        <div ref={viewerRef} style={{
            position: 'relative'
        }}>
        </div>
    </>
}

export default memo(ThreeSixtyViewer)
