// 向服务器端发送请求 索要轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log('response')
    }
})
