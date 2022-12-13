window.onload = function (){
    console.log('userProfile 업로드시 실행되는 함수')
    sellgoods()
}


function sellgoods() {
    $('#item').empty()
    $('#userdata').empty()
    
    //userid필요
    //sellgoods누를떄마다 회원 사진과 이름 중복으로 등록됨 (해결 필요)
    const user_id = JSON.parse(localStorage.getItem('payload')).user_id
    console.log(user_id)

    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/user/${user_id}/`,
        data: {},

        success: function (response) {
            console.log(response['sell_goods'])
            console.log(response['user_data']['profile_image'])
            let user_image = response['user_data']['profile_image']
            console.log(response['user_data']['username'])
            let username = response['user_data']['username']
            console.log('rating점수 ',response['user_data']['rating_score'])

            let temp_profile = `
                            <div class="profile-pic">
                            <img src="http://127.0.0.1:8000${user_image}"/>
                            </div>
                            <div style="margin-left:30px;">${username}</div>`

                            $('#userdata').append(temp_profile)

            // console.log(response['sell_goods'][0]['images'].length)
            for(let i =0 ; i < response['sell_goods'].length; i++){
                if (response['sell_goods'][i]['images']<0 ){
                    console.log(response['sell_goods'][i]['images'][0])
                    let images = response['sell_goods'][i]['images'][0]
                    let title = response['sell_goods'][i]['title']
                    let predict_price = response['sell_goods'][i]['predict_price']
                    let start_price = response['sell_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" 
                            style="background-image: url(http://127.0.0.1:8000${images['image']}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)

                }else{
                    let images = "https://w7.pngwing.com/pngs/703/554/png-transparent-camera-graphy-free-content-camera-camera-lens-rectangle-black.png"
                    console.log(response['sell_goods'][i]['title'])
                    let title = response['sell_goods'][i]['title']
                    let predict_price = response['sell_goods'][i]['predict_price']
                    let start_price = response['sell_goods'][i]['star_price']

                    let temp_html = `
                    <a href="#"><div id="item" class="goodsItem col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" data-setbg="img/featured/feature-1.jpg"
                            style="background-image: url(${images}); background-size: cover;" >
                        </div>
                            <div class="item-text featured__item__text">
                                <a href="#"> <h6 style="border-bottom:1px solid gray">${title}<h6> </a>
                                <a href="#"> <h5 >${predict_price}원</h5></a>
                            </div>
                        </div>
                    </div></a>`
    
                    
                    $('#item').append(temp_html)
                    
                }
            }
        }
    })
}


function buygoods(){
    $('#item').empty()
    $('#userdata').empty()
    const user_id = JSON.parse(localStorage.getItem('payload')).user_id

    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/user/${user_id}/`,
        data: {},

        success: function (response) {
            console.log(response['user_data']['profile_image'])
            let user_image = response['user_data']['profile_image']
            console.log(response['user_data']['username'])
            let username = response['user_data']['username']
            console.log('rating점수 ',response['user_data']['rating_score'])

            let temp_profile = `
                            <div class="profile-pic">
                            <img src="http://127.0.0.1:8000${user_image}"/>
                            </div>
                            <div style="margin-left:30px;">${username}</div>`

                            $('#userdata').append(temp_profile)

            console.log(response)
            console.log(response['buy_goods'].length)
            for(let i =0 ; i < response['buy_goods'].length; i++){
                if (response['buy_goods'][i]['images'].length > 0){
                    let images = response['buy_goods'][i]['images'][0]
                    let title = response['buy_goods'][i]['title']
                    let predict_price = response['buy_goods'][i]['predict_price']
                    let start_price = response['buy_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" 
                            style="background-image: url(http://127.0.0.1:8000${images['image']}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)

                }else{
                    let images = "https://w7.pngwing.com/pngs/703/554/png-transparent-camera-graphy-free-content-camera-camera-lens-rectangle-black.png"
                    let title = response['buy_goods'][i]['title']
                    let predict_price = response['buy_goods'][i]['predict_price']
                    let start_price = response['buy_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" data-setbg="img/featured/feature-1.jpg"
                            style="background-image: url(${images}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)
                    
                }
            }
        }
    })
}


function likegoods(){
    $('#item').empty()
    $('#userdata').empty()
    const user_id = JSON.parse(localStorage.getItem('payload')).user_id
    console.log(user_id)

    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/user/${user_id}/`,
        data: {},

        success: function (response) {
            console.log(response['user_data']['profile_image'])
            let user_image = response['user_data']['profile_image']
            console.log(response['user_data']['username'])
            let username = response['user_data']['username']
            console.log('rating점수 ',response['user_data']['rating_score'])

            let temp_profile = `
                            <div class="profile-pic">
                            <img src="http://127.0.0.1:8000${user_image}"/>
                            </div>
                            <div style="margin-left:30px;">${username}</div>`

                            $('#userdata').append(temp_profile)

            console.log(response['like_goods'].length)
            for(let i =0 ; i < response['like_goods'].length; i++){
                if (response['like_goods'][i]['images'].length > 0){
                    let images = response['like_goods'][i]['images'][0]
                    let title = response['like_goods'][i]['title']
                    let predict_price = response['like_goods'][i]['predict_price']
                    let start_price = response['like_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" 
                            style="background-image: url(http://127.0.0.1:8000${images['image']}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)

                }else{
                    let images = "https://w7.pngwing.com/pngs/703/554/png-transparent-camera-graphy-free-content-camera-camera-lens-rectangle-black.png"
                    let title = response['like_goods'][i]['title']
                    let predict_price = response['like_goods'][i]['predict_price']
                    let start_price = response['like_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" data-setbg="img/featured/feature-1.jpg"
                            style="background-image: url(${images}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)
                    
                }
            }
        }
    })
}