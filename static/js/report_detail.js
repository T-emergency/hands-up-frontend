const hostUrl = "http://127.0.0.1:8000"
let post_id=localStorage.getItem('community_post_id')
console.log(post_id)

// window.onload = function(){
//   post_detail()
// }

$(document).ready(function() {
    const FLAG = localStorage.getItem("access", '')
    console.log(FLAG)
    if(!FLAG){
        console.log("아무거나")
        window.location.href = "/user/login.html"
        return
    }
    post_detail()
    comment()
});


console.log(post_id)
console.log("외부에서 post_id", post_id)

let login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

  function post_detail() {
    console.log("되겟지")

  $.ajax({
      type: "GET",
      url: `${hostUrl}/board/report_articles/${post_id}/`,
      data: {},
      success: function(response){
        console.log(response)
        let title = response['title']
        let content = response['content']
        let user = response['username']
        let img=response['image']
        let post_user_id = response['id']

        console.log(img)
        console.log("포스트유저id",post_user_id)

        $('#title').append(title)
        $('#user').append(user)
        $('#content').append(content)
        console.log("이미지", img)
        if(img){
            $('#img').append(`<img src="${hostUrl}${img}" style="width: 50%;">`)
        }
      }
  });
}

       
function comment() {
  console.log("코멘트에서 id 들고오기",post_id)
  const login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

  $.ajax({
    type: "GET",
    url: `${hostUrl}/board/report_articles/${post_id}/comment/`,
    data: {},

    success: function (response) {
      console.log("ㅇㅇ")
      console.log(response)
      let comments_count=response['results']['count']
      for (let i = 0; i < response['results'].length; i++) {
        let content = response['results'][i]['content']
        let user = response['results'][i]['username']
        let id = response['results'][i]['id']
        let comment_user_id = response['results'][i]['user_id']
        var time = response['results'][i]["created_at"]
        let next=response['next']
        let previous=response['previous']

        console.log("코멘트의 유저id",comment_user_id)
        console.log("코멘트 개수",comments_count)
        console.log("로그인 사용자의 유저 id22",login_user_id)
        temp_html=
        `
        <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px; background-color: #fcc5c5;">
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
            
            
// 댓글 페이지네이션
function page(page) {
  console.log("코멘트에서 id 들고오기",post_id)
  const login_user_id = JSON.parse(localStorage.getItem('payload')).user_id

  $.ajax({
    type: "GET",
    url: page,
    data: {},

    success: function (response) {
      console.log("ㅇㅇ")
      console.log(response)
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

        console.log("코멘트의 유저id",comment_user_id)
        console.log("코멘트 개수",comments_count)
        console.log("로그인 사용자의 유저 id22",login_user_id)
        temp_html=
        `
        <li class="list-group-item d-flex justify-content-between align-items-start" style="margin-top:10px; background-color: #fcc5c5;">
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



// 게시글 삭제
function post_delete_submit() {
  console.log('삭제 실행')
  if(!confirm("정말 삭제하시겠어요?")){
      return false;
  }
  $.ajax({

      type: "DELETE",
      url: `${hostUrl}/board/report_articles/${post_id}/`,
      processData: false,
      contentType: false,
      data: {},

      headers: {
          "Authorization": "Bearer " + localStorage.getItem("access"),
      },

      success: function () { // 성공 시
          alert("게시글을 삭제했습니다")
          window.location.href = "report_article.html"
      }

  });
}
// 게시글 수정
function article_put_submit(){
      location.href='report_put.html'
}

// 댓글 수정
function comment_put_submit(comment_id){
    let content = prompt("내용을 입력하세요","")
    console.log(content)
    formData = new FormData();
    formData.append("content", content)
    $.ajax({
        
      type: "PUT",
      url: `${hostUrl}/board/report_articles/${post_id}/comment/${comment_id}/`,
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
    // location.href='report_put.html'
}



// 댓글 작성

function comment_submit(comment_id) {
    let content = $('#comment_content2').val()
    let formData = new FormData($('#comment_content')[0]);
    formData.append("content",content);
    console.log("content",content)
    console.log(formData)
    console.log("ok")

    $.ajax({
        
        type: "POST",
        url: `${hostUrl}/board/report_articles/${post_id}/comment/`,
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
    console.log('삭제 실행')
    let comment_id = comment
    console.log(post_id)
    console.log(comment_id)
    if(!confirm("정말 삭제하시겠어요?")){
        return false;
    }
    $.ajax({

        type: "DELETE",
        url: `${hostUrl}/board/report_articles/${post_id}/comment/${comment_id}`,
        processData: false,
        contentType: false,
        data: {},

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function () { // 성공 시
            alert("게시글을 삭제했습니다")
            location.reload()        
        },
    });
}