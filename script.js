document.addEventListener('DOMContentLoaded', ()=>{
  const stage = document.getElementById('stage')
  const emojis = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','🙂','🙃','😉','😇','😍','🥰','😘','😗','😙','😚','😋','😛','😝','🤪','🤩','🤗','🤭','🤫','🤔','🤨','😐','😑','😶','🙄','😏','😣','😖','😫','😩','🥱','😴','😌','😔','😕','😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '🫠']

  function rand(min,max){return Math.random()*(max-min)+min}

  function spawn(count=20){
    const stageRect = stage.getBoundingClientRect()
    // collect existing emoji rects to avoid overlaps
    const existing = Array.from(stage.querySelectorAll('.emoji')).map(e=>e.getBoundingClientRect())

    function isOverlapping(r, others, padding=8){
      return others.some(o => {
        return !(r.right + padding < o.left || r.left - padding > o.right || r.bottom + padding < o.top || r.top - padding > o.bottom)
      })
    }

    for(let i=0;i<count;i++){
      const el = document.createElement('span')
      el.className = 'emoji'
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)]
      const size = Math.floor(rand(28,96))
      el.style.fontSize = size+'px'
      el.style.opacity = rand(0.8,1)
      el.style.setProperty('--dur', (rand(0.9,2.2)).toFixed(2)+'s')
      el.style.animationDuration = el.style.getPropertyValue('--dur')
      el.style.animationDelay = (rand(0,2)).toFixed(2)+'s'
      el.style.position = 'absolute'
      el.style.visibility = 'hidden'
      stage.appendChild(el)

      // measure element size
      const elRect = el.getBoundingClientRect()
      const elW = elRect.width
      const elH = elRect.height

      // try to find a non-overlapping position
      let placed = false
      const maxAttempts = 60
      let attempt = 0
      let lastPos = {x: 0, y: 0}

      while(!placed && attempt < maxAttempts){
        attempt++
        const x = Math.floor(rand(0, Math.max(0, stageRect.width - elW)))
        const y = Math.floor(rand(0, Math.max(0, stageRect.height - elH)))
        lastPos = {x,y}

        const candidateRect = {
          left: stageRect.left + x,
          top: stageRect.top + y,
          right: stageRect.left + x + elW,
          bottom: stageRect.top + y + elH
        }

        if(!isOverlapping(candidateRect, existing)){
          // place here
          el.style.left = x + 'px'
          el.style.top = y + 'px'
          el.style.visibility = 'visible'
          existing.push(candidateRect)
          placed = true
          break
        }
      }

      if(!placed){
        // fallback: place at last tried position even if overlapping
        el.style.left = lastPos.x + 'px'
        el.style.top = lastPos.y + 'px'
        el.style.visibility = 'visible'
        existing.push({left: stageRect.left + lastPos.x, top: stageRect.top + lastPos.y, right: stageRect.left + lastPos.x + elW, bottom: stageRect.top + lastPos.y + elH})
      }

      el.addEventListener('click', ()=>{ el.remove() })
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

