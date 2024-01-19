let counter= 0;

$("#btn").on("click", function(){
    counter++
    $("span").html("&nbsp" +counter);

    if (counter > 0 && counter <= 15){
        var aud = documnet.getElementById('audiio-element');
        aud.play();
    }
});

    // var aud = document.getElementById('audio-element');
    // $('#rollover').on('mouseeter',function(){
    //     aud.play();
    // }).mouseout(function(){
    //     aud.stop();
    // });
    

    // var aud = document.getElementById('audio-element');
    // $('#rollover').on({
    //     mouseover: function () {
    //     aud.play();
    // },
    // mouseout: function () {
    //     aud.stop();
    // }
    // });

    // for (let i = 0; i < fruits.length; i++) {
    //     setTimeout(() => {
    //         currentQuestion = i;
    //         loadQuestion();
    //     }, i * 16000); // 16 seconds delay for each question
    // }
