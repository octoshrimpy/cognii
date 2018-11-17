// this is where all the js will be stored
$(document).ready(function(){

  let isPlaying = false;
  
  $(document).click(function(){
    if(!isPlaying){
      const rain = new Audio('./test.mp3')
      rain.play()
      isPlaying = true;
    }
  })
})
