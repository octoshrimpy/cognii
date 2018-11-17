
const audioSources = {
  'classical': {
    'src': '',
    'files': [
      '',
      '',
      ''
    ]
  },
  'hard': {

  },
  'meditation': {

  }
}


$(document).ready(function(){

  let isPlaying = false;
  const rain = new Audio('./test.mp3')

  $(document).click(function(){
    if(!isPlaying){
      rain.play()
      isPlaying = true;
    }else {
      rain.pause()
      isPlaying = false;
    }
  })
})
