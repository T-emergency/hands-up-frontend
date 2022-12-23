function free_article_create() {

  let content
  content = $('#content').val()
  content = filterXSS(content);

  let title
  title = $("#title").val();
  title = filterXSS(title)

  let formData = new FormData();
  formData.append("content", content)
  formData.append("title", title)
  const formFile = $("#img")[0];
  if (formFile.files.length === 0) {
  } else {
    formData.append("image", formFile.files[0]);
  }
  $.ajax({

    type: "POST",
    url: `${hostUrl}/board/free_articles/`,

    processData: false,
    contentType: false,
    data: formData,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access"),
    },

    success: function (result) {
      alert("작성완료", result);
      location.href = 'free_article.html'
    },

    error: function () {
      alert("게시글을 확인해주세요!");
    }
  }
  );
}