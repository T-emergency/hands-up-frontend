// $('#post_create()').click( function() {
//     post_create()
//     });

    function post_create() {
        console.log("확인조아써")
        let content = $("#content").val()
        let title = $("#title").val()
        let formData = new FormData();

        formData.append("content", content)
        formData.append("title", title)
        const formFile = $("#img")[0];
        console.log("폼파일")
        console.log(formFile)
        if (formFile.files.length === 0) {
        } else {
          formData.append("image", formFile.files[0]);
        }
        console.log("제목",title)
        console.log("내용",content)
        console.log("폼데이터",formData)
    
        $.ajax({
    
            type: "POST",
            url: "http://127.0.0.1:8000/board/report_articles/",
            processData: false,
            contentType: false,
            data: formData,
    
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("access"),
            },
    
            success: function (result) {
            alert("작성완료", result);
            location.href='report_article.html'
            },
            error : function(){
            alert("게시글을 조건에 맞게 작성했는지 확인해주세요");
            }
            }
          );
    }

