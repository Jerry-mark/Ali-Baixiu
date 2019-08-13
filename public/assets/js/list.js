// 从浏览器的地址栏中获取查询参数
let categorieId = getUrlParams('categorieId')
// 根据分类id获取分类列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + categorieId,
    success: function (response) {
        $('#listBox').html(template('listTpl',{data:response}))
    }
})