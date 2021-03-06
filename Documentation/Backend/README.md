# <u>Backend Meeting Log</u>

### 14-03-2021:

Objectives of meeting :
-> Start thinking about the construction of our static DB
-> Start with ER model - list attributes, relationships etc
-> Construct list of sources
-> Think about how to integrate with API? -> store as CSV, use SQL?

Made basic ER Diagram for backend work.
Consolidate with front end members to where we can incorporate images via a Fake News link.
As another team-member to check the ER diagram, probably via a pull request.
Made decisions regarding dependencies and uses of articles in terms of quiz questions.
Ambiguity regarding News items having multiple News topics
	-Would be good to utilise news info to declare a topic
	-and then tell the user what topic the news item is regarding

For next session:
	-review notes on normalisation
	-check it conforms to BCNF (for writing tables)

---------------------------------------------

### 17-03-21:

Objectives of meeting:
-> check DB structure conforms to BCNF
-> start creating directory structure and input examples
-> decide on coherent list of datasets we will use

`WHEN CREATING EXAMPLE .CSV FILE TO TEST ER DIAGRAM:	`				

`-Realised that News_Item table would only be used to ask a Quiz Question
-Therefore having a Quiz Question table is redundant.					
-Due to the 1 to 1 relationship between News Item and Quiz Question.				
-Solution: merge Quiz Question and News_Item`						

`-Even though in our original model, each question was going to be based on one news topic.	
-If we can, we would implement multiple news topics per question				
-Therefore we have left 'News Topic' as a separate table.`

`-Researched about join tables, realised they don't necessarily need a PK	
-Removed PK from join table Topic_Library for clarity and ease of use.		
-Considered when we would store user follow up input				
-i.e when user is incorrect *then* they will be prompted with a follow up qu.`

`-Need to consult with team (See 'for next session')`

-Updated ERDiagram considering changes made from .csv example
-Checked for normalisation in the backend layout (See '../DatabaseDesign/Normalisation_RunThrough.txt').
-Slight confusion between Composite/Non-composite candidate keys in terms of violating BCNF 2.
	-> checked notes and David's powerpoints to iron out this issue. (BCNF2 O.K now).

For next session:
	- add actual data to directory/mongoDB
	- consult with team when to program user follow-up questions 
	- hard to explain but 'is the follow up going to be triggered from the backend or the frontend.'
	- choose datasets and start filling in databses
		-> may have to change backend structure depending on dataset found

------

### 31/03/2021:

	Backend meeting VG & NT.

- Discussion after completing MongoDB workbook on SEGP Github.
  - We originally developed our database/schema to be used in a full SQL environment.

- Took the time to discuss and research the differences between SQL and NoSQL databases (As MongoDB is a NoSQL service).

- We initially believed that an SQL database would suit us better as we had a pre-defined and long-standing layout for our data that we were not planning on changing.

- However (in short), we decided to persue a NoSQL database as it would be easier to implement new features if we had the time at the end of the core development.

- The flexibility and scalability that NoSQL has over SQL is much more useful for us as we have narrowed our developmental ideas for the project in order to maximise our applications performance.

- Full documentation of our choice is in ./Documentation/DesignChoices

	2nd Meeting VG & NT
-Starting [extra exercise](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose) given at the end of workbook 7.
-Started to adapt original SQL schema for MongoDB use, based off tutorial and our old SQL work.

---

#### **01/04/21**

Database construction:

<u>Objectives for the meeting:</u>

- **design a data model that conforms to noSQL** - for this we will convert the old SQL model and construct models
- create a data model diagram with relationships and attributes
- construct javascript classes and start filling in data

*Following [this](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#related_documents) tutorial for the session.*

##### Meeting notes:

###### [Designing the data model]

- Pulled up excel spreadsheet (old SQL) + old ER diagram
- changed excel spreadsheet to make documents for noSQL DB - saved in *noSQLDBdevelopment/NoSQLDatabaseModel*
  - a document in noSQL is a collection of data, like an entity. 
  - we split ours up by similar tables as we had before, and removed the join table
- chagned ER diagram to make noSQL data model diagram - saved in *noSQLDBdevelopment/NoSQLUML*

###### [Designing schemas]

- made an init.js file to practice connecting to mongo
- defined our schemas/models:
  - Quiz_question
  - user_answer
  - news_topic
- ...and constructed them in js files, with the data fields they contain, and links to arrays of collections to access other collections in a collection (i.e., for modelling relationships)
- since our DB is static, we decided not to enter custome validators in our schemas - we will be hand selecting the data

- connected to mongoDB locally, and wrote a script for inserting example data in mongo collections (Example_Code/AngularDemoSite/insertDataScript.js)

---

Meeting objectives for next meeting:

- read through [this article](<https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes>) to gain a better understanding on route modules/functions, and start planning our route modules and use of http verbs (ie get, post, ...)
- plan integration of insertDataScript.js within our project, and test pushing json data to our /api page

###### [Routes and Controllers]



---

### 02/04/2021

###### <u>NT & VG had meeting with Marceli (40m)</u>

- Went through our current methods for inserting data into MongoDB

  - Discussed the use of callbacks and decided to keep them within our code.

  - Marceli suggested ways of making insertion easier.

    - i.e by using seeds and migrations through mongoose.

    - Rather than inserting multiple parameters into our 'create' functions.

      - i.e with 'QuizQuestionCreate'.

    - Passing objects into the create functions that are defined by migration (Mongoose seed/migration).

    - Migration was similar to **Create/Drop Scripts** in MySQL.

      

- Spoke about subdocuments

  - to reference objects within objects
  - news topics within quiz questions.
  - Suggestions for news_topic to not be a separate entity
  - A list would be made with a complete list of News Topics that would be made in the migration.
    - Each quiz question would hold one or more references to this News Topic list via indexing.

- Confirmed with Marceli our structure when handling requests and returning the required data from the Database.

##### <u>NEW MEETING OBJECTIVES:</u>

- Alter insertScript to utilise seeds and migration.
- Gain a better understanding of Seeds, Migration and Many-to-Many relationships in Mongoose via these links:
  - https://university.mongodb.com/
  - https://bezkoder.com/mongodb-many-to-many-mongoose/
  - https://www.madetech.com/blog/migrations-seeds-and-pipelines
  - https://www.npmjs.com/package/mongoose-seed
  - https://mongoosejs.com/docs/subdocs.html

- Discussed the relationship between News Topics and Quiz Questions and their uses in the web application.
- Perhaps a Many-to-Many relationship is best because we need to categorise the Quiz Question by News Topic.

- Tested running insertScript with different devices.
- Discovered a VSCode extension for MongoDB to help us work through the assignment and understand the backend further.
- Didn't manage to complete Meeting Objectives:
  - Have been trying to store filled DBs in docker container/image to be used on other devices.
- Next meeting tomorrow we will give insertScript a rehaul.

---

#### Meeting Log 04/04/2021

Plans for meeting:

- by the end of the day, want to be able to run *docker-compose up* and after this, whoever's machine is running the container, to have a populated database  that we have created 

- current problems: we can populate a db by passing in a json file, as follows:

  ```sh
  docker exec -i db sh -c 'mongoimport -u "your_username" -p "your_password" --authenticationDatabase "admin" -c test_collection -d db --jsonArray' < testJSON.json
  ```

  - *note, testJSON* is just a sample json file we took from our local mongo, just to test this mongoimport command ^ works

- ...however, this data does not persist when starting the docker container on a different machine - still staying local

- So our idea is to construct all the json files via our insertDataScript.js and get the correct data out of mongo (local mongo, not dockerised mongo) into a json file, from then we will mongoimport this json payload into the dockerised mongo (From the start)



We constructed a shell script ([*deploy.sh*](../../Example_Code/AngularQuizApp/deploy.sh)) which does the following:

- builds docker - *docker build .*
- aggregate the output of each container in detached mode - *docker-compose up -d*
- inserts all the JSON data we need into the dockerised mongoDB DB

Tested this initally with a file: *testJSON.json* 

Next, tested with an exported file from a local mongoDB DB

- hence, the third command in our script was:

  - *mongoexport -d test -c newstopics -o newsTopicsOutput.json --jsonArray*

  - here, we exported the newsTopics collection from our local mongoDB DB to a file called newTopicsOutput

  - we then imported this file into our dockerised MongoDB DB via the command (in [deploy.sh](../../Example_Code/AngularQuizApp/deploy.sh)):

    - ```sh
      docker exec -i db sh -c 'mongoimport -u "your_username" -p "your_password" --authenticationDatabase "admin" -c test_collection -d db --jsonArray' < newsTopicsOutput.json
      ```

Now checked the correct data was in our dockerised mongoDB DB using the following commands:

```sh
$ sudo docker exec -it db bash
$ mongo
# use admin
# db.auth("<OUR_USERNAME>",passwordPrompt());
# <OUR_PASSWORD>
# db.collection.find() 											// replaced collection with collection name, so test_collection in this case

# db.auth("your_username","your_password");
```

##### Now we've correctly imported some our data, going to create a DB with the right collection names, and populate via this method.

- i.e., each time you run [./deploy.sh](../../Example_Code/AngularQuizApp/deploy.sh) now, it will build and start docker containers, then create the collections we need, and populate the entire DB.

- made DB called fakeNewsDB - this is where all data is stored

- got quiz questions data and user answer data into this data in their respective collections using the commands:

  - for **quizquestions** collection:

    ```bash
    $ mongoexport -d test -c quizquestions -o quizQuestionsOutput.json --jsonArray
    ```

  - for **useranswers** collection:

    ```bash
    $ mongoexport -d test -c useranswers -o userAnswersOutput.json --jsonArray
    ```

  - then imported these, like we did with newsTopicsOutput.json:

  ```sh
  docker exec -i db sh -c 'mongoimport -u "your_username" -p "your_password" --authenticationDatabase "admin" -c quizquestions -d fakeNewsDB --upsert --jsonArray' < quizQuestionsOutput.json
  
  docker exec -i db sh -c 'mongoimport -u "your_username" -p "your_password" --authenticationDatabase "admin" -c useranswers -d fakeNewsDB --upsert --jsonArray' < userAnswersOutput.json
  ```

  - note, in these commands, and the command for importing newsTopicsOutput, included --upsert flag, which modifies the import process so the we drop the collection before importing the data, hence we avoid the duplicate import errors, i.e.,

    ```bash
    error inserting documents: multiple errors in bulk operation:
    
    - E11000 duplicate key error collection: fakeNewsDB.useranswers index: _id_ dup key: { _id: ObjectId('6069a6379da6ffa6ec3c2e0f') }
    ```


Now our [./deploy.sh](../../Example_Code/AngularQuizApp/deploy.sh) script creates and runs docker container, with the correct data in our mongoDB DB.

Also, for navigation, added the 3 JSON files (exported from local mongo) into a folder called **blockData**. 

#### Before Inserting All our Data, checked Data Model Again...

- the useranswers collection may be redundant, since the only use for this is to give a statistic on how many users answered a particular question right / wrong, hence could just store that statistic in the quizquestion collection
- also, the relationship between quizquestion and newstopic collections is a many-to-many relationship, so will want to have arrays of quiz questions in a news topic, and arrays of news topics in a quiz question

- hence reajdusted our datamodel again, and the resulting model is reflected in the model diagram, insertdatascript and the final data that lay in our mongoDB database
- also, should we include a text body explaining why the answer is true

#### Inserting Data

- Agreed on fake news categories as listed on our marvel paper prototype: 
  - Brexit
  - Coronavirus
  - Immigration
  - China 
  - Economy
- Also agreed to add:
  - Climate Change

---

#### Meeting Log 05/04/2021

Goals for today:

- Have a completed Dataset, with fake and real news in all topics.
- Finalise data model for implementation later this week.

When filling in dataset:

- Spent majority of the day collecting data by hand.
- We hand-picked our own data rather than using found datasets (in /Archive)
  - We wanted our quiz to be organised into news topics, which all the datasets didn't have, and not to be organised in terms of 'misinformation' or 'conspiracy' as we didn't think a dataset like that would work effectively in a quiz setting.
  - Had to make sure that we had a verified website opposing the fake news article to make sure that is was **FAKE NEWS**

- Although our dataset is now exactly how we like it and is perfect for the web app, we found it quite difficult to find this data through the use of google (as no one really wants to view fake news, we assume they attempt to phase it out), was difficult and perhaps a proper web-scraping device or a system that implements NLP to searches for the appropriate data would have been a much more effective way to gather this data.

- Updated Data model:
  - Removed User answer table and created new columns in Quiz Question:
    - Num_correct
    - Num_attempted
  - User answer was redundant because we were no longer storing user responses specifically, we are going to give feedback on all users' answers for an insight into how the userbase sees fake news.
  - We have changed our Data model to be more simple by having a one to many relationship between news topics and quiz questions
    - We didnt want quiz questions to appear in multiple topics 
    - Some articles were ambiguous in their topic so it was better to stick with just one instead of putting them in multiple quizzes.

  ---

  #### Meeting Log 06/04/2021

  Now we've adjusted our data model, and the changes have been reflected in our UML diagram and spreadsheet, we're going to change our insertDataScript.js script to incorporate these changes, and insert our data.

  We will mongoexport this data into our json files in blockData directory, then insert them into our dockerised mongoDB container via the the [deploy.sh](../../Example_Code/AngularQuizApp/deploy.sh) script.

  

  Adjusting the insertDataScript

  - first of all, changed our fields in our collections
  - then, decided to add another function, *sortQuizQuestions* which will add quiz questions from the main quizquestion_arr into their respective quiz question category arrays:
    - var brexit_questions = []
    - var corona_questions = []
    - var climate_questions = []
    - var china_questions = []
    - var general_questions = []

  - Num_correct, num_attempted (our metric for user performance in questions) are initialised to be 0 when we create a quiz question

  

  Had to adjust our script, based on a similar script we found [here](https://bezkoder.com/mongoose-one-to-many-relationship/).

  - as we could not insert multiple objects as an array from our original script.

  

  Exported output from local mongoDB as before, into JSON files found in blockData:

  ```bash
  $ mongoexport -d test -c quizquestions -o quizQuestionsOutput.json --jsonArray
  ```
  
  ```bash
  $ mongoexport -d test -c newstopics -o newsTopicsOutput.json --jsonArray
  ```
  
  Now imported into dockerised mongoDB DB via the [deploy.sh](../../Example_Code/AngularQuizApp/deploy.sh) script.

  

  ---

  
  #### Meeting Log 07/04/2021

  - Aim today is to familiarise ourselves with MongoDB commands ready for handling HTTP requests and acquring the correct data for the frontend.
- Began considering how to give random questions to the front-end, the initial thought being:
    - Instead of using ObjectIDs or web_urls to be the unique parameter of a quiz question
    - We would number the questions with an integer (i.e 1-10)
    - And shuffle these into a random order.
  
- Found a command to write out each element of an array out in MongoDB

  - i.e All quiz questions from news topics **SEPARATELY** rather than all together.

    ```mariadb
    > db.newstopics.aggregate( [{$unwind : "$quizquestions"}] )
    ```

- Even better - found a command that gives the array index as well as all of these separate quiz questions

  ```mariadb
  db.newstopics.aggregate([{$unwind:{path:"$quizquestions",includeArrayIndex:"arrayIndex"}}])
  ```

  i.e output would be:

  ```mariadb
  {
  	"_id" : ObjectId("606ca606c745630012e235de"), #i.e the array object ID
  	"quizquestions" : {
  		"web_url" : "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
  		"postDate" : "2021-03-26",
  		"headline" : "The prolonged use of medical masks when properly worn, DOES NOT cause CO2 intoxication nor oxygen deficiency",
  		"text_body" : "The prolonged use of medical masks can be uncomfortable. However, it does not lead to CO2 intoxication nor oxygen deficiency. While wearing a medical mask, make sure it fits properly and that it is tight enough to allow you to breathe normally.",
  		"correct_answer" : true,
  		"correct_answer_url" : "",
  		"num_correct" : 0,
  		"num_attempted" : 0
  	},
  	"topicName" : "Coronavirus",
  	"__v" : 0,
  	"arrayIndex" : NumberLong(4) #<Here is the index of the quiz question within the NewsTopic
  }
  ```

- In another extraordinary turn of events, we found a lot of potential with the `.aggregate` MongoDB command.

- We have formulated a command to target a certain news topic and their array index:

  ```mariadb
  db.newstopics.aggregate(
      [ 
          { "$unwind": {path: "$quizquestions", includeArrayIndex: "arrayIndex"} }, 
          { $match : { topicName : "Coronavirus" } }, #e.g Coronavirus [News Topic].
          { $match : { "arrayIndex" : 7 } },					#e.g Quiz Question Number 7.
      ]
  )
  ```

- The goal would be to create a random array of numbers (obviously no repeats) and give the user a random bunch of questions using this method.

### Using MongoExport with queries

- Referencing [this](https://database.guide/how-to-export-mongodb-query-results-to-a-json-file/ ) website, we can shift the output of a query into a JSON file

- Example from the site:

  ```mariadb
  mongoexport --db=PetHotel --collection=pets --query='{ "type": "Dog" }' --out=data/dogs.json
  ```

- So, in our case:

  ```mariadb
  mongoexport --db=fakeNewsDB --collection=newstopics --query='db.newstopics.aggregate(
      [ 
          { "$unwind": {path: "$quizquestions", includeArrayIndex: "arrayIndex"} }, 
          { $match : { topicName : "Coronavirus" } },
          { $match : { "arrayIndex" : 7 } },					
      ]
  )' --out=queryoutput.json
  ```

```bash
docker exec -i db sh -c 'mongoexport -u "your_username" -p "your_password" --authenticationDatabase "admin" -c newstopics -d fakeNewsDB --query='db.newstopics.aggregate([{"$unwind": {path: "$quizquestions",includeArrayIndex:"arrayIndex"} },{ $match : { topicName : "Coronavirus" } },   {$match : { "arrayIndex" : 7 } },])'' > blockData/queryoutput.json
```

### Creating Methods to determine how user data is inserted and returned to/from the user.

Using [this]() webpage for reference, we are going to learn ways of manoevering data to and from MongoDB, *properly*, using Mongoose-style methods. Most likely using controllers. So the chain would be:

`Schema/Models -----> Controllers -----> Api etc..`

Objectives for tomorrow:

- ###### Continue attempting to process queries through Api.js through to Localhost to see if it works.


---

### 08/04/2021

Meeting with front-end team, started consolidating our work

They have found a framework, and realised we need to export a JSON file for each newstopic, and from that they can render quizquestions data in a random order

However, data model needs to be adjusted to incorporate the following changes:

- add options object array to quizquestions, in which stores true/false (2 options)
- we need to return the json file with its array index in news topic schema 
- *maybe hard code "questionTypeID:1 when printing out as json"*

Going to structure our mongoose output according to this composed example JSON file.

```json
{
    "topicName": "JavaScript Quiz",
    "questions": [
        {
            "questionId": 1010,
            "headline": "A fake news headline",
            "web_url": "www.fakenewswebsite.com",
            "postData": "2021-04-08",
            "text_body": "......fake text.......", 
            "correct_answer_url": "<leave me blank for true headline questions>",
            "num_correct": 10,
            "num_attempted": 20,
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "name": "Real",
                    "isCorrectAnswer": false				
                },
                {
                    "id": 1056,
                    "name": "Fake",
                    "isCorrectAnswer": true					
                },
            ]
        },
      {
            "questionId": 1010,
            "headline": "A real news headline",
        		"web_url": "www.trustednewswebsite.com",
        		"postData": "2021-04-08",
            "text_body": "......fake text.......",
            "correct_answer_url": "<leave me blank for true headline questions>",
            "num_correct": 15,
            "num_attempted": 30,
            "questionTypeId": 1,
            "options": [
                {
                    "id": 1055,
                    "name": "Real",
                    "isCorrectAnswer": true				
                },
                {
                    "id": 1056,
                    "name": "Fake",
                    "isCorrectAnswer": false				
                },
            ]
        },
      ]
}      
```

as well as the schema we need, *output.ts*:

```typescript
export class Option {
    id: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;									// initialise this to be false

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.isAnswer = data.isAnswer;
    }
}
```



**STEP 1: Adjusting The Data Model**

- now adjusting the data model UML and data model spreadsheet to incorporate options 

No longer need correct_answer field in Quiz Question as this information is stored in Options



*Going to need to create 4 different Options schemas:*

1. name: Real && isCorrectAnswer = true;
2. name: Real && isCorrectAnswer = false;
3. name: Fake && isCorrectAnswer = true;
4. name: Fake && isCorrectAnswer = false;

- that way we can reference each option when we need to when instantiating quizQuestion arrays



So, 4 options in memory, but each question will store 2 options in its array.

In the spreadsheet, in Options Table (document) will see Selected initialised to be false. 



**Updated data model in Documentation**



**STEP 2: Creating Options Model Schema in /models**

[models/options.js](../../Example_Code/AngularQuizApp/models/options.js) now looks like this:

```javascript
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var OptionsSchema = new Schema({
  name: String,
  isCorrectAnswer: Boolean,
  selected: Boolean
});


// Virtual for newsTopics's URL
OptionsSchema
.virtual('url')
.get(function () {
  return '/models/options/' + this._id;
});


//Creating a model from schema we've just made, and exporting it to be used elsewhere
module.exports = mongoose.model('Options', OptionsSchema);
```

Note, also had to change quizquestion schema for our updated data model:

models/quiz_question.js now looks like this:

```javascript
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var QuizQuestionSchema = new Schema({
  web_url: String,
  postDate: Date,
  headline: String,
  text_body: String,
  correct_answer_url: String,
  num_correct: Number,
  num_attempted: Number,
  options: []
});


// Virtual for quizQuestion's URL
QuizQuestionSchema
.virtual('url')
.get(function () {
  return '/models/quiz_question/' + this._id;
});

//Creating a model from schema we've just made, and exporting it to be used elsewhere
module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
```



Now models updated, need to make options schemas in mongo, so added .... to [insertDataScript.js](../../Example_Code/AngularQuizApp/insertDataScript.js)



Gone through, created the 4 different Options tables, then each time we create a quizQuestion (and push it to the quizquestion array in NewsTopics shchema), we specify the 2 options necessary:

- i.e., for our first quiz question, which is a fake news headline, in the Brexit news topics collection, we add the following options:

  ```javascript
  var optionR_F = await createOption({										// '..R_F' for Real-False, i.e., is it a REAL news headline? False
          name: "Real",
          isCorrectAnswer: false,
          selected: false
      });
  
  var optionF_T = await createOption({									// '..F_T' for Fake-True, i.e., is it a FAKE news headline? True
          name: 'Fake',
          isCorrectAnswer: true,
          selected: false 
     });
  
  ```

- for a real news headline, we would add **optionR_T** and **optionF_F**



Now data inserted into localMongo, we export to the json files in blockData, like so:

```bash
$ mongoexport -d test -c options -o optionsOutput.json --jsonArray
```

```bash
$ mongoexport -d test -c quizquestions -o quizQuestionsOutput.json --jsonArray
```

```bash
$ mongoexport -d test -c newstopics -o newsTopicsOutput.json --jsonArray
```

And changed [*deploy.sh*](../../Example_Code/AngularQuizApp/deploy.sh) to import these 3 new json files

------

## Meeting 09/04/2021

*<u>Meeting with Marceli</u>*

- *Wanted to talk about our framework and how it doesn't really need us to execute mongoDB commands, is this OK?*

- *What's going on with the mongoose connection (in db.js), i.e., why cant i require(./db) in api.js?*

  - *We require it in server? so how do i export the connection so it can be used elsewhere?*
  - *In db.js, tried assigning mongoose.connect to a const called connectDB, then exporting connectDB, but when requiring this got errors.*

  

- After the meeting, it was clear that the main problem was that we weren't passing the correct environment variables when accessing the container's MongoDB.
- We also needed to change the way we 'docker build' as the process was taking too long]
  
  - So Marceli advised us to create a local docker build process which uses Port 27018 which used the `LOCAL` fields in the .env file.

Changed the following files in order to have a working query:

- [**`Docker-compose.yml`**](../../Example_Code/AngularQuizApp/docker-compose.yml) 
  - Commented out Environment in services:
    - This wasn't needed as these variables are already initialised using the `.env` file.
  - Implemented ports as variables from `.env` file.
- [**`Server.js`**](../../Example_Code/AngularQuizApp/server.js) 
  - Required a check to see if we were `LOCAL` or not:
    - If so, module `dotenv` (gets all the .env credentials) is required. `dotenv` is a module defined in `package.json`.
- [**`db.js`**](../../Example_Code/AngularQuizApp/db.js)
  - Used new `.env` variables mentioned previously
  - Created Local and Container URLs, which gets used depending on well, if we are using the local or the container's MongoDB.
  - Added `console.logs` as part of the debugging process, but may keep them in.
- [**`Package.json`**](../../Example_Code/AngularQuizApp/package.json)
  - Included the local command aforementioned.
- [**`Api.js`**](../../Example_Code/AngularQuizApp/server/routes/api.js)
  - Formulated a /newsTopic response, basically using a Mongoose command to query MongoDB with `db.newstopics.find()`.
    - This is a good starting point to start creating the right methods to handle user responses tomorrow.
  - Again, `console.logs` for debugging, but may keep them in because useful to have responses in the terminal down the line.
- **`.env`**
  - Added hostname variables for `LOCAL` Mongo and container Mongo.
  - Added port variables for both mongos
    - Exposing the db on `MONGO_PORT_LOCAL` for example.
      - For local access.
    - Added ports for both `APPS`, i.e exposing both ports:
      - `APP_PORT=3000`
      - `APP_PORT_LOCAL=3001`

Other notes from meeting:

```bash
npm run local 										// where local a script in package.json
```

- local runs docker-compose up -d 
- and runs node serve.js with flag is IS_LOCAL (does process.env)
  - reason for this is we will use it in [server.js](../../Example_Code/AngularQuizApp/server.js) to see what port to use
  - if not true, then just uses process.env:PORT 

------

## Meeting 12/04/2021

Plan today: 

- Get some methods completed that we are actually going to use for our web-app.

- Dished certain data to certain /pages; querying MongoDB through the `.find` method.

- Began methods that increment the `num_correct` and `num_attempted` quiz question fields by using `findOneandUpdate` method.

  - Will complete these properly tomorrow, by making them dynamic and `.save`ing them back to MongoDB.

------

## Meeting 18/04/2021

- We are planning on implementing the backend elements to a feature where the user can see how their answer compared to other people who have taken the quiz.

- We will need to send a parameters (such as `_id`/`web_url`) through the front end to the back end in order to update `num_correct` and `num_attempted` per question.

- Had to communicate with the front end to find at what point the application determines if a user got the question correct i.e `selected` field === `correct_answer` field in particular `quiz_question` document.

- Found a method `'isCorrect'` inside[`quiz.component.ts`](../../src/app/quiz/quiz.component.ts), called in [ `quiz.component.html`](../../src/app/quiz/quiz.component.html)

  

  ##### The plan is:

  - When a user input is labelled correct or incorrect, depending on the result, we want to send a request to the api to update the necessary quiz question and the appropriate fields.
    - Most likely using `_id` and `$inc` to update `num_correct` and `num_attempted`
  - Reading [this](https://stackoverflow.com/questions/514892/how-to-make-an-http-get-request-with-parameters) article:
    - We found that we can pass parameters to our api via a `get` request. i.e passing `question_id` to the api.
    - We can access our api using the `data_service` object in `quiz.component.ts`
    - We decided to create two `get` methods in [Api.js](../../Example_Code/AngularQuizApp/server/routes/api.js), one for a correct answer and one for an incorrect answer.
    - So:
      - user answers -> call `isCorrect` -> determine correct answer -> pass question `_id` as a parameter to the appropriate correct/incorrect `get` method.

- We created these methods mentioned above
- However each parameter we passed ended up being `undefined` 
- Could need some other assistance as this is a gap in knowledge that we are unable to get round at this moment in time.

------

## Meeting 20/04/2021

- Found out in newsTopics we were referencing by value rather than referencing the reference.
- In [quiz_question.js](../../Example_Code/AngularQuizApp/models/quiz_question.js):
  - Exported the schema as well as the model, hoping the implement this and access the necessary fields.
- Marceli made us aware of Subdocuments in Mongoose which is relevant to this issue.
- Suggested to use `post` requests and pass in a `body` of quiz questions.
  - So we'll be able to access the necessary parameters.

##### Putting it into action:

- We found that even whilst implementing the techniques suggested, we still struggled to avoid the parameters being `undefined` 
- We think it may be something to do with how the framework we are implementing functions as we have tried multiple approaches to the issue.
- Also when we tried to use the Schema instead of the Model, we had undefined values returned.

------

## Meeting 21/04/2021

Plan Today:

- Finalising Backend structure and internals
- Checking all of our code and removing comments/unused methods and components.
- Removing subdocument work:
  - No success in a full implementation of this and didn't want to risk comprimising other work done previously to no avail.
  - Need to update all models and schema to remove the affected fields
- [Api.js](../../Example_Code/AngularQuizApp/server/routes/api.js):
  - Decided to leave in individual `get` methods individual quiz topics
    - Reason being, be may in the future build a database of questions getting to a size where it'll be more efficient to retrieve individual questions rather than a large JSON payload.
    - SEE `FUTURE DEVELOPMENT CODE` - `CODE SECTION 1` in [Api.js](../../Example_Code/AngularQuizApp/server/routes/api.js) etc.
