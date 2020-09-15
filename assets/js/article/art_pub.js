$(function () {
    var layer = layui.layer
    var form = layui.form
    initCate()
    initEditor()
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg
                }
                // 渲染下拉菜单
                var hhtml = template('tpl-cate', res)
                $('#xialacaidan').html(hhtml)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 为隐藏按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()


    })
    $('#coverFile').on('change', function (e) {
        // console.log(e);
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('请选择图片')
        }
        var newUrl = URL.createObjectURL(files[0])
        // console.log(newUrl);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        // console.log(e)
        var fd = new FormData($(this)[0])
        // console.log(fd)
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('提交失败', { icon: 5 })
                }
                layer.msg('发布成功', { icon: 6 })
                location.href = '/article/art_list.html'
            }
        })
    }

})