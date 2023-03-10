// 图片上报
import {ReportContent} from "../interface";

export const sendImage = (data: ReportContent, sendUrl: string)=>{
    let image = new Image();
    image.src = sendUrl + "/" + encodeURIComponent(JSON.stringify(data));
    image.onerror = () => {
        console.error('EasyLog - log data send from image src error')
    }
}

// sendBecaon上报
export const beacon = (data: ReportContent, sendUrl: string)=>{
    console.log('sendUrl', sendUrl, data)
    if (!navigator?.sendBeacon) {
        console.error('EasyLog - current env don\'t support sendBeacon!')
        return
    }
    navigator.sendBeacon(sendUrl, encodeURIComponent(JSON.stringify(data)))
}



