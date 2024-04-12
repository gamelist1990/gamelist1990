$(document).ready(function() {
    var gasurl = 'https://script.google.com/macros/s/AKfycbzy3LH14p6WYNhT8OXmWCW3ozZ1MMm4vUVbQOfYG1R7OqU6B_xxU9QKwWuSaCjfFoBXBw/exec';
    var lastSubmitTime = Date.now();
    var lastComment = '';
    var load = '2024/4/12';

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
            var username = comments[i].username ? escapeHtml(comments[i].username) : '';
            var comment = comments[i].comment ? escapeHtml(comments[i].comment) : '';
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                $('#comments').append('<p data-id="' + comments[i].id + '" class="comment ' + (i % 2 == 0 ? 'even' : 'odd') + '"><strong>' + username + ':</strong> コメントがありません (' + comments[i].date + ')</p>');
            } else {
                $('#comments').append('<p data-id="' + comments[i].id + '" class="comment ' + (i % 2 == 0 ? 'even' : 'odd') + '"><strong>' + username + ':</strong> ' + comment + ' (' + year + '/' + month + '/' + day + ')</p>');
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
            success: function(response) {
                console.log('アップロードは成功しました,サーバーの応答： ', response);
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
    $('#comment-form').on('submit', function(event) {
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
    
        // ユーザー名が入力されていない場合、ユーザー名を「匿名#」とランダムな番号に設定
        var username = $('#username').val();
        if (!username) {
            $('#username').val('匿名 | ID:' + Math.random().toString(36).substr(2, 9));
        }
    
        // 入力されている場合に新しいIDを生成
        if ($('#comment').val()) {
            $('#id').val(Math.random().toString(36).substr(2, 9));
            $.getJSON('https://api.ipify.org?format=json', function(data) {
                $('#ip').val(data.ip);
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
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    $('#comments').on('dblclick', 'p', function() {
        var id = $(this).data('id');
        var password = getCookie('password');
        if (!password) {
            password = prompt('パスワードを入力してください');
            setCookie('password', password, 7); 
        }
        if (password === load) { 
            var confirmation = confirm('本当にこのコメントを削除しますか？');
            if (confirmation) {
                $.ajax({
                    url: gasurl, 
                    type: 'POST',
                    data: {
                        'action': 'delete',
                        'id': id
                    },
                    success: function(response) {
                        console.log('削除成功:', response);
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
        } else {
            alert('パスワードが間違っています');
        }
    });
    

    setInterval(function() {
        $.ajax({
            url: gasurl,
            type: 'GET',
            success: handleSuccess,
            error: handleError
        });
    }, 1000); 
    $.ajax({
        url: gasurl,
        type: 'GET',
        success: handleSuccess,
        error: handleError
    });
});

