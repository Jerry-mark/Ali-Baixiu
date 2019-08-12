// 当管理员选择文件的时候
$('#file').on('change', function () {
    // 用户选择到的文件
    let file = this.files[0]
    // 创建formData对象实现二进制文件上传
    let formData = new FormData()
    // 将管理员选择到的文件添加到formData对象中
    formData.append('image', file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#thumbnail').attr('src', response[0].image).css('display', 'block')
            $('#image').val(response[0].image)
        }
    })
})

// 当轮播图表单发生提交事件的时候
$('#slidesForm').on('submit', function () {
    // 获取管理员在表单中输入内容
    let formData = $(this).serialize()
    // 向服务器端发送请求，添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    // 阻止表单默认提交
    return false
})
// 向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        $('#slidesBox').html(template('slidesTpl',{data:response}))
    }
})
// 当用户点击删除按钮时
$('#slidesBox').on('click','.delete',function () {
    if(confirm('您确定要删除吗？')){
        // 获取id 
        let id = $(this).attr('data-id')
        // 发送请求
        $.ajax({
            type:'delete',
            url:'/slides/'+id,
            success:function () {
                location.reload()
            }
        })
    }
})