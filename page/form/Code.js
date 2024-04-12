$(document).ready(function() {
    var gasurl = 'https://script.google.com/macros/s/AKfycbzp2znlmbFRUJj3V19-XDklo046e9Rx1GdyeYi-QXh1ADFXUBKsVGhuy75oj5-drC5L4g/exec';
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
            var username = comments[i].username ? escapeHtml(comments[i].username) : '';
            var comment = comments[i].comment ? escapeHtml(comments[i].comment) : '';
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                $('#comments').append('<p data-id="' + comments[i].id + '"><strong>' + username + ':</strong> コメントが取得できません (' + comments[i].date + ')</p>');
            } else {
                $('#comments').append('<p data-id="' + comments[i].id + '"><strong>' + username + ':</strong> ' + comment + ' (' + year + '/' + month + '/' + day + ')</p>');
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
                console.log('成功:', response);
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
    
        // ユーザー名が入力されている場合に新しいIDを生成
        if ($('#username').val()) {
            $('#id').val(Math.random().toString(36).substr(2, 9));
        }
    
        lastSubmitTime = now;
        lastComment = comment;
        handleFormSubmit(event); 
    });
    

    $('#comments').on('dblclick', 'p', function() {
        var id = $(this).data('id');
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
    });

    setInterval(function() {
        $.ajax({
            url: gasurl,
            type: 'GET',
            success: handleSuccess,
            error: handleError
        });
    }, 2000); // 3000ミリ秒 = 3秒

    $.ajax({
        url: gasurl,
        type: 'GET',
        success: handleSuccess,
        error: handleError
    });
});

