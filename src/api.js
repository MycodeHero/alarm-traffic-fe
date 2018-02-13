import {sealAxios} from './js/util/post'
exports.post =  (path, params, callback) => {
    return sealAxios(path, params).then((data)=>{
        callback && callback(data)
    }).catch(function(errorMsg){
        callback && callback(errorMsg)
    })
};
