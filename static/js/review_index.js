window.onload = function () {
    review_list()
    $("time.timeago").timeago();
}
let user_id = url.searchParams.get('user_id')


var backUrl = '127.0.0.1:8000'
var backEndUrl = 'http://127.0.0.1:8000'
var token = localStorage.getItem('access')
console.log("페이로드 아이디",payload["user_id"])

function review_list() {
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `http://127.0.0.1:8000/review/list/${user_id}/`,
        success: function (response) {
            console.log('성공:', response);
            let profile_image = response['receiver']['profile_image']
            let bad_review_count = response['bad_review_count']
            let soso_review_count = response['soso_review_count']
            let good_review_count = response['good_review_count']
            let excellent_review_count = response['excellent_review_count']
            let username = response['receiver']['username']
            let temperature=response['receiver']['rating_score']
            if(temperature > 99)
            {
            temperature=99
            }
            let id = response['receiver']['id']
            let is_active = response['receiver']['is_active']
            let ratingColor = [['#686868', 'black'], ['#a0cfff', 'blue'], ['#ffe452', '#ff9623'], ['#ff6d92', '#e981ff']][parseInt(temperature / 25)]

            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    let author = response['results'][i]['author']
                    let content = response['results'][i]['content']
                    let created_at = response['results'][i]['created_at']
                    let review_image = response['review_image'][i]
                    temp_html = `
                    <div class="col-lg-4 col-md-6 col-sm-8" style="margin-top: 10px;>
                        <div class="col-lg-4 col-md-6 col-sm-8">
                            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" >
                                <div class="toast-header">
                                    <img src="http://127.0.0.1:8000${review_image}" id="image2" style="width:30px; border-radius:500px;">
                                    <strong class="me-auto" style="position:absolute; left: 50px;">${author}</strong>
                                    <small class="text-muted" style="position:absolute; right: 20px;"><time class="timeago" datetime="${created_at}"></small>
                                </div>
                                <div class="toast-body">
                                    ${content}
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    $('#review_list').append(temp_html)
                }
            }
            let bad_user = `
                <div style="background-color:#c00000; height:70px; display: flex; justify-content: center; align-items: center; font-weight: bolder;">
                    <div >
                        현재 비매너 사유로 이용정지 중입니다.
                    </div>
                </div>
            `
            let temperature_bad_user = `
                <div>
                <div class="progress" max=100 "></div>
                <span class='text-secondary small'>매너점수</span> 0
                </div>
                <br>
                <div class="row" style="display:felx;" id="profile_btn">
                <button id="goods_list_btn" style="border: hidden; background-color : #c692ff; font-weight: bolder; border-radius : 10px; width:150px; height:40px; text-align:center;" onclick="review(${id})">판매상품 보기</button>
                </div>
            `
            let temperature_good_user=`
            <div>
            <div class="progress" max=100 style="--w:${temperature}%; --c1:${ratingColor[0]};--c2:${ratingColor[1]};"></div>
            <span class='text-secondary small'>매너점수</span> ${temperature}
            </div>
            <br>
            <div class="row" style="display:felx;" id="profile_btn">
            <button id="goods_list_btn" style="margin-right:25px; border: hidden; background-color : #c692ff; font-weight: bolder; border-radius : 10px; width:150px; height:40px; text-align:center;" onclick="review(${id})">판매상품 보기</button>
            </div>
            `
            let myProfileBtn=`
            <button style="border: hidden; background-color : gold; font-weight: bolder; border-radius : 10px; width:150px; height:40px; text-align:center;" onclick="myProfile(${id})">내 프로필 가기</button>
            `
            if (profile_image)$('#profile_image').attr("src", `http://127.0.0.1:8000${profile_image}`);

            
            if (is_active == true && temperature > 0) {
                $('#temp').append(temperature_good_user)
            } else if (is_active == true && temperature <= 0) {
                $('#temp').append(temperature_bad_user)
            } else if (is_active == false) {
                $('#bad_user').append(bad_user)
                $('#temp').append(temperature_bad_user)
            }
            if (payload["user_id"]==`${id}`){
                $('#goods_list_btn').hide()
                $('#profile_btn').append(myProfileBtn)
            }
            
            let bad_score=`
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${bad_review_count}</span>
            `
            let soso_score=`
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${soso_review_count}</span>
            `
            let good_score=`
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${good_review_count}</span>
            `
            let excellent_score=`
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${excellent_review_count}</span>
            `

            if (bad_review_count > 0){
            $('#bad_score').append(bad_score);
            }
            if (soso_review_count > 0){

            $('#soso_score').append(soso_score);
            }

            if (good_review_count > 0){
            $('#good_score').append(good_score);
            }

            if (excellent_review_count > 0){
            console.log(excellent_review_count)

            $('#excellent_score').append(excellent_score);
            }



            $('#username').text(`${username}`)
            $('#profile_image').text(`${profile_image}`)
            $("time.timeago").timeago();
        }
    });
}


function review(id) {
    location.href = `/review/goods_list.html?user_id=${id}`
}
function myProfile(id) {
    location.href = `/user/userProfile.html?user_id=${id}`
}
