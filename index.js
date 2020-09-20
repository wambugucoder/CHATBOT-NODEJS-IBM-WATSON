const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet= require('helmet');
const port = process.env.PORT || 5000;
const app = express();

require('dotenv').config();

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');



 const assistant = new AssistantV2({
  version: process.env.VERSION,
  authenticator: new IamAuthenticator({
  apikey:process.env.API_KEY,
  }),
  serviceUrl:process.env.URL,
});


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//cors
app.use(cors());

//http protection
app.use(helmet())

//routes
//GET SESSION ID
app.get('/sessionId', (req, res) => {
    assistant.createSession({
        assistantId: process.env.ID
      })
        .then(id => {
           res.status(200).json(id);
           
        })
        .catch(err => {
          res.json(err);
        });

});
//ASK BOT A QUESTION
app.post('/ask', (req, res) => {
    const text = req.body.text;
    assistant.message({
        assistantId: process.env.ID,
        sessionId: process.env.SESSION_ID,
        input: {
          'message_type': 'text',
          'text': `${text}`
          }
        })
        //response
        .then(chatresponse => {
            res.status(200).json(chatresponse);
        })
        .catch(err => {
       res.json(err);
        });
});
//REMOVE SESSION ID
app.delete('/remove-session', (req, res) => {
    assistant.deleteSession({
        assistantId: process.env.ID,
        sessionId: process.env.SESSION_ID,
      })
        .then(done => {
        res.status(200).json(done)
        })
        .catch(err => {
         res.json(err);
        });
});
//LIST LOG EVENTS
app.get('/logs', (req, res) => {
    const params = {
        assistantId: process.env.ID,
       
      };
      
      assistant.listLogs(params)
        .then(logs => {
            res.status(200).json(logs)
        })
        .catch(err => {
          console.log(err)
        });
});




//listen
app.listen(port, () =>console.log (`Server running on port ${port} 🔥`));