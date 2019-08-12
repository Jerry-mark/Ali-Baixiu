// 向服务器端发送请求获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        $('#commentsBox').html(template('commentsTpl', response))
        $('#pageBox').html(template('pageTpl', response))
    }
})
// 实现分页
function changePage(page) {
    // 向服务器端发送请求获取评论列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            $('#commentsBox').html(template('commentsTpl', response))
            $('#pageBox').html(template('pageTpl', response))
        }
    })
}
// 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function () {
    // 获取当前评论的状态
    let status = $(this).attr('data-status')
    // 获取id值
    let id = $(this).attr('data-id')
    // 向服务器端发送请求更改评论状态
    $.ajax({
        type: 'put',
        url: '/commennts/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
})

// 当删除按钮被点击的时候
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('确认删除该评论吗？')) {
        // 获取id值
        let id = $(this).attr('data-id')
        // 发送请求
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})