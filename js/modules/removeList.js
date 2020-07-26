const removeList = () => {

  cards.addEventListener('click', e => {
    let target = e.target
    let delBtn = document.querySelectorAll('.item__btn_delete')

    delBtn.forEach(btn => {
      if (target === btn || target === btn.firstElementChild){

        let lists = btn.closest('.block').querySelectorAll('.list__ol .item__text')

        if (lists.length === 0){
          btn.classList.remove('item__btn_delete-active')
        }

        

        lists.forEach((li, id) => {

          if (li.classList.contains('list__complete') || li.classList.contains('list__delete')){
            btn.classList.toggle('item__btn_delete-active')
            li.classList.toggle('list__complete')
            li.classList.toggle('list__delete')
            li.addEventListener('click', () => {
              if (li.classList.contains('list__delete')) {
                li.style.transition = 'all 0.1s ease-in-out'
                li.style.marginTop = `${-li.offsetHeight}px`
                li.style.opacity = '0'
                li.remove()
              }
            })
          }
        })

      }

    })

  })

}

export default removeList