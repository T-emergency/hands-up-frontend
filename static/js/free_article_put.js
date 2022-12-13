window.onload = function(){
    free_article_change_get()
}
let free_article_id=localStorage.getItem('free_article_id')
function free_article_change_get(){
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/board/detail/${free_article_id}/`,
        data: {},
        success: function(response){

        let title = response['title']
        let content = response['content']
        let img = response['image']
        console.log(response)
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


function free_article_put() {
    let content = $("#free_article_content").val()
    let title = $("#free_article_title").val()
    let formData = new FormData();

    // formData.append("image", $("#image")[0].files[0]);
    formData.append("content", content)
    formData.append("title", title)
    const formFile = $("#image")[0];
    if (formFile.files.length === 0) {
    } else {
      formData.append("image", formFile.files[0]);
    };

    $.ajax({

        type: "PUT",
        url: `http://127.0.0.1:8000/board/detail/${free_article_id}/`,
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
        
        }
      );
}
