import React, { useEffect, useRef, memo, useState } from 'react';
import ThreeSixty from '@ashivliving/threesixty-js';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ThreeSixtyViewer = (props) => {
    const { isMobile = false ,imageArr, imageKey = 'image_url', zoomImageKey = 'zoom_image_url', type='exterior', autoPlay, startIndex=0, updateIndex, handleImageChange, handleZoomInOut, containerName = 'reactThreesixtyContainer' } = props;
    const viewerRef = useRef(null);
    const threeSixtyRef = useRef(null);
    const [dragState, setDragState] = useState(false);
    const [loadedType, setLoadedType] = useState([]);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [isZoomIn, setIsZoomIn] = useState(false);

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
        if (e && e.detail && handleImageChange) {
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

    const updateZoomImage = (imageIndex) => {
        let zoomImageUrl = imageArr[imageIndex][zoomImageKey] ? imageArr[imageIndex][zoomImageKey] : imageArr[imageIndex][imageKey];
        if(imageArr[imageIndex][zoomImageKey]) {
            preloadImages([zoomImageUrl], () => {
                let newImages = imageArr.map((ite, index) => index === imageIndex ? zoomImageUrl : ite[imageKey])
                threeSixtyRef.current._updateImage(newImages);
            })
        }
    }

    const handleZoomChange = (transformWrapperData) => {
        if(transformWrapperData.scale <= 1) {
            if(isZoomIn) {
                setIsZoomIn(false);
                if(handleZoomInOut) {
                    handleZoomInOut(false);
                }
                threeSixtyRef.current._allowScroll();
            }
        } else {
            if(!isZoomIn) {
                setIsZoomIn(true);
                if(handleZoomInOut) {
                    handleZoomInOut(true);
                }
                threeSixtyRef.current._stopScroll();
                updateZoomImage(threeSixtyRef.current.index);
            }
        }
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
    }, [type]);

    useEffect(() => {
        if (threeSixtyRef.current) {
            let newImages = imageArr.map(ite => ite[imageKey])
            threeSixtyRef.current._updateImage(newImages);
        }
    }, [JSON.stringify(imageArr)])

    useEffect(() => {
        if (viewerRef && viewerRef.current) {
            if(loadedType.indexOf(type) === -1) {
                setAllImagesLoaded(false);
            }
            threeSixtyRef.current = new ThreeSixty(viewerRef.current, {
                image: imageArr.map(ite => ite[imageKey]),
                ...props
            });
            preloadImages(imageArr.map(ite => ite[imageKey]), () => {
                if (autoPlay) {
                    threeSixtyRef.current.play();
                }
                setLoadedType([...loadedType, type])
                setAllImagesLoaded(true);
                threeSixtyRef.current._allowScroll();
            });
            return () => {
                if (viewerRef) {
                    threeSixtyRef.current.destroy();
                }
            }
        }
    }, [type])

    return <>
        <TransformWrapper
            doubleClick={{disabled : !isMobile ? true : false}}
            pan={{disabled: (!isZoomIn) ? true : false}} 
            zoomIn={{step:200, animation: false}} 
            wheel={{step : 50}}
            name={containerName}
            onZoomChange={(e) => handleZoomChange(e)}>
                <TransformComponent>
                    <div ref={viewerRef} style={{
                        // position: 'absolute',
                        width : '100%',
                        height : '100%',
                        cursor: `url(${dragState ? 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/drag_cursor.svg' : 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/cursor.svg'}), auto`,
                        padding: `${isMobile ? '5em 0em' : 'initial' }`,
                        transform: `${isMobile ? 'translateY(3em)' : 'initial'}`
                    }}>
                    </div>
                </TransformComponent>
        </TransformWrapper>
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
