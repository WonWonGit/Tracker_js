const btn = document.querySelector(".track_btn");
const select = document.querySelector(".delivery_js");
const list = document.querySelector(".listUl");

let proList = [];


function getState(track_id,carrier_id){
    fetch(`https://apis.tracker.delivery/carriers/${carrier_id}/tracks/${track_id}`)
    .then(
        function(response){
            return response.json()
        }
    ).then(function(json){
        loadInfo(json)
    })
}

function loadInfo(json){
    let length = json.progresses.length;
    let prog = json.progresses;
        for(let i=length-1;i>0;i--){
            const li = document.createElement("li");
            const span_time = document.createElement("span");
            const span_status = document.createElement("span");
            var tiem = new Date(prog[i]['time']);
            li.setAttribute("id",`${length-i}`);
            span_time.setAttribute("id","time");
            span_status.setAttribute("id","statuse")
            li.appendChild(span_time);
            li.appendChild(span_status);
            /*span_time.textContent= time.slice(0,19);*/
            /*시간 파싱 연구하기*/
            span_status.textContent=prog[i]['status']['text'];
            list.appendChild(li);
        }
}


function getTrackId(){
    const track_id = document.querySelector(".track_id").value;
    const carrier_id = select.options[select.selectedIndex].value;
    console.log(track_id, carrier_id);
    getState(track_id,carrier_id);
}

btn.addEventListener("click",getTrackId);

