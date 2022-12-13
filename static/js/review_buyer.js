$(document).ready(function(){

});

function selectScore(score_1){
   console.log(score_1)
   const score = score_1;
   console.log(score)

   if(score==-20){
       let temp_bad = `
            <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
                <div class="col-lg-12">

                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">설명과 완전 다른 물건을 받았어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex; justify-content:end; " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">거래하기로 해놓고 연락이 없어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex; justify-content:end; " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">일방적으로 거래를 거부해요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex; justify-content:end; " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">시간 약속을 너무 안지켜요</label><br>
                   </div>
               </div>
           </div>
           <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
           <div class="col-lg-12">

               <div class="col-lg-12" style="display:flex;justify-content:start;  " >
               <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">반말이나 욕설을 했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                   <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px;">낙찰가가 아닌 다른 금액을 요구해요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                   <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">성적인 말을 했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                   <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">기타</label><br>
                   </div>
               </div>
           </div>
   </div>
       `
       $('#bad').attr('style', "background-color: #8088ff; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#soso').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#good').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#excellent').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#check_list').empty()
       $('#check_list').append(temp_bad)
       console.log("최악")

   }else if(score==0){
       let temp_soso=`
       <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
       <div class="col-lg-12">

                    <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">설명과 조금 다른 물건을 받았어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">거래는 했지만 연락이 힘들었어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="이거" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">전문 업자가 의심돼요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">시간 약속을 잘 안지켰어요</label><br>
                   </div>
               </div>
           </div>
           <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
           <div class="col-lg-12">

               <div class="col-lg-12" style="display:flex;justify-content:start;  " >
               <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">말을 기분나쁘게 했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px">금액을 바꾸려는 시도가 있었어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">거래방식 변경이 있었어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">외부채널을 유도하는 사기가 의심돼요</label><br>
                   </div>
               </div>
           </div>
   </div>
       `
       $('#bad').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#soso').attr('style', "background-color: #8088ff; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#good').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#excellent').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#check_list').empty()
       $('#check_list').append(temp_soso)
       console.log("그저 그래요")
   }else if(score==3){
       let temp_good=`
       <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
       <div class="col-lg-12">

       <div class="col-lg-12" style="display:flex;justify-content:end;  " >
       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">제가 있는 곳까지 와주셨어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">연락이 잘 되었어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">어느정도 네고를 해줬어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">시간 약속을 잘 지켰어요</label><br>
                   </div>
               </div>
           </div>
           <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
           <div class="col-lg-12">

               <div class="col-lg-12" style="display:flex;justify-content:start;  " >
               <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">친절해요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px">물건 상태가 마음에 들어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">거래가 빨랐어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">추가물품을 줬어요</label><br>
                   </div>
               </div>
           </div>
   </div>
       `
       $('#bad').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#soso').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#good').attr('style', "background-color: #8088ff; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#excellent').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
       $('#check_list').empty()
       $('#check_list').append(temp_good)
       console.log("좋아요")
   }else if(score==5){
    let temp_good=`
    <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
    <div class="col-lg-12">

    <div class="col-lg-12" style="display:flex;justify-content:end;  " >
    <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">원하는 방식으로 거래를 해주셨어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">연락을 항상 잘해주셨어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">원하는 가격으로 네고를 해줬어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">시간 약속을 한번도 어기지 않고 잘 지켰어요</label><br>
                </div>
            </div>
        </div>
        <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
        <div class="col-lg-12">

            <div class="col-lg-12" style="display:flex;justify-content:start;  " >
            <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">항상 친절하게 말해주셨어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px">물건상태가 정말 좋아요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">거래 이후에 연락이 잘됐어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px"></label><br>
                </div>
            </div>
        </div>
</div>
    `
    $('#bad').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
    $('#soso').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
    $('#good').attr('style', "background-color: fffef7; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
    $('#excellent').attr('style', "background-color: #8088ff; height: 180px; width: 180px; border-radius: 10px; cursor : pointer;")
    $('#check_list').empty()
    $('#check_list').append(temp_good)
    console.log("최고에요")

}



}


// 여러개의 평가 value 가져오기
// function reviewCreate(){
//     $("input[type=checkbox]:checked").each(function(){
//         const value = $(this).val();
//         console.log(value);
//     })
// }


// 댓글
function reviewCreate() {

   let content = $("#content").val()
   let score= $("input[type=checkbox]:checked").val()
   let formData = new FormData();
   formData.append("content",content);
   formData.append("score",score);
   console.log("content",content)
   console.log("score",score)
   console.log(formData)

   $.ajax({
       
       type: "POST",
       url: `http://127.0.0.1:8000/review/5/`,
       processData: false,
       contentType: false,
       data: formData,
       
       headers: {
        "Authorization": "Bearer " + localStorage.getItem("access"),
    },

       success: function () {
           location.reload()
       },
       error : function(response){
        console.log(response)
       if(score==undefined){
       alert("상대방과 거래가 어땠는지 선택해주세요");
       }else if(content==''){
       alert("내용을 입력해주세요. 최대 50자");
       }else if(response.status == 409){
        alert("이미 평가 했습니다.");
        }
   
       }

       });
}
