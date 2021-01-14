$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password').val();
            if (pwd !== value) {
                return ('两次密码不一致')
            }
        }
    })

    var layer = layui.layer;
    $('#form-reg').on('click', function (e) {
        e.preventDefault();

        // console.log(data);
        $.post('/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            // {
            //     username: $('#form_reg [name=username]').val(),
            //     password: $('#form_reg [name=password]').val()
            // }, 
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                    // console.log(res.massage);
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click();
                console.log(res);
            })
    })
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功'),
                    localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})