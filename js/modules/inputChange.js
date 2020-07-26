import completeList from './completeList.js'

const inputChange = () => {
  
  let cards = document.querySelector('.row-cards')
  let inputs = cards.getElementsByTagName('textarea')
  let content

  for (let item of inputs){

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter'){
         e.path[0].blur()
      }

    })

    item.addEventListener('focus', (e) => {
      content = e.path[1].textContent

      if (content.length > 0) {
        item.value = content
      }
    })

    item.addEventListener('blur', (e) => {

      let li = e.path[1]
      let val = e.path[0].value
      

      // console.log(e.path[0].classList)
      if (val.length >= 1) {
        e.path[0].blur()
        li.textContent = val
        e.path[0].remove()
        li.classList.add('list__complete')
        
        
      } else if (val.length === 0 && e.path[1].classList.contains('li__text') && e.path[2].querySelectorAll('li').length > 1 && li.textContent.length < 1){
        li.classList.add('list_fadeOut')
        let liStyle = getComputedStyle(li)
        let time = liStyle.animationDuration
        time = parseFloat(time)
        setTimeout(() => {
          e.path[1].remove()

        }, time * 1000 - 15);
      }
      

    })

  }



}

export default inputChange