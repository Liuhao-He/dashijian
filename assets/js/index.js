$(function () {
    getUserInfo()
    var layer = layui.layer
    // 实现退出功能
    $('#tuichu').on('click', function () {
        layer.confirm('确定退出？？？', { icon: 3, title: '提示' }, function (index) {
            // 先清除本地缓存，再前往登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: res => {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败！')
                }
                renderAvatar(res.data)
            },
            // complete: res => {
            //     console.log(res)
            // }
        })
    }
})
function renderAvatar(res) {
    var name = res.nickname || res.username
    $('#welcome').html('欢迎你&nbsp;&nbsp;' + name)
    if (res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}