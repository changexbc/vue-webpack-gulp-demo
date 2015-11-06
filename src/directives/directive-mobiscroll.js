module.exports = {
    date:{
        bind:function(){
            var vm = this.vm;
            var key = this.expression;
            $(this.el).mobiscroll().date({
                theme:'mobiscroll',
                dateFormat: 'yy-mm-dd',
                mode:'scroller',
                lang: 'zh',
                maxDate:new Date(),
                display:'bottom'
            });
        },
        update:function(value){
            $(this.el).mobiscroll('setVal', value)
        }
    },
    select:{
        bind:function(){
            var vm = this.vm;
            var key = this.expression;
            $(this.el).mobiscroll().select({
                theme:'mobiscroll',
                mode:'scroller',
                lang: 'zh',
                display:'bottom'
            })
        },
        update:function(value){
            // mobiscorll不会因为select的值改变而刷新mobiscorll生成的input的值，所以手动修改dom的value
            $(this.el).prev().val(value)
        }
    }
}
