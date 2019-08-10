// 当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function () {
    // 用户选择到的文件
    let formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})
// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    let formDate = $(this).serialize()
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formDate,
        success: function () {
            // 刷新页面
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
})
// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        $('#userBox').html(template('userTpl', { data: response }))

    }
})
// 通过实践委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    // 获取被点击用户的id值
    let id = $(this).attr('data-id')
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            $('#modifyBox').html(template('modifyTpl', response))
        }
    })
})
// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    let formData = $(this).serialize()
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            location.reload()
        }
    })
    // 阻止表单默认提交
    return false
})
// 当删除按钮被点击的时候
$('#userBox').on('click', '.delete', function () {
    // 如果管理员确认要删除用户
    if (confirm('您真的要删除用户吗？')) {
        // 获取到即将要删除的用户id
        let id = $(this).attr('data-id')
        // 向服务器端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                // 请求成功后刷新页面
                location.reload()
            }
        })
    }
})
// 获取全选按钮
let selectAll = $('#selectAll')
// 获取批量删除按钮
let deleteMany = $('#deleteMany')
// 当全选按钮的状态发生改变时
selectAll.on('change',function () {
    // 获取到全选按钮当前的状态
    let status = $(this).prop('checked')
    if(status) {
        // 显示批量删除按钮
        deleteMany.show()
    }else {
        // 隐藏批量删除按钮
        deleteMany.hide()
    }
    // 获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked',status)
})
// 当用户前面的复选框状态发生改变时
$('#userBox').on('change','.userStatus',function () {
    // 获取到所有用户 在所有用户中过滤出选中的用户
    // 判断选中用户的数量和所有用户的数量是否一致
    // 如果一致 就说明所有的用户都是选中的
    // 否则 就是有用户没有被选中
    let inputs = $('#userBox').find('input')
    if(inputs.length == inputs.filter(':checked').length) {
        // 所有用户都是选中的
        selectAll.prop('checked',true)
    } else {
        // 不是所有用户都是选中的
        selectAll.prop('checked',false)
    }
    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 1) {
        // 显示批量删除按钮
        deleteMany.show()
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide()
    }
})
// 为批量删除按钮添加点击事件
deleteMany.on('click',function () {
    let ids = []
    // 获取选中的用户
    let checkedUser = $('#userBox').find('input').filter(':checked')
    // 循环复选框 从复选框元素的身上获取data-id属性的值
    checkedUser.each(function (index,element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('您真的要确定进行批量删除操作吗？')) {
        $.ajax({
            type:'delete',
            url:'/users/'+ids.join('-'),
            success:function () {
                location.reload()
            }
        })
    }
})