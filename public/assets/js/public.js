// 发送请求 获取随机推荐数据
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    var randomTpl = `
        {{each data}}
            <li>
                <a href="detail.html">
                  <p class="title">{{$value.title}}</p>
                  <p class="reading">阅读({{$value.meta.views}})</p>
                  <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                  </div>
                </a>
            </li>
        {{/each}}
        `
    $('#randomBox').html(template.render(randomTpl, { data: response }))
  }
})
// 发送请求 获取最新评论数据
$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (response) {
    var talkTpl = `
    {{each data}}
          <li>
              <a href="javascript:;">
                <div class="avatar">
                  <img src="{{$value.author && $value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                  <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                  </p>
                  <p>{{$value.content}}</p>
                </div>
              </a>
          </li>
    {{/each}}
          `
    $('#talkBox').html(template.render(talkTpl, { data: response }))
  }
})
// 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0)
}
// 向服务器端发送请求 索要文章分类列表数据
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    var navTpl = `
    {{each data}}
    <li><a href="list.html?categorieId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    $('#categoriesBox').html(template.render(navTpl, { data: response }))
    $('#navBox').html(template.render(navTpl, { data: response }))
  }
})
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
$('.search form').on('submit', function () {
  // 获取到用户在表单中输入的关键字
  let keys = $(this).find('.keys').val()
  // 跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页面
  location.href = '/search.html?key=' + keys
  // 阻止用户的默认提交行为
  return false
})