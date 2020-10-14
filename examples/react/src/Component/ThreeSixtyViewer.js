import React, { useEffect, useRef, useState, memo } from 'react'
import ThreeSixty from '@ashivliving/threesixty-js';

const ThreeSixtyViewer = (props) => {
    const { image, autoPlay, handleImageChange, containerName = 'reactThreesixtyContainer' } = props;
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
            handleImageChange(e.detail.image_index);
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
                ...props
            });
            preloadImages(Array.isArray(image) ? image : [image], () => {
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
    }, [image])

    return <>
        <div ref={viewerRef} style={{
            position: 'relative'
        }}>
        </div>
    </>
}

export default memo(ThreeSixtyViewer)
