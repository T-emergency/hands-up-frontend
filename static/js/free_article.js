window.onload = function(){
    free_article_list()
    $("time.timeago").timeago();

}
console.log ("작동되니?")
free_article_list = () =>{
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/board/`,
        data: {},
        headers: {
        },
        success: function (response) {
            console.log (response)
            $('#free_article').empty()
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    var time = response[i]["created_at"]
                    const today = new Date(time)
                    console.log("time",time)

                    let id = response[i]['id']
                    console.log(id)
                    let title = response[i]['title']
                    let user = response[i]['username']
                    let next=response['next']
                    let previous=response['previous']
                    
                    temp_html=` <tr>
                    <td>${id}</td>
                    <td>
                    <div style = "cursor : pointer;" onclick="free_article_id(${id})"> ${title}</div>
                    </td>
                    <td>${user}</td>
                    <td>${today.toLocaleDateString()}</td>
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
    localStorage.setItem('board_free_article_id',free_article_id)
    location.href='free_article_detail.html'
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
        $('#free_article_list').empty()
        if (response['results'].length > 0) {
            for (let i = 0; i < response['results'].length; i++) {
                let id = response['results'][i]['id']
                console.log(id)
                let title = response['results'][i]['title']
                var time = response['results'][i]["created_date"] + "Z"
                let user = response['results'][i]['user']
                let next=response['next']
                let previous=response['previous']

                temp_html=` <tr>
                <td>${id}</td>
                <td>${user}</td>
                <td><time class="timeago" datetime="${time}">  
                </td>
            </tr>`
            $('#free_article_list').append(temp_html)
            $('#next').attr('onclick', `page("${next}")`)
            $('#previous').attr('onclick', `page("${previous}")`)
            $("time.timeago").timeago();
        }
        }
        }
        });
}

