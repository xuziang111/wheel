class Slide {
    constructor(options){
        this.timer=undefined;
        this.options = options
        this.$element=$(this.options.element)
        this.$element.addClass('slidexxx')
        this.initHtml()
        this.current=0;
        if(this.options.autoPlay){
            this.play()
        }
        this.$element.on('mouseenter',()=>{
            this.stop();
        }).on('mouseleave',()=>{
            this.play()
        })
    }
    //------------------
    initHtml(){
        this.width = this.$element.children('ol').children('li').width()
        this.$element.width(this.width)
        this.$element.append(`<div class="slidexxx-controls"></div>`)
        this.$prev = $(`<button class="slidexxx-prev">上一张</button>`).on('click',()=>this.prev())
        this.$next = $(`<button class="slidexxx-next">下一张</button>`).on('click',()=>this.next())
        this.$controls = $('.slidexxx-controls')
        this.$controls.append(this.$prev).append(this.$next)
    }
    go(index){
        let $ol = this.$element.children('ol')
        let $items = $ol.children('li')
        if(index>=$items.length){
            index=index%$items.length
        }else if(index<0){
            index=$items.length-1
        }
        this.current=index;
        $ol.css({transform:`translateX(${-index*this.$element.width()}px)`})
    }
    next(){
        this.go(this.current+1)
    }
    prev(){
        this.go(this.current-1)
    }
    play(){
        this.timer = setInterval(()=>{
            this.go(this.current+1)
        },2000)
    }
    stop(){
        console.log(this.timer)
        window.clearInterval(this.timer)
    }
}