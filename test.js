const dotenv = require('dotenv');
dotenv.config();

const myED=require("ecole-directe-node");

(async () => {
    //retourne les informations de la session et de l'élève
    let session=await myED.login(process.env.EDUsername,process.env.EDPassword);
    let token=session.token;
    console.log(token);


    //retourne la liste des messages
    let myMessages=await myED.getAllMessages(session);


    //retourne le dernier message reçu
    let firstMessageId=myMessages.data.messages.received[0].id;
    let firstMessageContent=await myED.getMessage(session,firstMessageId);
    console.log(firstMessageContent)

    //retourne l'emploi du temps
    let edt=await myED.getEDT(session,"2022-03-14","2022-03-20");
    console.log(edt)

    //retourne les notes du trimestre
    let notes=await myED.getNotes(session);
    console.log(notes)
    
    //retourne la liste des devoirs à venir
    let homework=await myED.getAllHomework(session);
    console.log(homework)

    //retourne les devoirs d'une date
    let dailyHomework=await myED.getDailyHomework(session,"2022-03-27")
    console.log(dailyHomework)

    let homeworkID=1234;
    //coche le devoir
    await myED.checkHomework(session,homeworkID)

    //décoche le devoir
    await myED.uncheckHomework(session,homeworkID)
})()