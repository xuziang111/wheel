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
    eventHub = {  //发布/订阅
        events:{},
        emit(eventName,data){ //发布事件
            for(let key in this.events){ //寻找是否存在订阅该发布事件
                if(key === eventName){ 
                    let fnList = this.events[key] //如果找到事件则将事件的函数列表放入，遍历执行
                    fnList.map((fn)=>{ //执行订阅的函数
                        fn.call(undefined,data)
                    })
                }
            }
        },
        on(eventName,fn){ //订阅事件
            if(this.events[eventName] === undefined){//如果不存在该事件则新建一个该事件数组
                this.events[eventName] = []
            }
            this.events[eventName].push(fn) //将用执行的函数放入数组中
        },
    //深拷贝不考虑函数正则等
    JSONcopy:function(obj){
        return JSON.parse(JSON.stringify)
    },
    //深拷贝2
    deepClone:(parent) => {
        //判断函数
        const isType = (obj, type) => {
            if (typeof obj !== 'object') return false;
            const typeString = Object.prototype.toString.call(obj);
            let flag;
            switch (type) {
              case 'Array':
                flag = typeString === '[object Array]';
                break;
              case 'Date':
                flag = typeString === '[object Date]';
                break;
              case 'RegExp':
                flag = typeString === '[object RegExp]';
                break;
              default:
                flag = false;
            }
            return flag;
          };
          //正则
          const getRegExp = re => {
            var flags = '';
            if (re.global) flags += 'g';
            if (re.ignoreCase) flags += 'i';
            if (re.multiline) flags += 'm';
            return flags;
          };
        const parents = [];
        const children = [];
      
        const _clone = parent => {
          if (parent === null) return null;
          if (typeof parent !== 'object') return parent;
      
          let child, proto;
      
          if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = [];
          } else if (isType(parent, 'RegExp')) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
          } else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
          } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
          }
      
          // 处理循环引用
          const index = parents.indexOf(parent);
      
          if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
          }
          parents.push(parent);
          children.push(child);
      
          for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
          }
      
          return child;
        };
        return _clone(parent);
      },
    ajax:function(obj){
        let request = new XMLHttpRequest()
        request.open(obj.method,obj.url)
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
                if(request.status >= 200 && request.status < 300 ){
                    obj.success(request.responseText,request.status)
                }else{
                    obj.fail(request.responseText,request.status)
                }
            }
        }
        if(obj.header){
            for(let i in obj.header)
            request.setRequestHeader(i,obj.header[i])
        }
        request.send(obj.body)
    }
}