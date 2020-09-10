$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})
var form = layui.form
var layer = layui.layer
form.verify({
    // 自定义一个名为pwd的表单验证
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //确认密码验证
    repwd: function (value) {
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次密码输入不一致！'
        }
    },
})
// 注册的提交事件
$('#form_reg').on('submit', e => {
    e.preventDefault()
    var data = {
        username: $('#nname').val(),
        password: $('#ppass').val()
    }
    $.ajax({
        method: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: res => {
            if (res.status !== 0) {
                return layer.msg('用户名被占用', { icon: 5 });
            }
            layer.msg('注册成功', { icon: 6 });
            $('#link_login').click()
        }
    })
})
// 登录的登录事件
$('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        method: 'POST',
        //serialize()方法可以快速获得表单数据
        data: $(this).serialize(),

        success: res => {
            if (res.status !== 0) {
                return layer.msg('登录失败', { icon: 5 });
            }
            layer.msg('登录成功', { icon: 6 });
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})

