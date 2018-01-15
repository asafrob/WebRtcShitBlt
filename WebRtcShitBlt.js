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
        this._createHiddenVideoElement();
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
                return Promise.resolve();
            })
            .then(() => {
                this._createHiddenCanvas();
                requestAnimationFrame(this._sendImageToCanvas.bind(this));
                return this._hiddenCanvasElement.captureStream();
            })
    }

    _createHiddenVideoElement()
    {
        this._hiddenVideoElement = document.createElement('video');
        this._hiddenVideoElement.style.display = 'none';
        this._hiddenVideoElement.setAttribute("autoplay", 'true');
        document.body.appendChild(this._hiddenVideoElement);
    }

    _createHiddenCanvas()
    {
        this._hiddenCanvasElement = document.createElement('canvas');
        this._hiddenCanvasElement.style.display = 'none';
        this._hiddenCanvasElement.setAttribute("width", '0');
        this._hiddenCanvasElement.setAttribute("height", '0');
        document.body.appendChild(this._hiddenCanvasElement);
        this._sbVidContext = this._hiddenCanvasElement.getContext("2d");
    }
    
    _sendImageToCanvas()
    {
        if (this._hiddenCanvasElement.width === 0 && this._hiddenVideoElement.videoWidth !== 0){
            this._hiddenCanvasElement.setAttribute("width", this._hiddenVideoElement.videoWidth);
            this._hiddenCanvasElement.setAttribute("height", this._hiddenVideoElement.videoHeight);
        }

        if (this._hiddenCanvasElement.width !== 0) {
            this._sbVidContext.drawImage(this._hiddenVideoElement, 0, 0, this._hiddenVideoElement.videoWidth, this._hiddenVideoElement.videoHeight);
            this._sbVidContext.drawImage(this._myImage,
                this._imagePos.X,
                this._imagePos.Y,
                this._imagePos.W,
                this._imagePos.H);
        }
        requestAnimationFrame(this._sendImageToCanvas.bind(this));
    }
}


