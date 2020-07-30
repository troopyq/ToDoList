<?php 
  session_start();

?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,
                                    initial-scale=1,
                                     maximum-scale=1,
                                      user-scalable=0,
                                       shrink-to-fit=no">
  <title>To Do List</title>
  <link rel="stylesheet" href="css/style.css?v=3">
</head>
<body>
  <header>
    <div class="container">
      <div class="row">
        <div class="logo"><span class="logo__span">To Do List</span></div>
        

        <? if (!$_SESSION['user']): ?>
        <div class="login header__btn-log"><span>Войти</span></div>
        <? else:?>
        <div class="profile">
          <span class="header__btn-log">Профиль</span>
          <div class="profile__header open__profile">
            <span class="profile__login profile__text">
              <div class="profile__img"><img src="" alt=""></div>
              <?= $_SESSION['user']['login']?></span>
            <span class="profile__email profile__text"><?= $_SESSION['user']['email']?></span>
            <form id="logout" action="vendor/logout.php">
              <button class="profile__text" type="submit">Выход</button>
            </form>
          </div>
        </div>
        <? endif;?>

        <div class="btn__add-card">+</div>

      </div>
    </div>
  </header> <!-- /header -->

  <main>
    <div class="container">
      <div id="cards" class="row row-cards">

      <? if ($_SESSION['user']): ?>

        <div class="block block_fadeIn">
          <div class="block__item item">
            <div class="item__title title">
              <h3 class="title__text item__text">
                <?=  $_SESSION['user']['data']; ?>
              </h3>
              <div class="item__header">
                <span class="item__close item__header-btn">&amp;#8212;</span>
                <span class="item__delete item__header-btn">✖</span>
              </div>
            </div>
            <div class="item__list list">
              <ol class="list__ol">
                <li class="item__text li__text list__complete">
                  <textarea class="list__input" placeholder="Название дела" maxlength="120"></textarea>
                </li>
              </ol>
            </div>
            <div class="item__btn">
              <div class="item__btn_rename item__btn_style"></div>
              <div class="item__btn_delete item__btn_style"><p>--</p></div>
              <div class="item__btn_add item__btn_style"><p>+</p></div>
            </div>
          </div>
        </div>




      </div>
    </div>
  </main> <!-- /main -->

  <footer>

  </footer>

  <div class="popup popup__signin">
    <div class="popup__block">
      <div class="popup__close">&#10006;</div>
      <form id="signin" class="popup__form" action="vendor/signin.php" method="post">
        <button class="item__btn_style" tabindex="3" type="submit">Войти</button>
        <input id="password" tabindex="2" type="password" name="password" placeholder="Введите пароль">
        <label for="password">Пароль</label>
        <input id="login" tabindex="1" type="text" name="login" placeholder="Введите логин или email">
        <label for="login">Логин</label>
      </form>
      <div class="popup__subtitle">
        <p>Еще не зарегестрировались? <a class="a__signup" href="">Регистрация</a></p>
      </div>
    </div>
  </div>

  <div class="popup popup__signup">
    <div class="popup__block">
      <div class="popup__close">&#10006;</div>
      <form id="signup" class="popup__form" action="vendor/signup.php" method="post">
        <button class="item__btn_style" tabindex="5" type="submit">Зарегестрироваться</button>
        <input id="password_up_confirm" tabindex="4" autocomplete="new-password" type="password" name="password_confirm" placeholder="Повторите пароль">
        <input id="password_up" tabindex="3" autocomplete="new-password" type="password" name="password" placeholder="Введите пароль">
        <label for="password_up">Пароль</label>
        <input id="email_up" tabindex="2" autocomplete="off" type="email" name="email" placeholder="Введите email">
        <label for="email_up">Email</label>
        <input id="login_up" tabindex="1" autocomplete="off" type="text" name="login" placeholder="Введите логин">
        <label for="login_up">Логин</label>
      </form>
      <div class="popup__subtitle">
        <p>Уже есть аккаунт? <a class="a__signin" href="">Войти</a></p>
      </div>
    </div>
  </div>

  <script src="js/script.js?v=3" type='module'></script>

</body>
</html>