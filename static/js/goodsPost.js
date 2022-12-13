   

$('#image').on("change", addFiles)

// date value 현재 날짜
let today = new Date()
let year = today.getFullYear()
let month = today.getMonth()+1
let max_date = today.getDate() + 2
let min_date = today.getDate()


date_html=`<input class="inputdate" type ="date" id ="start" min ="${year}-${month}-${min_date}" max="${year}-${month}-${max_date}"/>
<input class="inputtime" id="starttime" type="time" id="appt" name="appt" required style="margin-bottom: 20px;">`
$('#date-time').append(date_html) 

// 가격에 콤마를 찍는 함수
function getNumber(obj){
    var num01;
    var num02;
    num01 = obj.value;
    num02 = num01.replace(/\D/g,""); 
    num01 = setComma(num02);
    obj.value =  num01;

    $('#test').text(num01);
 }

 function setComma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';         
    while (reg.test(n)) {
       n = n.replace(reg, '$1' + ',' + '$2');
    }         
    return n;
 }





var fileArr = [];

function addFiles(e){
    
    $('#swiper-wrapper').empty();
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    if (fileArr.length  > 6){
        return alert('최대 6장 가능합니다') // 용량 등 유효성 검사 필요
    }
    var index = 0;
    filesArr.forEach(element => {
        if(!element.type.match("image.*")){
            alert("이미지 확장자만 가능")
            return
        }
        fileArr.push(element);

        var reader = new FileReader();
        reader.onload = function(e) {

            var temp = `
                <div class="p-3 col-4 m-0" id="img_id_${index}">
                    <div  style="position:relative">
                        <img style="box-shadow: 0 2px 5px 0px; border-radius:10px" src="${e.target.result}" data-file="${element.name}" alt="상품이미지"/>
                        <button style="position : absolute; border-radius : 5px; background-color: #ffda00; top : 0; right:15px; color :black; font-weight:700;" onclick="deleteImage(${index})">X</button>
                    </div>
                </div>
                `
            $('#image-wrap').append(temp)
            index++;
        }
        reader.readAsDataURL(element);
    });
}

function deleteImage(index){
    console.log(fileArr)
    fileArr.splice(index, 1);
    $(`#img_id_${index}`).remove();
    console.log(fileArr)
}


function posthandle(){
    
    console.log('post작성 실행')
    const title = document.getElementById('title').value
    let category = $("select[name=category]").val()
    const dateControl = document.querySelector('input[type="date"]').value
    const timeControl = document.querySelector('input[type="time"]').value
    const content = document.getElementById('content').value
    let predict_price = document.getElementById('predictPrice').value
    let start_price = document.getElementById('startPrice').value


    predict_price = predict_price.replace(/,/g,"");
    start_price = start_price.replace(/,/g,""); 

    let fd = new FormData()

    if(fileArr.length < 1){
        alert('최소 하나 이상의 이미지를 포함해 주세요')
        return
    }else if(title == ""){
        alert('제목을 입력해주세요.')
        return 
    }else if(category =="" || category=="카테고리"){
        alert('카테고리를 선택해주세요.')
        return 
    }else if (predict_price == ""){
        alert('예상가격을 입력해주세요.')
        return 
    }else if(start_price==""){
        alert('시작가격을 입력해주세요.')
        return 
    }else if(dateControl == ""){
        alert('날짜를 선택해주세요.')
        return 
    }else if(timeControl ==""){
        alert('시간을 설정해주세요.')
        return 
    }else if(content == ""){
        alert('본문을 입력해주세요.')
        return 
    }
    for(var i=0; i<fileArr.length; i++) {
        fd.append("images", fileArr[i]);
    }

    fd.append('title', title)
    fd.append('content', content)
    fd.append('category', category)
    fd.append('start_date', dateControl)
    fd.append('start_time', timeControl)
    fd.append('predict_price', predict_price)
    fd.append('start_price', start_price)
    

   $.ajax({
        type:'POST',
        url :"http://127.0.0.1:8000/goods/",
        processData: false,
        contentType: false,
        data: fd,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
          },
        
        success:function(data){
            window.location.href = `http://127.0.0.1:5500/goods/auction.html?goods=${data['id']}`
        },
        error: function(request, status, error){
            console.log(error)
        },
    })
}
