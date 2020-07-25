import calcScroll from './calcScroll.js'
import difference from './difference.js'


const closeCard = (selector, animTime = 1, transTime = 1) => {  

  let scrollWindow = calcScroll()
  let widthWindow = {}
  widthWindow.w = document.body.offsetWidth + scrollWindow
  console.log(widthWindow.w)
  window.addEventListener('resize', () => {
    widthWindow.w = document.body.offsetWidth + scrollWindow
    console.log(widthWindow.w)
  })
  let mobile = widthWindow.w < 840 ? true : false;

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
        h.tBlock = block.offsetTop
        h.diff = difference(block, id, del, true)

        block.classList.add('closeAnim')
        block.style.animationDuration = `${animTime}s`



        if (!mobile) {
          for (let i = del.length - 1; i > id; i--) {
            let it = del[i].closest('.block')
            let prev = del[i - 1].closest('.block')
            let tPrev = prev.offsetTop

            let prop = {}
            prop.ofLeft = 0
            prop.ofTop = 0

            prop.prevTop = prev.offsetTop
            prop.prevLeft = prev.offsetLeft
            prop.itTop = it.offsetTop
            prop.itLeft = it.offsetLeft

            if (prop.itLeft <= prop.prevLeft) {
              prop.ofLeft += -(prop.prevLeft - prop.itLeft)
            } else {
              prop.ofLeft += prop.itLeft - prop.prevLeft
            }
            if (prop.itTop >= prop.prevTop) {
              prop.ofTop += prop.itTop - prop.prevTop
            } else {
              prop.ofTop += 0
            }

            if (transformProperty) {
              it.style.transition = `transform ${transTime}s ease-in-out`
              it.style[transformProperty] = `translate3d(${-prop.ofLeft}px, ${h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -(prop.ofTop)}px, 0px)`

            }

          }

        } else {
          for (let i = del.length - 1; i > id; i--) {
            let it = del[i].closest('.block')
            
            if (transformProperty) {
              it.style.transition = `transform ${transTime}s ease-in-out`
              it.style[transformProperty] = `translate3d(0px, ${-(h.diff)}px, 0px)`
            }
          }

        }



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