$(document).ready(function () {

});

function selectScore(score_1) {
    const score = score_1;

    if (score == -20) {
        let temp_bad = `
            <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
                <div class="col-lg-12">

                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">구매자가 단순 변심으로 환불을 요구해요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex; justify-content:end; " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">구매자가 거래시간과 장소를 정한 후 거래직전에 취소했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex; justify-content:end; " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">구매자가 일방적으로 거래를 거부해요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex; justify-content:end; " >
                       <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">구매자가 시간약속을 여러번 안지켰어요</label><br>
                   </div>
               </div>
           </div>
           <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
           <div class="col-lg-12">

               <div class="col-lg-12" style="display:flex;justify-content:start;  " >
               <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">구매자가 무리하게 가격을 흥정했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                   <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px;">구매자가 낙찰가가 아닌 다른 금액을 요구해요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                   <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">구매가자 성적인 말을 했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                   <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off"value="-20">
                       <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">구매자가 약속 장소에 나타나지 않았어요</label><br>
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
        // console.log("최악")

    } else if (score == 0) {
        let temp_soso = `
       <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
       <div class="col-lg-12">

                    <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">구매자가 거래방식을 바꿨어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">구매자와 거래는 했지만 연락이 힘들었어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="이거" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">구매자가 배송비를 요구했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">구매자가 가격을 흥정했어요</label><br>
                   </div>
               </div>
           </div>
           <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
           <div class="col-lg-12">

               <div class="col-lg-12" style="display:flex;justify-content:start;  " >
               <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">구매자와 거래했지만 구매의사를 몇번이나 바꿨어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px">구매자가 거래시간을 바꿨어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">구매자가 직거래에 마스크를 쓰지 않았아요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off" value="0">
                       <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">구매자가 물품에 트집을 잡았어요</label><br>
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
        // console.log("그저 그래요")
    } else if (score == 3) {
        let temp_good = `
       <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
       <div class="col-lg-12">

       <div class="col-lg-12" style="display:flex;justify-content:end;  " >
       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">구매자가 제가 원하는 방식으로 거래를 해줬어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">구매자가 연락을 잘했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">구매자가 마스크를 착용하고 거래했어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">구매자가 물품을 늦게 받았지만 이해해주셨어요</label><br>
                   </div>
               </div>
           </div>
           <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
           <div class="col-lg-12">

               <div class="col-lg-12" style="display:flex;justify-content:start;  " >
               <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">구매자가 친절하게 말해주셨어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px">구매자가 택배비를 부담해줬어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">구매자가 시간약속을 지켰어요</label><br>
                   </div>
                   <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                       <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off" value="3">
                       <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">구매자가 시~원한 쿨거래를 했어요</label><br>
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
        // console.log("좋아요")
    } else if (score == 5) {
        let temp_good = `
    <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
    <div class="col-lg-12">

    <div class="col-lg-12" style="display:flex;justify-content:end;  " >
    <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:400px">구매자가 제가 있는 곳까지 와주셨어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:400px">구매자가 연락을 항상 잘해주셨어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                <input  type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:400px">구매자가 네고를 하지 않고 구매했어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:end;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:400px">구매자가 감사인사를 해줬어요</label><br>
                </div>
            </div>
        </div>
        <div class="col-lg-6" style="text-align: center; background-color: #fffef7; ">
        <div class="col-lg-12">

            <div class="col-lg-12" style="display:flex;justify-content:start;  " >
            <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:400px">구매자가 빠르게 결제를 했어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:400px">구매자가 항상 친절하게 말해주셨어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:400px">구매자가 시~원한 쿨거래를 했어요</label><br>
                </div>
                <div class="col-lg-12" style="display:flex;justify-content:start;  " >
                <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off" value="5">
                    <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:400px">구매자가 시간 약속을 한번도 어기지 않고 잘 지켰어요</label><br>
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
        // console.log("최고에요")

    }



}


// 여러개의 평가 value 가져오기
// function reviewCreate(){
//     $("input[type=checkbox]:checked").each(function(){
//         const value = $(this).val();
//         // console.log(value);
//     })
// }

let goods_id = url.searchParams.get('goods_id')


function reviewCreate() {

    let content = $("#content").val()
    let score = $("input[type=checkbox]:checked").val()
    let formData = new FormData();
    formData.append("content", content);
    formData.append("score", score);

    $.ajax({

        type: "POST",
        url: `${hostUrl}/review/?goods_id=${goods_id}`,
        processData: false,
        contentType: false,
        data: formData,

        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function () {
            // location.reload()
            window.location.href = `/chat/index.html?good_id=${goods_id}`
        },
        error: function (response) {
            // console.log(response)
            if (score === undefined) {
                alert("상대방과 거래가 어땠는지 선택해주세요");
            } else if (content === '') {
                alert("내용을 입력해주세요. 최대 30자");
            }
            else if (response.status === 409) {
                alert("이미 평가 했습니다.");
            } else {
                alert("글자수 초과");
            }

        }

    });
}
