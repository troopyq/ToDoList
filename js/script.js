import closeCard from '../js/modules/closeCard.js';
import addCard from '../js/modules/addCard.js';
import inputChange from '../js/modules/inputChange.js';
import addList from '../js/modules/addList.js';
import removeList from '../js/modules/removeList.js';
import renameList from '../js/modules/renameList.js';
// import scrollTo from '../js/modules/scrollToInput.js'
import completeList from '../js/modules/completeList.js';
import validation from './modules/validation.js';
import modals from './modules/modals.js';
import openProfile from './modules/openProfile.js';


document.addEventListener('DOMContentLoaded', () => {

  closeCard('.item__delete', 0.5, 0.75)

  addCard('.btn__add-card','.row-cards')

  inputChange()

  addList()

  removeList()

  renameList()

  completeList()

  validation()

  modals()

  openProfile('.profile .header__btn-log', '.profile__header')


})
