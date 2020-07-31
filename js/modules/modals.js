function modals ()  {
  const bindModals = (triggerSelector, modalSelector, closeSelector, closeClckOverlay = true) => {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('.popup')

    let scroll = calcScroll()

    function calcScroll() {
      let div = document.createElement('div')
      div.style.width = '50px'
      div.style.height = '50px'
      div.style.overflowY = 'scroll'

      document.body.appendChild(div)
      let scrollWidth = div.offsetWidth - div.clientWidth

      return scrollWidth
    }

    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) e.preventDefault();

        windows.forEach(item => {
          item.style.display = 'none'
        })

        scroll = calcScroll()
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scroll}px`
        document.querySelector('header').style.paddingRight = `${scroll}px`

      })
    })

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none'
      })
      modal.style.display = 'none'
      document.body.style.overflow = ''
      document.body.style.paddingRight = `0px`
      document.querySelector('header').style.paddingRight = `0px`

    })

    modal.addEventListener('mousedown', (e) => {

      if ((e.target === modal) && closeClckOverlay) {
        modal.style.display = 'none'
        document.body.style.overflow = ''
        document.body.style.paddingRight = `0px`
        document.querySelector('header').style.paddingRight = `0px`

        windows.forEach(item => {
          item.style.display = 'none'
        })
      }
    })
  }


  bindModals('.login', '.popup__signin', '.popup__signin .popup__close')
  bindModals('.a__signup', '.popup__signup', '.popup__signup .popup__close')
  bindModals('.a__signin', '.popup__signin', '.popup__signin .popup__close')

}
// export default modals