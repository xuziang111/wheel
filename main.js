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
}