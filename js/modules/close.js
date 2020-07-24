import calcScroll from './calcScroll.js'

const closeCard = (selector, animTime = 1, transTime = 1) => {  

  let scrollWindow = calcScroll()
  let widthWindow = {}
  widthWindow.w = document.body.offsetWidth + scrollWindow
  console.log(widthWindow.w)
  window.addEventListener('resize', () => {
    widthWindow.w = document.body.offsetWidth + scrollWindow
    console.log(widthWindow.w)
  })

  function getSupportedPropertyName(properties) {
    for (let i = 0; i < properties.length; i++) {
      if (typeof document.body.style[properties[i]] != "undefined") {
        return properties[i];
      }
    }
    return null;
  }


  let transform = ["transform",
                   "msTransform",
                   "webkitTransform",
                   "mozTransform",
                   "oTransform"];

  let transformProperty = getSupportedPropertyName(transform);


  document.querySelector('body').addEventListener('click', (e) => {

    const del = document.querySelectorAll(selector);

    del.forEach((item, id) => {
      const target = e.target

      if (target === item) {
        let block = item.closest('.block');
        let h = {}
        
        h.hBlock = block.offsetHeight
        h.tBlock = block.offsetTop

        block.classList.add('closeAnim')
        block.style.animationDuration = `${animTime}s`
        


        

        for (let i = 0; i < del.length; i++){
          let item = del[i].closest('.block')

          // if (id === i){
          //   continue
          // }
          if ( item.offsetTop !== h.tBlock ){
            continue
          }else if (h.hMax === undefined) {
            h.hMax = del[i].closest('.block').offsetHeight
            h.upd = false
            h.diff = h.hBlock - h.hMax
          }
          
          let itNext = del[i + 1]

          if (itNext != undefined){
            let itemNext = itNext.closest('.block')
            if (itemNext.offsetLeft === 0){
              h.hNext = itemNext.offsetHeight
            }
          }

          if (id !== i){
            let hItem = item.offsetHeight
            h.hItem = hItem
          }

          if (h.hMax < h.hItem && id !== i) {
            console.log('item')
            h.hMax = h.hItem
            h.upd = true
            
          } 

          if (h.hMax < h.hNext && id !== i ){
            console.log('next')
            h.hMax = h.hNext
            h.upd = true

          }else if (h.hItem < h.hNext){
            console.log('end')
            h.hMax = h.hNext
            h.upd = true
          }else if (h.hMax > h.hNext){
            h.upd = false
          }




          
          



          // if (del[i + 1].closest('.block') != undefined 
          //     && del[i + 1].closest('.block').offsetTop != h.tBlock 
          //     && del[i + 1].closest('.block').offsetLeft){
            
          //   h.last = true
          // }

          // let isUnd = del[i + 1] != undefined
          
          // if (isUnd) {
          //   let itemNext = del[i + 1].closest('.block')
          //   let leftNext = itemNext.offsetLeft
          //   let heightNext_2 = itemNext.offsetHeight

          //   if (leftNext === 0) {
          //     let heightNext = itemNext.offsetHeight
              
          //     h.hNext = heightNext
          //   }

            // let hItem = item.offsetHeight

            // // if (hItem > h.hMax){
            // //   h.hMax = hItem
              
            // // }
            // // if (h.hNext > h.hMax) {
            // //   h.hMax = h.hNext
            // // }
            
            // // if (h.hBlock < h.hNext){
            // //   h.hMax = h.hNext
            // // }
            // // if (h.last && h.hBlock > h.hNext ){
            // //   h.hMax = h.hBlock
            // // }

            // if (hItem > h.hMax) {
            //   h.hMax = hItem
            // }
            // if (h.hNext > h.hMax){
            //   h.hMax = h.hNext
            // }

          // } 

          

          

          // let hItem = item.offsetHeight

          // console.log(hItem)

          // if (h.hBlock < hItem) {
          //   h.hMax = hItem
          // }

          // if (hItem < h.hBlock) {
          //   h.diff = h.hBlock - hItem 
          //   h.hMin = hItem
          //   if (h.hNext > hItem){
          //     h.diff -= h.hNext - hItem
          //   }
            
            
          // }
          
          
          // if (h.min <= hItem && hItem < h.hMax){
          //   h.hMed = hItem
          //   // h.diff += h.hMed
          // }

          

          
          

        }
        
        if (!h.upd){
          console.log(h.upd)
        }else {
          console.log(h.upd)
          h.diff = h.hBlock - h.hMax
        }
        
        console.log('max - '+ h.hMax + ';  id - ' )
        console.log('del - ' + h.hBlock + ';  id - ' )

        // h.diff += h.hMed 
        console.log('diff - '+h.diff)

        for (let i = del.length - 1; i > id; i--){
          let it = del[i].closest('.block')
          let prev = del[i-1].closest('.block')
          let tPrev = prev.offsetTop

          let prop = {}
          prop.ofLeft = 0
          prop.ofTop = 0

          prop.prevTop = prev.offsetTop
          prop.prevLeft = prev.offsetLeft
          prop.itTop = it.offsetTop
          prop.itLeft = it.offsetLeft
          

          if (prop.itLeft <= prop.prevLeft){
            prop.ofLeft += -(prop.prevLeft - prop.itLeft)
          } else{
            prop.ofLeft += prop.itLeft - prop.prevLeft
          }
          if (prop.itTop >= prop.prevTop){
            prop.ofTop += prop.itTop - prop.prevTop
          } else{
            prop.ofTop += 0
          }

          // console.log(prop)

          if (transformProperty) {
            it.style.transition = `transform ${transTime}s ease-in-out`
            it.style[transformProperty] = `translate3d(${-prop.ofLeft}px, ${h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -(prop.ofTop)}px, 0px)`
            // console.log(it.style)

            // console.log(prop.ofTop + h.diff)
          }

          

        }

        // ---------------------


        block.addEventListener('animationend', () => {
          console.log('cancel')
        })
        

        setTimeout(() => {
          
          block.style.opacity = '0'
          block.style.visibility = 'hidden'

          del.forEach((item, id2) => {
            let card = item.closest('.block')
            let i2 = id2 + 1
            let i = id + 1

            if (i2 != i) {
              card.style.order = `${i - 1}`

              if (transformProperty) {
                card.style.transition = 'none'
                card.style[transformProperty] = `translate3d(0px, 0px, 0px)`

              }
            }

          })


          block.remove()
        

        }, transTime*1000 - 10);
      }
    })

  })

}

export default closeCard