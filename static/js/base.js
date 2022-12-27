// 서버용
// const hostUrl = "http://backend.hands-up.co.kr"
// const backUrl = '43.200.179.49';
// const domain = '43.200.179.49';

// // 로컬용
const hostUrl = "http://127.0.0.1:8000"
const backUrl = '127.0.0.1:8000';
const domain = '127.0.0.1:8000';

const token = localStorage.getItem('access')
const payload = JSON.parse(localStorage.getItem('payload', ''))
const DATE = new Date()
const url = new URL(`${window.location.href}`);
const CATEGORY = {
    '': '',
    'all': '',
    '디지털기기': 'digital',
    '생활가전': 'machine',
    '가구/인테리어': 'inte',
    '생활/주방': 'dinning',
    '유아': 'baby',
    '여성의류': 'w-cloth',
    '남성의류': 'm-cloth',
    '스포츠': 'sport',
    '반려동물용품': 'animal',
    '기타': 'etc',
    '이벤트': 'event',
}
function searchAuction() {
    var keyword = document.getElementById('search-input').value;
    window.location.href = `/goods/index.html?search=${keyword}`
}

function searchAuction2() {
    var keyword = document.getElementById('search-input-2').value;
    window.location.href = `/goods/index.html?search=${keyword}`
}


function priceToString(price) {
    if (price === null) {
        return null
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function needLogin() {
    if (confirm('로그인이 필요합니다. 로그인하러 갈까요?')) {
        return window.location.href = '/user/login.html'
    } else {
        return
    }
}


function moveAuction() {
    // if (!payload) {
    //     needLogin()
    // }
    return window.location.href = `/goods/index.html`
}


function moveProfile() {
    if (!payload) {
        needLogin()
    }
    return window.location.href = `/user/userProfile.html?user_id=${payload['user_id']}`
}


function moveChat() {
    if (!payload) {
        needLogin()
    }
    return window.location.href = `/chat/index.html?user_id=${payload['user_id']}`
}


if (!payload) {
    var login_temp = `
        <a href="/user/login.html"><i class="fa fa-user"></i>Login</a>
    `
} else {
    var login_temp = `
        <a href="/user/userProfile.html?user_id=${payload['user_id']}"><i class="fa fa-user"></i>${payload['username']}님 안녕하세요</a>
    `
}

// 로그인 시 로그아웃 보이기
if(payload){
    var logout_temp=`<div><span style="cursor:pointer" onclick="handleLogout()">로그아웃</span></div>`
} else {
    var logout_temp = `<div></div>`
}

//로그인 시 프로필 눌리기
if(payload){
    var drop_menu =`
    <li onclick='moveProfile()'><a style="color:black; font-size:15px;" href="#">프로필</a></li>
    <li onclick="handleLogout()"><a style="color:black;font-size:15px; " href="#">로그아웃</a></li>
    `
} else {
    var drop_menu =`
    <div></div>
    `
}


async function handleLogout() {

    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    return window.location.href = `/user/login.html`
}

function dp_menu() {

    let click = document.getElementById("dr_menu");
    if (click.style.display === "none") {
        click.style.display = "block";
        click.style.textAlign = "center"
        click.style.paddingTop = "10px";
        click.style.height = "70px";
        click.style.borderRadius = "10px";
        click.style.backgroundColor = 'white';

    } else {
        click.style.display = "none";

    }
}

if (token !== null && payload !== null) {
    var alramSocket = new WebSocket(
        `ws://${domain}/ws/alram/?token=${token}`
    );
    console.log('asdf')
    alramSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };
    alramSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let message = data['message'];
        let responseType = data['response_type']
        let goodsId = data['goods_id']
        if (responseType === 'alert') {
            alert(data['message'])
            return
        }

        if(responseType === 'chat_alram'){
            let sender = data['sender_name']
            let senderId = data['sender']
            let chatList = document.getElementById(`chat-list-${goodsId}`)
            if(chatList){
                $("#chat-list").prepend(chatList)
                $(`#chat-list-title-${goodsId}`).text(message)
                var wp = document.getElementById(`wait-msg-${goodsId}`)
            }
            if(payload['user_id'] !== senderId){
                if(wp){
                    var cnt = Number($(`#wait-msg-${goodsId}`).text())+1
                    console.log(cnt)
                    $(`#wait-msg-${goodsId}`).text(cnt)
                }else{
                    $(`#wait-point-${goodsId}`).html(`
                    <span
                        style="text-align: center; background-color: #ff0000; width: 20px; height: 20px; border-radius: 50px; position: absolute; right: 20px; top: 8px; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-family: inherit; position: absolute; right: 5px; top: 5px;"
                        id="wait-msg-${goodsId}">
                        1
                    </span>
                    `)
                }
                $('#alram-section').append(`
                    <div class="mb-2" style="border-radius:10px; width:100%; background-color:green; padding:5px;">
                        <div style="color:white;">
                            ${sender}님의 메시지
                        </div>
                        <div style="padding-left:15px; color:white;">
                            ${message}
                        </div>
                    </div>
                `)
            }

        }
        if(responseType === 'alram'){

            let message = data['message']
            let goodsId = data['goods_id']
            let goodsTitle = data['goods_title']
            $('#alram-section').append(`
                    <div class="mb-2" style="border-radius:10px; width:100%; background-color: black; padding:5px;">
                        <div style="color:white;">
                            ${message}
                        </div>
                        <div style="padding-left:15px; color:white;">
                            <a href="/goods/auction.html?goods=${goodsId}">
                                ${goodsTitle}
                            </a>
                        </div>
                    </div>
                `)
        }
    };
}
function alramClear(){
    $('#alram-section').html(`<div id="alram-clear" style="position: absolute; right: 0;">
    <button style="background-color: #000; color:white;border: 1px solid black; border-radius: 4px; padding: 3px;" onclick="alramClear()">
        <b>All Clear</b>
    </button>
    </div>`)
}

document.getElementById('nav-header').innerHTML = `
<div class="humberger__menu__overlay" style="z-index: 995;"></div>
    <div class="humberger__menu__wrapper" style="z-index: 999;">
        <div class="humberger__menu__widget">
            <div class="header__top__right__auth">
                ${login_temp}
            </div>
            <br>
            ${logout_temp}
        </div>
        
        <div id="mobile-menu-wrap">
            <div class="slicknav_menu">
                <nav class="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu" style="display: none;">
                    <ul>
                        <li class="active"><a href="/index.html" role="menuitem">홈</a></li>
                        <li><a href="/goods/index.html">경매</a></li>
                        <!-- <li><a href="#">Pages</a>
                                <ul class="header__menu__dropdown">
                                    <li><a href="/shop-details.html">Shop Details</a></li>
                                    <li><a href="/shoping-cart.html">Shoping Cart</a></li>
                                    <li><a href="/checkout.html">Check Out</a></li>
                                    <li><a href="/blog-details.html">Blog Details</a></li>
                                </ul>
                            </li> -->
                        <li><a href="/board/free_article.html">게시판</a></li>
                        <li><a href="https://forms.gle/2iNG5v4vcmAqrC8o9">Contact & Feedback</a></li>
                        <li class="p-2">
                            <input type="text" class="form-control mb-1" placeholder="What do yo u need?" id="search-input-2">
                            <button style="width: 100%;" type="submit" class="btn btn-primary" onclick="searchAuction2()">SEARCH</button>

                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- <div class="header__top__right__social">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-pinterest-p"></i></a>
            </div>
            <div class="humberger__menu__contact">
                <ul>
                    <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                    <li>Free Shipping for all Order of $99</li>
                </ul>
            </div> -->
        </div>
        <!-- Humberger End -->
        <!-- #292610 #24210b 배경   #ffd700 골드-->
    
        <!-- Header Section Begin -->
        <header class="header" style="
        background: linear-gradient(45deg, #ffd567, #c24aff) !important;
        position: sticky;
        z-index: 99;
        width: 100%;
        color: white;
        top: 0;
    ">

        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="header__logo" >
                        <h1 onclick="window.location.href='/'" style="font-size: 30px;font-weight: 800;color: white; padding-top: 10px; cursor:pointer;">
                            👋 핸즈업
                        </h1>
                    </div>
                </div>
                <div class="col-lg-8" style="padding: 0;">
                    <nav class="header__menu">
                        <ul style="color: white;">
                            <li><a href="/goods/index.html">경매</a>
                                <!-- <ul class="header__menu__dropdown">
                                        <li><a href="/shop-details.html">Shop Details</a></li>
                                        <li><a href="/shoping-cart.html">Shoping Cart</a></li>
                                        <li><a href="/checkout.html">Check Out</a></li>
                                        <li><a href="/blog-details.html">Blog Details</a></li>
                                    </ul> -->
                            </li>
                            <li><a href="/board/free_article.html">게시판</a></li>
                            <li><a href="https://forms.gle/2iNG5v4vcmAqrC8o9">Contact & Feedback</a></li>
                            <li style="margin-right: 0;">
                                <input type="text" class="form-control" placeholder="What do yo u need?" id="search-input">
                            </li>
                            <li style="margin: 0;" class="btn btn-primary" onclick="searchAuction()">
                                <i class="fas fa-search"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-2">

                    <div class="header__cart">
                        <ul>
                            <li style='cursor:pointer;' onclick='moveAuction()'><i class="fas fa-gavel" style="color: white;"></i></li>
                            
                                <li style='cursor:pointer;' onclick="dp_menu()" ><i class="fa fa-user"></i></li>
                                    <ul class="header__menu__dropdown" 
                                    style="display:none; 
                                    position: absolute;
                                    z-index: 1;"
                                    
                                    id="dr_menu">
                                     ${drop_menu}
                                    </ul> 

                                <!--<li><a href="#"><i class="fas fa-bell"></i> <span>3</span></a></li>-->
                                </li>
                            
                            <li style='cursor:pointer;' onclick='moveChat()'>
                                <i class="fas fa-comment-dots"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="humberger__open">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </header>
    <!-- Header Section End -->
`

document.querySelector('#search-input').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        searchAuction(false)
    }
};

document.querySelector('#search-input-2').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        searchAuction2(false)
    }
};