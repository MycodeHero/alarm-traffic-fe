let deepClone = (Child, Parent) => {
    let child = Child || {}
    let toStr = Object.prototype.toString
    for(var prop in Parent) {
        if(Object.hasOwnProperty.call(Parent, prop)) {
            if(typeof Parent[prop] === 'object') {
                child[prop] = toStr.call(Parent[prop]) === '[object object]' ? {} : []
                deepClone(child[prop], Parent[prop])
            }else {
                child[prop] = Parent[prop]
            }
        }
    }
}

exports.deepClone = deepClone