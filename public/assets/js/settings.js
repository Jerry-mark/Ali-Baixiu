// 当用户选择logo图片时
$('#logo').on('change', function () {
    // 获取到管理选择的图片
    let file = this.files[0]
    // 创建formData对象实现二进制文件上传
    let formData = new FormData()
    // 将管理员选择到的文件添加到formData对象中
    formData.append('logo', file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo)
            // 将图片显示在页面中
            $('#logoBig').attr('src', response[0].logo)
        }
    })

})
// 当网站设置表单发生提交行为时
$('.submit').on('click', function () {
    // 获取管理员在表单中输入的内容
    let formData = $('#settingsForm').serialize()
    // 向服务器端发送请求 实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload()
        }
    })
}) 
// 向服务器端发送请求 索要网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function (response) {
        console.log(response)
        if(response) {
            // 将logo地址存储在隐藏域中
            $('#hiddenLogo').val(response.logo)
            // 将logo显示在页面
            $('#imageBig').attr('src',response.logo)
            // 将网站标题显示在页面中
            $('input[name="title"]').val(response.title)
            // 将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked',response.comment)
            // 将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked',response.review)
        }
    }
})