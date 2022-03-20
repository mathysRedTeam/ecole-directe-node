# ecole-directe-node
[![downloadsBadge](https://img.shields.io/npm/dt/ecole-directe-node?style=for-the-badge)](https://npmjs.com/ecole-directe-node)
[![versionBadge](https://img.shields.io/npm/v/ecole-directe-node?style=for-the-badge)](https://npmjs.com/ecole-directe-node)
## Fonctionnalités

🔐 Authentification pour les comptes **Élèves**  
📑 Récupération des **notes**  
📚 Récupération et actions sur les **devoirs**  
📅 Récupération des **emplois du temps**  
✉️ Récupération des **messages**  

```js
const myED=require("ecole-directe-node");

async function start(){
    let session=await myED.login("username","password");

    let myMessages=await myED.getMessages(session);

    let firstMessageId=myMessages.data.messages.received[0].id;
    let firstMessageContent=await myED.getMessageContent(session,firstMessageId);

    let edt=await myED.getEDT(session,"2022-03-14","2022-03-20");

    let notes=await myED.getNotes(session);

    let homework=await myED.getAllHomework(session);

    let dailyHomework=await myED.getDailyHomework(session,"2022-03-22")

    let homeworkID=1234;
    await myED.checkHomework(session,homeworkID)

    await myED.unchekHomework(session,homeworkID)
}

start();


```