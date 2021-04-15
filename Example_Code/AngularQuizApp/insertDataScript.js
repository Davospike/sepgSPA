// our URL = 'mongodb://localhost:27017';
const userArgs = process.argv.slice(2);
const mongoose = require("mongoose");
//const connectDB = require('./db');
const mongoDB = userArgs[0];
//const mongoDB = userArgs;
const QuizQuestion = require('./models/quiz_question');
const NewsTopic = require('./models/news_topic');
const Option = require('./models/options');

const createOption = function(option) {
    return Option.create(option).then(docOption => {
      //console.log("\n>> Created Option:\n", docNewsTopic);
      return docOption;
    });
  };

const createNewsTopic = function(newstopic) {
  return NewsTopic.create(newstopic).then(docNewsTopic => {
    //console.log("\n>> Created News Topic:\n", docNewsTopic);
    return docNewsTopic;
  });
};

const createQuizQuestion = function(topic_id, quizquestion) {
    return QuizQuestion.create(quizquestion).then(docQuizQuestion => {
      //console.log("\n>> Created Quiz Question:\n", docQuizQuestion);
      //console.log("coming from topic: ", topic_id);
      return NewsTopic.findByIdAndUpdate(
          topic_id,
          {
              $push: {
                  quizquestions: {
                      web_url: quizquestion.web_url,
                      postDate: quizquestion.postDate,
                      headline: quizquestion.headline,
                      text_body: quizquestion.text_body,
                      correct_answer_url:quizquestion.correct_answer_url,
                      num_correct: quizquestion.num_correct,
                      num_attempted: quizquestion.num_attempted,
                      options: quizquestion.options
                  }
              }
          },
          { new: true, useFindAndModify: false }
      );
    });
};

const run = async function() {

    ///////////////////////////////////////////////////////////////
   //////////////////       Options    ///////////////////////////
   ///////////////////////////////////////////////////////////////

   var optionR_T = await createOption({
       name: "Real",
       isCorrectAnswer: true,
       selected: false
   });
   
   var optionR_F = await createOption({
        name: "Real",
        isCorrectAnswer: false,
        selected: false
    });

   var optionF_T = await createOption({
        name: 'Fake',
        isCorrectAnswer: true,
        selected: false 
   });
   var optionF_F = await createOption({
        name: 'Fake',
        isCorrectAnswer: false,
        selected: false 
    });

   ///////////////////////////////////////////////////////////////
   //////////////////       Brexit    ////////////////////////////
   ///////////////////////////////////////////////////////////////  


    var brex_newstopic = await createNewsTopic({
        topicName: "Brexit"
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.facebook.com/brexitpartyuk/photos/a.271166190434819/379249536293150/?type=3&theater",
        postDate: "2019-10-01",
        headline: "CLEAN BREAK BREXIT",
        text_body: "It\'s our money to invest as we see fit. We don\'t owe the EU a single-penny more. Let us invest our money as we see fit - starting with a £200bn Brexit dividend for Britain\'s regions",
        correct_answer_url: "https://firstdraftnews.org/latest/brexit-the-false-misleading-and-suspicious-claims-crosscheck-has-uncovered/",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://bylinetimes.com/2019/09/11/brexit-disaster-capitalism-8-billion-bet-on-no-deal-crash-out-by-boris-johnsons-leave-backers/",
        postDate: "2019-11-09",
        headline: "EXCLUSIVE: BREXIT DISASTER CAPITALISM - £8 Billion Bet on No Deal Crash-Out By Boris Johnson\'s Leave Backers",
        text_body: "Boris Johnson’s leadership campaign backers in the City stand to make billions of pounds from his ‘do or die’ pledge to take Britain out the of the EU by the end of October, [REDACTED] can reveal. From the financial data publicly available, [REDACTED] can reveal that currently £4,563,350,000 (£4.6 billion) of aggregate short positions on a ‘no deal’ Brexit have been taken out by hedge funds that directly or indirectly bankrolled Boris Johnson’s leadership campaign.",
        correct_answer_url: "https://www.ft.com/content/72db9e42-be23-3b5f-92fb-7e2d2079d51c.",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.politicalite.com/latest/eu-economy-weakest-its-been-in-over-a-decade-and-ready-to-collapse-new-data-reveals/",
        postDate: "2019-09-30",
        headline: "EU Economy “Weakest It’s Been In Over A Decade” And Ready To COLLAPSE New Data Reveals",
        text_body: "The economical crisis in the Eurozone worsened yesterday as new data revealed that industries within the failing EU project are experiencing new lows of confidence, particularly in the industrial sector. The European Commission reports that factories became even more glum this month, as trade war worries and a “substantial deterioration” in industrial confidence dragged its monthly gauge of economic measure down to just 101.7 points from 103.1 in August – the weakest since 2014.",
        correct_answer_url: "https://ec.europa.eu/info/sites/info/files/esi_2019_09_en.pdf",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.facebook.com/watch/?v=2413551192300057",
        postDate: "2019-09-23",
        headline: "Jeremy Corbyn and Labour want to introduce a free-for-all benefits handout that would cost taxpayers a staggering £520 billion a year.",
        text_body: "Labour’s reckless and irresponsible approach would undo all the hard work of the British people, meaning more debt, higher taxes and fewer jobs.",
        correct_answer_url: "https://firstdraftnews.org/latest/brexit-the-false-misleading-and-suspicious-claims-crosscheck-has-uncovered/",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "http://www.voteleavetakecontrol.org/why_vote_leave.html",
        postDate: "2016-06-22",
        headline: "Why vote leave?",
        text_body: "We will be able to save £350 million pounds a week. We can spend our money on our priorities like the NHS, Schools, and Housing. ... The EU already costs us £350 million a week - enought to build a new NHS hospital every week. We get less than half of this back, and have no say over how its spent.",
        correct_answer_url: "https://www.theguardian.com/commentisfree/2017/sep/18/boris-johnson-350-million-claim-bogus-foreign-secretary/",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.cnbc.com/2019/12/17/uk-government-to-block-any-delay-to-post-brexit-deadline-pound-falls.html",
        postDate: "2019-12-17",
        headline: "Pound slumps 1% as Boris Johnson raises fresh risk of a no-deal Brexit",
        text_body: "The pound fell more than 1% in early trade Tuesday after media reports said that the British government will block a delay to the post-Brexit transition period. Local media reported early Tuesday that Prime Minister Boris Johnson will add a revision to the Brexit bill (formally known as the Withdrawal Agreement Bill) that would explicitly rule out any extension to the transition period beyond December 2020. British media reports say that the Johnson’s government will try to make it illegal for the transition period to be extended in a bid to put more more pressure on the EU and to fast-track a trade deal.",
        correct_answer_url: "",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.thedrum.com/news/2019/09/01/british-government-s-100m-brexit-advertising-campaign-revealed",
        postDate: "2019-09-01",
        headline: "British Government’s £100m Brexit advertising campaign revealed.",
        text_body: "The British Government has revealed its ‘Get ready for Brexit’ campaign, costing £100m that is set to run across the UK in preparation for the nation departing the EU. Ahead of 31 October when Britain is expected to depart the EU, the campaign will aim to prepare the public and business owners for whatever agreement is, or isn’t, made between the British Government and European leaders. Activity will run across outdoor, television, social media and other platforms and will aim to drive citizens to visit the Government website for more information.",
        correct_answer_url: "",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://abcnews.go.com/International/uk-government-queen-suspend-parliament-push-brexit-reports/story?id=65235125",
        postDate: "2019-08-28",
        headline: "Queen approves UK government's request to suspend Parliament during crucial Brexit period.",
        text_body: "LONDON -- Queen Elizabeth has approved a request by Prime Minister Boris Johnson to suspend Parliament, a move that appears designed to thwart opposition lawmakers from blocking Brexit, prompting protests in cities across the United Kingdom. Johnson spoke to the Queen on Wednesday to request an end to the current Parliament session in September. The shift gives opposition lawmakers less time to block a no-deal Brexit before the U.K.\'s Oct. 31 deadline to leave the European Union. The leader of the opposition Labour Party, Jeremy Corbyn, has asked to meet the Queen to block the move, and vowed to do 'everything we can to stop Boris Johnson's smash and grab against our democracy.''",
        correct_answer_url: "",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.nature.com/news/brexit-government-s-anti-immigration-stance-spooks-uk-scientists-1.20755",
        postDate: "2016-10-06",
        headline: "Brexit government’s anti-immigration stance spooks UK scientists",
        text_body: "UK scientists say they’re dismayed by their new government’s toughened stance on curbing immigration, including ideas to restrict the flow of foreign students and workers. “We are not leaving the European Union only to give up control of immigration again,” said May, opening the conference.",
        correct_answer_url: "",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
    } );

    brex_newstopic = await createQuizQuestion(brex_newstopic._id, {
        web_url: "https://www.euractiv.com/section/data-protection/news/uk-government-accused-of-harvesting-citizen-data-ahead-of-brexit/",
        postDate: "2019-09-11",
        headline: "UK government accused of ‘harvesting citizen data’ ahead of Brexit",
        text_body: "UK opposition parties have hit out at the government for allegedly harvesting user data, surreptitiously obtaining information from individuals accessing the official Gov.uk website, ahead of the UK’s scheduled withdrawal from the EU at the end of October. A leaked memo seen by the Buzzfeed news website details private messages that UK Prime Minister Boris Johnson shared with government ministers in the cabinet committee dealing with no-deal preparations, in which he informed them of the importance of gathering user information in order to facilitate exit preparations. The Gov.uk website “is serving as a platform to allow targeted and personalised information to be gathered, analysed and fed back actively to support key decision-making – in effect, focused on generating the highest-quality analytics and performance data to support exit preparations,” the memo reportedly states.",
        correct_answer_url: "",
        num_correct: 0,
        num_attempted: 0,
        options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
    } );

    console.log("\n>> BREXIT News Topic:\n", brex_newstopic);


    ///////////////////////////////////////////////////////////////
   //////////////////      Coronavirus    /////////////////////////
   ////////////////////////////////////////////////////////////////
   var corona_newstopic = await createNewsTopic({
      topicName: "Coronavirus"
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://metro.co.uk/2020/04/02/north-korea-claims-0-coronavirus-cases-global-count-reaches-one-million-12498221/",
      postDate: "2020-04-02",
      headline: "North Korea claims it has 0 coronavirus cases as global count reaches one million.",
      text_body: "North Korea has claimed it is completely free of coronavirus as confirmed global infections near one million. The already isolated, nuclear-armed country quickly shut down its borders after Covid-19 was first detected in neighbouring China in January, and imposed strict containment measures.",
      correct_answer_url: "",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://www.sciencedaily.com/releases/2020/11/201102155409.htm",
      postDate: "2020-11-02",
      headline: "Hot or cold, weather alone has no significant effect on COVID-19 spread",
      text_body: "Research led by The University of Texas at Austin is adding some clarity on weather’s role in COVID-19 infection, with a new study finding that temperature and humidity do not play a significant role in coronavirus spread. That means whether it’s hot or cold outside, the transmission of COVID-19 from one person to the next depends almost entirely on human behavior.",
      correct_answer_url: "",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://www.bupa.co.uk/newsroom/ourviews/covid-19-vaccine-facts",
      postDate: "2020-02-16",
      headline: "Vaccination cannot give you COVID-19",
      text_body: "COVID-19 vaccines cannot cause COVID-19 infection. The myth that vaccination can give you COVID-19 seems to stem from a misunderstanding about what vaccines are and how they work.",
      correct_answer_url: "",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
      postDate: "2021-03-26",
      headline: "People should NOT wear masks while exercising",
      text_body: "People should NOT wear masks when exercising, as masks may reduce the ability to breathe comfortably. Sweat can make the mask become wet more quickly which makes it difficult to breathe and promotes the growth of microorganisms. The important preventive measure during exercise is to maintain physical distance of at least one meter from others.",
      correct_answer_url: "",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
      postDate: "2021-03-26",
      headline: "The prolonged use of medical masks when properly worn, DOES NOT cause CO2 intoxication nor oxygen deficiency",
      text_body: "The prolonged use of medical masks can be uncomfortable. However, it does not lead to CO2 intoxication nor oxygen deficiency. While wearing a medical mask, make sure it fits properly and that it is tight enough to allow you to breathe normally.",
      correct_answer_url: "",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );


   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://beforeitsnews.com/u-s-politics/2021/04/pregnant-considering-the-jab-number-of-women-losing-babies-after-experimental-covid-injection-increases-by-366-2582140.html",
      postDate: "2021-04-03",
      headline: "Number Of Women Losing Babies After Experimental COVID Injection Increases By 366%",
      text_body: "Losing a new born is a heart breaking endeavour, as is the pain of losing an unborn child. Which is why we’re both saddened and shocked to bring you the latest update on the number of unborn and newborn children to lose their lives as a result of the mothers receiving one of the Covid-19 vaccines in the United Kingdom.",
      correct_answer_url: "https://www.npr.org/sections/health-shots/2021/04/02/983666339/study-covid-19-vaccine-is-safe-during-pregnancy-and-may-protect-baby-too",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://beforeitsnews.com/prophecy/2020/12/the-unmasked-buried-the-masked-in-the-spanish-flu-is-history-going-to-repeat-itself-what-did-people-in-masks-die-from-bacterial-pneumonia-dr-feces-fauci-wrote-about-this-in-2516514.html",
      postDate: "2020-12-16",
      headline: "The Unmasked Buried The Masked In The 'Spanish Flu'. Is History Going To Repeat Itself? What Did People In Masks Die From? Bacterial Pneumonia.",
      text_body: "German Doctor Has Reported 3 Children’s Deaths From Wearing Masks",
      correct_answer_url: "https://www.reuters.com/article/uk-factcheck-masks-idUSKBN26R3D9",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://beforeitsnews.com/eu/2020/11/the-shocking-reason-why-pfizers-coronavirus-vaccine-requires-storage-at-70c-because-it-contains-experimental-nanotech-components-that-have-never-been-used-in-vaccines-before-2664075.html",
      postDate: "2020-11-18",
      headline: "The Shocking Reason Why Pfizer’s Coronavirus Vaccine Requires Storage at -70C - It Contains Experimental Nanotech Components Which Have Never Been Used in Vaccines Before",
      text_body: "As Children’s Health Defense explained in an August 6th article, “mRNA vaccines undergoing Covid-19 clinical trials, including the Moderna vaccine, rely on a nanoparticle-based “carrier system” containing a synthetic chemical called polyethylene glycol (PEG)",
      correct_answer_url: "https://www.reuters.com/article/uk-factcheck-vaccine-nanoparticles-idUSKBN28F0I9",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://prntly.com/2020/02/28/coronavirus-recovery-rate-in-us-is-100-stop-panicking/",
      postDate: "2020-02-28",
      headline: "Coronavirus recovery rate in US is 100%",
      text_body: "Across the globe, the media spreads panic about the Coronavirus. But it’s fatality rate is small. If you are already healthy, your chances of dying are slim to none. And for the United States, we’re leading the globe in recovery. While other countries struggle to contain the virus and treat infected, the US already has a whopping 100% recovery rate. Meanwhile, countries with socialist healthcare systems are facing brutal fatality rates, like those in Iran and Italy.",
      correct_answer_url: "https://fullfact.org/health/Covid-recovery-vaccine/",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   corona_newstopic = await createQuizQuestion(corona_newstopic._id, {
      web_url: "https://prntly.com/2020/01/30/black-death-virus-dna-sequenced-96-5-match-with-similar-virus-found-in-bats/",
      postDate: "2020-01-30",
      headline: "BLACK DEATH: Virus DNA sequenced; 96.5% Match With Similar Virus Found In Bats.",
      text_body: "They are almost identical to each other and share 79.5% sequence identify to SARS-CoV. Furthermore, it was found that nCoV-2019 is 96% identical at the whole genome level to a bat coronavirus. So the cause of this rapidly spreading illnesses is a virus that mutated from bats to people. But how could a virus have made such a jump? The answer lies in one of the most gross food practices in China today.",
      correct_answer_url: "'https://faktograf.hr/2020/02/05/nije-dokazano-da-je-jedenje-juhe-od-sismisa-povezano-s-koronavirusom/",
      num_correct: 0,
      num_attempted: 0,
      options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   console.log("\n>> CORONAVIRUS News Topic:\n", corona_newstopic);

   ///////////////////////////////////////////////////////////////
  //////////////////      Climate Change    //////////////////////
  ////////////////////////////////////////////////////////////////

  var climate_newstopic = await createNewsTopic({
       topicName: "Climate Change"
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://web.archive.org/web/20181116133754/https://metro.co.uk/2018/11/16/a-mini-ice-age-could-be-on-the-way-and-its-going-to-get-very-very-cold-8146529",
       postDate: "2018-11-16",
       headline: "A mini ice age could be on the way and it’s going to get very, very cold",
       text_body: "That’s the warning from a Nasa scientist who fears sunspot activity on the surface of our star has dropped so low that it could herald the arrival of a uniquely grim mini Ice Age. ‘We see a cooling trend,’ Martin Mlynczak of Nasa’s Langley Research Center told Space Weather.",
       correct_answer_url: "https://www.poynter.org/fact-checking/2018/this-fact-checker-got-several-news-outlets-to-correct-a-false-story-about-a-mini-ice-age/",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.weforum.org/agenda/2018/06/90-of-plastic-polluting-our-oceans-comes-from-just-10-rivers/",
       postDate: "2018-06-08",
       headline: "90% of plastic polluting our oceans comes from just 10 rivers",
       text_body: "By analyzing the waste found in the rivers and surrounding landscape, researchers were able to estimate that just 10 river systems carry 90% of the plastic that ends up in the ocean. Eight of them are in Asia: the Yangtze; Indus; Yellow; Hai He; Ganges; Pearl; Amur; Mekong; and two in Africa – the Nile and the Niger.",
       correct_answer_url: "https://marinelitter.no/",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.toddstarnes.com/values/the-australia-bushfires-have-nothing-to-do-with-climate-change-it-was-arson/?fbclid=IwAR3mDMm28-8GBDNEN-31YK0lOVJi9HlET8Vxe9DrH5z5KjHjka48HuZcS9c",
       postDate: "2020-01-07",
       headline: "In My Humble Opinion, the Australia Bushfires Have Nothing to Do With Climate Change; It Was Arson",
       text_body: "Radical environmental extremists and Hollywood celebrities have blamed the fires on climate change. But it turns out — climate change has nothing to do with the humanitarian crisis unfolding Down Under. It turns out — many of the fires were set by arsonists. The Australian reports more than 180 people have been arrested since the start of the bushfire season.",
       correct_answer_url: "https://www.politifact.com/factchecks/2020/jan/10/facebook-posts/those-claims-about-nearly-200-arrested-arson-austr/",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://everythingclimate.org/climate-change-is-causing-accelerated-21st-century-surface-warming/",
       postDate: "",
       headline: "Climate Change is Causing Accelerated 21st Century Surface Warming.",
       text_body: "Most Observed Warming is Natural, Almost half of the global warming in the 21st century is due to El Niño events",
       correct_answer_url: "https://www.nature.com/articles/d41586-018-07638-w'",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://wattsupwiththat.com/2009/10/28/the-sun-defines-the-climate-an-essay-from-russia/",
       postDate: "2009-09-28",
       headline: "The Sun Defines the Climate",
       text_body: "The Sun Defines the Climate', 'Observations of the Sun show that as for the increase in temperature, carbon dioxide is “not guilty” and as for what lies ahead in the upcoming decades, it is not catastrophic warming, but a global, and very prolonged, temperature drop.",
       correct_answer_url: "https://www.carbonbrief.org/why-the-sun-is-not-responsible-for-recent-climate-change",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.tampabay.com/things-to-do/food/cooking/The-facts-about-farmed-salmon-you-wish-you-didn-t-know_166193900/#:~:text=Studies%20show%20that%20farmed%20salmon,from%20herbicides%20like%20Agent%20Orange.",
       postDate: "2018-03-21",
       headline: "The facts about farmed salmon you wish you didn’t know",
       text_body: "The facts about farmed salmon you wish you didn’t know', 'Studies show that farmed salmon contains up to eight times more PCBs — cancer-causing industrial chemicals that were banned in 1979 — than wild, as well as high levels of mercury and dioxins from herbicides like Agent Orange.",
       correct_answer_url: "",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.nationalgeographic.com/culture/article/100-million-sharks-killed-every-year-study-shows-on-eve-of-international-conference-on-shark-protection",
       postDate: "2013-03-01",
       headline: "100 Million Sharks Killed Every Year, Study Shows On Eve of International Conference on Shark Protection",
       text_body: "One of the most comprehensive studies ever compiled on illegal shark killing brings new startling statistics. An estimated 100 million sharks are killed every year around the world, a number that far exceeds what many populations need to recover.",
       correct_answer_url: "",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.npr.org/sections/goatsandsoda/2020/10/27/928201367/study-air-pollution-contributes-to-500-000-newborn-deaths-a-year?t=1617607272319",
       postDate: "2020-10-27",
       headline: "New Study Points To Invisible Killer Of Infants",
       text_body: "Air pollution, both inside and outside the home, contributed to the deaths of about 500,000 newborns in 2019",
       correct_answer_url: "",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.bbc.co.uk/news/science-environment-49483580",
       postDate: "2019-09-03",
       headline: "Greenland’s ice faces melting ’death sentence",
       text_body: "Greenland’s massive ice sheet may have melted by a record amount this year, scientists have warned. During this year alone, it lost enough ice to raise the average global sea level by more than a millimetre.",
       correct_answer_url: "",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   climate_newstopic = await createQuizQuestion(climate_newstopic._id, {
       web_url: "https://www.iucn.org/resources/issues-briefs/deforestation-and-forest-degradation#:~:text=Over%20half%20of%20the%20tropical,forests%20to%20provide%20essential%20services.",
       postDate: "2021-02-01",
       headline: "Deforestation and forest degradation",
       text_body: "Over half of the tropical forests worldwide have been destroyed since the 1960s, and every second, more than one hectare of tropical forests is destroyed or drastically degraded.",
       correct_answer_url: "",
       num_correct: 0,
       num_attempted: 0,
       options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
   } );

   console.log("\n>> Climate Change News Topic:\n", climate_newstopic);


  ///////////////////////////////////////////////////////////////
//////////////////         General    ///////////////////////////
////////////////////////////////////////////////////////////////

var gen_newstopic = await createNewsTopic({
    topicName: "General"
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.theonion.com/tinder-introducing-background-check-feature-1846607944",
    postDate: "2021-04-02",
    headline: "Tinder Introducing Background-Check Feature",
    text_body: "Tinder, whose parent company Match Group also owns OKCupid and Hinge, will be introducing an in-app feature later this year that performs background checks on potential dates to flag any violent crimes.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.theonion.com/chauvin-defense-team-attempts-to-demonize-george-floyd-1846593075",
    postDate: "2021-04-01",
    headline: "Chauvin Defense Team Attempts To Demonize George Floyd By Tying Him To High-Profile 2020 Murder.",
    text_body: "In an effort to build a case supporting their client’s exoneration, the defense team of Minneapolis police officer Derek Chauvin reportedly attempted to demonize the late George Floyd Wednesday by tying him to a high-profile 2020 murder. “To convict Officer Chauvin on these charges is to blatantly ignore Mr. Floyd’s questionable past, including his very presence at the scene of a brutal murder on May 25, 2020,” said Eric Nelson, Chauvin’s attorney, informing the judge that he had video evidence suggesting that Floyd had even played a role in the brutal slaying of a defenseless man. “We would be remiss if we didn’t question why Mr. Floyd was present at a murder. We simply want to present the evidence demonstrating Mr. Floyd’s clear ties to a senseless killing and let the jury draw their own conclusions. Furthermore, we cannot ignore the fact that for nearly a year, Mr. Floyd’s name has been synonymous with murder, and we just need to state for the record that this raises some potentially disturbing questions about his character",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://entertainment.theonion.com/disney-announces-next-movie-will-feature-princess-with-1846416867",
    postDate: "2021-03-05",
    headline: "Disney Announces Next Movie Will Feature Princess With Never-Before-Seen Ethnicity.",
    text_body: "Taking a huge step toward adding more diversity to their films, Disney announced Friday that the company’s next movie would feature a princess with a never-before-seen ethnicity. “The film will tell the story of a young girl who grows up in the traditions of a storied culture no one in the world has ever heard of before,” said Disney CEO Bob Chapek, explaining that audiences will be introduced to this completely original ethnic group through the princess’s coming-of-age story living among a group of people sharing a common set of traditions unexplored until now. “The story itself will celebrate the music, art, and folklore of the princess’s ancestors, which we think everyone will find new and unfamiliar.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.theonion.com/chauvin-defense-team-praises-officer-s-restraint-in-not-1846599521",
    postDate: "2021-04-01",
    headline: "Chauvin Defense Team Praises Officer’s Restraint In Not Killing Bystanders",
    text_body: "In an effort to highlight his client’s impeccable character, the defense attorney representing Derek Chauvin praised the former police officer Thursday for exercising great restraint by not killing bystanders. “As the video evidence shows, there were several bystanders standing only a few feet away during the time of George Floyd’s arrest, and yet Mr. Chauvin didn’t attempt to shoot or strangle a single one,” said attorney Eric Nelson, who commended Chauvin for remaining calm and composed while responding to the call regarding a counterfeit bill by letting the half-dozen witnesses watching from the curb go physically unscathed.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.bbc.co.uk/news/business-56598932",
    postDate: "2021-04-01",
    headline: "Runway dining at $540 a meal proving hit in Japan",
    text_body: "Plane food may not be everyone's idea of a fancy meal out, but a service offering just that on a parked airliner is selling like hotcakes. Japan's biggest carrier, All Nippon Airways, started selling tickets for dinner on the runway - at $540 (£392) a meal - on Wednesday and has already added more slots for April after the first batch sold out.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.thesun.co.uk/tvandshowbiz/14512331/the-voice-will-i-am-liquitarian-chew-food-monday/",
    postDate: "2021-03-31",
    headline: "WHERE IS THE GRUB? Madcap The Voice coach Will.i.am says he is a ‘liquitarian’ and refuses to chew food on a Monday",
    text_body: "The Voice judge Will.i.am has described his diet as 'liquitarian', saying that he refuses to chew food on a Monday. He said since Christmas he only eats solid foods on certain days of the week. On the other days, his meals are all blended and he drinks juice every other hour, he told the Table Manners podcast.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.express.co.uk/news/royal/1417677/hands-off-queen-elizabeth-ii-secret-box-chocolates-royal-news-latest-ont",
    postDate: "2021-04-01",
    headline: "Hands off! Queen has personal box of chocolates so no one eats them, says documentary.",
    text_body: "The Queen keeps a personal box of chocolate treats with her, so no-one else can eat them, claims a new ITV documentary. Lady Pamela Hicks, the Queen's second cousin, revealed Her Majesty's sweet tooth in My Years with the Queen.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.dailystar.co.uk/news/world-news/unknown-disease-turns-bear-cubs-23829469",
    postDate: "2021-03-31",
    headline: "Unknown disease that turns bear cubs into friendly 'zombies' spreading rapidly in US",
    text_body: "A mystery virus is affecting black bears in the US, making them friendlier than usual towards humans. It\'s been spreading in the states of Nevada and California, where in one case a young bear seemed totally comfortable around a group of people, picking up an apple and eating it on their back patio. The as yet un-named condition causes the animals to lose all fear of humans and behave in a strange \'dog-like\' manner, and scientists are at a loss to explain what could be causing it. Unfortunately if untreated, the rare condition can be deadly.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.theguardian.com/us-news/2021/apr/01/new-mexico-man-bees-car-supermarket",
    postDate: "2021-04-01",
    headline: "US man returns from swift shopping trip to find 15,000 bees in his car.",
    text_body: "Most people hope to leave the supermarket with a bargain - but one unlucky man in New Mexico found 15,000 bees in his car instead. The shopper, who had left his window down while picking up groceries, did not notice the swarm of honey bees until he started driving away. Luckily for him, an off-duty firefighter was able to safely remove the insects.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

gen_newstopic = await createQuizQuestion(gen_newstopic._id, {
    web_url: "https://www.independent.co.uk/arts-entertainment/films/news/dick-van-dyke-malibu-cash-b1825382.html",
    postDate: "2021-04-01",
    headline: "Dick Van Dyke hands out cash to job seekers in Malibu amid Covid pandemic.",
    text_body: "Mary Poppins star Dick Van Dyke has been seen handing out handfuls of cash in the street. The actor, 95, was seen withdrawing money at a bank and then giving it out in Malibu, California, to people queuing at an organisation that helps those out of work find jobs.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

console.log("\n>> GENERAL News Topic:\n", gen_newstopic);

///////////////////////////////////////////////////////////////
//////////////////         China    ///////////////////////////
////////////////////////////////////////////////////////////////

var china_newstopic = await createNewsTopic({
    topicName: "China"
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://prntly.com/2020/02/28/liberal-professor-charged-with-lying-about-involvement-in-wuhan-bioweapons-lab/",
    postDate: "2020-02-28",
    headline: "Liberal Professor Charged With Lying About involvement In Wuhan Bioweapons Lab",
    text_body: "A left wing Harvard professor was charged this month with spying for the Chinese Government. Charles Lieber taught at Harvard University in Boston. he was arrested and after being arraigned in Boston federal court, released on $1 million bail. His arrest is a result of his dealings with the Chinese government.",
    correct_answer_url: "https://www.factcheck.org/2020/02/no-link-between-harvard-scientist-charles-lieber-and-coronavirus/",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://socceronsunday.com/article/rooney-signs-for-shanghai/",
    postDate: "2017-01-08",
    headline: "Rooney Signs for Shanghai in £700,000 per-week Deal",
    text_body: "Wayne Rooney has joined Chinese club Shanghai SIGP in a deal worth a reported £700,000 per-week. The 31 year-old had fallen down the pecking order at Old Trafford, and now becomes Andres Villas Boas’ second major signing following the capture of Oscar from Chelsea.",
    correct_answer_url: "https://www.bbc.co.uk/news/blogs-trending-40574049",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://worldtruth.tv/china-poised-to-demand-u-s-land-as-payment-for-u-s-debt/",
    postDate: "",
    headline: "China Poised To Demand U.S. Land As Payment For U.S. Debt",
    text_body: "That’s part of an evolving proposal Beijing has been developing quietly since 2009 to convert more than $1 trillion of U.S debt it owns into equity. Under the plan, China would own U.S. businesses, U.S. infrastructure and U.S. high-value land, all with a U.S. government guarantee against loss. Yu Qiao, a professor of economics in the School of Public Policy and Management at Tsighua University in Beijing, proposed in 2009 a plan for the U.S. government to guarantee foreign investments in the United States.",
    correct_answer_url: "https://www.factcheck.org/2009/03/eminently-nonsensical/",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://prntly.com/2021/03/02/china-sees-more-economic-growth-in-2020-than-world-combined/",
    postDate: "2021-03-02",
    headline: "China Sees More Economic Growth In 2020 Than World Combined",
    text_body: "China saw more economic growth than the whole world combined in 2020. It also saw more billionaires created than the rest of the world combined. While most of America locked herself down, China actually did the opposite, contrary to what fake news beoadcasted. Chinese factories and economic muscles went into full flex to fill the void in goods created by shuttered western businesses and factories. The result was a massive transfer of wealth to the Asian communist-capitalist fusion country.",
    correct_answer_url: "https://en.wikipedia.org/wiki/List_of_countries_by_real_GDP_growth_rate",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://www.thepaper.cn/newsDetail_forward_7734300",
    postDate: "2020-06-03",
    headline: "Boris Johnson on the Hong Kong crisis: We will meet our obligations, not walk away.",
    text_body: "The rhetoric of welcoming \"Hong Kong independence\" has been used badly by British politicians these years. The British colonial rule has trampled on human rights, but now it has \"fight for the good of Hong Kong\" and \"fight for freedom\".",
    correct_answer_url: "https://www.gov.uk/government/news/hong-kong-hong-kong-myth-busting-article",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_F.name, isCorrectAnswer: optionR_F.isCorrectAnswer, selected: optionR_F.selected},{name: optionF_T.name, isCorrectAnswer: optionF_T.isCorrectAnswer, selected: optionF_T.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://www.bbc.co.uk/news/technology-36340514",
    postDate: "2020-05-20",
    headline: "China 'flooding' social media with fake posts.",
    text_body: "China is \"flooding\" social media with comments by paid supporters in a bid to sway public opinion, a report has said. The research by Harvard academics draws on leaked documents to paint a picture of the way China polices social media. The government and its army of helpers write 488 million fake posts a year, the report said.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://www.politico.eu/article/china-bans-bbc-for-fake-news-on-xinjiang-coronavirus/",
    postDate: "2021-02-11",
    headline: "China bans BBC for ‘fake news’ on Xinjiang, coronavirus.",
    text_body: "Chinese authorities banned BBC World News on Thursday, accusing the British broadcaster of not being “factual and fair,” according to a government statement. The decision was a result of a “slew of falsified reporting” on issues including the Xinjiang region and China’s handling of the coronavirus, state media Global Times said, adding that “fake news” is not tolerated in China.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://www.csis.org/east-green-chinas-global-leadership-renewable-energy/",
    postDate: "",
    headline: "The East Is Green: China’s Global Leadership in Renewable Energy.",
    text_body: "China is genuinely interested in leading the world in one particular sector: deployment and investment in renewable energy. China is already leading in renewable energy production figures. It is currently the world’s largest producer of wind and solar energy and the largest domestic and outbound investor in renewable energy.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://www.bbc.co.uk/news/world-asia-china-45910479",
    postDate: "2018-10-20",
    headline: "Fake moon: Could China really light up the night sky?",
    text_body: "A Chinese company has announced ambitious plans to put a \"fake moon\" into space to brighten the night sky. According to the People's Daily state newspaper, officials at a private aerospace institute in Chengdu want to launch this \"illumination satellite\" in orbit by 2020, and say it will be bright enough to replace street lights.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

china_newstopic = await createQuizQuestion(china_newstopic._id, {
    web_url: "https://nypost.com/2020/12/10/chinese-flight-attendants-told-to-wear-diapers-amid-covid-19/",
    postDate: "2020-12-10",
    headline: "Chinese flight attendants told to wear diapers to avoid COVID-19.",
    text_body: "The disposable undergarments and other personal protective equipment — masks, goggles, shoe covers — are on a list of recommendations for flight crew on flights to and from high-risk countries, CNN reported.",
    correct_answer_url: "",
    num_correct: 0,
    num_attempted: 0,
    options: [{name: optionR_T.name, isCorrectAnswer: optionR_T.isCorrectAnswer, selected: optionR_T.selected},{name: optionF_F.name, isCorrectAnswer: optionF_F.isCorrectAnswer, selected: optionF_F.selected},]
} );

console.log("\n>> CHINA News Topic:\n", china_newstopic);

    mongoose.connection.close();
}

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

run();