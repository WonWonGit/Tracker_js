const btn = document.querySelector(".track_btn");
const select = document.querySelector(".delivery_js");
const list = document.querySelector(".listUl");
const currentState = document.querySelector(".currentState");

function getState(track_id,carrier_id){
    fetch(`https://apis.tracker.delivery/carriers/${carrier_id}/tracks/${track_id}`)
    .then(
        function(response){
            return response.json()
        }
    ).then(function(json){
        loadInfo(json)
        currentInfo(json)
    })
}

function loadInfo(json){
    let length = json.progresses.length;
    let prog = json.progresses;
    const weeks = new Array('SUN','MON','TUE','WED','THU','FRI','SAT');
        for(let i=length-1;i>0;i--){
            var time = prog[i]['time'];
            var state = prog[i]['status']['text'];
            var location =prog[i]['location']['name'];
            
            var tdTime = document.createTextNode(time);
            var tdState = document.createTextNode(state);
            var tdLocation = document.createTextNode(location);


            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth();
            const date_t = date.getDate();
            const day = date.getDay();
            const hour = date.getHours();
            const min = date.getMinutes();

            tdTime.textContent = `${year}.${month<10 ? `0${month}` : month}.${date_t < 10 ? `0${date_t}` : date_t} ${weeks[day]} ${hour < 10 ? `0${hour}`: hour}:${min < 10 ? `0${min}` : min}`;

            var tr = document.createElement("tr");
            var td_time = document.createElement("td");
            var td_status = document.createElement("td");
            var td_location = document.createElement("td");

            td_time.appendChild(tdTime);
            td_status.appendChild(tdState);
            td_location.appendChild(tdLocation);

            tr.appendChild(td_time);
            tr.appendChild(td_status);
            tr.appendChild(td_location);

           var table_info = document.getElementsByTagName("tbody")[0];
           table_info.appendChild(tr);
        }
}

function currentInfo(json){
    const from = json.from['address'];
    const to = json.to['address'];
}


function getTrackId(){
    const track_id = document.querySelector(".track_id").value;
    const carrier_id = select.options[select.selectedIndex].value;
    console.log(track_id, carrier_id);
    getState(track_id,carrier_id);
}

btn.addEventListener("click",getTrackId);

