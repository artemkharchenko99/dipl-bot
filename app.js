const Telegraf = require('telegraf').Telegraf;

const bot = new Telegraf('2069087401:AAF32UOjEHwPjgZ3e_63YhCItGld_JrM4gE');

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Привіт, щоб почати гру введіть "play". Якщо потрібна допомога, то використовуй /help', {
    })
})
bot.command('help', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Всі доступні команди: \n play - команда для початку гри \n /stats - команда для перевірки набраних балів', {
    })
})
bot.command('stats', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Набраних балів: ' + balls)
})

bot.hears('play', ctx => {
    console.log(ctx.from)
    let playMessage = 'Успіхів! Щоб почати гру натисніть на будь-яку вікторину зі списку. Для перегляду статистики по набраним балам написніть на "Статистика"';
    bot.telegram.sendMessage(ctx.chat.id, playMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Вікторина кіно \ud83c\udfa5",
                    callback_data: 'question1'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
    }   
})
})

let balls = 0;

function waitFor (ms) { //функція очікування
    return new Promise ((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

function dltMessages(context) { //функція видалення
    const id = context.update.callback_query.message.chat.id;
    const msg_id = context.update.callback_query.message.message_id;
    msgForDelete.push( msg_id);
    for (let i in msgForDelete) {
         bot.telegram.deleteMessage(id, msgForDelete[i]);
    }
}

//Кадры с фильмами
let msgForDelete = []; //масив повідомлень, які потрібно видалити
bot.action('question1', async ctx => {
    msgForDelete.push( ctx.update.callback_query.message.message_id); //додаємо id повідомлення, яке потрібно видалити
    bot.telegram.sendMessage(ctx.chat.id, 'Із якого фільму прикріплений кадр?').then((result) => {
	msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/frame1.png"
    }).then((result) => {
	msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    let choiceMessage = 'Зробіть вибір:';
    await waitFor(1500);
    await bot.telegram.sendMessage(ctx.chat.id, choiceMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Криминальное чтиво",
                    callback_data: 'criminal'
                },
                {
                    text: "Форрест Гамп",
                    callback_data: 'forest'
                }],
                [{
                    text: "Зеленая миля",
                    callback_data: 'mile'
                },
                {
                    text: "Время",
                    callback_data: 'old'
                }],
            ],
     }
    })
})

    bot.action('criminal', ctx => {
	balls =  balls + 2;
        bot.telegram.sendMessage(ctx.chat.id, '\u2705 Вірно (+2 бали)', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Наступне питання \u27a1\ufe0f",
                        callback_data: 'question2'
                    }],
                    [{
                        text: "Статистика \ud83d\udcca",
                        callback_data: 'stats'
                    }]
                ],
         }
        })
        dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
    })
    bot.action('forest', ctx => {
	balls =  balls - 2;
        bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка(-2 бали)', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Наступне питання \u27a1\ufe0f",
                        callback_data: 'question2'
                    }],
                    [{
                        text: "Статистика \ud83d\udcca",
                        callback_data: 'stats'
                    }]
                ],
         }
        })
        dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
    })
    bot.action('mile', ctx => {
	balls =  balls - 2;
        bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка(-2 бали)', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Наступне питання \u27a1\ufe0f",
                        callback_data: 'question2'
                    }],
                    [{
                        text: "Статистика \ud83d\udcca",
                        callback_data: 'stats'
                    }]
                ],
         }
        })
        dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
    })
    bot.action('old', ctx => {
	balls =  balls - 2;
        bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка(-2 бали)', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Наступне питання \u27a1\ufe0f",
                        callback_data: 'question2'
                    }],
                    [{
                        text: "Статистика \ud83d\udcca",
                        callback_data: 'stats'
                    }]
                ],
         }
        })
        dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
    })

bot.action('question2',  async ctx => {
    dltMessages(ctx)//виклик функції видалення
    msgForDelete = []
    bot.telegram.sendMessage(ctx.chat.id, 'Із якого фільму прикріплений кадр?').then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/frame2.png"
    }).then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    let choiceMessage = 'Зробіть вибір:';
    await waitFor(1500);
    await bot.telegram.sendMessage(ctx.chat.id, choiceMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Терминатор 2: Судный день",
                    callback_data: 'terminator'
                },
                {
                    text: "Джанго освобождённый",
                    callback_data: 'jango'
                }],
                [{
                    text: "1+1",
                    callback_data: 'oneplusone'
                },
                {
                    text: "Эйс Вентура 2: Когда зовёт природа",
                    callback_data: 'ventura'
                }],
            ],
     }
})
})

bot.action('terminator', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Невірно (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question3'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('jango', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Невірно (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question3'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('oneplusone', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Невірно (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question3'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('ventura', ctx => {
	balls =  balls + 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u2705 Вітаю! Це правильна відповідь (+2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question3'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})

bot.action('question3', async ctx => {
    dltMessages(ctx)//виклик функції видалення
    msgForDelete = []
    bot.telegram.sendMessage(ctx.chat.id, 'Із якого фільму прикріплений кадр?').then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/frame3.png"
    }).then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    let choiceMessage = 'Зробіть вибір:';
    await waitFor(1500);
    await bot.telegram.sendMessage(ctx.chat.id, choiceMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Остров проклятых",
                    callback_data: 'island'
                },
                {
                    text: "Храброе сердце",
                    callback_data: 'brave'
                }],
                [{
                    text: "Аватар",
                    callback_data: 'avatar'
                },
                {
                    text: "Смурфики",
                    callback_data: 'smurf'
                }],
            ],
     }
})
})

bot.action('island', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Ви помилилися (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question4'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('brave', ctx => {
	balls =  balls + 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u2705 Дуже добре (+2 бали).', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question4'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('avatar', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Ви помилилися! (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question4'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('smurf', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Ви помилилися! (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question4'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})

bot.action('question4', async ctx => {
    dltMessages(ctx)//виклик функції видалення
    msgForDelete = []
    bot.telegram.sendMessage(ctx.chat.id, 'Із якого фільму прикріплений кадр?').then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/frame4.png"
    }).then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    let choiceMessage = 'Зробіть вибір:';
    await waitFor(1500);
    await bot.telegram.sendMessage(ctx.chat.id, choiceMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Стрелок",
                    callback_data: 'shooter'
                },
                {
                    text: "Храброе сердце",
                    callback_data: 'brave2'
                }],
                [{
                    text: "1917",
                    callback_data: '1917'
                },
                {
                    text: "Выживший",
                    callback_data: 'survivor'
                }],
            ],
     }
})
})

bot.action('shooter', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Невірно (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question5'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('brave2', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Невірно (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question5'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('1917', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Невірно (-2 бали)',{
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question5'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('survivor', ctx => {
	balls =  balls + 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u2705 Молодець, це правильна відповідь (+2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question5'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})

bot.action('question5', async ctx => {
    dltMessages(ctx)//виклик функції видалення
    msgForDelete = []
    bot.telegram.sendMessage(ctx.chat.id, 'Із якого фільму прикріплений кадр?').then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/frame5.png"
    }).then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    let choiceMessage = 'Зробіть вибір:';
    await waitFor(1500);
    await bot.telegram.sendMessage(ctx.chat.id, choiceMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Хулиганы ",
                    callback_data: 'hooligans'
                },
                {
                    text: "Мост в Терабитию",
                    callback_data: 'bridge'
                }],
                [{
                    text: "1+1",
                    callback_data: 'one'
                },
                {
                    text: "Реквием по мечте",
                    callback_data: 'dream'
                }],
            ],
     }
})
})

bot.action('hooligans', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question6'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('bridge', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question6'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('one', ctx => {
	balls =  balls + 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u2705 Вірно (+2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question6'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('dream', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Наступне питання \u27a1\ufe0f",
                    callback_data: 'question6'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})

bot.action('question6', async ctx => {
    dltMessages(ctx)//виклик функції видалення
    msgForDelete = []
    bot.telegram.sendMessage(ctx.chat.id, 'Із якого фільму прикріплений кадр?').then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/frame6.png"
    }).then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
    let choiceMessage = 'Зробіть вибір:';
    await waitFor(1500);
    await bot.telegram.sendMessage(ctx.chat.id, choiceMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Веном",
                    callback_data: 'venom'
                },
                {
                    text: "Человек-паук 3: Враг в отражении",
                    callback_data: 'spiderman'
                }],
                [{
                    text: "Мстители: Война бесконечности",
                    callback_data: 'avengers'
                },
                {
                    text: "Тёмный рыцарь",
                    callback_data: 'darkknight'
                }],
            ],
     }
})
})

bot.action('venom', ctx => {
	balls =  balls + 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u2705 Молодець, але це було легко (+2 бали)' , {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Зіграти у вікторину ще раз \ud83d\udd01",
                    callback_data: 'question1'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('spiderman', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка, спробуй ще раз (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Зіграти у вікторину ще раз \ud83d\udd01",
                    callback_data: 'question1'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('avengers', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка, спробуй ще раз (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Зіграти у вікторину ще раз \ud83d\udd01",
                    callback_data: 'question1'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})
bot.action('darkknight', ctx => {
	balls =  balls - 2;
    bot.telegram.sendMessage(ctx.chat.id, '\u274c Помилка, спробуй ще раз (-2 бали)', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Зіграти у вікторину ще раз \ud83d\udd01",
                    callback_data: 'question1'
                }],
                [{
                    text: "Статистика \ud83d\udcca",
                    callback_data: 'stats'
                }]
            ],
     }
    })
    dltMessages(ctx) //виклик функції видалення
    msgForDelete = []
})

bot.action('stats', ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, 'Набраних балів: ' + balls).then((result) => {
        msgForDelete.push(result.message_id);//додаємо id повідомлення, яке потрібно видалити
    });
})

bot.launch();

