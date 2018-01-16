# WebRtcShitBlt

image show a smaple use of a video captured by WebRTC with an embeded image (brown/yellow) on the top left corner
![alt text](preview.png "sample screen of using the lib with default image")

###what does it do ?
This library wraps a WebRTC source and returns a MediaStream that can be used as a normal MediaStream u get from navigator.mediaDevices.getUserMedia.<br/>
The returned MediaStream will have your selected image embeded in the video stream.

###common usecases
* logo
* watermark
* image extracted from a presentation

### how does it work
The code creates an hidden video element and an hidden canvas element<br/>
The original MediaStream is played on the hidden video element.<br/>
The video element is sampled for images, which are drawn to the hidden canvas.<br/>
The logo image is also being drawn to the canvas.<br/>
Canvas MediaStream is returned to the calling app.

### Sample code
```javascript
// create an instance of SB
var sb = new WebRtcSB('sb.png', 10, 10, 50, 50);

// get a Promise resolving to a MediaSource
sb.sbStartCapture()
    .then((stream)=>{
    // play MediaSource on a video element
    document.getElementById('myVideo').srcObject = stream;
})
```

### Note
* this library is based on ES6

###Tested on
* chrome 63 (OS X)
* FireFox 57 (OS X)

###Roadmap
* change code structure so the processing the image undertakes will be done as a plugin
* implement gray scale image plugin
* make this available as an NPM too