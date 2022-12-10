// url :  .html/?goods=123

// localStorage 
// h = loaS.get(handsup)

// goods_id = 쿼리파라미터['goods_id']
// h[`goods_${goods_id}`]
// hands {
//     goods_123 : {
//         goods_id : 55,
//         변하는 데이터2 : 5,
//         변하는 데이터2 : 5,
//         변하는 데이터2 : 5,
//         변하는 데이터2 : 5,
//     },
//     goods_133 : {
//         변하는 데이터 : 12,
//         변하는 데이터2 : 33,
//     },
//     goods_135 : {
//         변하는 데이터 : 12,
//         변하는 데이터2 : 33,
//     },
//     goods_35 : {
//         변하는 데이터 : 12,
//         변하는 데이터2 : 33,
//     }
// }

var highPrice = HANDSUP['high_price']; // 최고가가 아직 없다면 ? 지정한 최저가가 될 것 => 삼항문자 
var goodsId = HANDSUP['goods_id'];
var backUrl = '127.0.0.1:8000'
var backEndUrl = 'http://127.0.0.1:8000'
var token = localStorage.getItem('access')



async function goodsInfoView() {
    let data = await goodsInfoApi()
    let seller = data['seller']
    let images = data['goodsimage_set']
    let nowPrice = highPrice === 0 ? data['start_price'] : highPrice
    let ratingScore = data['seller']['rating_score']
    let ratingColor = [['#686868', 'black'], ['#a0cfff', 'blue'], ['#ffe452', '#ff9623'], ['#ff6d92', '#e981ff']][parseInt(ratingScore / 25)]
    console.log(data)
    console.log(nowPrice, ratingScore, ratingColor)

    // 사진 섹션
    var temp = ``
    for (var i = 0; i < data['images'].length; i++) {
        temp += `
        <div class="swiper-slide">
            <img style="box-shadow: 0 2px 5px 0px; border-radius:10px" src="${backEndUrl}${data['images'][i]['image']}" alt="상품이미지"/>
        </div>
    `
    }
    document.getElementById('swiper-wrapper').innerHTML = temp

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        // direction: 'vertical',
        // loop: true,

        // If we need pagination
        pagination: {
            // el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
    // 사용자 정보 섹션
    var temp = `
        <div class = "p-3 card mb-3" style= "background-color : #2c2c2c; border-radius : 10px; color : white;">
            <div class = "row" onclick="console.log('프로필로이동하장')">
                <div class = "col-2">
                    <img style="border-radius:50%;" src="${seller['profile_image']}" alt="img">
                </div>
                <div class = "col-4">
                    <b>${seller["username"]}</b>
                </div>
                <div class = "col-6 text-end">
                    <div class="progress" max=100 style="--w:${ratingScore}%; --c1:${ratingColor[0]};--c2:${ratingColor[1]};"></div>
                    <span class='text-secondary small'>매너점수</span> ${seller["rating_score"]}
                    
                </div>
            </div>
        </div>
    `
    document.getElementById('seller-info-wrap').innerHTML = temp
    // 판매자 예상 가치 섹션
    var temp = `
        <div class = "p-3 card mb-3" style="background-color : #2c2c2c; color:white; border-radius:10px;">
            <div class ="row">
                <span class="col-6" style="font-weight : 600;">
                    판매자 예상 가치 :                        
                </span>
                <span class="text-end col-6" style="font-weight : 700">
                    ${data['predict_price']} 원 
                </span>
            </div>
        </div>
    `
    document.getElementById('predict-price-wrap').innerHTML = temp

    // 물건 정보 섹션
    var time = data["created_at"].slice(undefined, -7)
    var temp = `
        <div class = "p-3 card mb-3" style="background-color : #2c2c2c; color:white; border-radius:10px;">
            <h3 style="color:white; font-weight:600;">${data['title']}</h3>
                            
            <div class="small">카테고리 : ${data['category']}, <span style="font-size:14px"><time class="timeago" datetime="${time}"></time></span></div>
            <div class="card-body" style="font-weight:600">${data['content']}</div>
        </div>
    `
    document.getElementById('goods-info-wrap').innerHTML = temp
    $("time.timeago").timeago();

    await goodsStatusView(data)


}


async function goodsInfoApi() {
    const response = await fetch(`${backEndUrl}/goods/${goodsId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    response_json = await response.json()
    if (response.status == 200) {
        HANDSUP['high_price'] = response_json['high_price'] === 0 ? response_json['start_price'] : response_json['high_price']
        HANDSUP['seller_id'] = response_json['seller']['id']
        HANDSUP['buyer_id'] = response_json['buyer']?.id
        localStorage.setItem('handsup', JSON.stringify(HANDSUP))
        return response_json
    }
    else if (response.status == 400) {
        console.log(response_json)
    }
}

async function goodsStatusView(data) {
    // 타이머 만드는 로직 - 시작시간 시:분과 시작날짜 yyyy-mm-dd를 이용하여 Date를 만듦
    // 20분 - (현재 시각 - 시작 시각)
    let status = data['status']
    let startDate = data['start_date']
    let startTime = `${data['start_time']}:00`
    let time2 = parseInt((DATE.getTime() - new Date(`${startDate} ${startTime}`).getTime()) / 1000)
    let totalSecond = 20 * 60 - time2
    if (status === true) {
        await startTimer(totalSecond)

        if (data['buyer'] !== null) {
            let buyer = data['buyer']
            //사진으로 해야하는지 의문
            document.getElementById('high-price').innerHTML = `
            <div class="p-3 text-center mb-3">
                <div class="mb-3 card p-2" style="box-shadow: 0 2px 5px 0px;">
                    <div>
                        <i class="fas fa-won-sign" style="color:green;"></i>
                        현재 최고가
                    </div>
                    <div style = "font-wetight : 600">
                        <b style = "font-size:22px">${data['high_price']}</b> <span class = "text-secondary">원</span>
                    </div>
                </div>
                <div class = "card p-2 mb-3" style="box-shadow: 0 2px 5px 0px;">
                    <div><i class="fas fa-crown" style="color:salmon;"></i> 현재 오너<div>
                    <div class="" style="font-size:25px; font-weight : 700;" onclick="console.log('프로필로 가장')">
                        ${buyer['username']}
                    </div>
                </div>
            </div>
            `
        } else {
            document.getElementById('high-price').innerHTML = `
            <div class="p-3 text-center card mb-3" style="box-shadow: 0 2px 5px 0px;">
                <div style="font-weight : 500">과연 첫 번째 오너는?</div>
                <span style="font-weight:600;">시작가 <span style="font-size:24px; font-weight : 700;">${data['start_price']}</span> 원</span>
            </div>
            `
        }
    } else if (status === false) { // 가림막 보이게 하고 낙찰자이름 가격 보이게 하기?
        var buyer = data['buyer'] === null ? '낙찰자가 없습니다.' : data['buyer']['username']
        $('#auction-wrap').empty()
        var temp = `
        <div id="auction-before-message" class = "text-center">
            <div style="font-size: 20px;" font-weight: 600;>낙찰 받은 주인공!</div>
            <div style="font-size : 25px; font-weight:600;">${buyer}</div>
            <div  style='padding:15px 44% 0; font-size: 25px; font-weight : 500;'>경매가 종료 되었습니다.</div>
        </div>
        `
        $('#auction-wrap').html(temp)
        $('#chat-message-input').attr('disabled', true)
        $('#chat-message-input').attr('placeholder', '경매가 종료되어 채팅이 불가능합니다.')
        $('#chat-message-submit').attr('disabled', true)

    } else { // 시작 전 타이머는 20분 세팅하고 가림막 보이게 하기 아직 시작 전이라 알리기
        $('#auction-wrap').empty()
        var temp = `
        <div id="auction-before-message" class = "text-center">
            <div style="font-size: 20px;" font-weight: 600;>경매 시작 시간</div>
            <div style="font-size : 25px; font-weight:600;">${data['start_date']} ${data['start_time']}:00</div>
            <div  style='padding:15px 44% 0; color:white; font-size: 25px; font-weight : 500;'>오너 될 준비, 되셨나요 ??</div>
        </div>
        
        `
        $('#auction-wrap').html(temp)
    }
}

async function startTimer(time) {
    console.log('dd')
    let totalSecond = time

    let x = setInterval(function () {
        let min = parseInt(totalSecond / 60)
        let sec = totalSecond % 60
        let perTime = totalSecond / (60 * 20) * 100
        let percolor = perTime <= 10 ? 'red' : ['yellow', 'blue', 'purple'][parseInt(perTime / 40)]
        console.log(percolor)
        document.getElementById('center-timer').innerHTML = min + "분" + sec + "초";
        $('.pie-timer').css({
            "background": "conic-gradient(" + percolor + " 0% " + perTime + "%, #ffffff " + perTime + "% 100%)"
        });
        totalSecond--;

        if (totalSecond < 0) {
            clearInterval(x);
            document.getElementById('center-timer').innerHTML = '<i class="fas fa-gavel" style="color:red;"></i> 경매 종료';
        }
    }, 1000);
}

goodsInfoView()

let chatSocket = new WebSocket(
    `ws://${backUrl}/auction/${goodsId}/?token=${localStorage.getItem(['access'])}`
);

chatSocket.onopen = (e) => {
    console.log('connect')
}

chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var responseType = data['response_type'];
    console.log(responseType)
    var element = document.getElementById('chat-wrap');
    var isEnd = element.scrollHeight <= element.scrollTop + element.clientHeight + 3;

    if (responseType === 'alert') {
        alert(data['message'])
        return
    }

    if (responseType === 'bid') {
        var highPrice = data['high_price']
        HANDSUP['high_price'] = highPrice
        HANDSUP['buyer_id'] = data['sender']

        localStorage.setItem('handsup', JSON.stringify(HANDSUP));


        var temp = `
            <div class="p-3 text-center mb-3">
                <div class="mb-3 card p-2">
                    <div>
                        <i class="fas fa-won-sign" style="color:green;"></i>
                        현재 최고가
                    </div>
                    <div style = "font-wetight : 600">
                        <b style = "font-size:22px">${data['high_price']}</b> <span class = "text-secondary">원</span>
                    </div>
                </div>
                <div class = "card p-2 mb-3">
                    <div><i class="fas fa-crown" style="color:salmon;"></i> 현재 오너<div>
                    <div class="" style="font-size:25px;" onclick="console.log('프로필로 가장')">
                        ${data['sender_name']}
                    </div>
                </div>
            </div>
            `
        document.getElementById('high-price').innerHTML = temp

        var temp = `
            <div>
                <div>
                    <img width=20px; height=20px; src="/static/images/stady_bear_face.png" alt="">
                    <b style = "font-size : 20px">${data['sender_name']}</b>
                </div>
                <div style = "margin-left : 20px; width: 80%; font-size : 20px; border-radius : 8px; background-color : hotpink; padding : 5px; margin-bottom : 10px;">
                    ${data['high_price']} 원 입찰!!
                </div>
            </div>
        `
        // beforeend afterbegin beforebegin afterend
        document.querySelector('#chat').insertAdjacentHTML('beforeend', temp)

    } else if (responseType === 'message') {
        var nowOner = HANDSUP['buyer_id']
        var seller = HANDSUP['seller_id']
        if (seller === data['sender']) {
            var temp = `
            <div>
                <div>
                    <img width=20px; height=20px; src="/static/images/stady_bear_face.png" alt="">
                    <b style = "font-size : 20px">${data['sender_name']} (판매자)</b> <span style="font-color : gray; font-size:small;">${data['time']}</span>
                </div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #d7d7d7; padding : 5px; margin-bottom : 10px;">
                    ${data['message']}
                </div>
            </div>
        `
        } else if (nowOner === data['sender']) {
            var temp = `
            <div>
                <div>
                    <img width=20px; height=20px; src="/static/images/stady_bear_face.png" alt="">
                    <b style = "font-size : 20px">${data['sender_name']} </b> (현재 최고가 입찰자) <span style="font-color : gray; font-size:small;">${data['time']}</span>
                </div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #d7d7d7; padding : 5px; margin-bottom : 10px;">
                    ${data['message']}
                </div>
            </div>
        `
        } else {
            var temp = `
            <div>
                <div>
                    <img width=20px; height=20px; src="/static/images/stady_bear_face.png" alt="">
                    <b style = "font-size : 20px">${data['sender_name']}</b> <span style="font-color : gray; font-size:small;">${data['time']}</span>
                </div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #d7d7d7; padding : 5px; margin-bottom : 10px;">
                    ${data['message']}
                </div>
            </div>
        `
        }

        // beforeend afterbegin beforebegin afterend
        document.querySelector('#chat').insertAdjacentHTML('beforeend', temp)
    } else if (responseType === 'enter') {
        HANDSUP['participants_count'] = data['participants_count']
        localStorage.setItem('handsup', JSON.stringify(HANDSUP))
        var temp = `
            <div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #d7d7d7; padding : 5px; margin-bottom : 10px;">
                    ${data['sender_name']}님이 입장하였습니다.
                </div>
            </div>
        `
        document.querySelector('#chat').insertAdjacentHTML('beforeend', temp)
        document.getElementById('participants-count').innerText = '참여 인원 : ' + data['participants_count']

    } else if (responseType === 'out') {
        HANDSUP['participants_count'] = data['participants_count']
        localStorage.setItem('handsup', JSON.stringify(HANDSUP))
        document.getElementById('participants-count').innerText = '참여 인원 : ' + data['participants_count']


    }

    // 하단 스크롤 고정
    if (isEnd === true) {
        element.scrollTop = element.scrollHeight //- element.clientHeight
    }

};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        sendMessage(false)
    }
};

function sendMessage() {
    var messageInputDom = document.querySelector('#chat-message-input');
    var message = messageInputDom.value;
    var element = document.getElementById('chat-wrap');
    if (message === '') {
        return
    }
    // console.log(HANDSUP, payload)
    if (chatSocket.readyState === WebSocket.OPEN) {
        chatSocket.send(JSON.stringify({
            'is_money': false,
            'goods_id': goodsId,
            'user_id': payload['user_id'],
            'message': message
        }))
    } else {
        setTimeout(sendMessage, 500)
    }
    messageInputDom.value = '';
};

function sendMoney() {
    var messageInputDom = document.querySelector('#chat-money-input');
    var message = messageInputDom.value;
    console.log(highPrice)
    // console.log(HANDSUP, payload)
    if (chatSocket.readyState === WebSocket.OPEN) {

        money = Number(message)
        console.log(money, typeof (money))
        // money === NaN이 안먹힌다.
        if (String(money) == 'NaN') {
            return alert('숫자를 입력해 주세요.')
        } else if (highPrice >= parseInt(money)) {
            return alert('현재가 보다 낮은 가격입니다.')
        } else {
            chatSocket.send(JSON.stringify({
                'is_money': true,
                'goods_id': goodsId,
                'user_id': payload['user_id'],
                'message': money
            }))
        }
    } else {
        setTimeout(sendMessage, 500)
    }

    messageInputDom.value = '';
};