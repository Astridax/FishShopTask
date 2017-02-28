let fishInBowl = [];

$(function(){
    setupHandlers();
})

var setupHandlers = function(){
    $(".listFish").click(function(evt){
        let fish = evt.currentTarget;
        let fishId = $(fish).data("id");

        if(fishInBowl.lastIndexOf(fishId) != -1) {
            fishInBowl.pop(fishId);
            removeFromTank(fish);
            return;
        }

        fishInBowl.push(fishId);
        callApi().then((res) =>{
            handleResult(res.canLiveTogether, fish);
        }).catch((err)=>{
            let message = "Uh oh, an error occurred. Please try again.";
            console.log(message);
            console.log(err);
            displayNotification(message);
            fishInBowl.pop(fishId);
        })
    });

    $("#checkout").click(() => {
        if(Object.keys(fishInBowl).length == 0) {
            displayNotification("You have nothing in the tank! Click a fish to add it.");
        } else {
            displayNotification("Fish bought!");
            reset();
        }
    })

    $("#reset").click(() => {
        reset();    
    })

    $(".overlay").click(() => {
        $(".overlay").css('visibility', 'hidden');
    })
}

let reset = function(){
    $("#customerTank > .listFish").each((index, fish) => {
            fishInBowl.length = 0;
            removeFromTank(fish);
    });
}

let handleResult = function(canLiveTogether, fish){
    let fishId = $(fish).data("id");
    if(!canLiveTogether) {
        displayNotification("YOUR FISH WILL KILL EACH OTHER!!!");
        fishInBowl.pop(fishId);
        return;
    }
    addToTank(fish);
}

let addToTank = function(fish){
    $(fish).detach();
    $("#customerTank").append(fish);
}

let removeFromTank = function(fish) {
    $(fish).detach();
    $("#shopTank").append(fish);
}

let callApi = function(){
    return Promise.resolve($.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://fishshop.attest.tech/compatibility",
        data: JSON.stringify({fish: fishInBowl})
    }))
}

let displayNotification = function(message){
    $("#notificationDisplay .message").text(message);
    $('.overlay').css('visibility', 'visible');
}