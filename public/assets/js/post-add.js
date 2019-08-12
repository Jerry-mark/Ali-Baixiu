// 向服务器端发送请求获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        $('#category').html(template('categoryTpl', { data: response }))
    }
})
// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
    // 获取到管理员选择到的文件
    let file = this.files[0]
    // 创建formData 对象 实现二进制文件上传
    let formData = new FormData
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            $('#preview').css('display', 'block').attr('src', response[0].cover)
            $('#thumbnail').val(response[0].cover)
        }
    })
})
// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize()
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            // 文章添加成功呢跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    })
    // 阻止表单默认提交行为
    return false
})
let id = getUrlParams('id')
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            // 向服务器端发送请求获取文章分类数据
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (res) {
                    response.res = res
                    $('#parentsBox').html(template('modifyTpl',response))
                }
            })
        }
    })
}
// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&')
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        let tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}
// 当修改文章信息表单发生提交行为的时候
$('#parentsBox').on('submit','#modifyForm',function () {
    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize()
    console.log(formData)
    // 获取管理员正在修改的文章id值
    let id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data:formData,
        success:function () {
            location.href = '/admin/posts.html'
        }
    })
    // 阻止表单默认提交行为
    return false
})
