window.onload = function () {
    // console.log('userProfile 업로드시 실행되는 함수')
    likegoods()
}

function likegoods() {
    $('#item').empty()
    $('#userdata').empty()
    const user_id = JSON.parse(localStorage.getItem('payload')).user_id
    // console.log(user_id)

    $.ajax({
        type: "GET",
        url: `${hostUrl}/user/${user_id}/`,
        data: {},

        success: function (response) {
            // console.log(response['like_goods'])
            // console.log(response['user_data']['profile_image'])
            // console.log(response['user_data']['username'])
            let username = response['user_data']['username']
            // console.log('rating점수 ',response['user_data']['rating_score'])

            let temp_profile = `
                            <div style="margin-left:30px;"><h3>${username} 님의 관심상품</h3></div>`

            $('#userdata').append(temp_profile)

            // console.log(response['like_goods'].length)
            for (let i = 0; i < response['like_goods'].length; i++) {
                if (response['like_goods'][i]['images'] > 0) {
                    let images = response['like_goods'][i]['images'][0]
                    let title = response['like_goods'][i]['title']
                    let predict_price = response['like_goods'][i]['predict_price']
                    let start_price = response['like_goods'][i]['star_price']

                    let temp_html = `
                    <div class="card" style="width: 15rem;">
                        <img src="${images}" class="card-img-top images" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">예상가격 :${predict_price}원</p>
                        
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    `

                    $('#items').append(temp_html)

                } else {
                    let images = "https://w7.pngwing.com/pngs/703/554/png-transparent-camera-graphy-free-content-camera-camera-lens-rectangle-black.png"
                    let title = response['like_goods'][i]['title']
                    let predict_price = response['like_goods'][i]['predict_price']

                    let temp_html = `
                    <div class="card" style="width: 15rem;">
                        <img src="${images}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">예상가격 :${predict_price}원</p>
                        
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    `

                    $('#items').append(temp_html)

                }
            }
        }
    })
}