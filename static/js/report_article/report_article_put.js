
let post_id = localStorage.getItem('community_post_id')

window.onload = function () {
  post_change_get()
}

function post_change_get() {
  // console.log('게시글 수정 페이지 실행')
  // console.log(post_id)
  $.ajax({
    type: "GET",
    url: `${hostUrl}/board/report_articles/${post_id}/`,
    data: {},
    success: function (response) {
      // console.log(response)
      let title = response['title']
      let content = response['content']
      let img = response['image']
      // console.log
      // var str = document.getElementById("textarea").value;
      // str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');

      $('#report_title').val(title)
      $('#img').attr('src', img)
      $('#report_content').html(content)


      // let temp_html_title=`
      // <label for="exampleFormControlInput1" class="form-label"></label>
      // <input type="text" class="form-control" id="title" name='title' required value="${title}">
      // `
      // $('#report-title').append(temp_html_title)
      // $('#img').attr('src', img)

      // let temp_html_content =`
      // <label for="exampleFormControlTextarea1" class="form-labe2"></label>
      //       <textarea class="form-control" id="content" name='content' rows="12"required>${content}</textarea>
      // `
      // $('#report-content').append(temp_html_content)

    }
  });
}


function post_put() {
  let content = $("#report_content").val()
  let title = $("#report_title").val()
  let formData = new FormData();

  formData.append("img", $("#img")[0].files[0]);
  formData.append("content", content)
  formData.append("title", title)
  const formFile = $("#img")[0];
  if (formFile.files.length === 0) {
  } else {
    formData.append("image", formFile.files[0]);
  };
  // console.log("제목",title)
  // console.log("내용",content)
  // console.log("폼데이터",formData)

  $.ajax({

    type: "PUT",
    url: `${hostUrl}/board/report_articles/${post_id}/`,
    processData: false,
    contentType: false,
    data: formData,

    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access"),
    },

    success: function (result) {
      alert("작성완료", result);
      location.href = 'report_detail.html'
    },
    error: function () {
      alert("게시글을 조건에 맞게 작성했는지 확인해주세요");
    }

  }
  );
}
