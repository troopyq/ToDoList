import inputChange from './inputChange.js'

const addList = () => {
  


  cards.addEventListener('click', e => {
    let addBtn = document.querySelectorAll('.item__btn_add')
    let target = e.target
    

    addBtn.forEach((btn) => {

      if (target == btn || target == btn.firstElementChild){
        

        let inputs = document.querySelectorAll('.block textarea')
        inputs.forEach(item => {
          item.removeAttribute('autofocus')
        })

        let list = btn.closest('.block').querySelector('.list__ol')
        let li = document.createElement('li')
        let input = document.createElement('textarea')
        input.className = 'list__input'
        li.className = 'item__text'
        input.setAttribute('placeholder', 'Название дела') 
        input.setAttribute('autofocus', true)
        

        
        list.append(li)

        li.append(input)
        input.focus() 
        inputChange(btn.closest('.block'))

      }

    }) // forEach addBtn

  }) //body LISTENER



}

export default addList