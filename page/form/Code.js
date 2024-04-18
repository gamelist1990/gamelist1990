$(document).ready(function () {
    var gasurl =
        'https://script.google.com/macros/s/AKfycbzy3LH14p6WYNhT8OXmWCW3ozZ1MMm4vUVbQOfYG1R7OqU6B_xxU9QKwWuSaCjfFoBXBw/exec';
    var lastSubmitTime = Date.now();
    var lastComment = '';

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function handleSuccess(response) {
        var comments = JSON.parse(response);
        $('#comments').empty();
        for (var i = 0; i < comments.length; i++) {
            var date = new Date(comments[i].date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var username = comments[i].username ? escapeHtml(comments[i].username) :
                '';
            var comment = comments[i].comment ? escapeHtml(comments[i].comment) : '';
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                $('#comments').append('<p data-id="' + comments[i].id +
                    '" class="comment ' + (i % 2 == 0 ? 'even' : 'odd') + '"><strong>' +
                    username + ':</strong> コメントがありません (' + comments[i].date + ')</p>');
            } else {
                $('#comments').append('<p data-id="' + comments[i].id +
                    '" class="comment ' + (i % 2 == 0 ? 'even' : 'odd') + '"><strong>' +
                    username + ':</strong> ' + comment + ' (' + year + '/' + month + '/' +
                    day + ')</p>');
            }
        }
    }

    function handleError(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        var formData = $('#comment-form').serialize();
        $.ajax({
            url: gasurl,
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log('アップロード成功,サーバーの応答： ', response);
                var parsedResponse = JSON.parse(response);
                if (parsedResponse.error) {
                    alert(parsedResponse.error);
                }
                $.ajax({
                    url: gasurl,
                    type: 'GET',
                    success: handleSuccess,
                    error: handleError
                });
            },
            error: handleError
        });
    }
    $('#comment-form').on('submit', function (event) {
        event.preventDefault();
        var now = Date.now();
        var comment = $('#comment').val();

        if (now - lastSubmitTime < 3000) {
            alert('スパムを防ぐため、送信してから3秒経っていない場合は3秒待ってから再度送信してください。');
            return;
        }

        if (comment === lastComment) {
            alert('同じコメントを連続して送信することはできません。');
            return;
        }


        var username = $('#username').val();
        if (!username) {
            $('#username').val('匿名 | ID:' + Math.random().toString(36).substr(2, 9));
        }


        if ($('#comment').val()) {
            $('#id').val(Math.random().toString(36).substr(2, 9));
            $('#url').val(window.location.href);
            $.getJSON('https://wtfismyip.com/json', function (data) {
                $('#ip').val(data.YourFuckingIPAddress);
                $('#hostname').val(data.YourFuckingHostname);
                $('#terminal').val(navigator.userAgent);
                lastSubmitTime = now;
                lastComment = comment;
                handleFormSubmit(event);
            });
        } else {
            lastSubmitTime = now;
            lastComment = comment;
            handleFormSubmit(event);
        }
    });

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    $('#comments').on('dblclick', 'p', function () {
        var id = $(this).data('id');
        var url = (window.location.href);
        var password = getCookie('password');
        if (!password) {
            password = prompt('パスワードを入力してください');
            setCookie('password', password, 7);
        }
        if (password) {
            var action = confirm('本当にこのコメントを削除しますか？') ? 'delete' : confirm(
                'パスワードを変更しますか？') ? 'change_password' : null;
            if (action) {
                if (action === 'change_password') {
                    password = prompt('新しいパスワードを入力してください');
                    setCookie('password', password, 7);
                    alert('パスワードが変更されました');
                } else {
                    $.ajax({
                        url: gasurl,
                        type: 'POST',
                        data: {
                            'action': action,
                            'id': id,
                            'url': url,
                            'password': password
                        },
                        success: function (response) {
                            console.log('削除成功:', response);
                            var parsedResponse = JSON.parse(response);
                            if (parsedResponse.AccessError) {
                                alert(parsedResponse.AccessError);
                            }
                            $.ajax({
                                url: gasurl,
                                type: 'GET',
                                success: handleSuccess,
                                error: handleError
                            });
                        },
                        error: handleError
                    });
                }
            }
        } else {
            alert('パスワードが間違っています');
        }
    });


    setInterval(function () {
        $.ajax({
            url: gasurl,
            type: 'GET',
            success: handleSuccess,
            error: handleError
        });
    }, 3000);
    $.ajax({
        url: gasurl,
        type: 'GET',
        success: handleSuccess,
        error: handleError
    });
});
