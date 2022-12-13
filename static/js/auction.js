const goodsId = url.searchParams.get('goods');
const backUrl = '127.0.0.1:8000'
const token = localStorage.getItem('access')
var goods = JSON.parse(localStorage.getItem('goods', ''))

if (!goods){
    goods = {}
}

if (Object.keys(goods).length > 9){
    goods = {}
}

async function goodsInfoView() {
    let data = await goodsInfoApi()
    let seller = data['seller']
    var hp = priceToString(data['high_price'])
    var sp = priceToString(data['start_price'])
    // let images = data['images']
    let nowPrice = !data['high_price'] ? sp : hp

    let ratingScore = data['seller']['rating_score']
    let ratingColor = [['#686868', 'black'], ['#a0cfff', 'blue'], ['#ffe452', '#ff9623'], ['#ff6d92', '#e981ff']][parseInt(ratingScore / 25)]
 
    // 사진 섹션
    var temp = ``
    for (var i = 0; i < data['images'].length; i++) {
        temp += `
        <div class="swiper-slide">
            <img style="box-shadow: 0 2px 5px 0px; border-radius:10px" src="${hostUrl}${data['images'][i]['image']}" alt="상품이미지"/>
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
        <div class = "p-3 card mb-3" style= "background-color : white; border-radius : 10px; color : black; cursor:pointer;">
            <div class = "row" onclick="window.location.href='/review/index.html?user_id=${seller['id']}'">
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
        <div class = "p-3 card mb-3" style="background-color : white; color:black; border-radius:10px;">
            <div class ="row">
                <span class="col-6" style="font-weight : 600;">
                    판매자 예상 가치 :                        
                </span>
                <span class="text-end col-6" style="font-weight : 700">
                    ${priceToString(data['predict_price'])} 원 
                </span>
            </div>
        </div>
    `
    document.getElementById('predict-price-wrap').innerHTML = temp

    // 물건 정보 섹션
    var time = data["created_at"].slice(undefined, -7)
    var temp = `
        <div class = "p-3 card mb-3" style="background-color : white; color:black; border-radius:10px;">
            <h3 style="font-weight:600;">${data['title']}</h3>
                            
            <div class="small">카테고리 : ${data['category']}, <span style="font-size:14px"><time class="timeago" datetime="${time}"></time></span></div>
            <div class="card-body" style="font-weight:600">${data['content']}</div>
        </div>
    `
    document.getElementById('goods-info-wrap').innerHTML = temp
    $("time.timeago").timeago();

    await goodsStatusView(data)


}


async function goodsInfoApi() {

    const response = await fetch(`${hostUrl}/goods/${goodsId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + token,
        }
    })
    response_json = await response.json()
    if (response.status == 200) {

        if (!goods){
            localStorage.setItem('goods', JSON.stringify({}))
            goods = JSON.parse(localStorage.getItem('goods'))
        }

        goods[goodsId] = 
            {
            "seller_id" : response_json['seller']['id'],
            "buyer_id" : response_json['buyer']?.id
        }
        localStorage.setItem('goods', JSON.stringify(goods))

        return response_json
    }
    else if (response.status == 400) {
        alert('올바르지 않은 접근')
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
        var hp = priceToString(data['high_price'])
        var sp = priceToString(data['start_price'])
        if (data['buyer'] !== null) {
            let buyer = data['buyer']
            
            console.log(data)
            //사진으로 해야하는지 의문
            document.getElementById('high-price').innerHTML = `
            <div class="p-3 text-center mb-3">
                <div class="mb-3 card p-2" style="box-shadow: 0 2px 5px 0px;">
                    <div>
                        <i class="fas fa-won-sign" style="color:green;"></i>
                        현재 최고가
                    </div>
                    <div style = "font-wetight : 600">
                        <b id="price" style = "font-size:22px">${hp}</b> <span class = "text-secondary">원</span>
                    </div>
                </div>
                <div class = "card p-2 mb-3" style="box-shadow: 0 2px 5px 0px;">
                    <div><i class="fas fa-crown" style="color:salmon;"></i> 현재 오너<div>
                    <div class="" style="font-size:25px; font-weight : 700; cursor:pointer;" onclick="window.location.href='/review/index.html?user_id=${buyer['id']}'">
                        ${buyer['username']}
                    </div>
                </div>
            </div>
            `
        } else {
            console.log(data)

            document.getElementById('high-price').innerHTML = `
            <div class="p-3 text-center card mb-3" style="box-shadow: 0 2px 5px 0px;">
                <div style="font-weight : 500">과연 첫 번째 오너는?</div>
                <span style="font-weight:600;">시작가 <span id="price" style="font-size:24px; font-weight : 700;">${sp}</span> 원</span>
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
    let totalSecond = time

    let x = setInterval(function () {
        let min = parseInt(totalSecond / 60)
        let sec = totalSecond % 60
        let perTime = totalSecond / (60 * 20) * 100
        let percolor = perTime <= 10 ? 'red' : ['yellow', 'blue', 'purple'][parseInt(perTime / 40)]
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


if (token !== null){
    var chatSocket = new WebSocket(
        `ws://${backUrl}/auction/${goodsId}/?token=${localStorage.getItem(['access'])}`
    );
}else{
    var chatSocket = new WebSocket(
        `ws://${backUrl}/auction/${goodsId}/`
    );
}


chatSocket.onopen = (e) => {
    console.log('connect')
}

chatSocket.onmessage = async function (e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var responseType = data['response_type'];
    var element = document.getElementById('chat-wrap');
    var isEnd = element.scrollHeight <= element.scrollTop + element.clientHeight + 3;

    if (responseType === 'alert') {
        alert(data['message'])
        return
    }

    if (responseType === 'bid') {
        // var highPrice = data['high_price']
        // goods[goodsId]['high_price'] = highPrice
        goods[goodsId]['buyer_id'] = data['sender']

        localStorage.setItem('goods', JSON.stringify(goods));


        var temp = `
            <div class="p-3 text-center mb-3">
                <div class="mb-3 card p-2">
                    <div>
                        <i class="fas fa-won-sign" style="color:green;"></i>
                        현재 최고가
                    </div>
                    <div style = "font-wetight : 600">
                        <b id="price" style = "font-size:22px">${priceToString(data['high_price'])}</b> <span class = "text-secondary">원</span>
                    </div>
                </div>
                <div class = "card p-2 mb-3">
                    <div><i class="fas fa-crown" style="color:salmon;"></i> 현재 오너<div>
                    <div class="" style="font-size:25px;" onclick="window.location.href='/review/index.html?$user_id=${data['sender']}'">
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
                    ${priceToString(data['high_price'])} 원 입찰!!
                </div>
            </div>
        `
        // beforeend afterbegin beforebegin afterend
        document.querySelector('#chat').insertAdjacentHTML('beforeend', temp)

    } else if (responseType === 'message') {
        var nowOner = goods[goodsId]['buyer_id']
        var seller = goods[goodsId]['seller_id']
        if (seller === data['sender']){
            var temp = `
            <div>
                <div>
                    <img width=20px; height=20px; src="/static/images/stady_bear_face.png" alt="">
                    <b style = "font-size : 20px">${data['sender_name']} (판매자)</b> <span style="font-color : gray; font-size:small;">${data['time']}</span>
                </div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #ffcfcf; padding : 5px; margin-bottom : 10px;">
                    ${data['message']}
                </div>
            </div>
        `
        } else if (nowOner === data['sender']) {
            var temp = `
            <div>
                <div>
                    <img width=20px; height=20px; src="/static/images/stady_bear_face.png" alt="">
                    <b style = "font-size : 20px">${data['sender_name']} </b> (현재 오너) <span style="font-color : gray; font-size:small;">${data['time']}</span>
                </div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #dfcfff; padding : 5px; margin-bottom : 10px;">
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
    } else if( responseType === 'enter'){
        var temp = `
            <div>
                <div style = "margin-left : 20px; width: 80%; font-size : 18px; border-radius : 8px; background-color : #d7d7d7; padding : 5px; margin-bottom : 10px;">
                    ${data['sender_name']}님이 입장하였습니다.
                </div>
            </div>
        `
        document.querySelector('#chat').insertAdjacentHTML('beforeend', temp)
        document.getElementById('participants-count').innerText = '참여 인원 : '+data['participants_count']
        
    } else if(responseType === 'out'){
        document.getElementById('participants-count').innerText = '참여 인원 : '+data['participants_count']


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
    if(!payload || !token){
        if(!confirm('로그인 후 이용가능합니다. 로그인하러 갈까요?')){
            return    
        }
        window.location.href ='/user/login.html'
        return
    }
    // console.log(goods, payload)
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
    if(!confirm('정말 입찰 하시겠습니까?')){
        return   
    }
    var messageInputDom = document.querySelector('#chat-money-input');
    var highPrice = document.getElementById('price').innerText;
    var message = messageInputDom.value;
    const reg1 = /^[0-9]+$/;
    highPrice = highPrice.replace(/,/g,"");


    if (message === '' || !reg1.test(highPrice) || !reg1.test(message)) {
        return alert('값을 바르게 입력해 주세요.')
    }
    if(!payload || !token){
        if(!confirm('로그인 후 이용가능합니다. 로그인하러 갈까요?')){
            return    
        }
        window.location.href ='/user/login.html'
        return
    }


    if (chatSocket.readyState === WebSocket.OPEN) {

        money = Number(message)
        // money === NaN이 안먹힌다.
        if (String(money) == 'NaN') {
            return alert('숫자를 입력해 주세요.')
        } else if (Number(highPrice) >= parseInt(money)) {
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