console.log('javascript running')

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded')
  var explosiveWire = []
  var countDown
  var wireCount = 0
  var time = 60

// Play siren
// Countdoewn timer
  countDown = setInterval(function () {
    time = ((time * 100 - 0.01 * 100) / 100).toFixed(2)
    $('#timer').text('00:00:' + time)
    if (time <= 0) {
      isGameOver(1)
    }
  }, 10)

// Generate random explosive wire
  function explosiveGenerator () {
    var num
    var counter = 0
    while (counter < 2) {
      num = Math.ceil(Math.random() * (5))
      if (explosiveWire.includes(num) !== true) {
        explosiveWire.push(num)
        counter += 1
      }
    }
  }
  explosiveGenerator()
  console.log(explosiveWire)

// Bomb click
  $('.wire').click(function () {
    var wire = ($('.wire').index(this) + 1)// event.target.id[event.target.id.length - 1]
    if ($.isNumeric(wire) && $('body').hasClass('unexploded')) {
      wireCount += 1
      checkExplosion(wire)
      $('#uncut-' + wire).removeAttr('id', 'uncut-' + wire)
    .attr('id', 'cut-' + wire)
      $('<audio></audio>').attr({
        'id': 'electricity',
        'src': 'sounds/Electricity.wav',
        'autoplay': 'autoplay'
      }).appendTo('body')
      timeout = setTimeout(function () {
        $('#electricity').remove()
      }, 500)
    }
  })

// Reset button
  $('#reset').click(function (event) {
    location.reload()
  })

// Check explosive logic
  function checkExplosion (explosive) {
    console.log('explosive input', explosive)
    console.log('check', explosiveWire)
    if (explosiveWire.includes(parseInt(explosive)) === true) {
      console.log('The city exploded')
      isGameOver(1)
    } else if (wireCount === 3) {
      console.log('The city is safe')
      isGameOver(2)
    }
  }

// GameOver function to stop the timer

  function isGameOver (x) {
    clearInterval(countDown)
    if (x === 1) {
      $('body').addClass('exploded')
      .removeClass('unexploded')
      $('<audio></audio>').attr({
        'src': 'sounds/BldgExplode.wav',
        'autoplay': 'autoplay'
      }).appendTo('body')
      $('#siren').remove()
    } else {
      $('#siren').remove()
      $('<audio></audio>').attr({
        'src': 'sounds/CrowdYay.wav',
        'autoplay': 'autoplay'
      }).appendTo('body')
      $('<audio></audio>').attr({
        'src': 'sounds/success.ogg',
        'autoplay': 'autoplay'
      }).appendTo('body')
    }
  }
})
