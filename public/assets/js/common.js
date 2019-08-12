$('#logout').on('click', function () {
    let isConfirm = confirm('您真的要退出吗？')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html'
            },
            error: function () {
                alert('退出失败')
            }
        })
    }
})
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)
}
// 向服务器端发送请求 索要登录用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
        $('.avatar').attr('src', response.avatar)
        $('.profile .name').html(response.nickName)
    }
})