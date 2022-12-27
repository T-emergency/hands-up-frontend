// let goodsId = url.searchParams.get('goods');


// select_chat_roome()
roomListApi()

function roomListApi() {
    $.ajax({
        type: "GET",
        // url: `${hostUrl}/chat/list/`,
        url: `${hostUrl}/chat/`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            roomList(response)
        }
    })
}

function roomList(response) {
    for (let i = 0; i < response.length; i++) {
        let buyer = response[i]['buyer']['username']
        let seller = response[i]['seller']['username']
        let opposition_name = payload['username'] == buyer ? seller : buyer
        let goods_id = response[i]["id"]
        let created_at = response[i]["created_at"]
        let title = response[i]['title']
        let wait_cnt = response[i]['wait_cnt']
        let message = response[i]['last_message'].message
        let message_at = response[i]['last_message'].created_at
        let auction_image = response[i]['image'] ? response[i]['image'] : '/media/default.jpeg'
        let buyer_profile_img = response[i]['buyer']['profile_image']
        let seller_profile_img = response[i]['seller']['profile_image']
        let opposition_profile_img = payload['username'] == buyer ? seller_profile_img : buyer_profile_img
        let waitPoint
        if (wait_cnt !== 0) {
            waitPoint = `
                <span
                    style="text-align: center; background-color: #ff0000; width: 20px; height: 20px; border-radius: 50px; position: absolute; right: 20px; top: 8px; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-family: inherit; position: absolute; right: 5px; top: 5px;"
                    id="wait-msg-${goods_id}">
                    ${wait_cnt}
                </span>
            `
        } else {
            waitPoint = ``
        }
        let temp_html = `
            <div class="chat-list" id="chat-list-${goods_id}" onclick="socketSwap(${goods_id})">
                <div class=" col-9 p-0" style="background-color: #FFFFFF; border-radius: 10px 0 0 10px; cursor : pointer;"" >
                    <div class="row m-0 p-0" >
                        <div class="col-sm-3 p-2">
                            <img class="" src="${hostUrl}${opposition_profile_img}" id="image2"
                                style="width:30px; border-radius:500px;">
                        </div>
                        <span class="col-sm-9 p-1" style="font-size: 20px; font-weight: bold;">
                            ${opposition_name}
                            <span style="font-size: 5px;">(<time class="timeago" datetime="${message_at}"></time>)</span>
                        </span>
                    </div>
                    <div class="p-2">
                        <div id="chat-list-title-${goods_id}" class=""
                            style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                            ${message}
                        </div>
                    </div>
                </div>
                <div class="col-3 m-0 p-0" style="border-radius: 10px 0 0 10px;">
                    <img src="${hostUrl}${auction_image}" alt="" style="border-radius: 0 10px 10px 0;width: 100%; height: 100%; object-fit: cover;">
                    <div id="wait-point-${goods_id}">
                        ${waitPoint}                    
                    </div>
                </div>
            </div>
        `
        $("#chat-list").append(temp_html)
        $('#review-info').text('채팅방을 선택해 주세요!')
    }
    $("time.timeago").timeago();
}



function get_chat_log(goods_id) {
    $.ajax({
        type: 'GET',
        url: `${hostUrl}/chat/goods/${goods_id}/`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {

            for (let i = 0; i < response.length; i++) {
                let message = response[i]['content'];
                let sender = response[i]['author']['username'];
                let profile_image = response[i]['author']['profile_image'];

                let temp_html
                if (sender == payload["username"]) {
                    temp_html = `
                    <div class="chat_message_wrap" style="align-items: flex-end;">
                        <div class="chat_message" style="float: right; bottom: 0px;" >
                        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                        </div>
                    </div>
                    `
                } else {
                    temp_html = `
                    <div class="chat_message_wrap" style="align-items: flex-start;">
                        <div style="display: flex; flex-direction: row;">    
                            <img src="${hostUrl}${profile_image}" style="width:30px; height:30;">
                            <span style="margin-left: 5px; font-weight: bolder;">${sender}</span>
                        </div>
                        <div class="chat_message" style="background-color: rgb(183, 183, 183);">
                        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                        </div>
                    </div>
                    `
                }

                $('#chatLog').append(temp_html)
                // document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
                const top = $('#chatLog').prop('scrollHeight');
                $('#chatLog').scrollTop(top);
                $(`#wait-msg-${goods_id}`).remove();
            }
            // let other_user = response["data"].find(e => e.author.username != payload["username"])
            // send_checkMessage(goodsId, other_user["author"]["id"])
            // wait_chat_message(goodsId)
        }
    });
}

function review(goodsId) {

    $.ajax({
        type: 'GET',
        url: `${hostUrl}/goods/${goodsId}`,
        data: {},
        success: function (response) {
            // console.log("review get: ", response)
            let user_id = payload['user_id']
            let seller_id = response['seller']['id']
            if (user_id == seller_id) {
                window.location.href = `/review/seller.html?goods_id=${goodsId}`
            } else {
                window.location.href = `/review/buyer.html?goods_id=${goodsId}`
            }
        },
    });

}

let chatSocket
let nowPage = 1
function socketSwap(goods_id) {

    if (chatSocket) {
        chatSocket.close()
        $('#chatLog').empty()
        nowPage = 1
    }

    if (goods_id != null) {
        // if (goods_id != null) {
        chatSocket = new WebSocket(
            'ws://' + backUrl +
            '/ws/chat/' + goods_id + '/?token=' + token);

        // console.log(chatSocket)

        chatSocket.onopen = function (e) {
            get_chat_log(goods_id)
        }


        chatSocket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            // console.log(data)
            let message = data['message'];
            let sender = data['sender_name']
            let sender_image = data['sender_image']
            if (data['response_type'] === 'goods_info') {
                image = data['image'] ? data['image'] : '/media/default.jpeg'
                $('#review-info').html(`
                    <div class="row">
                        <div class="col-8">
                            <img  src="${hostUrl}${image}" width="50px" height="50px" style="border-radius:10px"/>
                            <span><b>${data['title']}</b></span>
                        </div>
                        <button class="col-3"
                            style="color: white; border: hidden; background-color : #24210b; font-weight: bolder; border-radius : 15px; width:100px; height:30px; text-align:center; margin: 5px;"
                            onclick="review(${data['goods_id']})">후기 작성
                        </button>
                    </div>
                    
                `)
                return
            }
            let temp_html
            if (sender == payload["username"]) {
                temp_html = `
                <div class="chat_message_wrap" style="align-items: flex-end;">
                    <div class="chat_message" style="float: right; bottom: 0px;" >
                    <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                    </div>
                </div>
                `
            } else {
                temp_html = `
                <div class="chat_message_wrap" style="align-items: flex-start;">
                    <div style="display: flex; flex-direction: row;">    
                        <img src="${hostUrl}${image}" style="width:30px; height:30;">
                        <span style="margin-left: 5px; font-weight: bolder;">${sender}</span>
                    </div>
                    <div class="chat_message" style="background-color: #d6cdcd;">
                    <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                    </div>
                </div>
                `
                // send_checkMessage(data["goods_id"], data["sender"])
            }
            $('#chatLog').append(temp_html)
            // document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
            const top = $('#chatLog').prop('scrollHeight');
            $('#chatLog').scrollTop(top);
        };

        chatSocket.onclose = function (e) {
            // console.log(e)
            console.error('Chat socket closed unexpectedly');
        };


        // let chatLog = document.querySelector("#chatLog");
        let chatMessageInput = document.querySelector("#chatMessageInput");
        let chatMessageSend = document.querySelector("#chatMessageSend");

        chatMessageInput.focus();
        chatMessageInput.onkeyup = function (e) {
            if (e.keyCode === 13) {  // enter, return
                chatMessageSend.click();
            }
        };

        chatMessageSend.onclick = function (e) {
            const messageInputDom = chatMessageInput;
            const message = messageInputDom.value;
            if (message === '') {
                return
            }
            chatSocket.send(JSON.stringify({
                'user_id': payload['user_id'],
                'goods_id': `${goods_id}`,
                'message': message
            }));
            // 메세진 전송후 입력창에 빈값 넣어주기
            messageInputDom.value = '';
        };
    }

}