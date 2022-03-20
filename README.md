# Ecole Directe Node


[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build status][travis-image]][travis-url] [![Coverage status][codecov-image]][codecov-url]

## Fonctionnalités

🔐 Authentification pour les comptes **Élèves**  
📑 Récupération des **notes**  
📚 Récupération et actions sur les **devoirs**  
📅 Récupération des **emplois du temps**  
✉️ Récupération des **messages**  

```js
const myED=require("ecole-directe-node");

(async () => {
    //retourne les informations de la session et de l'élève
    let session=await myED.login("username","password");


    //retourne la liste des messages
    let myMessages=await myED.getMessages(session);


    //retourne le dernier message reçu
    let firstMessageId=myMessages.data.messages.received[0].id;
    let firstMessageContent=await myED.getMessageContent(session,firstMessageId);

    //retourne l'emploi du temps
    let edt=await myED.getEDT(session,"2022-03-14","2022-03-20");

    //retourne les notes du trimestre
    let notes=await myED.getNotes(session);

    //retourne la liste des devoirs à venir
    let homework=await myED.getAllHomework(session);

    //retourne les devoirs d'une date
    let dailyHomework=await myED.getDailyHomework(session,"2022-03-27")

    let homeworkID=1234;
    //coche le devoir
    await myED.checkHomework(session,homeworkID)

    //décoche le devoir
    await myED.uncheckHomework(session,homeworkID)
})()
```

[npm-url]:https://npmjs.org/package/npms-cli
[downloads-image]:http://img.shields.io/npm/dm/npms-cli.svg
[npm-image]:http://img.shields.io/npm/v/npms-cli.svg
[travis-url]:https://travis-ci.org/npms-io/npms-cli
[travis-image]:http://img.shields.io/travis/npms-io/npms-cli/master.svg
[codecov-url]:https://codecov.io/gh/npms-io/npms-cli
[codecov-image]:https://img.shields.io/codecov/c/github/npms-io/npms-cli/master.svg