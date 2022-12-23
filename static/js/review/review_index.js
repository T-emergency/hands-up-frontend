window.onload = function () {
    $("time.timeago").timeago();
    userInfo()
    review_list()
}

let user_id = url.searchParams.get('user_id')

function review_list() {
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/review/?user_id=${user_id}`,
        success: function (response) {
            let bad_review_count = response['bad_review_count']
            let soso_review_count = response['soso_review_count']
            let good_review_count = response['good_review_count']
            let excellent_review_count = response['excellent_review_count']
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    // let author = response['results'][i]['author']
                    let content = response['results'][i]['content']
                    let created_at = response['results'][i]['created_at']
                    // let review_image = response['review_image'][i]

                    temp_html = `
                    <div class="col-lg-4 col-md-6 col-sm-8" style="margin-top: 10px;>
                        <div class="col-lg-4 col-md-6 col-sm-8">
                            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" >
                                <div class="toast-header">
                                    <img src="${hostUrl}/media/default.jpeg" id="image2" style="width:30px; border-radius:50%;">
                                    <strong class="me-auto" style="position:absolute; left: 50px;">익명</strong>
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

            let bad_score = `
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${bad_review_count}</span>
            `
            let soso_score = `
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${soso_review_count}</span>
            `
            let good_score = `
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${good_review_count}</span>
            `
            let excellent_score = `
            <span style="text-align: center; background-color: #ff0000; width: 30px; height: 30px; border-radius: 50px; position: absolute; right: 20%; top: 0; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-size: 20px;">
            ${excellent_review_count}</span>
            `

            if (bad_review_count > 0) {
                $('#bad_score').append(bad_score);
            }
            if (soso_review_count > 0) {

                $('#soso_score').append(soso_score);
            }

            if (good_review_count > 0) {
                $('#good_score').append(good_score);
            }

            if (excellent_review_count > 0) {
                // console.log(excellent_review_count)
                $('#excellent_score').append(excellent_score);
            }

            $("time.timeago").timeago();
        }
    });
}


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
                <div style="width:30vw">
                <div class="progress" max=100 "></div>
                <div style="color:white">
                <span class='text-secondary small' style="color : white; width:50px">매너점수</span> 0
                </div>
                </div>
                <br>
                <div class="row" style="display:flex;" id="profile_btn">
                <button id="goods_list_btn" style="margin:5px; border: hidden; background-color : #c692ff; font-weight: bolder; border-radius : 10px; width:20vh; height:5vh; text-align:center;" onclick="review(${id})">판매상품 보기</button>
                </div>
            `
            let temperature_good_user = `
                        <div style="width:30vw">
                        <div class="progress" max=100 style="--w:${temperature}%; --c1:${ratingColor[0]};--c2:${ratingColor[1]};"></div>
                        <div style="color : black;">
                        <span class='text-secondary small' style="color : black;">매너점수</span> ${temperature}
                        </div>
                        </div>
                        <br>
                        <div class="row" style="display:felx;" id="profile_btn">
                        <button id="goods_list_btn" style="margin:5px; border: hidden; background-color : #c692ff; font-weight: bolder; border-radius : 10px; width:20vh; height:5vh; text-align:center;" onclick="review(${id})">판매상품 보기</button>
                        </div>
                    `
            let myProfileBtn = `
            <button style="margin:5px; border: hidden; background-color : gold; font-weight: bolder; border-radius : 10px; width:20vh; height:5vh; text-align:center;" onclick="myProfile(${id})">내 프로필 가기</button>
            `
            if (is_active == true && temperature > 0) {
                $('#temp').append(temperature_good_user)
            } else if (is_active == true && temperature <= 0) {
                $('#temp').append(temperature_bad_user)
            } else if (is_active == false) {
                $('#bad_user').append(bad_user)
                $('#temp').append(temperature_bad_user)
            }
            if (payload["user_id"] == `${id}`) {
                $('#goods_list_btn').hide()
                $('#profile_btn').append(myProfileBtn)
            }
            if (profile_image) $('#profile_image').attr("src", `${hostUrl}${profile_image}`);
            $('#username').text(`${username}`)
        }
    })
}

function review(id) {
    location.href = `/review/goods_list.html?user_id=${id}`
}
function myProfile(id) {
    location.href = `/user/userProfile.html?user_id=${id}`
}
