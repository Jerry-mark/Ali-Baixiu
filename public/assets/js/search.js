// 获取到浏览器地址栏中的搜索关键字
let key = getUrlParams('key')
// 根绝搜索关键字调用搜索接口 获取搜索结果
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (response) {
        $('#listBox').html(template('searchTpl',{data:response}))
    }
})