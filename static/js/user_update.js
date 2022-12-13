window.onload = function(){
    getInfo()
}

$(document).ready(function(){
    var fileTarget = $('.profile_image');

    fileTarget.on('change', function(){

      if(window.FileReader){
        var filename = $(this)[0].files[0].name;
      } 
      else {
        var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
      }
      
      $(this).siblings('.upload-name').val(filename);
    });
  });
  
function readURL(input) {
if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
    document.getElementById('profile_image_2').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
} else {
    document.getElementById('profile_image_2').src = "";
}
}

function getInfo(){
    console.log('회원정보 가져오기')
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/user/`,
        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function(response){
            let username = response['username']
            let profile_image = response['profile_image']

        $('#profile_image').attr('src', profile_image)
        if(profile_image){
            $('#profile_image_2').attr("src", `http://127.0.0.1:8000${profile_image}`)
        }
        $('#username').attr('value',username)
        $('#upload-name').attr('value', profile_image)
        localStorage.setItem('username', username)

        }
    })
}

function checkUsername(){
    var username = $('#username').val()
    console.log(username)
    if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(username)){
        $('#username-message').html('<span class="redfont">2자 이상 10자 이하의 영문, 한글, 숫지</span>')
        return
    }
    $('#username-message').empty()
    let local_user_name = JSON.parse(localStorage.getItem('payload'))['username']


    $.ajax({
    type: 'GET',

    data: {'username' : username},
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("access"),
    },

    url: `http://127.0.0.1:8000/user/check/`,

    success: function (result) {
        // 유저이름 안바꾸면 체크 안하게끔 해야한다.
        console.log("local_user_name",local_user_name)

        if(result['result'] === false || username==result['username']){ // 같은 이름의 유저가 없음
            $('#username-message').html('<i class="fas fa-check" style="color:green"> 사용가능한 아이디 입니다.</i>')
            username_check = true}
        else if(username==local_user_name){$('#username-message').html('<i class="fas fa-check" style="color:green"> 현재 아이디와 같습니다.</i>')}
        else{$('#username-message').html('<i class="fas fa-times" style="color:red"> 이미 사용 중인 아이디입니다.</i>')}
    },
});

}
$('#username').on('input', usernameChecker);
function usernameChecker(){
    username_check = false
    $('#username-message').html('<span class="redfont">중복체크를 해주세요.</span>')
}


async function handleUpdate() {
    let username = $("#username").val()
    console.log(username)
    let formFile = $("#profile_image")[0];
    console.log(formFile)
    
    let formData = new FormData();
    if (formFile.files.length === 0) {
    } else {
      formData.append("profile_image", formFile.files[0]);
    };
    formData.append("username", username)

    $.ajax({

        type: "PUT",
        url: `http://127.0.0.1:8000/user/`,
        processData: false,
        contentType: false,
        data: formData,

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (result) {
        alert("회원정보 변경완료.", result);
        location.replace('http://127.0.0.1:5500/review/index.html')
        },
        error : function(){
          alert("이미 사용 중인 아이디입니다.");
          }
        
        }
      );
    }
