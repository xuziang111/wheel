class Dialog {
    constructor(options){
        this.options = options
        this.init()
    }
    init(){
        let {title,content,buttons} = this.options
        let $buttons = buttons.map((buttonOption)=>{
            let $b = $('<button></button>')
            $b.text(buttonOption.text)
            $b.on('click',buttonOption.action)
            return $b
        })
        var template = `
        <div class="dialog">
            <div class="dialog-wrapper">
                <span class="dialog-x">X</span>
                <header class="dialog-header">${title}</header>
                <main class="dialog-main">${content}</main>
                <footer class="dialog-footer"></footer>
            </div>
        </div>
        `
        var $dialog = $(template)
        $dialog.find('footer').append($buttons)
        $dialog.find('.dialog-x').on('click',()=>{
            this.close()
        })
        this.$dialog = $dialog
    }
    open(){
        this.$dialog.appendTo('body')
    }
    close(){
        this.$dialog.detach()
    }
}