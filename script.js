document.addEventListener('DOMContentLoaded', ()=>{
  const stage = document.getElementById('stage')
  const emojis = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','🙂','🙃','😉','😇','😍','🥰','😘','😗','😙','😚','😋','😛','😝','🤪','🤩','🤗','🤭','🤫','🤔','🤨','😐','😑','😶','🙄','😏','😣','😖','😫','😩','🥱','😴','😌','😔','😕','😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '🫠']

  function rand(min,max){return Math.random()*(max-min)+min}

  // counter state: total spawned and popped
  let totalEmojis = 0
  let poppedCount = 0

  function updateCounter(){
    const poppedEl = document.getElementById('poppedCount')
    const remainingEl = document.getElementById('remainingCount')
    if(poppedEl) poppedEl.textContent = poppedCount
    if(remainingEl) remainingEl.textContent = Math.max(0, totalEmojis - poppedCount)
    // adjust bounce behavior when few remain
    checkUrgency()
    // check special wild behavior for last two and completion
    checkWild()
  }

  // when few remain, make emojis bounce faster and higher
  let urgentMode = false
  function checkUrgency(){
    const remaining = Math.max(0, totalEmojis - poppedCount)
    if(remaining <= 5 && remaining > 0 && !urgentMode){
      setUrgentMode(true)
    }else if((remaining > 5 || remaining === 0) && urgentMode){
      setUrgentMode(false)
    }
  }

  function setUrgentMode(enabled){
    urgentMode = !!enabled
    const all = Array.from(document.querySelectorAll('.emoji'))
    for(const el of all){
      if(!el.dataset.origDur){ el.dataset.origDur = el.style.animationDuration || '1.2s' }
      if(enabled){
        const orig = parseFloat(el.dataset.origDur) || 1.2
        const sped = Math.max(0.18, (orig * 0.42)).toFixed(2) + 's'
        el.style.animationDuration = sped
        el.classList.add('big-bounce')
      }else{
        el.style.animationDuration = el.dataset.origDur
        el.classList.remove('big-bounce')
      }
    }
  }

  // --- wild-mode for last two emojis: make them dart around ---
  const wildHandles = new Map() // el -> interval id

  function startWildFor(el){
    if(!el || wildHandles.has(el)) return
    el.classList.add('wild')
    // rapid movement to make them elusive
    el.style.transition = 'left 160ms ease-out, top 160ms ease-out'

    const interval = setInterval(()=>{
      // only move if element still in DOM
      if(!document.body.contains(el)) return stopWildFor(el)
      const stageRect = stage.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const maxX = Math.max(0, stageRect.width - elRect.width)
      const maxY = Math.max(0, stageRect.height - elRect.height)

      // localize movement: pick a nearby target instead of teleporting across whole stage
      const curX = Math.round(elRect.left - stageRect.left)
      const curY = Math.round(elRect.top - stageRect.top)
      const step = Math.min(140, stageRect.width * 0.35) // responsive steps
      const nx = Math.min(maxX, Math.max(0, Math.floor(curX + rand(-step, step))))
      const ny = Math.min(maxY, Math.max(0, Math.floor(curY + rand(-step, step))))

      el.style.left = nx + 'px'
      el.style.top = ny + 'px'
    }, 360) // 160ms transition + 300ms wait

    wildHandles.set(el, interval)
  }

  function stopWildFor(el){
    if(!el) return
    el.classList.remove('wild')
    if(wildHandles.has(el)){
      clearInterval(wildHandles.get(el))
      wildHandles.delete(el)
    }
    // remove our temporary transition after a short delay so bounce restores cleanly
    setTimeout(()=>{
      try{ el.style.transition = '' }catch(e){}
    }, 220)
  }

  function enableWildMode(enabled){
    const remaining = Math.max(0, totalEmojis - poppedCount)
    if(enabled){
      const cand = Array.from(stage.querySelectorAll('.emoji:not(.pop):not(.popping)'))
      // take up to two elements (prefer largest visible ones)
      const targets = cand.slice(0,2)
      for(const el of targets) startWildFor(el)
    }else{
      // stop all wild handles
      for(const el of Array.from(wildHandles.keys())) stopWildFor(el)
    }
  }

  function checkWild(){
    const remaining = Math.max(0, totalEmojis - poppedCount)
    if(remaining <= 2 && remaining > 0){
      enableWildMode(true)
    }else{
      enableWildMode(false)
    }

    if(remaining === 0){
      showCongrats()
    }
  }

  // show congrats tab when completed
  function showCongrats(){
    const tab = document.getElementById('congratsTab')
    if(!tab) return
    
    // Replace content with "Bhai Waah...." and a Refresh button
    const inner = tab.querySelector('.congrats-inner')
    if(inner){
      inner.innerHTML = `
        <div class="congrats-msg">Waah! Bahut Tej Hai Tu..</div>
        <button class="refresh-btn" onclick="location.reload()">Refresh</button>
      `
    }

    tab.setAttribute('aria-hidden','false')
    tab.classList.add('show')
  }

  // create a lightweight WebAudio pop generator (no external files)
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  const audioCtx = AudioCtx ? new AudioCtx() : null

  function playPopSound(){
    if(!audioCtx) return
    if(audioCtx.state === 'suspended') audioCtx.resume().catch(()=>{})
    const now = audioCtx.currentTime

    // short filtered noise burst (the fizzy part of the bubble)
    const noiseDur = 0.035
    const noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * noiseDur, audioCtx.sampleRate)
    const noiseData = noiseBuf.getChannelData(0)
    for(let i=0;i<noiseData.length;i++){
      // stronger at the start, rapid decay
      noiseData[i] = (Math.random()*2 - 1) * Math.exp(-i/(audioCtx.sampleRate * 0.007))
    }
    const noiseSrc = audioCtx.createBufferSource()
    noiseSrc.buffer = noiseBuf
    const noiseLP = audioCtx.createBiquadFilter()
    noiseLP.type = 'lowpass'
    noiseLP.frequency.value = 2200
    const noiseGain = audioCtx.createGain()
    noiseGain.gain.setValueAtTime(0.0001, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.9, now + 0.002)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    // a short descending sine gives the cartoon 'pop' character
    const osc = audioCtx.createOscillator()
    osc.type = 'sine'
    const oscGain = audioCtx.createGain()
    osc.frequency.setValueAtTime(1200, now)
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.12)
    oscGain.gain.setValueAtTime(0.0001, now)
    oscGain.gain.exponentialRampToValueAtTime(1.0, now + 0.003)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)

    // a resonant band to make it more 'bubbly'
    const band = audioCtx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 700
    band.Q.value = 6

    // mix and output
    noiseSrc.connect(noiseLP).connect(noiseGain)
    osc.connect(band).connect(oscGain)
    const master = audioCtx.createGain()
    master.gain.value = 0.9
    noiseGain.connect(master)
    oscGain.connect(master)
    master.connect(audioCtx.destination)

    noiseSrc.start(now)
    noiseSrc.stop(now + noiseDur)
    osc.start(now)
    osc.stop(now + 0.18)

    // cleanup references shortly after playback
    setTimeout(()=>{
      try{
        noiseSrc.disconnect(); noiseLP.disconnect(); noiseGain.disconnect();
        osc.disconnect(); band.disconnect(); oscGain.disconnect(); master.disconnect();
      }catch(e){}
    }, 400)
  }

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
      // on mobile, ensure min size is tappable (42px+) but max isn't too huge
      const isMobile = window.innerWidth < 500
      const size = Math.floor(rand(isMobile?42:28, isMobile?80:96))
      el.style.fontSize = size+'px'
      el.style.opacity = rand(0.8,1)
      el.style.setProperty('--dur', (rand(0.9,2.2)).toFixed(2)+'s')
      el.style.animationDuration = el.style.getPropertyValue('--dur')
      // remember original duration so urgent mode can restore it
      el.dataset.origDur = el.style.animationDuration || ''
      el.style.animationDelay = (rand(0,2)).toFixed(2)+'s'
      el.style.position = 'absolute'
      el.style.visibility = 'hidden'
      stage.appendChild(el)

      // update counters
      totalEmojis += 1
      updateCounter()

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

      el.addEventListener('click', (ev)=>{
        if(el.classList.contains('popping')) return
        el.classList.add('popping')

        // increment counters immediately for responsive UI
        poppedCount = Math.min(totalEmojis, poppedCount + 1)
        updateCounter()
        // play pop sound
        try{ playPopSound() }catch(e){}
        // disable further interaction
        el.style.pointerEvents = 'none'
        // stop the bounce animation so transforms from the pop class apply
        el.style.animation = 'none'
        // if this emoji was in wild-mode, stop its wild movement
        try{ stopWildFor(el) }catch(e){}
        // force style flush then add pop class for transition
        requestAnimationFrame(()=>{
          el.classList.add('pop')
          // remove element after the pop transition completes
          setTimeout(()=>{ el.remove() }, 220)
        })
      })
    }
  }

  // spawn initial batch
  spawn(22)

  // click anywhere to add more
  document.body.addEventListener('click', (e)=>{
    if(e.target.id === 'stage' || e.target === document.body) spawn(6)
  })

})

// --- change background hue every 2 seconds with smooth CSS transition ---
/* background is now fixed beige; removed hue-changing interval */
