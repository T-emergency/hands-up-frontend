window.onload = function () {
  free_article_change_get()
}
let free_article_id = localStorage.getItem('free_article_id')
function free_article_change_get() {
  $.ajax({
    type: "GET",
    url: `${hostUrl}/board/detail/${free_article_id}/`,
    data: {},
    success: function (response) {

      let title = response['title']
      let content = response['content']
      let img = response['image']
      // console.log(response)
      // let temp_html_title=`
      // <label for="exampleFormControlInput1" class="form-label"></label>
      // <input type="text" class="form-control" id="free_article_title" name='free_article_title' required value="${title}">
      // `
      $('#free_article_title').val(title)
      // $('#image').attr('src', img)

      // let temp_html_content=`
      // <label for="exampleFormControlTextarea1" class="form-labe2"></label>
      //       <textarea class="form-control" id="free_article_content" name='free_article_content' rows="12"required>${content}</textarea>
      // `
      $('#free_article_content').html(content)

    }
  })
}


$("#confirmStart").click(function () {
    let content = $("#free_article_content").val()
    content = filterXSS(content);
    let title = $("#free_article_title").val()
    title = filterXSS(title)
    let formData = new FormData();

    if (title.length == 0 || content.length == 0){
      alert("글자수를 확인해주세요!")
      return
    }
    // formData.append("image", $("#image")[0].files[0]);
    formData.append("content", content)
    formData.append("title", title)
    const formFile = $("#image")[0];
    if (formFile.files.length === 0) {
    } else {
      formData.append("image", formFile.files[0]);
    };
        Swal.fire({
          title: '글을 수정하시겠습니까?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '삭제',
          cancelButtonText: '취소'
        }).then((result) => {
          if (result.value) {

            $.ajax({

              type: "PUT",
              url: `${hostUrl}/board/detail/${free_article_id}/`,
              processData: false,
              contentType: false,
              data: formData,
            
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
              },
              success: function (result) {
                alert("작성완료", result);
                location.href='free_article_detail.html'
              },
              error : function(){
                alert("조건에 맞게 작성해주세요!");
              } 
            })
          }
        })
})

