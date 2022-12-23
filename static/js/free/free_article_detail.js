$(document).ready(function() {
    const FLAG = localStorage.getItem("access", ' ')
    if(!FLAG){
        window.location.href = "/user/login.html"
        return
    }
    free_article_detail()
});

let free_article_id=localStorage.getItem('free_article_id')
let login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

function free_article_detail(){

        $.ajax({
            type: "GET",
            url: `${hostUrl}/board/detail/${free_article_id}/`,
            data: {},
            success: function(response){
            let title = response['title']
            let content = response['content']
            let hits = response['hits']
            let user = response['username']
            let img=response['image']
            // console.log(response)
            $('#title').append(title)
            $('#hits').append(hits)
            $('#user').append(user)
            $('#content').append(content)
            
            if(img){
              $('#image').append(`<img src="${hostUrl}${img}" style="width: 100%; ">`)
            }

            // hide_button();
            // hide_comment_page();
            // function hide_button(){
            //     if(free_article_id!=login_user_id){
            //         $("#put_submit").hide();
            //         $("#delete_submit").hide();
            //     }
            //   }
            // function hide_comment_page(){
            //     if(comments_count<5){
            //         $("#previous").hide();
            //         $("#next").hide();
            //     }
            //   }


        }
            })
        }
        



$(document).ready(function () {
    comment()
});
    function comment() {
        const login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

        $.ajax({
            type: "GET",
            url: `${hostUrl}/board/free_articles/${free_article_id}/comment/`,
            data: {},
            success: function (response) {
                    let comments_count=response['count']
                    for (let i = 0; i < response['results'].length; i++) {
                        let content = response['results'][i]['content']
                        let user = response['results'][i]['username']
                        let id = response['results'][i]['id']
                        // let comment_user_id = response[i]['free_article_id']
                        var time = response['results'][i]["created_at"]
                        let next=response['next']
                        let previous=response['previous']

                        temp_html=
                        `
                        <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px; background-color: #85f2ad;">
                          <div class="ms-2 me-auto" style="width:65%;">
                            <div class="fw-bold">${user}</div>
                              ${content}
                          </div>
                          <div style="margin-left: 10%;"><time class="timeago" datetime="${time}"> 작성</div>
                          <div>
                            <button id="commet_put_submit" type="button" class="btn btn-outline-danger" onclick="comment_put_submit(${id})">수정</button>
                            <button id="commet_delete_submit" type="button" class="btn btn-outline-danger" onclick="comment_delete_submit(${id})">삭제</button>
                          </div>
                        </li>
                        `
                        $('#comment_list').append(temp_html)
                        $("time.timeago").timeago();
                        $('#next').attr('onclick', `page("${next}")`)
                        $('#previous').attr('onclick', `page("${previous}")`)
                        // 코멘트 개수적으면 페이지네이션 버튼 없애기 일단 댓글개수 4개로 했습니다.
                        
                        hide_comment_page();
                        function hide_comment_page(){
                          if(comments_count<5){
                            $("#previous").hide();
                            $("#next").hide();
                          }
                        }
                      }
                    }
                  })
                }
                
// 댓글 페이지네이션

function page(page) {
    const login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

    $.ajax({
        type: "GET",
        url: page,
        data: {},

        success: function (response) {
          $('#comment_list').empty()
      
          let comments_count=response['results']['count']
          for (let i = 0; i < response['results'].length; i++) {
            let content = response['results'][i]['content']
            let user = response['results'][i]['username']
            let id = response['results'][i]['id']
            let comment_user_id = response['results'][i]['user_id']
            var time = response['results'][i]["created_at"]
            let next=response['next']
            let previous=response['previous']
  
            temp_html=
            `
            <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px; background-color: #a7f77b">
              <div class="ms-2 me-auto" style="width:65%;">
                <div class="fw-bold">${user}</div>
                  ${content}
              </div>
              <div style="margin-left: 10%;"><time class="timeago" datetime="${time}"> 작성</div>
              <div>
                <button id="commet_put_submit" type="button" class="btn btn-outline-danger" onclick="comment_put_submit(${id})">수정</button>
                <button id="commet_delete_submit" type="button" class="btn btn-outline-danger" onclick="comment_delete_submit(${id})" >삭제</button>
              </div>
            </li>
            `
            $('#comment_list').append(temp_html)
            $("time.timeago").timeago();
            $('#next').attr('onclick', `page("${next}")`)
            $('#previous').attr('onclick', `page("${previous}")`)
            // 코멘트 개수적으면 페이지네이션 버튼 없애기 일단 댓글개수 4개로 했습니다.
            
            hide_comment_page();
            function hide_comment_page(){
              if(comments_count<5){
                $("#previous").hide();
                $("#next").hide();
              }
            }
          }
        }
      })
    }
function set_page(){  
        $("#test").load(window.location.href + "#test");
          }
            
// 게시글 수정
function free_article_put(){
    location.href='free_article_put.html'
}

// 게시글 삭제
function post_delete_submit() {
    if(!confirm("정말 삭제하시겠어요?")){
        return false;
    }
    $.ajax({

        type: "DELETE",
        url: `${hostUrl}/board/detail/${free_article_id}/`,
        processData: false,
        contentType: false,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function () { // 성공 시
            alert("게시글을 삭제완료!")
            window.location.href = "/board/free_article.html"
        }

        });
}

// 댓글 수정
function comment_put_submit(free_comment_id){
  let content = prompt("내용을 입력하세요","댓글을 입력해주세요!")
  
  formData = new FormData();
  formData.append("content", content)

  $.ajax({
        
    type: "PUT",
    url: `${hostUrl}/board/free_articles/${free_article_id}/comment/${free_comment_id}/`,
    processData: false,
    contentType: false,
    data: formData,
    
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("access"),
    },

    success: function () {
        location.reload()
    }

});


    // location.href='free_article_put.html'
}

// 댓글 작성

        function comment_submit() {
            let content = $("#comment_content2").val()
            let formData = new FormData();
            formData.append("content",content);
            // console.log("content",content)
            // console.log(formData)

            $.ajax({
                
                type: "POST",
                url: `${hostUrl}/board/free_articles/${free_article_id}/comment/`,
                processData: false,
                contentType: false,
                data: formData,
                
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access"),
                },
        
                success: function () {
                    location.reload()
                }
        
                });
        }

// 댓글 삭제
function comment_delete_submit(comment) {

    let free_comment_id = comment

    if(!confirm("정말 삭제하시겠어요?")){
        return false;
    }
    $.ajax({

        type: "DELETE",
        url: `${hostUrl}/board/free_articles/${free_article_id}/comment/${free_comment_id}`,
        processData: false,
        contentType: false,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
          },

        success: function () { // 성공 시
            alert("댓글 삭제 완료!")
            location.reload()        
          },
        });
}


// 게시글 좋아요
// $('#like_submit').click( function() {
//     like_submit()
//     });
//     function like_submit() {


//         $.ajax({
    
//             type: "POST",
//             url: `${hostUrl}/community/${free_article_id}/like/`,
//             processData: false,
//             contentType: false,
//             data: {},

//             headers: {
//               "Authorization": "Bearer " + localStorage.getItem("access"),
//             },
    
//             success: function () { // 성공 시
//                 window.location.href = "free_article_detail.html"
//             }
    
//           });
//     }



// 게시글 공유 url 복사
// function url_copy(){
// 	var url = '';
// 	var textarea = document.createElement("textarea");
// 	document.body.appendChild(textarea);
// 	url = window.document.location.href;
// 	textarea.value = url;
// 	textarea.select();
//   document.execCommand("copy");   // 복사
// 	document.body.removeChild(textarea);
// 	alert("URL이 복사되었습니다.")
// }