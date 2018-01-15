class WebRtcSB
{
    constructor(imagePath = 'sb.png',
                imagePosX = 10,
                imagePosY = 10,
                imageWidth = 50,
                imageHeight = 50,
                constraints = {video: true, audio: true})
    {
        this._constraints = constraints;
        this._createHiddenVideoElemment();
        this._createHiddenCanvas();
        this._myImage = new Image();
        this._myImage.src = imagePath;
        this._imagePos = {
            X: imagePosX,
            Y: imagePosY,
            W: imageWidth,
            H: imageHeight
        }
    }

    // returns a promise resolving to a MediaStream
    sbStartCapture()
    {
        return Promise.resolve()
            .then(()=>{
                return navigator.mediaDevices.getUserMedia(this._constraints);
            })
            .then((stream) => {
                this._hiddenVideoElement.srcObject = stream;
                this._sbVidContext = this._hiddenCanvasElement.getContext("2d"); // need to deal with this if we want to be able to run 2 instances
                requestAnimationFrame(this._sendImageToCanvas.bind(this));
                return Promise.resolve(this._hiddenCanvasElement.captureStream());
            })
    }

    _createHiddenVideoElemment()
    {
        this._hiddenVideoElement = document.createElement('video');
        this._hiddenVideoElement.style.display = 'none';
        this._hiddenVideoElement.setAttribute("autoplay", 'true');
        this._hiddenVideoElement.setAttribute("width", '640px');
        this._hiddenVideoElement.setAttribute("height", '480px');
        document.body.appendChild(this._hiddenVideoElement);
    }

    _createHiddenCanvas()
    {
        this._hiddenCanvasElement = document.createElement('canvas');
        this._hiddenCanvasElement.style.display = 'none';
        this._hiddenCanvasElement.setAttribute("width", '640px');
        this._hiddenCanvasElement.setAttribute("height", '480px');
        document.body.appendChild(this._hiddenCanvasElement);
    }
    
    _sendImageToCanvas()
    {
        this._sbVidContext.drawImage(this._hiddenVideoElement, 0, 0, this._hiddenVideoElement.width, this._hiddenVideoElement.height);
        this._sbVidContext.drawImage(this._myImage,
            this._imagePos.X,
            this._imagePos.Y,
            this._imagePos.W,
            this._imagePos.H);
        requestAnimationFrame(this._sendImageToCanvas.bind(this));
    }
}


