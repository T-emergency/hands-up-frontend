var user_id = url.searchParams.get('user_id')
var data_auction_list = get_auction_list()



userInfo()

function userInfo() {

    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/user/info/${user_id}/`,

        success: function (response) {
            // console.log('성공:', response);
            let profile_image = response['profile_image']
            let username = response['username']
            temperature = response['rating_score'] < 0 || response['rating_score'] > 100 ? 99 : response['rating_score']
            if (response['rating_score'] > 99) {
                temperature = 99
            }
            let ratingColor = [['#686868', 'black'], ['#a0cfff', 'blue'], ['#ffe452', '#ff9623'], ['#ff6d92', '#e981ff']][parseInt(temperature / 25)]
            let is_active = response['is_active']
            let id = response['id']

            let bad_user = `
                <div style="background-color:#c00000; height:70px; display: flex; justify-content: center; align-items: center; font-weight: bolder;">
                    <div >
                        현재 비매너 사유로 이용정지 중입니다.
                    </div>
                </div>
                `
            let temperature_bad_user = `
                <div style="width:30vw>
                <div class="progress" max=100 "></div>
                <div style="color:white">
                <span class='text-secondary small' style="color : white; width:50px">매너점수</span> 0
                </div>
                </div>
                <br>
                <div class="row" style="display:felx;" id="profile_btn">
                <button id="goods_list_btn" style="margin:5px; border: hidden; background-color : #c692ff; font-weight: bolder; border-radius : 10px; width:20vh; height:5vh; text-align:center;" onclick="review(${id})">거래후기 보기</button>
                </div>
            `
            let temperature_good_user = `
                        <div style="width:30vw">
                        <div class="progress" max=100 style="--w:${temperature}%; --c1:${ratingColor[0]};--c2:${ratingColor[1]};"></div>
                        <div style="color : white;">
                        <span class='text-secondary small' style="color : white;">매너점수</span> ${temperature}
                        </div>
                        </div>
                        <br>
                        <div class="row" style="display:felx;" id="profile_btn">
                        <button id="goods_list_btn" style="margin:5px; border: hidden; background-color : #c692ff; font-weight: bolder; border-radius : 10px; width:20vh; height:5vh; text-align:center;" onclick="review(${id})">거래후기 보기</button>
                        </div>
                    `
            if (is_active == true && temperature > 0) {
                $('#temp').append(temperature_good_user)
            } else if (is_active == true && temperature <= 0) {
                $('#temp').append(temperature_bad_user)
            } else if (is_active == false) {
                $('#bad_user').append(bad_user)
                $('#temp').append(temperature_bad_user)
            }

            if (profile_image) $('#profile_image').attr("src", `${hostUrl}${profile_image}`);
            $('#username').text(`${username} 님의 판매물품`)

        }
    })
}

function review(id) {
    location.href = `/review/index.html?user_id=${id}`
}

const listEnd = document.getElementById('endList');
const option = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    thredhold: 0,
}
const onIntersect = (entries, observer) => {
    // console.log(entries, observer)
    // entries는 IntersectionObserverEntry 객체의 리스트로 배열 형식을 반환합니다.
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            get_auction_list()
        }
    });
};

const observer = new IntersectionObserver(onIntersect, option);
observer.observe(listEnd);


var nowPage = 1
var category = ''
// const token = localStorage.getItem('access')
var goodsStatus = ''
var isNull = ''
var search = url.searchParams.get('search')
var search = search === null || search === undefined ? search = '' : search = search


function get_auction_list() {
    $.ajax({
        type: "GET",
        url: `${hostUrl}/goods/user/${user_id}/?page=${nowPage}&status=${goodsStatus}`,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        data: {},
        async: false,
        success: function (response) {
            // console.log(`${hostUrl}/goods/user/${user_id}/?page=${nowPage}&status=${goodsStatus}`)
            let auction_list = response
            for (let i = 0; i < auction_list.length; i++) {

                let price
                let banner
                let high_price
                let participants
                let heart
                let goods_id = auction_list[i]['id']
                let is_like = auction_list[i]['is_like']
                let auction_status = auction_list[i]['status']
                let image = auction_list[i]['images']?.image
                let time = auction_list[i]['start_time'].slice(0, 2) + '시' + ' ' + auction_list[i]['start_time'].slice(3,) + '분'
                let startTime = auction_list[i]['start_date'].split('-').slice(1,).join('/') + ' ' + time + ' 오픈!'

                var now = new Date();
                var open = new Date(auction_list[i]['start_date'] + 'T' + auction_list[i]['start_time']);

                open.setMinutes(open.getMinutes() + 20);
                let rt = open - now
                rt = parseInt(rt / (1000 * 60))

                if (auction_status == null) {
                    auction_status = "wait-auction";
                    banner = `<span style="padding : 4px; border-radius:10px; background-color:#78d7ff; color:black;">${startTime}<span>`
                    participants = ``
                    price = `
                    <div>
                        <span style="font-size : 20px; font-weight:700;">
                            ${auction_list[i]["start_price"]} 원
                        </span>
                        <span class="font-secondary" style="font-size:12px">
                            (시작가)
                        </span>
                    </div>
                    `

                } else if (auction_status == true) {
                    auction_status = "started-auction";
                    high_price = auction_list[i]["high_price"] === 0 ? auction_list[i]['start_price'] + '원' : auction_list[i]["high_price"] + '원';
                    banner = `<span style="padding : 4px; border-radius:10px;background-color:#ffd700; color:black;">경매 ${rt}분 남았어요!<span>`
                    participants = `
                    <div style="background-color:black; border-radius : 10px; padding:3px;">
                        <i class="fas fa-eye"></i>
                        <span class="font-secondary">
                            ${auction_list[i]['participants_count']}
                            참여중
                        </span>
                    </div>
                        
                    `

                    price = `
                    <div>
                        <span style="font-size : 19px; font-weight:700;">
                            ${high_price}
                        </span>
                        <span class="font-secondary" style="font-size:12px">
                            (현재가)
                        </span>
                    </div>
                    `
                } else {
                    auction_status = "end-auction";
                    high_price = auction_list[i]["high_price"] === 0 ? '미낙찰' : auction_list[i]["high_price"] + '원';
                    banner = `<span style="padding : 4px; border-radius:10px;background-color:gray; color:white;">경매종료<span>`
                    participants = ``
                    price = `
                    <h5 id="high_price-${auction_list[i]['id']}">
                        <span style="font-size : 19px; font-weight:700;">
                            ${high_price}
                        </span>
                        <span class="font-secondary" style="font-size:12px">
                            (낙찰가)
                        </span>
                    </h5>
                    `

                };
                if (is_like) {
                    heart = `
                    <div class="" id="post-like" style="width: 30px; margin: 0 auto; padding: 3px; cursor: pointer;" onclick="goodsLike(${goods_id})">
                        <i id="heart-${goods_id}" class="fas fa-heart" style="color : #ffcaca; font-size : 25px"></i>
                    </div>
                    `
                } else {
                    heart = `
                    <div class="" id="post-like" style="width: 30px; margin: 0 auto; padding: 3px; cursor: pointer;" onclick="goodsLike(${goods_id})">
                        <i id="heart-${goods_id}" class="far fa-heart" style="color : #ffcaca; font-size : 25px"></i>
                    </div>
                    `
                }


                let temp_html = `
                <div class="col-lg-3 col-md-4 col-sm-6 mix ${auction_status}"  style="margin-bottom : 50px">
                    <div class="featured__item" style="">
                        <div id="img" class="featured__item__pic set-bg"
                            style="background-image: url(${hostUrl}${image}); border-radius:15px 15px 0 0;">
                            <div style="position: absolute; right: 5px; bottom:5px;">
                                ${heart}
                            </div>
                            <div style="position: absolute; left: 5px; top:10px;">
                                ${banner}
                            </div>
                            <div style="position: absolute; left: 10px; bottom:10px; font-size: 15px; color : white;">
                                ${participants}
                            </div>
                        </div>
                        <div class="" style="background-color : white; padding : 5px 15px 10px; border-radius:0 0 15px 15px; cursor:pointer;" onclick="window.location.href='/goods/auction.html?goods=${auction_list[i]['id']}'">
                            <span style="font-size:17px; font-weight : 700;">${auction_list[i]['title']}</span>
                            ${price}
                        </div>
                    </div>
                </div>
                `
                $('#auction_list').append(temp_html)

            }
            nowPage += 1
        },
        error: function (error) {
            var temp = `
            <div class="text-center">
                <span style="font-size:25px; color:white;">회원님의 경매는 이게 전부에요 &#128517;</span>
                <button class="btn btn-primary m-3">내가 경매 올리기</button>
            </div>
            `
            $('#endList').html(temp)
        }
    })
    return
}


function filter(c = '', gs = '', sr = '') {
    var prevCategory = CATEGORY[category]
    var prevStatus = goodsStatus
    // var nowStatus = 
    if (sr !== '') {
        nowPage = 1
        search = sr
        category = '';
        gs = '';
        $('#auction_list').empty()
    } else if (c !== '') {
        nowPage = 1;
        c !== 'all' ? category = c : category = ''
        search = '';
        $('#auction_list').empty()
        $(`#ct-${prevCategory}`).removeClass('active')
        $(`#ct-${CATEGORY[c]}`).addClass('active')
    } else if (gs !== '') {
        nowPage = 1
        gs !== 'all' ? goodsStatus = gs : goodsStatus = ''
        $('#auction_list').empty()
        $(`#st-${prevStatus}`).removeClass('active')
        $(`#st-${goodsStatus}`).addClass('active')

    }
    get_auction_list()
}



async function remaindTime() {

    for (let i = 0; i < data_auction_list.length; i++) {
        let start_date = data_auction_list[i]["start_date"]
        let start_time = data_auction_list[i]["start_time"]
        let id = data_auction_list[i]["id"]
        let high_price = data_auction_list[i]["high_price"]
        let auction_status = data_auction_list[i]["status"]

        if ($(`p.time-title-${id}`).text() == "경매 종료") {
            $(`#start_price-${id}`).fadeOut();
            if (high_price == null) {
                $(`#high_price-${id}`).text("낙찰가: 미낙찰");
            } else {
                $(`#high_price-${id}`).text(`낙찰가: ${high_price}원`)
            }
            continue
        }


        var now = new Date();
        var open = new Date(start_date + 'T' + start_time);
        var end = new Date(start_date + 'T' + start_time);
        end.setMinutes(end.getMinutes() + 20);


        var nt = now.getTime();
        var ot = open.getTime();
        var et = end.getTime();
        let sec
        let day
        let hour
        let min

        if (nt < ot) {
            $(`.time-${id}`).fadeOut();
            $(`p.time-title-${id}`).html(start_date + " " + start_time + " 시작");
        } else if (nt > et || nt == et) {
            $(`p.time-title-${id}`).html("경매 종료");
            $(`.time-${id}`).fadeOut();
        } else {
            $(`.time-${id}`).fadeIn();
            // $(`p.time-title-${id}`).html("경매 남은 시간");
            sec = parseInt(et - nt)
            // console.log("sec:", sec)
            sec = parseInt(et - nt) / 1000;
            // console.log("sec:", sec)
            day = parseInt(sec / 60 / 60 / 24);
            sec = (sec - (day * 60 * 60 * 24));

            // hour = parseInt(sec / 60 / 60);
            // sec = (sec - (hour * 60 * 60));

            min = parseInt(sec / 60);
            sec = parseInt(sec - (min * 60));

            // if (hour < 10) { hour = "0" + hour; }
            if (min < 10) { min = "0" + min; }
            if (sec < 10) { sec = "0" + sec; }
            // $(`.hours-${id}`).html(hour);
            $(`.minutes-${id}`).html(min);
            $(`.seconds-${id}`).html(sec);
            $(`p.time-title-${id}`).html($(`.time-${id}`));
        }

        if (auction_status == true) {
            $(`#start_price-${id}`).fadeOut();
            if (high_price == null) {
                $(`#high_price-${id}`).text(`경매 진행중`)
            } else {
                $(`#high_price-${id}`).text(`낙찰가: ${high_price}원`)
            }

        }
    }
}
// setInterval(remaindTime, 1000);


function goodsLike(goods_id) {
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },

        url: `${hostUrl}/goods/like/${goods_id}/`,
        // document
        success: function () {
            if ($(`#heart-${goods_id}`).hasClass('fas')) {
                $(`#heart-${goods_id}`).attr('class', 'far fa-heart')

            } else {
                $(`#heart-${goods_id}`).attr('class', 'fas fa-heart')

            }
        },
    });
}