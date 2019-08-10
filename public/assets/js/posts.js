// 向服务器端发送请求 获取文章列表数据
$.ajax({
	type: 'get',
	url: '/posts',
	success: function (response) {
		var html = template('postsTpl', response);
		$('#postsBox').html(html);
		var page = template('pageTpl', response);
		$('#page').html(page);
	}
});

// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)
}

// 分页
function changePage(page) {
	// 向服务器端发送请求 获取文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: {
			page: page
		},
		success: function (response) {
			var html = template('postsTpl', response);
			$('#postsBox').html(html);
			var page = template('pageTpl', response);
		}
	});
}

// 向服务器端发送请求 索要分类数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response) {
		// console.log(response)
		var html = template('categoryTpl', { data: response });
		$('#categoryBox').html(html);
	}
})

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {
	// 获取到管理员选择的过滤条件
	var formData = $(this).serialize();
	console.log(formData)
	// 向服务器端发送请求 根据条件索要文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function (response) {
			console.log(response);
			$('#postsBox').html(template('postsTpl', response));
			$('#page').html(template('pageTpl', response));
		}
	});
	// 阻止表单默认提交行为
	return false;
});
// 当删除按钮被点击的时候
$('#postsBox').on('click', '.delete', function () {
	// 淡出删除确认框 和管理员确认是否要真的进行删除操作
	if (confirm('您真的要进行删除操作吗？')) {
		// 获取到管理员删除的文章的id
		let id = $(this).attr('data-id')
		$.ajax({
			type: 'delete',
			url: '/posts/' + id,
			success: function () {
				location.reload()
			}
		})
	}
})