angular.module('LINE_console').controller('TextMessageController', function ($scope, $q, MessageService, FileService) {
    var frameCounter = 0;    // 訊息欄計數器
    var imageFiles = [];    // 儲存圖片訊息的圖檔
    var headerFrame = $('.headerFrame').clone(true);    // 訊息欄外層的 <div> 區塊
    /* 訊息欄的樣板 */
    var messageFrames = {
        textMessageFrame: $('#textMessageFrame').clone(true),
        imageMessageFrame: $('#imageMessageFrame').clone(true),
        stickerMessageFrame: $('#stickerMessageFrame').clone(true)
    };

    $(".stickerDialog").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        width: 'auto'
    });

    selectStickerEvent();

    /* 新增一個文字訊息的訊息欄 */
    $scope.addTextMessageFrame = function () {
        if (frameCounter < 5) {
            var headerTemplate = headerFrame.clone(true);
            var template = messageFrames.textMessageFrame.clone(true);

            headerTemplate.attr('id', 'message' + frameCounter);

            template.find('.panel-title').text('訊息 ' + (frameCounter + 1) + ' - 文字');
            template.find('#deleteFrameBtn').click(deleteFrameEvent);

            template.appendTo(headerTemplate);
            headerTemplate.appendTo($('.messageFrames'));

            frameCounter++;
        } else {
            alert('一次最多只能發送5則訊息');
        }
    }

    /* 新增一個圖片訊息的訊息欄 */
    $scope.addImageMessageFrame = function () {
        if (frameCounter < 5) {
            var headerTemplate = headerFrame.clone(true);
            var template = messageFrames.imageMessageFrame.clone(true);

            headerTemplate.attr('id', 'message' + frameCounter);

            template.find('.panel-title').text('訊息 ' + (frameCounter + 1) + ' - 圖片');
            template.find('#deleteFrameBtn').click(deleteFrameEvent);

            template.appendTo(headerTemplate);
            headerTemplate.appendTo($('.messageFrames'));

            chooseImageEvent('message' + frameCounter);

            frameCounter++;
        } else {
            alert('一次最多只能發送5則訊息');
        }
    }

    /* 新增一個貼圖訊息的訊息欄 */
    $scope.addStickerMessageFrame = function () {
        if (frameCounter < 5) {
            $(".stickerDialog").dialog('open');
        } else {
            alert('一次最多只能發送5則訊息');
        }
    }

    /* 送出訊息 */
    $scope.send = function () {
        var messages = new Array(frameCounter);

        imageFiles.sort(compare);

        for (let index = 0; index < frameCounter; index++) {
            switch ($('#message' + index).find('.panel').attr('id')) {
                case 'textMessageFrame':
                    var message = { type: 'text', content: $('#message' + index).find('#textContent').val() };

                    messages[index] = message;
                    break;

                case 'imageMessageFrame':
                    var imageFile = imageFiles[getFileObjectIndex('message' + index)];

                    if (imageFile) {
                        var message = { type: 'image', content: imageFile['message' + index] };

                        messages[index] = message;
                    } else {
                        // alert('未選擇圖片');
                    }
                    break;

                case 'stickerMessageFrame':
                    var message = { type: 'sticker', content: $('#message' + index).find('.selectedSticker').attr('id') };

                    messages[index] = message;

                    break;
            }
        }

        async.eachOfSeries(messages, function (value, key, callback) {
            switch (value.type) {
                case 'text':
                    var message = { type: 'text', content: value.content };

                    messages[key] = message;

                    callback()
                    break;

                case 'image':
                    FileService.uploadImage(value.content, (data) => {
                        if (data.status) {
                            var message = { type: 'image', content: data.result };

                            messages[key] = message;

                            callback();
                        }
                    })
                    break;

                case 'sticker':
                    var message = { type: 'sticker', content: value.content };

                    messages[key] = message;

                    callback()
                    break;
            }
        }, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(messages);

                var messageObject = { target: $('#target').val(), messages: messages };

                MessageService.multicastMessages(messageObject);
            }
        });
    };

    /* 刪除訊息欄 */
    function deleteFrameEvent() {
        var messageId = $(this).closest('.headerFrame').attr('id');    // 訊息欄的 id
        var messageIndex = parseInt(messageId.split("message")[1]);    // 訊息欄的損索引數字

        if (isImageMessageFrame(messageId))
            removeObject(messageId);   // 將此訊息欄的圖片檔案從 imageFiles 中移除

        $(this).closest('.headerFrame').remove();    // 移除所選擇的訊息欄

        /* 將所有訊息欄的 id 、標題重新做設定，以符合順序 */
        for (var index = messageIndex + 1; index < frameCounter; index++) {
            var title = $('#message' + index + ' .panel-title').text();    // 抓取訊息欄的標題
            var messageTypeText = title.split(' ')[3];    // 切出標題的訊息類型

            if (isImageMessageFrame("message" + index))
                $("#message" + index + " .uploadImage").off('change');    // 先註銷掉選擇檔案的事件

            $('#message' + index + ' .panel-title').text('訊息 ' + index + ' - ' + messageTypeText);
            $('#message' + index).attr('id', 'message' + (index - 1));

            if (isImageMessageFrame('message' + (index - 1)))
                chooseImageEvent('message' + (index - 1));

            if (getFileObjectIndex('message' + (index)) >= 0)
                renameKey(imageFiles[getFileObjectIndex('message' + (index))], 'message' + (index), 'message' + (index - 1));    // 重新設定 imageFiles 裡面物件的 key 值
        }

        frameCounter--;    // 減少一個訊息欄的數量
    }

    /* 上傳圖片檔案的事件函式 */
    function chooseImageEvent(messageId) {
        $("#" + messageId + " .uploadImage").on("change", function (e) {
            var input = e.currentTarget;

            if (input.files && input.files[0]) {
                var fileObject = {};
                fileObject[messageId] = input.files[0];

                if (isExisted(messageId)) {
                    imageFiles[getFileObjectIndex(messageId)][messageId] = input.files[0];
                } else {
                    imageFiles.push(fileObject);
                }
            }
        });
    }

    /* 取得目標檔案在 imageFiles 裡面的位置 */
    function getFileObjectIndex(target) {
        for (var index = 0; index < imageFiles.length; index++) {
            if (typeof imageFiles[index][target] !== 'undefined')
                return index;
        }
        return -1;
    }

    /* 從 imageFiles 中移除目標物件 */
    function removeObject(target) {
        var index = getFileObjectIndex(target);

        if (index >= 0) {
            imageFiles.splice(index, 1);

            return true;
        } else {
            return false
        }
    }

    /* 判斷目標物件是否已存在於 imageFiles 中 */
    function isExisted(target) {
        var index = getFileObjectIndex(target);

        if (index >= 0)
            return true;

        return false;
    }

    /* 重新命名物件的 key 值 */
    function renameKey(object, oldKey, newKey) {
        if (typeof object === 'undefined')
            return false;

        if (!object.hasOwnProperty(oldKey)) {
            return false;
        }

        object[newKey] = object[oldKey];
        delete object[oldKey];
        return true;
    }

    /* 判斷是否為圖片訊息欄 */
    function isImageMessageFrame(target) {
        if ($('#' + target + ' .panel').attr('id') === 'imageMessageFrame')
            return true;

        return false;
    }

    function selectStickerEvent() {
        $('.sticker').click(function () {
            var headerTemplate = headerFrame.clone(true);
            var template = messageFrames.stickerMessageFrame.clone(true);

            headerTemplate.attr('id', 'message' + frameCounter);

            template.find('.panel-title').text('訊息 ' + (frameCounter + 1) + ' - 貼圖'); 3
            template.find('.selectedSticker').attr({ 'src': '/images/stickers/' + $(this).attr('id') + '.png', 'id': $(this).attr('id') });
            template.find('#deleteFrameBtn').click(deleteFrameEvent);

            template.appendTo(headerTemplate);
            headerTemplate.appendTo($('.messageFrames'));

            $(".stickerDialog").dialog('close');

            frameCounter++;
        });
    }

    /* 比較規則函數 */
    function compare(a, b) {
        var index_a = Object.keys(a)[0].split('message')[1];
        var index_b = Object.keys(b)[0].split('message')[1];

        if (index_a > index_b)
            return 1;
        else if (index_a > index_b)
            return -1;

        return 0;
    }
});