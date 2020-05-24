const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Configure Mongo DB
const MongoClient = require("mongodb").MongoClient,
    ObjectId = require("mongodb").ObjectID;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/db/init', (req, res) => {
    if (req.body) {
        const initUsers = [
            { "_id": new ObjectId("5ec9223b8fad7c8e4f4abb0a"), "username": "Polaris", "password": "1234", "name": "Polaris", "img": "images/avatar.jpg", "city": "Минск", "age": "18", "gender": "Мужчина", "collectionGames": ["5ec9229a258f729036e99d15"], "wishGames": ["5ec9229a258f729036e99d16"], "playedGames": ["5ec9229a258f729036e99d17", "5ec9229a258f729036e99d18", "5ec9229a258f729036e99d19"] },
            { "_id": new ObjectId("5ec9223b8fad7c8e4f4abb0b"), "username": "Xania", "password": "1234", "name": "Xania", "img": "images/avatar.jpg", "city": "Минск", "age": "23", "gender": "Женщина", "collectionGames": [], "wishGames": [], "playedGames": [] },
            { "_id": new ObjectId("5ec9223b8fad7c8e4f4abb0c"), "username": "User234", "password": "1234", "name": "User234", "img": "images/avatar.jpg", "city": "Минск", "age": "30", "gender": "Мужчина", "collectionGames": [], "wishGames": [], "playedGames": [] },
            { "_id": new ObjectId("5ec9223b8fad7c8e4f4abb0d"), "username": "Alex1209", "password": "1234", "name": "Alex1209", "img": "images/avatar.jpg", "city": "Минск", "age": "28", "gender": "Мужчина", "collectionGames": [], "wishGames": [], "playedGames": [] },
            { "_id": new ObjectId("5ec9223b8fad7c8e4f4abb0e"), "username": "AnnaFive", "password": "1234", "name": "AnnaFive", "img": "images/avatar.jpg", "city": "Минск", "age": "22", "gender": "Женщина", "collectionGames": [], "wishGames": [], "playedGames": [] }
        ]

        const initGames = [
            { "_id": new ObjectId("5ec9229a258f729036e99d15"), "img": "https://i.ibb.co/xJkHbnc/photo1-200.jpg", "title": "Серп", "age": "14+", "minPlayers": "1", "maxPlayers": "5", "time": "90-120", "description": ["Первое, чем удивит и порадует игроков настольная игра &#34;Серп&#34;, — обилие миниатюр, фишек и карточек. Всё это изобилие понадобится игрокам, чтобы выстроить великие империи из тех наций, которые в этой вселенной занимают территории Восточной Европы. В этом мире Первая мировая война шла особенно ожесточённо, это изменило менталитет и подход людей к войне. Теперь на поле брани правят огромные боевые шагоходы, которые поражают умы размерами, количеством средств уничтожения противника и креативным подходом к их выбору.", "Чтобы создать металлических монстров, стране под вашим руководством придётся приложить немало усилий и добыть целую кучу различных ресурсов (металла, нефти и дерева), а ещё не помешает захватить светоч технологии, единственную в регионе фабрику — так вы сможете поставить производство на конвейер.", "Впрочем, тотальная война не единственный способ добиться гегемонии. Более того, одних ратных подвигов будет недостаточно для того, чтобы получить лавры победителя, но демонстрация силы однозначно выведет вас в лидеры. Победителем будет назван тот, чья держава выполнит любые шесть условий победы: экономические успехи, размер армии или популярность среди своего народа. Ближе к финалу партии напряжение нарастает, так как у каждого игрока есть карточки со скрытыми целями, к которым они движутся в течение всей партии.", "&#34;Серп&#34; однозначно заслуживает внимания ценителей стратегических игр, каждая партия заставит вас искать новый путь к победе исходя из стартовых условий и целей, а великолепные и неожиданные иллюстрации ещё долго будут всплывать в памяти игроков."] },
            { "_id": new ObjectId("5ec9229a258f729036e99d16"), "img": "https://i.ibb.co/6n63mzK/photo2-200.png", "title": "Крестный отец. Империя Корлеоне", "age": "14+", "minPlayers": "2", "maxPlayers": "5", "time": "60-90", "description": ["В игре &#34;Крёстный отец. Империя Корлеоне&#34; игроки управляют своими семьями — мафиозными кланами, которые ведут борьбу за господство в Нью-Йорке в середине прошлого века. Игроки отправляют членов своих семей и громил собирать дань с бизнесменов города, получать нелегальные товары, подкупать нужных людей и делать всякого рода грязную работу.", "Занять важную роль в империи дона Корлеоне можно только старательно выполняя его поручения. Деньги и влияние укрепляют возможности клана в войне с другими семьями за контроль территорий и, как следствие, улучшают благосостояние и позиции семьи.", "В конечном итоге победу в игре одержит семья, сумевшая отмыть и сохранить в надёжном месте наибольший капитал. Кроме накоплений учитывается количество контролируемых игроками районов города и исполнительность при выполнении поручений дона Корлеоне.", "Самое богатое семейство и будет править Нью-Йорком!"] },
            { "_id": new ObjectId("5ec9229a258f729036e99d17"), "img": "https://i.ibb.co/VBWcBBq/photo3-200.jpg", "title": "Пандемия", "age": "10+", "minPlayers": "2", "maxPlayers": "4", "time": "30-60", "description": ["Тебе и твоей команде предстоит перемещаться по планете, гасить очаги болезни и искать ресурсы для изобретения лекарств. Работайте сообща и используйте особенности каждого из команды, ведь судьба человечества в ваших руках!", "Группа отважных исследователей собирается отразить одну из самых страшных напастей, какая только может угрожать нашей планете. События разворачиваются в планетарном масштабе: Африка, Европа, Россия, Америка и Азия – наш враг может появиться где угодно. Надеяться на случай бесполезно, время брать ситуацию в свои руки! Если вы уверены в своих силах, самое время открыть коробку с настольной игрой Пандемия (Pandemic).", "В отличие от большинства настольных игр, в Пандемии (Pandemic) участникам не придется противостоять друг другу. Враг здесь один, но он настолько опасен, что бороться с ним предстоит общими усилиями, причем у каждого игрока будет возможность внести неоценимый вклад в борьбу с эпидемией.", "Поскольку главный враг в настольной игре Пандемия (Pandemic) не осязаем, бороться придется с его проявлениями и постоянной нехваткой времени. Команде специалистов приходится действовать максимально оперативно и стараться принимать исключительно рациональные решения. К счастью, время на обсуждения каждого следующего шага не ограничено, чего не сказать о картах, кубиках и других ресурсах…", "Еще одно важное достоинство настольной игры Пандемия (Pandemic) – возможность играть на разных уровнях сложности. Несомненно, любителям острых ощущений придется по душе третий – наивысший уровень, скромно именуемый &#34;героическим&#34;."] },
            { "_id": new ObjectId("5ec9229a258f729036e99d18"), "img": "https://i.ibb.co/8794HWq/photo4-200.jpg", "title": "Кодовые имена", "age": "10+", "minPlayers": "2", "maxPlayers": "12", "time": "15+", "description": ["Перед вами Codenames – лучшая в мире настольная игра для вечеринок, за короткое время получившая все мыслимые и немыслимые награды, включая Игру года в Германии – аналог Оскара в мире настольных игр. Всего за 11 месяцев существования она буквально влетела в ТОП и комфортно расположилась на первом месте в рейтинге патигеймов (игры для компаний и вечеринок).", "Codenames – настоящий феномен: впервые в истории игра для вечеринок была одинаково тепло принята как истинными гиками, так и любителями легких и веселых игр. Codenames – это просто и универсально. Разложить поле, прочитать 2 страницы правил и сыграть первую партию вы успеете раньше, чем допьете первую чашку чая. Она подойдет как для шумных вечеров в компании друзей, так и для тихих семейных посиделок. Игра тренирует память, развивает воображение и помогает лучше чувствовать родной язык.", "Codenames – это когда после одной игры понимаешь, что вечер удался. Проигравшая команда только раззадорена, а победившая уверена, что ей удастся закрепить успех. Будьте готовы к тому, что во время игры можете потерять счёт времени.", "Игроки делятся на две команды – синюю и красную. У каждой свой капитан. Задача команд – как можно скорее найти своих тайных агентов, которые под кодовыми именами выложены перед игроками в квадрате 5х5.", "Капитаны садятся напротив своих команд, и перед ними ставится карточка-ключ, указывающая, какой команде принадлежит тот или иной агент.  Капитаны карточку видят, а их товарищи по команде – нет. В свой ход капитан даёт подсказку, состоящую из одного слова, которое объединяет несколько карточек на поле, и число, которое указывает, сколько слов он объединил. Игроки пытаются отгадать слова своей команды, при этом остерегаясь тех карточек, которые принадлежат соперникам. И все хотят избежать встречи с убийцей, который тоже лежит на поле.", "Команды ходят по очереди. Как только одна команда ошиблась или исчерпала количество своих подсказок, ход переходит к другой. Вот, вроде бы, и все :)"] },
            { "_id": new ObjectId("5ec9229a258f729036e99d19"), "img": "https://i.ibb.co/4Ppr1dy/photo5-200.jpg", "title": "Дикие джунгли", "age": "7+", "minPlayers": "2", "maxPlayers": "15", "time": "15-30", "description": ["Какими навыками нужно обладать, чтобы выжить в диких джунглях? Вам смогут помочь только отличная скорость реакции и предельная внимательность. Как у вас развиты эти навыки? Если хорошо, у вас есть все необходимое чтобы стать серьезным игроком в настольной игре Jungle Speed. Если нет, &#34;Джангл Спид&#34; быстро воспитает в вас эти качества, необходимые в повседневной жизни.", "В игре &#34;Дикие джунгли&#34; колода из 80 карт поровну разделяется между соперниками. На них изображены фигурки. Одно изображение повторяется в колоде 4 раза в различных цветах. Немного невнимательности и вы легко запутаетесь в изображениях. Карты лежат на столе, в центр ставится деревянный тотем и начинается игра Jungle Speed.", "Соперники начинают по очереди открывать по 1 карте из своей стопки, делая движение от себя. Дуэль начинается, как только игрок вытягивает карту с изображением, которое открыто у соперника. И теперь нужно первым схватить тотем. Проигравший забирает обе карты, увеличивая свои шансы на поражение.", "Хотите победить в игре &#34;Дикие джунгли&#34;? Вам нужно быть значительно внимательнее и ловчее соперников. Если вы перепутаете картинку и схватите тотем или уроните его, победа отдается сопернику. Разнообразие в процесс игры вносят специальные карты, которые меняют правила.", "Jungle Speed обеспечит вам бурю положительных эмоций и разбудит дух соперничества."] },
            { "_id": new ObjectId("5ec9229a258f729036e99d20"), "img": "https://i.ibb.co/gR8Q9jJ/photo6-200.png", "title": "Кланы Каледонии", "age": "12+", "minPlayers": "1", "maxPlayers": "4", "time": "30-120", "description": ["Настольная игра Clans of Caledonia (на русском языке) - это большая экономическая игра, действия которой разворачиваются в Шотландии времен XIX века. В этот непростой исторический период Шотландия вовслю переходила от сельского хозяйства к промышленности и индустриализации. В настольной игре Clans of Caledonia (на русском языке) вы воочию увидите весь прогресс Шотландии и примете участие в превращении страны в торговую и экспортную державу.", "Настольная игра Clans of Caledonia (на русском языке) - это завораживающая историческая экономическая стратегия, которая погружает игроков в непередаваемую атмосферу этой страны и этого временного периода. Красивые зеленые пейзажи игрового поля и великолепные компоненты только усиливают погружение и делают игру Clans of Caledonia (на русском языке) одной из самых интересных и красивых экономических стратегий в мире настольных игр!"] }
        ];

        const initMeetings = [
            { "_id": new ObjectId("5ec9229a258f729036e99d1b"), "gameName": "Дикие джунгли", "day": "d", "time": "ss", "place": "s", "description": "-", "players": ["5ec9223b8fad7c8e4f4abb0a", "5ec9223b8fad7c8e4f4abb0b"], "status": "Actual" },
            { "_id": new ObjectId("5ec9229a258f729036e99d1c"), "gameName": "Кланы Каледонии", "day": "sa", "time": "s", "place": "s", "description": "-", "players": ["5ec9223b8fad7c8e4f4abb0a", "5ec9223b8fad7c8e4f4abb0b"], "status": "Closed" }
        ]

        req.app.locals.users.insertMany(initUsers, (err, result) => { if (err) return res.sendStatus(500); });
        req.app.locals.games.insertMany(initGames, (err, result) => { if (err) return res.sendStatus(500); });
        req.app.locals.meetings.insertMany(initMeetings, (err, result) => { if (err) return res.sendStatus(500); });
        return res.sendStatus(204);
    } else {
        return res.sendStatus(400);
    }
});

app.get('/api/games', (req, res) => {
    req.app.locals.games.find({}).toArray().then(
        result => res.send(result),
        error => { console.log(error); res.send([]); }
    );
});

app.get('/api/games/:id', (req, res) => {
    req.app.locals.games.findOne({ _id: new ObjectId(req.params.id) }).then(
        result => res.send(result),
        error => { console.log(error); res.send({}); }
    );
});


app.post('/api/games/list', (req, res) => {
    req.body.ids = req.body.ids.map(item => new ObjectId(item));
    req.app.locals.games.find({ _id: { $in: req.body.ids } }).toArray().then(
        result => res.send(result),
        error => { console.log(error); res.send([]); }
    );
});

app.put('/api/users/:userId/games/:gameId', (req, res) => {
    req.params.userId = new ObjectId(req.params.userId);
    switch (req.query.action) {
        case 'add':
            req.app.locals.users.updateOne({ _id: req.params.userId }, { $addToSet: { [req.query.typeCollection]: req.params.gameId } }, { upsert: false }).then(
                result => res.sendStatus(204),
                error => { console.log(error); res.send({}); }
            );
            break;
        case 'remove':
            req.app.locals.users.updateOne({ _id: req.params.userId }, { $pull: { [req.query.typeCollection]: req.params.gameId } }, { upsert: false }).then(
                result => res.sendStatus(204),
                error => { console.log(error); res.send({}); }
            );
            break;
    }
});

app.get('/api/users', (req, res) => {
    req.app.locals.users.find({}).toArray().then(
        result => res.send(result),
        error => { console.log(error); res.send([]); }
    );
});

app.get('/api/users/:id', (req, res) => {
    req.app.locals.users.findOne({ _id: new ObjectId(req.params.id) }).then(
        result => res.send(result),
        error => { console.log(error); res.send(null); }
    );
});

app.post('/api/users/names', (req, res) => {
    req.body.ids = req.body.ids.map(item => new ObjectId(item));
    req.app.locals.users.find({ _id: { $in: req.body.ids },  }, { name: 1, contribs: 1 }).toArray().then(
        result => res.send(result),
        error => { console.log(error); res.send([]); }
    );
});


app.get('/api/meetings', (req, res) => {
    req.app.locals.meetings.find({}).toArray().then(
        result => res.send(result),
        error => { console.log(error); res.send([]); }
    );
});

app.get('/api/meetings/:id', (req, res) => {
    req.app.locals.meetings.findOne({ _id: new ObjectId(req.params.id) }).then(
        result => res.send(result),
        error => { console.log(error); res.send({}); }
    );
});

app.delete('/api/meetings/:id', (req, res) => {
    req.app.locals.meetings.deleteOne({ _id: new ObjectId(req.params.id) }).then(
        result => res.sendStatus(204),
        error => { console.log(error); res.sendStatus(500); }
    );
});

app.post('/api/meetings', (req, res) => {
    let meeting = req.body;
    meeting._id = new ObjectId(meeting._id);
    meeting.description = meeting.description || '-';
    meeting.status = 'Actual';
    req.app.locals.meetings.insertOne(meeting).then(
        result => res.send(result.ops[0]),
        error => { console.log(error); res.sendStatus(400); }
    );
});


app.put('/api/meetings/:id', (req, res) => {
    req.app.locals.meetings.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body }, { upsert: false }).then(
        result => res.sendStatus(204),
        error => { console.log(error); res.send({}); }
    );
});

app.put('/api/meetings/:meetingId/users/:userId', (req, res) => {
    id = new ObjectId(req.params.meetingId);
    switch (req.query.action) {
        case 'add':
            req.app.locals.meetings.updateOne({ _id: id }, { $addToSet: { 'players': req.params.userId } }, { upsert: false }).then(
                result => res.sendStatus(204),
                error => { console.log(error); res.send({}); }
            );
            break;
        case 'remove':
            req.app.locals.meetings.updateOne({ _id: id }, { $pull: { 'players': req.params.userId } }, { upsert: false }).then(
                result => res.sendStatus(204),
                error => { console.log(error); res.send({}); }
            );
            break;
    }
});

app.post('/api/meetings/list', (req, res) => {
    req.body.ids = req.body.ids.map(item => new ObjectId(item));
    req.app.locals.meetings.find({ _id: { $in: req.body.ids } }).toArray().then(
        result => res.send(result),
        error => { console.log(error); res.send([]); }
    );
});

// connect to MongoDB then start App
mongoClient.connect(function (err, client) {
    if (err) {
        return console.log(err);
    }
    app.locals.users = client.db("bgb").collection("users");
    app.locals.games = client.db("bgb").collection("games");
    app.locals.meetings = client.db("bgb").collection("meetings");

    app.listen(3000, () => console.log('Server has been started...'));
});