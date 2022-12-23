window.onload = function () {
    free_article_list()
    $("time.timeago").timeago();

}
free_article_list = () => {
    $.ajax({
        type: "GET",
        url: `${hostUrl}/board/`,
        data: {},
        headers: {
        },
        success: function (response) {

            $('#free_article').empty()
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    var time = response['results'][i]["created_at"]
                    const today = new Date(time)
                    // console.log("time",time)

                    let id = response['results'][i]['id']
                    // console.log(id)
                    let title = response['results'][i]['title']
                    let user = response['results'][i]['username']
                    let hits = response['results'][i]['hits']
                    let next = response['next']
                    let previous = response['previous']

                    temp_html = ` <tr>
                    <td>${id}</td>
                    <td>
                    <div style = "cursor : pointer;" onclick="free_article_id(${id})"> ${title}</div>
                    </td>
                    <td>${user}</td>
                    <td>${today.toLocaleDateString()}</td>
                    // <td>${hits}</td>
                </tr>`
                    $('#free_article').append(temp_html)
                    $('#next').attr('onclick', `page("${next}")`)
                    $('#previous').attr('onclick', `page("${previous}")`)
                    $("time.timeago").timeago();

                }

            }
        }
    })
}


// free_article_id localstorage
function free_article_id(free_article_id) {
    localStorage.setItem('free_article_id', free_article_id)
    location.href = 'free_article_detail.html'
}

// 페이지네이션 함수
function page(page) {
    $.ajax({

        type: "GET",
        url: page,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (response) {
            // console.log (response)
            $('#free_article').empty()
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    var time = response['results'][i]["created_at"]
                    const today = new Date(time)
                    // console.log("time",time)

                    let id = response['results'][i]['id']
                    // console.log(id)
                    let title = response['results'][i]['title']
                    let user = response['results'][i]['username']
                    let hits = response['results'][i]['hits']
                    let next = response['next']
                    let previous = response['previous']

                    temp_html = ` <tr>
                    <td style="width: 15%;">${id}</td>
                    <td style="width: 15%;">
                    <div style = "cursor : pointer;" onclick="free_article_id(${id})"> ${title}</div>
                    </td>
                    <td style="width: 15%;">${user}</td>
                    <td style="width: 15%;">${today.toLocaleDateString()}</td>
                </tr>`
                    $('#free_article').append(temp_html)
                    $('#next').attr('onclick', `page("${next}")`)
                    $('#previous').attr('onclick', `page("${previous}")`)
                    $("time.timeago").timeago();
                }
            }
        }
    });
}