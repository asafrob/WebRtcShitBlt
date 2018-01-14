
// general WebRTC initializations

var sbVidContext;
var sbVideoSrc;
var myImage;
class WebRtcSB
{
    constructor(uniqueName){
        this._uniqueNamme = uniqueName;
        this._createHiddenVideoElemment();
        this._createHiddenCanvas();
        myImage = new Image();
        myImage.src = 'sb.png';
    }

    // returns a promise resolving to a MediaStream
    sbStartCapture(constraints = {video: true, audio: false})
    {
        return Promise.resolve()
            .then(()=>{
                return navigator.mediaDevices.getUserMedia(constraints);
            })
            .then((stream) => {
                //e.src = window.URL.createObjectURL(stream);
                //e.muted = true;
                this._hiddenVideoElement.srcObject = stream;
                sbVidContext = this._hiddenCanvasElement.getContext("2d"); // need to deal with this if we want to be able to run 2 instances
                requestAnimationFrame(_sendImageToCanvas);
                return Promise.resolve(this._hiddenCanvasElement.captureStream());
            })

    }

    _createHiddenVideoElemment(){
        this._hiddenVideoElement = document.createElement('video');
        this._hiddenVideoElement.style.display = 'none';
        this._hiddenVideoElement.setAttribute('id', this._uniqueNamme+'_SBSrc');
        this._hiddenVideoElement.setAttribute("autoplay", 'true');
        this._hiddenVideoElement.setAttribute("width", '640px');
        this._hiddenVideoElement.setAttribute("height", '480px');
        document.body.appendChild(this._hiddenVideoElement);
        sbVideoSrc = this._hiddenVideoElement;
    }

    _createHiddenCanvas(){
        this._hiddenCanvasElement = document.createElement('canvas');
        this._hiddenCanvasElement.style.display = 'none';
        this._hiddenCanvasElement.setAttribute('id', this._uniqueNamme+'_SBCanvas');
        this._hiddenCanvasElement.setAttribute("width", '640px');
        this._hiddenCanvasElement.setAttribute("height", '480px');
        document.body.appendChild(this._hiddenCanvasElement);
    }
}

function _sendImageToCanvas()
{
    sbVidContext.drawImage(sbVideoSrc, 0, 0, sbVideoSrc.width, sbVideoSrc.height);
    sbVidContext.drawImage(myImage, 0,0, 50,50);

    requestAnimationFrame(_sendImageToCanvas);
}
