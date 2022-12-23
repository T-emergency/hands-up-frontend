const front_end_url = window.location.host
window.onload = function () {
    post_list()
    $("time.timeago").timeago();

}

post_list = () => {
    $.ajax({
        type: "GET",
        url: `${hostUrl}/board/report_articles/`,
        data: {},
        headers: {
        },
        success: function (response) {
            // console.log(response,"확인")
            $('#post_list').empty()
            // console.log(response['results'])
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {

                    var time = response['results'][i]["created_at"]
                    // console.log(time)
                    const today = new Date(time)
                    // console.log("time",time)

                    let id = response['results'][i]['id']
                    let title = response['results'][i]['title']
                    let user = response['results'][i]['username']
                    let next = response['next']
                    // console.log(next)
                    let previous = response['previous']

                    temp_html = ` <tr>
                    <td >${id}</td>
                    <td><div style = "cursor : pointer;" onclick="report_article(${id})"> ${title}] </div></td>
                    <td>${user}</td>
                    <td>${today.toLocaleDateString()}</td>
                </tr>`
                    $('#post_list').append(temp_html)
                    $('#next').attr('onclick', `page("${next}")`)
                    $('#previous').attr('onclick', `page("${previous}")`)


                }

            }
        }
    })
}


// post_id localstorage
function report_article(post_id) {
    // console.log("post_id", post_id)
    localStorage.setItem('community_post_id', post_id)
    location.href = 'report_detail.html'
}




// function category_list(category_name) {
//     let category = category_name;
//     // console.log("리스트 함수안",category)
//     $.ajax({

//         type: "GET",
//         url: `http://127.0.0.1/board/report_articles/`,
//         data: {},
//         // /?category=${category}

//         headers: {
//         },

//         success: function (response) {
//         $('#post_list').empty()
//         // console.log("여기가",response['results'][0]['title'])
//         // console.log("여기가",response['results'].length)
//         // console.log("여기가",response['next'])
//         // console.log('성공:', response);
//         if (response['results'].length > 0) {
//             for (let i = 0; i < response['results'].length; i++) {
//                 let id = response['results'][i]['id']
//                 // console.log(id)
//                 let title = response['results'][i]['title']
//                 var time = response['results'][i]["created_date"] + "Z"
//                 let user = response['results'][i]['user']
//                 let next=response['next']
//                 let previous=response['previous']

//                 temp_html=` <tr>
//                 <td>${id}</td>
//                 <td>
//                 <div style = "cursor : pointer;" onclick="report_article(${id})"> ${title} [${comments_count}] </div>
//                 </td>
//                 <td>${user}</td>
//                 <td><time class="timeago" datetime="${time}">  
//                 </td>
//                 </tr>`
//             $('#post_list').append(temp_html)
//             $('#next').attr('onclick', `page("${next}")`)
//             $('#previous').attr('onclick', `page("${previous}")`)
//             $("time.timeago").timeago();

//         }
//         }
//         }
//         });
// }

// 페이지네이션 함수
function page(page) {
    // console.log("첫 콘솔",page);

    $.ajax({

        type: "GET",
        url: page,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
            // console.log(response,"확인")
            $('#post_list').empty()
            // console.log(response['results'])
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {

                    var time = response['results'][i]["created_at"]
                    // console.log(time)
                    const today = new Date(time)
                    // console.log("time",time)

                    let id = response['results'][i]['id']
                    let title = response['results'][i]['title']
                    let user = response['results'][i]['username']
                    let next = response['next']
                    // console.log(next)
                    let previous = response['previous']

                    temp_html = ` <tr>
                    <td>${id}</td>
                    <td><div style = "cursor : pointer;" onclick="report_article(${id})"> ${title}] </div></td>
                    <td>${user}</td>
                    <td>${today.toLocaleDateString()}</td>
                </tr>`
                    $('#post_list').append(temp_html)
                    $('#next').attr('onclick', `page("${next}")`)
                    $('#previous').attr('onclick', `page("${previous}")`)

                }
            }
        }
    });
}

