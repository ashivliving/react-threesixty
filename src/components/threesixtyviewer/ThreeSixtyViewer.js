import React, { useEffect, useRef, memo, useState } from 'react';
import ThreeSixty from '@ashivliving/threesixty-js';

const ThreeSixtyViewer = (props) => {
    const { imageArr, imageKey = 'image_url', autoPlay, startIndex=0, updateIndex, handleImageChange, containerName = 'reactThreesixtyContainer' } = props;
    const viewerRef = useRef(null);
    const threeSixtyRef = useRef(null);
    const [dragState, setDragState] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

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

    const handleMouseDown = () => {
        setDragState(true);
    }

    const handleMouseUp = () => {
        setDragState(false);
    }

    useEffect(() => {
        if (threeSixtyRef.current && updateIndex >= 0 && updateIndex < imageArr.length) {
            threeSixtyRef.current.goto(updateIndex)
        }
    }, [updateIndex])

    useEffect(() => {
        document.addEventListener(`${containerName}_image_changed`, imageChange);
        if(viewerRef.current) {
            viewerRef.current.addEventListener('mousedown', handleMouseDown);
            viewerRef.current.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener(`${containerName}_image_changed`, imageChange);
            if(viewerRef.current) {
                viewerRef.current.removeEventListener('mousedown', handleMouseDown);
                viewerRef.current.removeEventListener('mouseup', handleMouseUp);
            }
        }
    }, []);

    useEffect(() => {
        if (threeSixtyRef.current) {
            let newImages = imageArr.map(ite => ite[imageKey])
            threeSixtyRef.current._updateImage(newImages);
        }
    }, [imageArr])

    useEffect(() => {
        if (viewerRef && viewerRef.current) {
            threeSixtyRef.current = new ThreeSixty(viewerRef.current, {
                image: imageArr.map(ite => ite[imageKey]),
                ...props
            });
            preloadImages(imageArr.map(ite => ite[imageKey]), () => {
                if (autoPlay) {
                    threeSixtyRef.current.play();
                }
                setAllImagesLoaded(true);
                threeSixtyRef.current._allowScroll();
            });
            return () => {
                if (viewerRef) {
                    threeSixtyRef.current.destroy();
                }
            }
        }
    }, [])

    return <>
        <div ref={viewerRef} style={{
            position: 'relative',
            cursor: `url(${dragState ? 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/drag_cursor.svg' : 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/cursor.svg'}), auto`
        }}>
        </div>
        {
            !allImagesLoaded && (
                <div style={{
                    display: 'initial',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: '0px',
                    top: '0px',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${imageArr[startIndex][imageKey]})`,
                    cursor : 'not-allowed'
                }}>
                    <div style={{
                        position: 'absolute',
                        width : '100px',
                        height : '100px',
                        top : 'calc(50% - 50px)',
                        left : 'calc(50% - 50px)'
                    }}>
                        <img src='https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/loader.gif' style={{
                            width : '100%',
                            height : '100%'
                        }} />
                    </div>
                </div>
            )
        }
    </>
}

export default memo(ThreeSixtyViewer)
