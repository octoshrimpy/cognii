
const audioSources = {
  'classical': {
    'src': './classical',
    'files': [
      '0',
      '1',
      '2'
    ]
  },
  'hard': {
    'src': './hard',
    'files': [
      '0',
      '1',
      '2'
    ]
  },
  'meditation': {
    'src': './meditation',
    'files': [
      '0',
      '1',
      '2'
    ]
  },
  'forest': {
    'src': './Ambient sounds/forest',
    'files': [
      '0',
    ]
  },
  'rain': {
    'src': './Ambient sounds/rain',
    'files': [
      '0',
      '1',
    ]
  },
  'seagulls': {
    'src': './Ambient sounds/seagulls',
    'files': [
      '0',
    ]
  },
  'stream': {
    'src': './Ambient sounds/stream',
    'files': [
      '0',
    ]
  },
  'thunder': {
    'src': './Ambient sounds/thunder',
    'files': [
      '0',
      '1',
    ]
  },
  'wind': {
    'src': './Ambient sounds/wind',
    'files': [
      '0',
    ]
  }
}


$(document).ready(function(){

  audioDevices = {}

  for (source in audioSources){
    __createAudioDevices.call(this)
    __createChoiceBtn.call(this)
  }


  $(document).on('click', '.choice:not(.is-choice)', function(){
    __toggleStyling.call(this)

    const choice = $(this).data('choice')

    setInterval(function(){
      play15SecClip.call(this, choice)
    }, 15000)
  })
})






function fadeIn(audio, time = 5000){
  audio.volume = 0
  audio.play()
  return new Promise((resolve, reject) =>{
    $(audio).animate({volume: 1}, time, ()=> resolve());
  })
}

function fadeOut(audio, time = 5000){
  $(audio).animate({volume: 0}, time, ()=> {
    audio.pause()
    audio.src = ''
  } )
}

//
//
// Audio.prototype.fadeIn = function(time = 5000){
//   this.volume = 0
//   this.play()
//   return new Promise((resolve, reject) =>{
//     $(this).animate({volume: 1}, time, ()=> resolve());
//   })
// }
//
// Audio.prototype.fadeOut = function(time = 5000){
//   $(this).animate({volume: 0}, time, ()=> this.pause() )
// }








function __createAudioDevices(){
  audioDevices[source] = [
    new Audio(''),
    new Audio('')
  ]
}

function __createChoiceBtn(){
  const choiceBtn = $('<div>')
    .addClass('button choice')
    .data('choice', source)
    .text(source)

  $('.choices').append(choiceBtn)
}

function __toggleStyling(){
  $('.choice.is-choice').removeClass('is-choice')
  $(this).addClass('is-choice')
}

function __grabRandFile(choice){
  const randFileLoc = audioSources[choice].src
  const randFileArray = audioSources[choice].files
  const randomFileName = randFileArray[Math.floor(Math.random()*randFileArray.length)]

  return `${randFileLoc}/${randomFileName}.mp3`
}

function __grabAvailableDevice(choice){
  return audioDevices[choice].filter(device => device.paused || !device.currentTime)[0]
}

function __grabPlayingDevice(choice){
  return audioDevices[choice].filter(device => !device.paused || device.currentTime)[0]
}



function play15SecClip(choice){

  const fileToPlay = __grabRandFile.call(this, choice)

  const availableDevice = __grabAvailableDevice.call(this, choice)
  const playingDevice = __grabPlayingDevice.call(this, choice)

  fadeOut(playingDevice)

  availableDevice.src = fileToPlay

  let startPoint = ''
  const promise = new Promise((resolve, reject) => {

    if( isNaN(availableDevice.duration) ){
      $(availableDevice).one("loadedmetadata", function(){
        resolve(availableDevice.duration)
      })
    } else {
      resolve(availableDevice.duration)
    }
  })

  promise
    .then((duration)=>{
      const maxLen = Math.floor(duration) - 15
      startPoint = Math.floor(Math.random() * maxLen)

      console.log(`${fileToPlay}: ${startPoint}`)
    })
    .then(()=>{
      availableDevice.currentTime = startPoint

      fadeIn(availableDevice).then(()=>{
        setTimeout(function(){
          fadeOut(availableDevice)
        }, 10000)
      })

    })
}




















/////////////////////

//TODO: figure out 5sec fade logic
//TODO: add volume sliders
//TODO: create UI








/////////////////////
