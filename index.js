//const fetch=require("node-fetch");
const endpoint="https://api.ecoledirecte.com/v3/";
const theHeader={
  'authority': 'api.ecoledirecte.com',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
  'accept': 'application/json, text/plain, */*',
  'content-type': 'application/x-www-form-urlencoded',
  'x-token': '',
  'sec-ch-ua-mobile': '?0',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
  'sec-ch-ua-platform': '"Windows"',
  'origin': 'https://www.ecoledirecte.com',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://www.ecoledirecte.com/',
  'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  'sec-gpc': '1'
}


async function fetchED(url,body,token){
    let thisHeader=theHeader;
    if(token){
        thisHeader["x-token"]=token;
    }
    try{
  
      let bodyText=`data=${JSON.stringify(body)}`
      let request=await fetch(`${endpoint}${url}`, {
          method: "post",
          headers: thisHeader,
          body: bodyText
      });
      
      let response=await request.json()
    
    return response;
  }catch(err){
      console.log(err)
    }
  }

module.exports={
  login: async(username,password)=>{
    let session=await fetchED("login.awp",{
        "identifiant": username,
        "motdepasse": password
    });
    return session;
  },
  getMessages: async(session)=>{
    let messages=await fetchED(`eleves/${session.data.accounts[0].id}/messages.awp?force=false&typeRecuperation=received&idClasseur=0&orderBy=date&order=desc&query=&onlyRead=&page=0&itemsPerPage=20&verbe=getall&v=4.6.0`,{
        "anneeMessages": "2021-2022"
    },session.token);
    return messages;
  },
  getMessageContent: async(session,messageId)=>{
    let message=await fetchED(`eleves/3253/messages/${messageId}.awp?verbe=get&mode=destinataire&v=4.6.0`,{
        "anneeMessages": "2021-2022"
    },session.token);
    return message;
  },
  getEDT: async(session,dateDebut,dateFin)=>{
    let message=await fetchED(`E/${session.data.accounts[0].id}/emploidutemps.awp?verbe=get&v=4.6.0`,{
      "dateDebut": dateDebut,
      "dateFin": dateFin,
      "avecTrous": false
    },session.token);
    return message;
  },getNotes: async(session)=>{
    let notes=await fetchED(`eleves/${session.data.accounts[0].id}/notes.awp?verbe=get&v=4.6.0`,{
      "anneeScolaire": ""
    },session.token);
    return notes;
  },getAllHomework: async(session)=>{
    let homework=await fetchED(`Eleves/${session.data.accounts[0].id}/cahierdetexte.awp?verbe=get&v=4.6.0`,{},session.token);
    return homework;
  },getDailyHomework: async(session,date)=>{
    let homework=await fetchED(`Eleves/3253/cahierdetexte/${date}.awp?verbe=get&v=4.6.0`,{},session.token);
    return homework;
  },checkHomework: async(session,homeworkId)=>{
    let homework=await fetchED(`Eleves/${session.data.accounts[0].id}/cahierdetexte.awp?verbe=put&v=4.6.0`,{
      "idDevoirsEffectues": [
        homeworkId
      ],
      "idDevoirsNonEffectues": []
    },session.token);
    return homework;
  },uncheckHomework: async(session,homeworkId)=>{
    let homework=await fetchED(`Eleves/${session.data.accounts[0].id}/cahierdetexte.awp?verbe=put&v=4.6.0`,{
      "idDevoirsEffectues": [],
      "idDevoirsNonEffectues": [
        homeworkId
      ]
    },session.token);
    return homework;
  }
    
}