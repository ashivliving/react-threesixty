### Install
ThreeSixty is available as NPM package
```
npm i react-threesixty
```

### Example

```js

<ThreeSixtyViewer 
  image: 'images/example.jpg'
  count: 19
  perRow: 4
/>
```
### Options

```js
{
  // Source image url object with 
  imageArr: [{
    'image_url' : 'images/example-1.jpeg'
  }, {
    'image_url' : 'images/example-2.jpeg'
  }, {
    'image_url' : 'images/example-3.jpeg'
  }
    ...
  ], // Also supports passing an array of images
  imageKey : 'image_url', // imageArr key for imageUrl. Default : image_url
  // Width & Height
  width: 300,  // Image width. Default 300
  height: 300, // Image height. Default 300

  // Navigation
  prev: document.getElementById('prev'), // Previous button element. Default: null
  next: document.getElementById('next'), // Next button element. Default: null
  keys: true,         // Rotate image on arrow keys. Default: true
  draggable: true,    // Rotate image by dragging. Default: true
  swipeable: true,    // Rotate image by swiping on mobile screens. Default: true
  dragTolerance: 10,  // Rotation speed when dragging. Default: 10
  swipeTolerance: 10, // Rotation speed when swiping. Default: 10
  swipeTarget: document.getElementById('wrapper'), // Element which will listen for drag/swipe events. Default: Image container

  // Rotation settings
  speed: 100,     // Rotation speed during 'play' mode. Default: 10
  inverted: false, // Inverts rotation direction
  autoPlay: false, // Initial Autoplay. Default: false
  containerName: 'reactThreesixtyContainer' // Three sixty container name. Default: 'reactThreesixtyContainer'
  handleImageChange: null // Callback function to get image change. Default: null. Returns new image index
}
```

### Array of images
As an alternative to sprite image, ThreeSixty also supports using array of images:
```js
<ThreeSixtyViewer 
  image: [{
    'imageUrl' : 'images/example-1.jpeg'
  }, {
    'imageUrl' : 'images/example-2.jpeg'
  }, {
    'imageUrl' : 'images/example-3.jpeg'
  }]
  imageKey : 'imageUrl'
  containerName: 'react-three-sixty' //Three sixty container name
/>
```

### Licence

Licensed under the MIT license.
