// スパム対策（同じコメントが短時間で複数回投稿されるのを防ぐ）
var lastComment = null;
var lastCommentTime = null;

function isSpam(comment) {
    var now = Date.now();
    return lastComment === comment && lastCommentTime && now - lastCommentTime < 10000; // 10秒以内に同じコメントが投稿された場合
}

// コメント送信
function submitComment(name, comment) {
    name = name || '匿名' + Math.floor(1000 + Math.random() * 9000);

    // コメントが空でないことを確認
    if (!comment.trim()) {
        alert('コメント内容を入力してください');
        return;
    }

    // スパム対策
    if (isSpam(comment)) {
        alert('スパム対策のため、同じコメントは10秒以上間隔をあけて投稿してください');
        return;
    }

    lastComment = comment;
    lastCommentTime = Date.now();

    // 'comments'ノードに新しい子ノードを追加
    var newCommentRef = db.ref('comments').push();
    newCommentRef.set({
        name: name,
        comment: comment,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

// コメント取得
function getComments(callback) {
    // 'comments'ノードの値が変更されたときに呼び出されるリスナーを追加
    db.ref('comments').orderByChild('timestamp').on('value', function(snapshot) {
        var comments = [];
        snapshot.forEach(function(childSnapshot) {
            comments.push(childSnapshot.val());
        });
        callback(comments);
    });
}
