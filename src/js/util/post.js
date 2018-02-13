import axios from 'axios'
import qs from 'qs'

exports.sealAxios = (path, params) => new Promise((resolve, reject)=>{
    axios.post(path, qs.stringify(params)).then((result)=>{
        if(result.data.error.returnCode == 0) {
            resolve(result.data.data)
        }else {
            reject(result.data.error.returnMessage)
        }
    })
})