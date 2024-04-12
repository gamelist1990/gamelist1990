$(document).ready(function() {
    function handleSuccess(response) {
        var comments = JSON.parse(response);
        $('#comments').empty(); // Clear the comments before appending new ones.
        for (var i = 0; i < comments.length; i++) {
            var date = new Date(comments[i].date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                $('#comments').append('<p><strong>' + comments[i].username + ':</strong> コメントが取得できません (' + comments[i].date + ')</p>');
            } else {
                $('#comments').append('<p><strong>' + comments[i].username + ':</strong> ' + comments[i].comment + ' (' + year + '/' + month + '/' + day + ')</p>');
            }
        }
    }


    function handleError(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
    }

    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser.
        var formData = $(this).serialize(); // Prepare the form data for submission.
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbzp2znlmbFRUJj3V19-XDklo046e9Rx1GdyeYi-QXh1ADFXUBKsVGhuy75oj5-drC5L4g/exec', // Replace with your GAS web app URL.
            type: 'POST',
            data: formData,
            success: function(response) {
                console.log('成功:', response);
                // After a successful form submission, reload the comments.
                $.ajax({
                    url: 'https://script.google.com/macros/s/AKfycbzp2znlmbFRUJj3V19-XDklo046e9Rx1GdyeYi-QXh1ADFXUBKsVGhuy75oj5-drC5L4g/exec', // Replace with your GAS web app URL.
                    type: 'GET',
                    success: handleSuccess,
                    error: handleError
                });
            },
            error: handleError
        });
    }

    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbzp2znlmbFRUJj3V19-XDklo046e9Rx1GdyeYi-QXh1ADFXUBKsVGhuy75oj5-drC5L4g/exec', // Replace with your GAS web app URL.
        type: 'GET',
        success: handleSuccess,
        error: handleError
    });

    // Handle form submission.
    $('#comment-form').on('submit', handleFormSubmit);
});
