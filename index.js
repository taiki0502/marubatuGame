document.addEventListener('DOMContentLoaded', onloadAction);

const ID_LIST = [
    ['s1', 's2', 's3'],
    ['s4', 's5', 's6'],
    ['s7', 's8', 's9']
];

// IDを取得するための関数
function $(id) {
    return document.getElementById(id);
}

// ページの読み込みが完了したら各マス目にクリックイベントリスナーを設定する関数
function onloadAction() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            $(ID_LIST[row][col]).onclick = clickToCheck;
        }
    }
    document.getElementById('reset').onclick = resetAction;
}

// 現在のターン数を管理する変数
let turn = 1;
const CIRCLE = "⚫︎";
const CROSS = "×";

// ゲームが実行中かどうかのフラグ
let isRun = true;

// 現在のターンが○のターンかどうかを判定する関数
function isCircleTurn() {
    return turn % 2 === 1;
}

// 勝敗結果を表示する関数
function winLossResults(message) {
    isRun = false;
    document.querySelector('.resultInfo').innerHTML = message;
}

// マス目がクリックされたときの処理を行う関数
function clickToCheck(e) {
    // ゲームが実行中でなければ終了
    if (!isRun) return;

    // イベント（e）からクリックされたマス目のIDを取得
    let id = e.target.id;

    // 取得したIDから、クリックされたマス目をDOMオブジェクトとして取得
    let object = $(id);

    // すでにマークが入っている場合は、この処理を終了
    if (object.value !== "") return;

    // そのマス目（inputタグ）のvalue属性を変更する
    object.value = isCircleTurn() ? CIRCLE : CROSS;

    // 3マスが揃ったかどうか判定する
    if (completeMark()) return;

    // ターン数を1増やす
    turn++;

    // ターン表示を切り替える
    changeNowPlayer();
}

// 現在のターン表示を更新する関数
function changeNowPlayer() {
    const turnInfo = document.querySelector('.turnInfo');
    turnInfo.innerHTML = isCircleTurn() ? "⚫︎のターン" : "×のターン";
}

// ゲームをリセットする関数
function resetAction() {
    // ターン数を1にする
    turn = 1;

    // マス目のマークを全部消す
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            $(ID_LIST[row][col]).value = '';
        }
    }

    // 結果表示を消す
    document.querySelector('.resultInfo').textContent = '';

    // ゲームを実行中にする
    isRun = true;

    // ターン表示を「⚫︎のターン」にする
    changeNowPlayer();
}

// 3つのマス目が同じマークかどうか判定する関数
function isComplete(firstId, secondId, thirdId) {
    if ($(firstId).value === "" || $(secondId).value === "" || $(thirdId).value === "") return false;
    return $(firstId).value === $(secondId).value && $(secondId).value === $(thirdId).value;
}

// どこかに揃っている列があるか調べる関数
function completeMark() {
    let isEnd = false;

    // 横一列
    for (let row = 0; row < 3; row++) {
        isEnd = isComplete(ID_LIST[row][0], ID_LIST[row][1], ID_LIST[row][2]);
        if (isEnd) {
            winLossResults(`${$(ID_LIST[row][0]).value} のかち`);
            return true;
        }
    }

    // 縦一列
    for (let col = 0; col < 3; col++) {
        isEnd = isComplete(ID_LIST[0][col], ID_LIST[1][col], ID_LIST[2][col]);
        if (isEnd) {
            winLossResults(`${$(ID_LIST[0][col]).value} のかち`);
            return true;
        }
    }

    // 斜め（左下り）
    isEnd = isComplete(ID_LIST[0][2], ID_LIST[1][1], ID_LIST[2][0]);
    if (isEnd) {
        winLossResults(`${$(ID_LIST[0][2]).value} のかち`);
        return true;
    }

    // 斜め（右下り）
    isEnd = isComplete(ID_LIST[0][0], ID_LIST[1][1], ID_LIST[2][2]);
    if (isEnd) {
        winLossResults(`${$(ID_LIST[0][0]).value} のかち`);
        return true;
    }

    return false;
}
