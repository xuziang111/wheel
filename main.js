let dom={
    //事件委托
    on:function(element,eventype,selctor,fn){
        element.addEventListener(eventType,(e)=>{
            let el = e.target
            while(!el.matches(selector)){//如果找到了selctor终止循环
                if(element === el){//寻找selctor，若直道element还未找到break退出
                    el = null 
                    break
                }
                el = el.parentNode
            }
            el&&fn.call(el,e,el) //将被点击的元素和监听的元素传入
        })
        return element
    },
    //深拷贝不考虑函数正则等
    JSONcopy:function(obj){
        return JSON.parse(JSON.stringify)
    },
    //深拷贝2
    deepCopy: function (object){
        var object2
        if(! (object instanceof Object) ){
            return object
        }else if(object instanceof Array){
            object2 = []
        }else if(object instanceof Function){
            object2 = eval(object.toString())
        }else if(object instanceof Object){
            object2 = {}
        }

        for(let key in object){
            object2[key] = clone(object[key])
        }
        return object2
    },
    ajax:function(url,method,success,fail,body,header){
        let request = new XMLHttpRequest()
        request.open(method,url)
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
                if(request.status >= 200 && request.status < 300 ){
                    success(request.responseText,request.status)
                }else{
                    fail(request.responseText,request.status)
                }
            }
        }
        if(header){
            for(let i in header)
            request.setRequestHeader(i,header[i])
        }
        request.send(body)
    }
}