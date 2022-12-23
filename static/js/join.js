let is_auth = false
let username_check = false


async function authSms() {
    let phone = document.getElementById("phone-number").value
    var reg = /^01(?=.*[0-9]).{8,9}$/

    if (!reg.test(phone)) {
        return alert('번호를 바르게 입력해 주세요')
    }

    const response = await fetch(`${hostUrl}/user/auth/sms/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "phone": phone,
        })
    })
    if (response.ok) {
        $('#phone-message').empty()
        $('#phone-number-wrap').show()
        await startTimer()

    }
}


function checkUsername() {
    var username = $('#username').val()
    // console.log(username)
    if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(username)) {
        $('#username-message').html('<span class="redfont">2자 이상 10자 이하의 영문, 한글, 숫지</span>')
        return
    }
    $('#username-message').empty()


    $.ajax({
        type: 'GET',

        data: { 'username': username },
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/user/check/`,

        success: function (result) {
            // console.log(result)
            if (result['result'] === false) { // 같은 이름의 유저가 없음
                // $('#username-message').empty()
                $('#username-message').html('<i class="fas fa-check" style="color:green">사용가능한 아이디 입니다.</i>')
                username_check = true
            } else {
                $('#username-message').html('<i class="fas fa-times" style="color:red">이미 사용 중인 아이디입니다.</i>')
            }
        },
    });


}
$('#phone-number').on('input', phoneChecker);
$('#auth-number').on('input', authNumberCheker);
$('#password1').on('input', pwChecker);
$('#password2').on('input', pwSameChecker);
$('#username').on('input', usernameChecker);

function phoneChecker() {
    is_auth = false
    $('#phone-number-wrap').hide()

}
function authNumberCheker() {
    var authNumber = $('#auth-number').val()
    var phone = $('#phone-number').val()

    if (authNumber.length !== 6) {
        $('#auth-success-icon').empty()
        is_auth = false
        return
    }

    $.ajax({
        type: 'GET',

        data: { 'phone': phone, 'auth_number': authNumber },
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        url: `${hostUrl}/user/auth/sms/`,

        success: function (result) {
            // console.log(result)
            if (result['message'] === true) {
                $('#auth-success-icon').html('<i class="fas fa-check" style="color:green"></i>')
                is_auth = true
            } else {
                $('#auth-success-icon').html('<i class="fas fa-times" style="color:red"></i>')
            }
        },
    });
}

function pwChecker() {
    // console.log('활성화 중!')
    var reg = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/
    var txt = $('#password1').val();
    return !reg.test(txt) ?
        $('#password-1-message').html('<span class="redfont">8자 이상 16이하 영문, 숫자, 특수문자 하나 이상씩 포함해 주세요.</span>')
        && $('#password-1-success-icon').empty()
        : $('#password-1-success-icon').html('<i class="fas fa-check" style="color:green"></i>')
        && $('#password-1-message').empty();
}

function pwSameChecker() {
    var p1 = $('#password1').val();
    var p2 = $('#password2').val();
    return p1 !== p2 ?
        $('#password-2-message').html('<span class="redfont">비밀번호가 일치하는지 확인해 주세요</span>')
        && $('#password-2-success-icon').empty()
        : $('#password-2-success-icon').html('<i class="fas fa-check" style="color:green"></i>')
        && $('#password-2-message').empty();
}

function usernameChecker() {
    username_check = false
    $('#username-message').html('<span class="redfont">중복체크를 해주세요.</span>')

}

async function handleJoin() {
    const phoneNumber = document.getElementById("phone-number").value
    const username = document.getElementById("username").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value
    const authNumber = document.getElementById("auth-number").value


    if (!is_auth || !username_check || password1 !== password2) {
        !is_auth ? $('#phone-message').html('<span class="redfont">인증해 주세요!</span>') : $('#phone-message').html('감사합니다')
        !username_check ? $('#username-message').html('<span class="redfont">중복체크 해주세요!</span>') : $('#username-message').text('중복체크 완료')
        // !is_password? $('#password-1-message').html('<span class="redfont">8자 이상 16자 이하 영문, 숫자, 특수문자 하나 이상씩 포함</span>') : $('#username-message').html('<span class="redfont">사용가능한 비밀번호</span>')
        password1 !== password2 || password1 === '' ? $('#password-1-message').html('<span class="redfont">비밀번호를 입력해 주세요.</span>') : is_password = true;
        return false
    }

    const response = await fetch(`${hostUrl}/user/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "phone": phoneNumber,
            "username": username,
            "password": password1
        })
    })
    if (response.ok) {
        alert("회원가입 되었습니다.")
        window.location.href = "/user/login.html";
    } else {
        alert('이미 가입된 번호가 있습니다!')
        // TODO 로그인하러 가기 비밀번호 초기화하러 가기
    }
}


async function startTimer() {
    let totalSecond = 300

    let x = setInterval(function () {
        let min = parseInt(totalSecond / 60)
        let sec = totalSecond % 60

        document.getElementById('auth-timer').innerHTML = min + ":" + sec;
        totalSecond--;

        if (totalSecond < 0) {
            clearInterval(x);
            document.getElementById('auth-timer').innerHTML = '<span style = "color : red">시간초과</span>';
        }
    }, 1000);
}