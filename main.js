
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
  }
}


$(document).ready(function(){

  audioDevices = {}

  for (source in audioSources){
    __createAudioDevices.call(this)
    __createChoiceBtn.call(this)
  }


  // by listening to document, we can make sure the event doesn't
  // get triggered from the current choice. don't have to unload events.
  $(document).on('click', '.choice:not(.is-choice)', function(){
    __toggleStyling.call(this)

    //event loop

    const choice = $(this).data('choice')
    const fileToPlay = __grabRandFile.call(this, choice)

    // grab first available device for that choice
    const availableDevice = __grabAvailableDevice.call(this, choice)
    availableDevice.fadeOut()

    // grab random 15 seconds ( see below )

    availableDevice.src = fileToPlay
    // availableDevice.load()

    let startPoint = ''

    let loadPromise = new Promise((resolve, reject) => {
      $(availableDevice).one("loadingmetadata", function(){
        resolve(availableDevice.duration)
      })
    })

    loadPromise.then((duration) => {
      const maxLen = Math.floor(duration) - 15
      startPoint = Math.floor(Math.random() * maxLen)
      availableDevice.currentTime = startPoint
      availableDevice.fadeIn()
    })











return;


    $(availableDevice).one("loadedmetadata", function(){
      // console.log(availableDevice.duration)
      const duration = availableDevice.duration
      const maxLen = Math.floor(duration) - 15
      startPoint = Math.floor(Math.random() * maxLen)

      // console.log(startPoint)
      availableDevice.currentTime = startPoint
      availableDevice.fadeIn()

      setTimeout(function(){
        availableDevice.fadeOut()
      }, 10000)
    });

      //do audio legnth math to find starting point
      //set audio starting point
      // set timeout for 10s(fadeout)
      //fade audio device in


    // set new source, fade in

    // check if other device is playing
      // if yes, fade out




    // console.log(!currentlyPlaying.paused || currentlyPlaying.currentTime)
    // console.log(audioDevices[choice])
    return;
    let availableDevices = audioDevices[choice].filter(device => device.paused || !device.currentTime)
    console.log(audioDevices[choice].filter(device => !device.paused || device.currentTime))

    if(!currentlyPlaying.paused || currentlyPlaying.currentTime){
      currentlyPlaying.fadeOut(10000)
    }

    currentlyPlaying = new Audio(`${randFileLoc}/${randomFileName}.mp3`)
    currentlyPlaying.fadeIn(10000)
  })


  //every 5 seconds: 5 second warmup, 5 second playing, 5 second cooldown: 15 seconds total

  //get new file from same array

  // grab a 15 second clip from the file

    //get file length

    // subtract 15 seconds from file length

    // get random time between 0 and subtraction above

    // create new audio, set starting time to math above

  // fade in for 5 seconds

  // play for 5 seconds

  // grab new 15 second clip from new file

  // fade out first file

  // fade in second file


})


Audio.prototype.fadeIn = function(time = 5000){
  this.volume = 0
  this.play()
  $(this).animate({volume: 1}, time);
}

Audio.prototype.fadeOut = function(time = 5000){
  $(this).animate({volume: 0}, time, ()=> this.pause() )
}








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
