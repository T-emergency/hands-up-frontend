//$('#free_article_create()').click( function() {
//    free_article_create()
//    });
  
    function free_article_create() {

        let content = $("#content").val()
        let title = $("#title").val()
        let formData = new FormData();

        formData.append("content", content)
        formData.append("title", title)
        const formFile = $("#img")[0];
        if (formFile.files.length === 0) {
        } else {
          formData.append("img", formFile.files[0]);
        }

        $.ajax({
            
            type: "POST",
            url: "http://127.0.0.1:8000/board/free_articles/",
            processData: false,
            contentType: false,
            data: formData,
    
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            
            success: function (result) {
            alert("작성완료", result);
            location.href='free_article.html'
            },
            
            error : function(){
            alert("게시글을 확인해주세요!");
            }
            }
          );
    }

