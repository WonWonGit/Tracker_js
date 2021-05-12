const btn = document.querySelector(".track_btn");
const select = document.querySelector(".delivery_js");

function getState(track_id,carrier_id){
    fetch(`https://apis.tracker.delivery/carriers/${carrier_id}/tracks/${track_id}`)
    .then(
        function(response){
            return response.json()
        }
    ).then(function(json){
        let length = json.progresses.length;
        
        for(let i=length;i>0;i--){
            console.log(json.progresses[i])
        }
        
        
    })
}

function getTrackId(){
    const track_id = document.querySelector(".track_id").value;
    const carrier_id = select.options[select.selectedIndex].value;
    console.log(track_id, carrier_id);
    getState(track_id,carrier_id);
}

btn.addEventListener("click",getTrackId);
