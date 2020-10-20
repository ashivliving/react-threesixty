import React, { useState, useRef } from 'react'
import ThreeSixtyViewer from './Component/ThreeSixtyViewer';

const App = () => {
    const imageArr = [
        {
            "id": 408,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/Uo5MoH79Ss6GC99JEeWUyQ/raw/file.JPG",
            "order": 0,
            "angle": 0.0
        },
        {
            "id": 409,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/dmGPc_YVRJior34RrOg5Jg/raw/file.JPG",
            "order": 1,
            "angle": 0.0
        },
        {
            "id": 410,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/YswVlO9rRVKfYyJtb3WNAw/raw/file.JPG",
            "order": 2,
            "angle": 0.0
        },
        {
            "id": 411,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/fkHmQtSGQim_qxkluSPZrg/raw/file.JPG",
            "order": 3,
            "angle": 0.0
        },
        {
            "id": 412,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/zVChlMjHS7KA6TBqXB2G8w/raw/file.JPG",
            "order": 4,
            "angle": 0.0
        },
        {
            "id": 413,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/ka46RbQBSrKZICjDeXEA0Q/raw/file.JPG",
            "order": 5,
            "angle": 0.0
        },
        {
            "id": 414,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/QCra7_uRQGWeAGjF4mYS6w/raw/file.JPG",
            "order": 6,
            "angle": 0.0
        },
        {
            "id": 415,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/AOyYcfhUSv6wuRLtHo3Ayw/raw/file.JPG",
            "order": 7,
            "angle": 0.0
        },
        {
            "id": 416,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/I8dCYmSvQ_SqAWpQA5dFiQ/raw/file.JPG",
            "order": 8,
            "angle": 0.0
        },
        {
            "id": 417,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/UirC4_wRRlu4w__VLeIHEw/raw/file.JPG",
            "order": 9,
            "angle": 0.0
        },
        {
            "id": 418,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/_7P7LT5aQwCATllGvP4ilA/raw/file.JPG",
            "order": 10,
            "angle": 0.0
        },
        {
            "id": 419,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/g8NdlqJyTUawVP%2BK9utmtA/raw/file.JPG",
            "order": 11,
            "angle": 0.0
        },
        {
            "id": 420,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/hCASp9AETT2sZGc43SUMHA/raw/file.JPG",
            "order": 12,
            "angle": 0.0
        },
        {
            "id": 421,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/4Yoh8TzDRdGLfsV6uXLy0A/raw/file.JPG",
            "order": 13,
            "angle": 0.0
        },
        {
            "id": 422,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/67FkD5DOTja6oncBO%2BMBaQ/raw/file.JPG",
            "order": 14,
            "angle": 0.0
        },
        {
            "id": 423,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/QDT5l6OLQbS1DvJIfVW%2BZQ/raw/file.JPG",
            "order": 15,
            "angle": 0.0
        },
        {
            "id": 424,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/yz37V2yPSz6yOJtzcyblJg/raw/file.JPG",
            "order": 16,
            "angle": 0.0
        },
        {
            "id": 425,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/btJmXmOlSSqaDY1rG3u9wQ/raw/file.JPG",
            "order": 17,
            "angle": 0.0
        },
        {
            "id": 426,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/VXsDUl8wSa%2BBxxJFGtMoIw/raw/file.JPG",
            "order": 18,
            "angle": 0.0
        },
        {
            "id": 427,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/aQLF04pjQvqUB84zRIPpJQ/raw/file.JPG",
            "order": 19,
            "angle": 0.0
        },
        {
            "id": 428,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/%2BwqlvYPQQWWhkFfpAOVF4A/raw/file.JPG",
            "order": 20,
            "angle": 0.0
        },
        {
            "id": 429,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/EybRuKdQSx68S5Mq7QsZ8w/raw/file.JPG",
            "order": 21,
            "angle": 0.0
        },
        {
            "id": 430,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/HfQFLw_aSomR6sxmKWwB2g/raw/file.JPG",
            "order": 22,
            "angle": 0.0
        },
        {
            "id": 431,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/smsdSxTTTzqXCrG6zZXe5w/raw/file.JPG",
            "order": 23,
            "angle": 0.0
        },
        {
            "id": 432,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/MmbYIXdZRQGHvMi318pVcA/raw/file.JPG",
            "order": 24,
            "angle": 0.0
        },
        {
            "id": 433,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/DxMWLFtDRDCkmHhelNonRQ/raw/file.JPG",
            "order": 25,
            "angle": 0.0
        },
        {
            "id": 434,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/CVJgGUCYS4OBLZnvsk0JcQ/raw/file.JPG",
            "order": 26,
            "angle": 0.0
        },
        {
            "id": 435,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/ZUodQrh8Qm29LC3h0lh9Ag/raw/file.JPG",
            "order": 27,
            "angle": 0.0
        },
        {
            "id": 436,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/DJTQIDSDTbCO1QpCA2lo2Q/raw/file.JPG",
            "order": 28,
            "angle": 0.0
        },
        {
            "id": 437,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/iIECfzMrRWaPLYoGxsv0eA/raw/file.JPG",
            "order": 29,
            "angle": 0.0
        },
        {
            "id": 438,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/kEL%2Bk3ipQZyagR4sh_XxlA/raw/file.JPG",
            "order": 30,
            "angle": 0.0
        },
        {
            "id": 439,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/urwB0yRHQOmbw_0XRtXH7Q/raw/file.JPG",
            "order": 31,
            "angle": 0.0
        },
        {
            "id": 440,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/DvNYhFHZSGmL_bhQ%2B7Awug/raw/file.JPG",
            "order": 32,
            "angle": 0.0
        },
        {
            "id": 441,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/mtNNYszkSX%2BZsz9R1c1xKw/raw/file.JPG",
            "order": 33,
            "angle": 0.0
        },
        {
            "id": 442,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/wOgngAl2QyqBrQqzGgLIoQ/raw/file.JPG",
            "order": 34,
            "angle": 0.0
        },
        {
            "id": 443,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/9KTg7LW5Q%2Ba%2BJFtWorXlgA/raw/file.JPG",
            "order": 35,
            "angle": 0.0
        },
        {
            "id": 444,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/bRLQAgSDRUOG0z%2B7HUMfpQ/raw/file.JPG",
            "order": 36,
            "angle": 0.0
        },
        {
            "id": 445,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/cYgHSj9MTdeLzukQpnzlCQ/raw/file.JPG",
            "order": 37,
            "angle": 0.0
        },
        {
            "id": 446,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/e0mWUpAMTxKx9CSVVW53Ug/raw/file.JPG",
            "order": 38,
            "angle": 0.0
        },
        {
            "id": 447,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/ilSLNm3VR_C2i22amtqmeA/raw/file.JPG",
            "order": 39,
            "angle": 0.0
        },
        {
            "id": 448,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/C4sXOZGjTo27HmH99C_vPg/raw/file.JPG",
            "order": 40,
            "angle": 0.0
        },
        {
            "id": 449,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/Cd4gMA_pT%2B2EUTwHbaMKPg/raw/file.JPG",
            "order": 41,
            "angle": 0.0
        },
        {
            "id": 450,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/91Jzzq%2BSQeG9R4_UlZM8ow/raw/file.JPG",
            "order": 42,
            "angle": 0.0
        },
        {
            "id": 451,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/z_HO%2BylrRnyFuUY4Og8iZg/raw/file.JPG",
            "order": 43,
            "angle": 0.0
        },
        {
            "id": 452,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/xSNO6EeMR2SUuxr%2BbcYMlw/raw/file.JPG",
            "order": 44,
            "angle": 0.0
        },
        {
            "id": 453,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/JZWMpvNESR299Mjfao6cHQ/raw/file.JPG",
            "order": 45,
            "angle": 0.0
        },
        {
            "id": 454,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/xvhpFBHlRRyBaxf3x1yIzQ/raw/file.JPG",
            "order": 46,
            "angle": 0.0
        },
        {
            "id": 455,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/chP%2BTjURRGqjs_18GAW5pw/raw/file.JPG",
            "order": 47,
            "angle": 0.0
        },
        {
            "id": 456,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/Sn5dKUMOR_2h_nqekNbI3A/raw/file.JPG",
            "order": 48,
            "angle": 0.0
        },
        {
            "id": 457,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/GfXXxZg7QwigDx0RIX2TBA/raw/file.JPG",
            "order": 49,
            "angle": 0.0
        },
        {
            "id": 458,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/kQMovFzmRm2LeG5iF4UljA/raw/file.JPG",
            "order": 50,
            "angle": 0.0
        },
        {
            "id": 459,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/1R1ZsxuYRP%2BU8gq60g17gg/raw/file.JPG",
            "order": 51,
            "angle": 0.0
        },
        {
            "id": 460,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/oeFCGPZTS4GHwHqqny5g3Q/raw/file.JPG",
            "order": 52,
            "angle": 0.0
        },
        {
            "id": 461,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/ud4C0n1aRW%2BvyXRX8wQ6aw/raw/file.JPG",
            "order": 53,
            "angle": 0.0
        },
        {
            "id": 462,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/TfS66TWjRdGPsi_jnJCQPA/raw/file.JPG",
            "order": 54,
            "angle": 0.0
        },
        {
            "id": 463,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/elFikWemTdWTKFIc6apXfg/raw/file.JPG",
            "order": 55,
            "angle": 0.0
        },
        {
            "id": 464,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/X4LSxNmQS_aL5NMX63lyBw/raw/file.JPG",
            "order": 56,
            "angle": 0.0
        },
        {
            "id": 465,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/O%2B83ISGwSgGUE0kr6NhUOg/raw/file.JPG",
            "order": 57,
            "angle": 0.0
        },
        {
            "id": 466,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/Djm_EDU1SEaV0tLDZiUrOA/raw/file.JPG",
            "order": 58,
            "angle": 0.0
        },
        {
            "id": 467,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/h8bPVoINQt%2BubW1qUhB%2B4g/raw/file.JPG",
            "order": 59,
            "angle": 0.0
        },
        {
            "id": 468,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/P3gW5TsPS0mDBhSjPmJbNQ/raw/file.JPG",
            "order": 60,
            "angle": 0.0
        },
        {
            "id": 469,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/EqyQB0I6RXO4ZXFWWQpNsQ/raw/file.JPG",
            "order": 61,
            "angle": 0.0
        },
        {
            "id": 470,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/NvnQ7SS0QkieSWhzXfMzWQ/raw/file.JPG",
            "order": 62,
            "angle": 0.0
        },
        {
            "id": 471,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/Pfzp%2BC_xS5yLxoqlyUcC5g/raw/file.JPG",
            "order": 63,
            "angle": 0.0
        },
        {
            "id": 472,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/3SywP%2BveREekN5fEkbwEsA/raw/file.JPG",
            "order": 64,
            "angle": 0.0
        },
        {
            "id": 473,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/GUgw3pE0THOUnn886OcrJw/raw/file.JPG",
            "order": 65,
            "angle": 0.0
        },
        {
            "id": 474,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/NQkVWIFLQviaWlcdlIP5XQ/raw/file.JPG",
            "order": 66,
            "angle": 0.0
        },
        {
            "id": 475,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/SH2cdDKzTVmZgldO72d12w/raw/file.JPG",
            "order": 67,
            "angle": 0.0
        },
        {
            "id": 476,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/pPL5kEBBSSShZ0qzw0HcXw/raw/file.JPG",
            "order": 68,
            "angle": 0.0
        },
        {
            "id": 477,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/BN7ZG5FXT1%2B%2BMmE%2BAPL8eQ/raw/file.JPG",
            "order": 69,
            "angle": 0.0
        },
        {
            "id": 478,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/1bZQTfaCTcybjyVE0cCNfw/raw/file.JPG",
            "order": 70,
            "angle": 0.0
        },
        {
            "id": 479,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/z9PKuevLTWq2VxL59uVSEA/raw/file.JPG",
            "order": 71,
            "angle": 0.0
        },
        {
            "id": 480,
            "uri": "//spinny-backend.s3.ap-south-1.amazonaws.com/img/efGKLe7jTB6Vt4cr133ZhA/raw/file.JPG",
            "order": 72,
            "angle": 0.0
        }
    ]

    const [updateIndex, setUpdateIndex] = useState(0);
    // const inputRef = useRef(0);

    const handleImageChange = (image_index) => {
        console.log('image change', image_index)
    }

    // const handleInputChange = (value) => {
    //     if (value && value > 0 && value < imageArr.length) {
    //         setUpdateIndex(value)
    //     }
    // }

    return (
        <React.Fragment>
            <div style={{ width: '100vw', height: '100vh' }}>
                {/* <input type="number" ref={inputRef} onChange={() => handleInputChange(inputRef.current.value)} /> */}
                <ThreeSixtyViewer imageArr={imageArr} imageKey="uri" width='auto' height='600' autoPlay={false} speed={100} containerName="three-sixty-viewer" startIndex={0} updateIndex={updateIndex} handleImageChange={(e) => handleImageChange(e)} />
            </div>
        </React.Fragment>
    )
}

export default App