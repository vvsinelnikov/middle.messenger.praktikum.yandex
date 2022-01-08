const template = `
    <div class="home">
        <div class="home__left">
            <a href="profile.html" class="home__nav">Профиль</a>
            <div class="home__searchbox">
                <input class="searchbox" placeholder="Поиск" type="text">
            </div>
            <ul class="messages-list">
                <li class="snippet"><div class="snippet__body">
                    <div class="snippet__avatar"></div>
                    <h2 class="snippet__title">Андрей</h2>
                    <span class="snippet__text">Изображение</span>
                    <div class="snippet__time">10:49</div>
                    <div class="snippet__count">2</div>   
                </div></li>
                <li class="snippet snippet_active"><div class="snippet__body">
                    <div class="snippet__avatar"></div>
                    <h2 class="snippet__title">Design Destroyer</h2>
                    <span class="snippet__text snippet__text_my">Друзья, у меня для вас особенный выпуск новостей!...</span>
                    <div class="snippet__time">Пт</div>
                    <div class="snippet__count"></div>   
                </div></li>
                
            </ul>
        </div>
        <div class="home__right">
        
<!--            <p class="home_text">Выберите чат, чтобы отправить сообщение</p>-->
            
            <div class="chat">
                <div class="chat__header">
                    <div class="chat__avatar"></div>
                    <h2 class="chat__title">Вадим</h2>
                    <nav class="chat__menu"></nav>
                </div>
                <div class="chat__body">
                    <h3 class="chat__date">19 июня</h3>
                    <div class="chat__message chat__message_inbound">
                        <p class="chat__text">Привет!</p>
                        <span class="chat__time">11:56</span>
                    </div>
                    <div class="chat__message chat__message_inbound">
                        <p class="chat__text">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. 
                        
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
                        <span class="chat__time">11:56</span>
                    </div>
                    <div class="chat__message chat__message_inbound">
                        <div class="chat__image"></div>                        
                        <span class="chat__time">11:57</span>
                    </div>
                    <div class="chat__message chat__message_oubound chat__message_read">
                        <p class="chat__text">Круто!</p>
                        <span class="chat__time">12:02</span>
                    </div>
                    <div class="chat__message chat__message_oubound chat__message_read">
                        <p class="chat__text">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. 
                        
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
                        <span class="chat__time">12:03</span>
                    </div>
                    <h3 class="chat__date">20 июня</h3>
                    <div class="chat__message chat__message_inbound">
                        <p class="chat__text">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.</p>
                        <span class="chat__time">17:02</span>
                    </div>
                </div>
                <div class="chat__controls">
                    <nav class="chat__attach-button"></nav>
                    <input type="text" placeholder="Сообщение" class="chat__input">
                    <input type="submit" value="" class="chat__send-button">
                </div>
            </div>
            
            
        </div>
    </div>
`
export default template;