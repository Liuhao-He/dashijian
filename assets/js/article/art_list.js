// 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
$(function () {
    var layer = layui.layer
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    //
    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.mas('获取文章列表失败！')
                }
                var hhtml = template('tpl_table', res)
                $('tbody').html(hhtml)
            }
        })
    }


})
