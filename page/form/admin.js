// 管理者パスワード
var adminPassword = 'test'; // このパスワードは適切に保護してください

// 管理者モードの状態
var isAdmin = false;

// 管理者モードの切り替え
function toggleAdmin() {
    var password = prompt('管理者パスワードを入力してください');
    if (password === adminPassword) {
        isAdmin = !isAdmin;
        document.getElementById('adminStatus').textContent = isAdmin ? '管理者モード' : '通常モード';
        var deleteButtons = document.getElementsByClassName('deleteButton');
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].style.display = isAdmin ? 'inline' : 'none';
        }
    } else {
        alert('パスワードが間違っています');
    }
}

// コメント削除
function deleteComment(id) {
    if (!isAdmin) {
        return;
    }

    // Realtime Databaseからコメントを削除
    db.ref('comments/' + id).remove().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// 全てのコメントを削除
function deleteAllcomments() {
    if (!isAdmin) {
        return;
    }

    // Realtime Databaseから全てのコメントを削除
    db.ref('comments').remove().then(() => {
        console.log("All documents successfully deleted!");
    }).catch((error) => {
        console.error("Error removing documents: ", error);
    });
}
