class Sticky{
    constructor(selector,n){
        this.elements = $(selector)
        this.offset = n || 0
        this.addWrapper()
        this.cacheOffesets()
        this.listenScroll()
    }
    addWrapper(){ //向选中元素外加一个标签，占住原来的位置
        this.elements.each((index,element)=>{
            console.log(element)
            var $wrapper = $(`<div class="stickyWrapper"></div>`)
            $(element).wrap($wrapper)
            $(element).parent().height($(element).height()) 
        })
    }
    cacheOffesets(){//记录元素到文档的高度
        this.offsets = []
        this.elements.each((index,element)=>{
            this.offsets[index]=$(element).offset()
        })
    }
    listenScroll(){//监听滚动事件
        $(window).on('scroll',()=>{
            var scrollY = window.scrollY
            this.elements.each((index,element)=>{
                var $element = $(element)
                if(scrollY + this.offset > this.offsets[index].top){
                    $element.addClass('sticky').css({top:this.offset})
                }else{
                    $element.removeClass('sticky')
                }
            })
        })
    }
}