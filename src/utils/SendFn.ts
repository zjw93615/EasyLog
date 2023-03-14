// 图片上报
import {ReportContent} from "../interface";

/* report log by img url function */
export const sendImage = (data: ReportContent, sendUrl: string)=>{
    let image = new Image();
    image.src = sendUrl + "/" + encodeURIComponent(JSON.stringify(data));
    image.onerror = () => {
        console.error('EasyLog - log data send from image src error')
    }
}

/* report log by sendBeacon function */
export const beacon = (data: ReportContent, sendUrl: string)=>{
    console.log('sendUrl', sendUrl, data)
    if (!navigator?.sendBeacon) {
        console.error('EasyLog - current env don\'t support sendBeacon!')
        return
    }
    navigator.sendBeacon(sendUrl, encodeURIComponent(JSON.stringify(data)))
}



