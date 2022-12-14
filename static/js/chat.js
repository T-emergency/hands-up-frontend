const goodsId = url.searchParams.get('goods');
const backUrl = '127.0.0.1:8000';
const token = localStorage.getItem('access');

console.log(payload["username"])
console.log("start_chat", "user_id: ", payload["user_id"]);

console.log(goodsId)
select_chat_roome()

if (goodsId != null) {
    const chatSocket = new WebSocket(
        'ws://' + backUrl +
        '/chat/' + goodsId + '/?token=' + token);

    console.log(chatSocket)

    chatSocket.onopen = function (e) {
        get_chat_log()
        // get_chat_other_user()
        // select_chat_roome()
    }


    chatSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let message = data['message'];
        let sender = data['sender_name']
        let sender_image = data['sender_image']
        console.log("onmessage: ", sender_image)
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
                    <img src="http://127.0.0.1:8000/media/default.jpeg" style="width:30px; height:30;">
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
    };

    chatSocket.onclose = function (e) {
        console.log(e)
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

        chatSocket.send(JSON.stringify({
            'user_id': payload['user_id'],
            'goods_id': `${goodsId}`,
            'message': message
        }));
        // 메세진 전송후 입력창에 빈값 넣어주기
        messageInputDom.value = '';
    };
}



function get_chat_log() {
    $.ajax({
        type: 'GET',
        url: `${hostUrl}/chat/${goodsId}/?token=${token}`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            // console.log(response)
            if (response['message'] != '입장') {
                return false
            }

            for (let i = 0; i < response['data'].length; i++) {
                let message = response['data'][i]['content'];
                let sender = response['data'][i]['author']['username'];
                let profile_image = response['data'][i]['author']['profile_image'];
                console.log(profile_image)
                // console.log(message, sender)
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
            }
        }
    });
}

function select_chat_roome() {
    $.ajax({
        type: "GET",
        url: `${hostUrl}/chat/list/?token=${token}`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            console.log(response)
            let chat_list = response["room_list"]
            for (let i = 0; i < chat_list.length; i++) {
                let buyer = chat_list[i]['buyer']['username']
                let seller = chat_list[i]['seller']['username']
                let goods_id = chat_list[i]["id"]
                console.log(goods_id)
                if (payload['username'] == buyer) {
                    let temp_html = `
                        <div style="background-color: white">
                        <a href="javascript:getChatRoom(${goods_id})">판매자: ${seller}</a>
                        </div>
                    `
                    $("#chat-list").append(temp_html)
                } else if (payload['username'] == seller) {
                    let temp_html = `
                        <div style="background-color: green">
                        <a href="javascript:getChatRoom(${goods_id})">구매자: ${buyer}</a>
                        </div>
                    `
                    $("#chat-list").append(temp_html)
                }


            }


        },
    });
}

function getChatRoom(goods_id) {
    window.location.href = `index.html?goods=${goods_id}`
    return
}

function review() {
    let user_id = localStorage.getItem('user_id')
    let seller_id = localStorage.getItem('seller_id')
    console.log("여기")
    window.location.href = `http://127.0.0.1:5501/review/seller.html`

    // if(user_id==seller_id){
    //     window.location.href ='http://127.0.0.1:5501/review/seller.html'
    // }else{
    //     window.location.href ='http://127.0.0.1:5501/review/buyer.html'
    // }
}


// function get_chat_other_user() {
//     $.ajax({
//         type: 'GET',
//         url: `${hostUrl}/goods/${goodsId}/?token=${token}`,
//         data: {},
//         headers: {
//             "Authorization": "Bearer " + token,
//         },
//         success: function (response) {
//             console.log(response)
//             let seller = response["seller"]["username"]
//             let buyer = response["buyer"]["username"]
//             if (payload["username"] == buyer) {
//                 $('#chat-other-user').text(`${seller} 님과의 대화`)
//                 temp_html = `
//                     <button class="btn btn-success" id="review" onclick="location.href='/review/seller.html'"
//                     style="background-color: rgb(65, 166, 209); border-radius: 15px;">거래후기 작성</button>
//                 `
//             } else if (payload["username"] == seller) {
//                 $('#chat-other-user').text(`${buyer} 님과의 대화`)
//                 temp_html = `

//                     <button class="btn btn-success" id="review" onclick="location.href='/review/buyer.html'"
//                     style="background-color: rgb(65, 166, 209); border-radius: 15px;">거래후기 작성</button>
//                 `
//             }
//             $('#review-btn').html(temp_html)
//         }
//     });
// }