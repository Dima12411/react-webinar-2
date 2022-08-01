import React, { useState } from 'react';
import { counter } from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App( { store } ) {
    // Выбор состояния из store
    const { items } = store.getState();
    const [ num, setNum ] = useState(0)
    const handler = () => {
        setNum(num + 1)
        return num
    }

    return (
        <div className='App'>
            <div className='App__head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='Controls'>
                <button onClick={ () => {
                    const code = counter();
                    store.createItem({ code, title: `Новая запись ${ code }` })
                } }> Добавить
                </button>
            </div>
            <div className='App__center'>
                <div className='List'>{ items.map(item =>
                    <div key={ item.code } className='List__item'>
                        <div className={ 'Item' + ( item.selected ? ' Item_selected' : '' ) }
                             onClick={ () => store.selectItem(item.code) || store.selectQuantity(item.code) }>
                            <div className='Item__number'>{ item.code }</div>
                            <div
                                className='Item__title'>{ item.title } { item.selectedCount ? `| Выделялось ${ item.selectedCount } раз` : '' }</div>
                            <div className='Item__actions'>
                                <button onClick={ () => store.deleteItem(item.code) }>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ) }
                </div>
            </div>
        </div>
    );
}

export default App;