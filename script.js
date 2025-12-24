document.addEventListener('DOMContentLoaded', ()=>{
  const stage = document.getElementById('stage')
  const emojis = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','🙂','🙃','😉','😇','😍','🥰','😘','😗','😙','😚','😋','😛','😝','🤪','🤩','🤗','🤭','🤫','🤔','🤨','😐','😑','😶','🙄','😏','😣','😖','😫','😩','🥱','😴','😌','😔','😕','😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '🫠']

  function rand(min,max){return Math.random()*(max-min)+min}

  function spawn(count=20){
    for(let i=0;i<count;i++){
      const el = document.createElement('span')
      el.className = 'emoji'
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)]
      const size = Math.floor(rand(28,96))
      el.style.fontSize = size+'px'
      el.style.left = rand(2,92) + '%'
      el.style.top = rand(10,80) + '%'
      el.style.opacity = rand(0.8,1)
      el.style.setProperty('--dur', (rand(0.9,2.2)).toFixed(2)+'s')
      el.style.animationDuration = el.style.getPropertyValue('--dur')
      el.style.animationDelay = (rand(0,2)).toFixed(2)+'s'
      el.addEventListener('click', ()=>{ el.remove() })
      stage.appendChild(el)
    }
  }

  spawn(22)

  // click anywhere to add more
  document.body.addEventListener('click', (e)=>{
    if(e.target.id === 'stage' || e.target === document.body) spawn(6)
  })

})

// --- change background hue every 2 seconds with smooth CSS transition ---
/* background is now fixed beige; removed hue-changing interval */

