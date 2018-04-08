// class Tabs{
//     constructor(selector){
//         this.elements=$(selector)
//         this.init()
//         this.bindEvents()
//     }
//     init(){
//         this.elements.each(function(index,e){
//             $(e).children('.tabs-bar').children('li').eq(0).addClass('active')
//             $(e).children('.tabs-content').children('li').eq(0).addClass('active')
//         })
//     }
//     bindEvents(){
//         this.elements.on('click','.tabs-bar>li',function(e){
//             var $li = $(e.currentTarget)
//             $li.addClass('active').siblings().removeClass('active')
//             var index = $li.index()
//             var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index)
//             $content.addClass('active').siblings().removeClass('active')
//         })
//     }
// }

function Tabs(selector){
    this.elements=$(selector)
    
    this.init()
    this.bindEvents()
}
Tabs.prototype.init = function(){
    this.elements.each(function(index,e){
        $(e).children('.tabs-bar').children('li').eq(0).addClass('active')
        $(e).children('.tabs-content').children('li').eq(0).addClass('active')
    })
}
Tabs.prototype.bindEvents = function(){
    this.elements.on('click','.tabs-bar>li',function(e){
        var $li = $(e.currentTarget)
        $li.addClass('active').siblings().removeClass('active')
        var index = $li.index()
        var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index)
        $content.addClass('active').siblings().removeClass('active')
    })
}