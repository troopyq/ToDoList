

const inputChange = () => {
  
  let cards = document.querySelector('.row-cards')
  let inputs = cards.getElementsByTagName('textarea')


  for (let item of inputs){

    item.addEventListener('blur', (e) => {

      let li = e.path[1]
      let val = e.path[0].value
      console.log(e.path[0].classList)
      if (val.length >= 1) {
        e.path[0].blur()
        e.path[0].remove()
        li.textContent = val
        li.classList.add('list__complete')
      } else if (val.length === 0 && e.path[2].classList.contains('list__ol') && cards.querySelectorAll('ol li').length > 1){
        e.path[1].remove()
      }

    })

  }



}

export default inputChange