// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function () {
    // 获取用户在表单中输入的内容
    let formData = $(this).serialize()
    // 向服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    // 阻止表单默认提交行为
    return false
})
// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // 将服务器端返回的数据和HTML模板进行拼接 并将拼接好的内容放到页面中
        $('#categoryBox').html(template('categoryListTpl', { data: response }))
    }
})
// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取要修改的分类数据的id
    let id = $(this).attr('data-id')
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            $('#formBox').html(template('modifyCategoryTpl', response))
        }
    })
})
// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function () {
    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize()
    // 获取要修改的分类id
    let id = $(this).attr('data-id')
    // 发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload()
        }
    })
    // 阻止表单的默认提交行为
    return false
})
