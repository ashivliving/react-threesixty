import React, { useEffect, useRef, memo, useState } from 'react';
import ThreeSixty from '@ashivliving/threesixty-js';
import updateHotspots from '../utils/updateHotspots';
import ThreeSixtyHotspots from './ThreeSixtyHotspots';
import ZoomPan from './ZoomPan';

const styles = {
    threeSixtyWrap: (allImagesLoaded) => ({
        display: allImagesLoaded ? 'block' : 'none',
        width: '100%',
        height: '100%',
        position: 'relative'
    }),
    transformComponent: (allImagesLoaded, dragState, isMobile, noMargin) => ({
        width: 'fit-content',
        height: isMobile && !noMargin ? 'fit-content' : '100%',
        visibility: allImagesLoaded ? 'visible' : 'hidden',
        position: 'relative',
        transform: 'translateX(-50%)',
        maxWidth: '100%',
        maxHeight: '100%',
        left: '50%',
        overflow: 'hidden',
        cursor: `url(${dragState ? 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/drag_cursor.svg' : 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/cursor.svg'}), auto`,
        ...Object.assign({}, isMobile && !noMargin ? { margin: 'auto' } : {})
    }),
    viewer: (allImagesLoaded, dragState) => ({
        width: '100%',
        height: '100%',
        display: 'flex',
        cursor: `url(${dragState ? 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/drag_cursor.svg' : 'https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/cursor.svg'}), auto`,
        visibility: allImagesLoaded ? 'visible' : 'hidden',
    }),
    zoomOption: {
        position: 'absolute',
        bottom: '1em',
        right: '1em',
        width: '2em',
        zIndex: '2'
    },
    zoomButton: { padding: '0px', width: '1.5em', height: '1.5em', fontSize: '20px', fontWeight: '500', cursor: 'pointer' },
    loadingImgWrap: (isMobile, imageArr, startIndex, imageKey) => ({
        display: 'initial',
        position: 'relative',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px',
        backgroundPosition: `${isMobile ? 'center 5em' : 'center'}`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${imageArr[startIndex][imageKey]})`,
        cursor: 'not-allowed'
    }),
    loading: {
        position: 'absolute',
        width: '100px',
        height: '100px',
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 50px)'
    }
}

const ThreeSixtyViewer = (props) => {
    const { isMobile = false, imageKey = 'image_url', zoomImageKey = 'zoom_image_url', type = 'exterior',
        autoPlay, startIndex = 0, updateIndex, handleImageChange, handleZoomInOut, showZoomOption = false,
        containerName = 'reactThreesixtyContainer', hotspotClickHandler, renderHotspotUI, renderExtraElement,
        noOuterMargin, imageArr, threeSixtyWrapStyle, zoomButtonStyle } = props;
    const viewerRef = useRef(null);
    const threeSixtyRef = useRef(null);
    const [dragState, setDragState] = useState(false);
    const [loadedType, setLoadedType] = useState([]);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);
    const [isZoomIn, setIsZoomIn] = useState(false);
    const [hotspots, sethotspots] = useState(props.hotspots);

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

    const imageChange = (e = null) => {
        const imgAngle = imageArr[e ? e.detail.image_index : startIndex].angle;

        props.hotspots?.length && sethotspots((old) => updateHotspots(old, imgAngle));
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
        if (imageArr[imageIndex][zoomImageKey]) {
            preloadImages([zoomImageUrl], () => {
                let newImages = imageArr.map((ite, index) => index === imageIndex ? zoomImageUrl : ite[imageKey])
                threeSixtyRef.current._updateImage(newImages);
            })
        }
    }

    const handleZoomChange = (transformWrapperData) => {
        if (transformWrapperData.scale <= 1) {
            if (isZoomIn) {
                setIsZoomIn(false);
                if (handleZoomInOut) {
                    handleZoomInOut(false);
                }
                threeSixtyRef.current._allowScroll();
            }
        } else {
            if (!isZoomIn) {
                setIsZoomIn(true);
                if (handleZoomInOut) {
                    handleZoomInOut(true);
                }
                threeSixtyRef.current._stopScroll();
                updateZoomImage(threeSixtyRef.current.index);
            }
        }
    }

    const handleZoomAction = (type, scale) => {
        if (type === 'zoom-in') {
            if (!isZoomIn) {
                updateZoomImage(threeSixtyRef.current.index);
                if (handleZoomInOut) {
                    handleZoomInOut(true);
                }
                setIsZoomIn(true);
                threeSixtyRef.current._stopScroll();
            }
        } else if (type === 'zoom-out') {
            if (scale < 1.5) {
                if (isZoomIn) {
                    if (handleZoomInOut) {
                        handleZoomInOut(false);
                    }
                    setIsZoomIn(false);
                    threeSixtyRef.current._allowScroll();
                }
            }
        } else {
            if (isZoomIn) {
                if (handleZoomInOut) {
                    handleZoomInOut(false);
                }
                setIsZoomIn(false);
                threeSixtyRef.current._allowScroll();
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
        if (viewerRef.current) {
            viewerRef.current.addEventListener('mousedown', handleMouseDown);
            viewerRef.current.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener(`${containerName}_image_changed`, imageChange);
            if (viewerRef.current) {
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
        props.hotspots?.length && imageChange();
    }, [JSON.stringify(imageArr)])

    useEffect(() => {
        if (viewerRef && viewerRef.current) {
            if (loadedType.indexOf(type) === -1) {
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

    const renderThreesixty = () => {
        if (isMobile) {
            return (
                <div style={{...styles.threeSixtyWrap(allImagesLoaded), ...threeSixtyWrapStyle}}>
                    <ZoomPan handleZoomChange={handleZoomChange} isZoomIn={isZoomIn} showZoomOption={showZoomOption} styles={styles} zoomButtonStyle={zoomButtonStyle}>
                        <div style={styles.transformComponent(allImagesLoaded, dragState, isMobile, noOuterMargin)}>
                            <div ref={viewerRef} style={styles.viewer(allImagesLoaded, dragState)}>
                                {renderExtraElement && <div className="extra_threesixty">{renderExtraElement()}</div>}
                            </div>
                            {hotspots?.length > 0 && <ThreeSixtyHotspots hotspots={hotspots} renderUI={renderHotspotUI} clickHandler={hotspotClickHandler} />}
                        </div>
                    </ZoomPan>
                </div>
            )
        } else {
            return (
                <div style={{...styles.threeSixtyWrap(allImagesLoaded), ...threeSixtyWrapStyle}}>
                    <ZoomPan isDesktop={true} handleZoomAction={handleZoomAction} isZoomIn={isZoomIn} showZoomOption={showZoomOption} styles={styles} zoomButtonStyle={zoomButtonStyle}>
                        <div style={styles.transformComponent(allImagesLoaded, dragState)}>
                            <div ref={viewerRef} style={styles.viewer(allImagesLoaded, dragState)}>
                                {renderExtraElement && <div className="extra_threesixty">{renderExtraElement()}</div>}
                            </div>
                            {hotspots?.length > 0 && <ThreeSixtyHotspots hotspots={hotspots} clickHandler={hotspotClickHandler} renderUI={renderHotspotUI} />}
                        </div>
                    </ZoomPan>
                </div>
            )
        }
    }

    return <>
        { renderThreesixty()}
        {
            !allImagesLoaded && (
                <div style={styles.loadingImgWrap(isMobile, imageArr, startIndex, imageKey)}>
                    <div style={styles.loading}>
                        <img src='https://spinny-images.s3.ap-south-1.amazonaws.com/static-asset/icons/loader.gif' style={{
                            width: '100%',
                            height: '100%'
                        }} />
                    </div>
                </div>
            )
        }
    </>
}

export default memo(ThreeSixtyViewer)