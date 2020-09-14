$(function () {
    var layer = layui.layer

    initCate()
    initEditor()
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            sunccess: res => {
                if (res.status !== 0) {
                    return layer.msg
                }
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
})