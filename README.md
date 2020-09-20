# WATSON AI CHATBOT BUILT WITH NODE-JS

Here is the link to my covid-19 CHATBOT:

[Covid-19 Chatbot](https://web-chat.global.assistant.watson.cloud.ibm.com/preview.html?region=eu-gb&integrationID=32f97eff-79cd-4068-b298-12af6e473664&serviceInstanceID=9c8c1dfb-49b0-41cf-b5c4-bc2bbd9d2614)

## PREVIEW

![Screenshot](https://github.com/wambugucoder/CHATBOT-NODEJS-IBM-WATSON/tree/master/screenshots/preview.PNG)
<p align="center">
<img src="https://github.com/wambugucoder/CHATBOT-NODEJS-IBM-WATSON/tree/master/screenshots/preview.PNG">
</p>



# STEPS TO CREATE A CHATBOT WITH WATSON AI AND NODE JS

***1. Create an Account with [IBM](https://cloud.ibm.com/)***

***2. Create a Watson Assistance [service](https://cloud.ibm.com/catalog/services/conversation) .***

* Choose your plan. I'd Recommend the free plan , but to run on production you will need to upgrade this.
* After Creating an Assistant service you will be directed to the dashboard where you can begin launching.

After creating the workspace you can now begin buidling your AI.

 __. Before Building you've got to understand 3 basic concepts:__

***A. INTENTS***

- Intents are purposes or goals that are expressed in a customer's input, such as answering a question . By recognizing the intent expressed in a customer's input, the Watson Assistant service can choose the correct dialog flow for responding to it

***B. ENTITY***

- Entities are used for identifying interesting parts of the user's utterance, such as names and dates. Watson Assistant already provides system entities (for date, time, names, etc), and lets you define entities with synonyms and fuzzy matching, as well as defining pattern-based entities.

***C. DIALOG***

- A dialog skill is a container for the artifacts that define the flow of a conversation that your assistant can have with your customers.


***3. Create your Intents,Entities and Dialog flow***

- If you have difficulties creating just follow the [guide](https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started#getting-started-tutorial)

***4. Find the needed Variables for you node js Application***

They include :
 - ASSISTANT_ID
 - WATSON_VERSION
- WATSON_URL
- WATSON_API_KEY

***5. Clone this repo and create an .env file where you can add all your credentials***

- GENERATE A SESSION ID TO INTERACT WITH THE AI
## Usage

```javascript

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
```

REMEMBER TO STORE YOUR SESSION_ID IN .env


<p align="center">
<img src="https://github.com/wambugucoder/CHATBOT-NODEJS-IBM-WATSON/tree/master/screenshots//sessionId.PNG">
</p>


<p align="center">
<img src="https://github.com/wambugucoder/CHATBOT-NODEJS-IBM-WATSON/tree/master/screenshots//result.PNG">
</p>




***6. Send input to your AI***
```js
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
```
<p align="center">
<img src="https://github.com/wambugucoder/CHATBOT-NODEJS-IBM-WATSON/tree/master/screenshots//ask.PNG">
</p>


<p align="center">
<img src="https://github.com/wambugucoder/CHATBOT-NODEJS-IBM-WATSON/tree/master/screenshots//answer.PNG">
</p>


- Finally you can train your AI by sending various post requests so as to be familiar with certain questions.
- Then deploy it and share it with your friends.


