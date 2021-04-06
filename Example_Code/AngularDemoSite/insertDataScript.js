#! /usr/bin/env node

// our URL = 'mongodb://localhost:27017';
// to run this: in project root, node insertDataScript mongodb://localhost:27017

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async')
var QuizQuestion = require('./models/quiz_question')
var NewsTopic = require('./models/news_topic')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var quizquestion_arr = []
var newstopic_arr = []
var brexit_questions = []
var corona_questions = []
var climate_questions = []
var china_questions = []
var general_questions = []

// create new quiz question
function quizquestionCreate(web_url, postDate, headline, text_body, correct_answer, correct_answer_url, num_correct, num_attempted, cb){

   quizQuestionDetail = {
     web_url: web_url,
     postDate: postDate,
     headline: headline,
     text_body: text_body,
     correct_answer: correct_answer,
     correct_answer_url: correct_answer_url,
     num_correct: num_correct,
     num_attempted: num_attempted
   }

   var quizquestion = new QuizQuestion(quizQuestionDetail);

   quizquestion.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      //console.log('New Quiz Question: ' + quizquestion);
      quizquestion_arr.push(quizquestion)
      cb(null, quizquestion)
   }  );
}


// create new topic
function newsTopicCreate(topicName, quiz_questions, cb) {

  newsTopicDetail = {
    topicName: topicName,
    quiz_questions: quiz_questions
  }

  var newstopic = new NewsTopic(newsTopicDetail);
  newstopic.save(function (err) {
    if (err) {
      console.log('ERROR CREATING newsTopic: ' + newstopic);
      cb(err, null)
      return
    }
    //console.log('New News Topic: ' + newstopic);
    newstopic_arr.push(newstopic)
    cb(null, quiz_questions)
  }  );

}

function createQuizQuestion(cb) {
    async.parallel([

        // brexit questions
        //false
        function(callback) {
          quizquestionCreate('https://www.facebook.com/brexitpartyuk/photos/a.271166190434819/379249536293150/?type=3&theater', '2019-10-01', 'CLEAN BREAK BREXIT', 'It\'s our money to invest as we see fit. We don\'t owe the EU a single-penny more. Let us invest our money as we see fit - starting with a £200bn Brexit dividend for Britain\'s regions', false, 'https://firstdraftnews.org/latest/brexit-the-false-misleading-and-suspicious-claims-crosscheck-has-uncovered/', 0 , 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://bylinetimes.com/2019/09/11/brexit-disaster-capitalism-8-billion-bet-on-no-deal-crash-out-by-boris-johnsons-leave-backers/', '2019-11-09', 'EXCLUSIVE: BREXIT DISASTER CAPITALISM - £8 Billion Bet on No Deal Crash-Out By Boris Johnson\'s Leave Backers', 'Boris Johnson’s leadership campaign backers in the City stand to make billions of pounds from his ‘do or die’ pledge to take Britain out the of the EU by the end of October, [REDACTED] can reveal. From the financial data publicly available, [REDACTED] can reveal that currently £4,563,350,000 (£4.6 billion) of aggregate short positions on a ‘no deal’ Brexit have been taken out by hedge funds that directly or indirectly bankrolled Boris Johnson’s leadership campaign.', false, 'https://www.ft.com/content/72db9e42-be23-3b5f-92fb-7e2d2079d51c.', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.politicalite.com/latest/eu-economy-weakest-its-been-in-over-a-decade-and-ready-to-collapse-new-data-reveals/', '2019-09-30', 'EU Economy “Weakest It’s Been In Over A Decade” And Ready To COLLAPSE New Data Reveals.', 'The economical crisis in the Eurozone worsened yesterday as new data revealed that industries within the failing EU project are experiencing new lows of confidence, particularly in the industrial sector. The European Commission reports that factories became even more glum this month, as trade war worries and a “substantial deterioration” in industrial confidence dragged its monthly gauge of economic measure down to just 101.7 points from 103.1 in August – the weakest since 2014.', false, 'https://ec.europa.eu/info/sites/info/files/esi_2019_09_en.pdf', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.facebook.com/watch/?v=2413551192300057', '2019-09-23', 'Jeremy Corbyn and Labour want to introduce a free-for-all benefits handout that would cost taxpayers a staggering £520 billion a year.', 'Labour’s reckless and irresponsible approach would undo all the hard work of the British people, meaning more debt, higher taxes and fewer jobs.', false, 'https://firstdraftnews.org/latest/brexit-the-false-misleading-and-suspicious-claims-crosscheck-has-uncovered/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('http://www.voteleavetakecontrol.org/why_vote_leave.html', '2016-06-22', 'Why vote leave?', 'We will be able to save £350 million pounds a week. We can spend our money on our priorities like the NHS, Schools, and Housing. ... The EU already costs us £350 million a week - enought to build a new NHS hospital every week. We get less than half of this back, and have no say over how its spent.', false, 'https://www.theguardian.com/commentisfree/2017/sep/18/boris-johnson-350-million-claim-bogus-foreign-secretary/', 0, 0, callback);
        },
        //true
        function(callback) {
          quizquestionCreate('https://www.cnbc.com/2019/12/17/uk-government-to-block-any-delay-to-post-brexit-deadline-pound-falls.html', '2019-12-17', 'Pound slumps 1% as Boris Johnson raises fresh risk of a no-deal Brexit', 'The pound fell more than 1% in early trade Tuesday after media reports said that the British government will block a delay to the post-Brexit transition period. Local media reported early Tuesday that Prime Minister Boris Johnson will add a revision to the Brexit bill (formally known as the Withdrawal Agreement Bill) that would explicitly rule out any extension to the transition period beyond December 2020. British media reports say that the Johnson’s government will try to make it illegal for the transition period to be extended in a bid to put more more pressure on the EU and to fast-track a trade deal.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.thedrum.com/news/2019/09/01/british-government-s-100m-brexit-advertising-campaign-revealed', '2019-09-01', 'British Government’s £100m Brexit advertising campaign revealed.', 'The British Government has revealed its ‘Get ready for Brexit’ campaign, costing £100m that is set to run across the UK in preparation for the nation departing the EU. Ahead of 31 October when Britain is expected to depart the EU, the campaign will aim to prepare the public and business owners for whatever agreement is, or isn’t, made between the British Government and European leaders. Activity will run across outdoor, television, social media and other platforms and will aim to drive citizens to visit the Government website for more information.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://abcnews.go.com/International/uk-government-queen-suspend-parliament-push-brexit-reports/story?id=65235125', '2019-08-28', 'Queen approves UK government\'s request to suspend Parliament during crucial Brexit period.', 'LONDON -- Queen Elizabeth has approved a request by Prime Minister Boris Johnson to suspend Parliament, a move that appears designed to thwart opposition lawmakers from blocking Brexit, prompting protests in cities across the United Kingdom. Johnson spoke to the Queen on Wednesday to request an end to the current Parliament session in September. The shift gives opposition lawmakers less time to block a no-deal Brexit before the U.K.\'s Oct. 31 deadline to leave the European Union. The leader of the opposition Labour Party, Jeremy Corbyn, has asked to meet the Queen to block the move, and vowed to do "everything we can to stop Boris Johnson\'s smash and grab against our democracy.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.euractiv.com/section/data-protection/news/uk-government-accused-of-harvesting-citizen-data-ahead-of-brexit/', '2019-09-11', 'UK government accused of ‘harvesting citizen data’ ahead of Brexit', 'UK opposition parties have hit out at the government for allegedly harvesting user data, surreptitiously obtaining information from individuals accessing the official Gov.uk website, ahead of the UK’s scheduled withdrawal from the EU at the end of October. A leaked memo seen by the Buzzfeed news website details private messages that UK Prime Minister Boris Johnson shared with government ministers in the cabinet committee dealing with no-deal preparations, in which he informed them of the importance of gathering user information in order to facilitate exit preparations. The Gov.uk website “is serving as a platform to allow targeted and personalised information to be gathered, analysed and fed back actively to support key decision-making – in effect, focused on generating the highest-quality analytics and performance data to support exit preparations,” the memo reportedly states.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.nature.com/news/brexit-government-s-anti-immigration-stance-spooks-uk-scientists-1.20755', '2016-10-06', 'Brexit government’s anti-immigration stance spooks UK scientists', 'UK scientists say they’re dismayed by their new government’s toughened stance on curbing immigration, including ideas to restrict the flow of foreign students and workers. “We are not leaving the European Union only to give up control of immigration again,” said May, opening the conference.', true, '', 0, 0, callback);
        },

        // General questions
        //false
        function(callback) {
          quizquestionCreate('https://www.theonion.com/tinder-introducing-background-check-feature-1846607944', '2021-04-02', 'Tinder Introducing Background-Check Feature', 'Tinder, whose parent company Match Group also owns OKCupid and Hinge, will be introducing an in-app feature later this year that performs background checks on potential dates to flag any violent crimes.', false, '', 0 , 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.theonion.com/chauvin-defense-team-attempts-to-demonize-george-floyd-1846593075', '2021-04-01', 'Chauvin Defense Team Attempts To Demonize George Floyd By Tying Him To High-Profile 2020 Murder', 'In an effort to build a case supporting their client’s exoneration, the defense team of Minneapolis police officer Derek Chauvin reportedly attempted to demonize the late George Floyd Wednesday by tying him to a high-profile 2020 murder. “To convict Officer Chauvin on these charges is to blatantly ignore Mr. Floyd’s questionable past, including his very presence at the scene of a brutal murder on May 25, 2020,” said Eric Nelson, Chauvin’s attorney, informing the judge that he had video evidence suggesting that Floyd had even played a role in the brutal slaying of a defenseless man. “We would be remiss if we didn’t question why Mr. Floyd was present at a murder. We simply want to present the evidence demonstrating Mr. Floyd’s clear ties to a senseless killing and let the jury draw their own conclusions. Furthermore, we cannot ignore the fact that for nearly a year, Mr. Floyd’s name has been synonymous with murder, and we just need to state for the record that this raises some potentially disturbing questions about his character', false, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://entertainment.theonion.com/disney-announces-next-movie-will-feature-princess-with-1846416867', '2021-03-05', 'Disney Announces Next Movie Will Feature Princess With Never-Before-Seen Ethnicity', 'Taking a huge step toward adding more diversity to their films, Disney announced Friday that the company’s next movie would feature a princess with a never-before-seen ethnicity. “The film will tell the story of a young girl who grows up in the traditions of a storied culture no one in the world has ever heard of before,” said Disney CEO Bob Chapek, explaining that audiences will be introduced to this completely original ethnic group through the princess’s coming-of-age story living among a group of people sharing a common set of traditions unexplored until now. “The story itself will celebrate the music, art, and folklore of the princess’s ancestors, which we think everyone will find new and unfamiliar.', false, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.theonion.com/chauvin-defense-team-praises-officer-s-restraint-in-not-1846599521', '2021-04-01', 'In an effort to highlight his client’s impeccable character, the defense attorney representing Derek Chauvin praised the former police officer Thursday for exercising great restraint by not killing bystanders. “As the video evidence shows, there were several bystanders standing only a few feet away during the time of George Floyd’s arrest, and yet Mr. Chauvin didn’t attempt to shoot or strangle a single one,” said attorney Eric Nelson, who commended Chauvin for remaining calm and composed while responding to the call regarding a counterfeit bill by letting the half-dozen witnesses watching from the curb go physically unscathed.', false, '', 0, 0, callback);
        },
        //true
        function(callback) {
          quizquestionCreate('https://www.bbc.co.uk/news/business-56598932', '2021-04-01', 'Runway dining at $540 a meal proving hit in Japan', 'TPlane food may not be everyone\'s idea of a fancy meal out, but a service offering just that on a parked airliner is selling like hotcakes. Japan\'s biggest carrier, All Nippon Airways, started selling tickets for dinner on the runway - at $540 (£392) a meal - on Wednesday and has already added more slots for April after the first batch sold out.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.thesun.co.uk/tvandshowbiz/14512331/the-voice-will-i-am-liquitarian-chew-food-monday/', '2021-03-31', 'WHERE IS THE GRUB? Madcap The Voice coach Will.i.am says he is a ‘liquitarian’ and refuses to chew food on a Monday', 'The Voice judge Will.i.am has described his diet as "liquitarian", saying that he refuses to chew food on a Monday. He said since Christmas he only eats solid foods on certain days of the week. On the other days, his meals are all blended and he drinks juice every other hour, he told the Table Manners podcast.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.express.co.uk/news/royal/1417677/hands-off-queen-elizabeth-ii-secret-box-chocolates-royal-news-latest-ont', '2021-04-01', 'Hands off! Queen has personal box of chocolates so no one eats them, says documentary.', 'The Queen keeps a personal box of chocolate treats with her, so no-one else can eat them, claims a new ITV documentary. Lady Pamela Hicks, the Queen's second cousin, revealed Her Majesty's sweet tooth in My Years with the Queen.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.dailystar.co.uk/news/world-news/unknown-disease-turns-bear-cubs-23829469', '2021-03-31', 'Unknown disease that turns bear cubs into friendly \zombies\' spreading rapidly in US', 'A mystery virus is affecting black bears in the US, making them friendlier than usual towards humans. It\'s been spreading in the states of Nevada and California, where in one case a young bear seemed totally comfortable around a group of people, picking up an apple and eating it on their back patio. The as yet un-named condition causes the animals to lose all fear of humans and behave in a strange \'dog-like\' manner, and scientists are at a loss to explain what could be causing it. Unfortunately if untreated, the rare condition can be deadly.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.theguardian.com/us-news/2021/apr/01/new-mexico-man-bees-car-supermarket', '2021-04-01', 'US man returns from swift shopping trip to find 15,000 bees in his car.', 'Most people hope to leave the supermarket with a bargain - but one unlucky man in New Mexico found 15,000 bees in his car instead. The shopper, who had left his window down while picking up groceries, did not notice the swarm of honey bees until he started driving away. Luckily for him, an off-duty firefighter was able to safely remove the insects.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.independent.co.uk/arts-entertainment/films/news/dick-van-dyke-malibu-cash-b1825382.html', '2021-04-01', 'Dick Van Dyke hands out cash to job seekers in Malibu amid Covid pandemic.', 'Mary Poppins star Dick Van Dyke has been seen handing out handfuls of cash in the street. The actor, 95, was seen withdrawing money at a bank and then giving it out in Malibu, California, to people queuing at an organisation that helps those out of work find jobs.', true, '', 0, 0, callback);
        },

        //China questions
        //false
        function(callback) {
          quizquestionCreate('https://prntly.com/2020/02/28/liberal-professor-charged-with-lying-about-involvement-in-wuhan-bioweapons-lab/', '2020-02-28', 'Liberal Professor Charged With Lying About involvement In Wuhan Bioweapons Lab', 'A left wing Harvard professor was charged this month with spying for the Chinese Government. Charles Lieber taught at Harvard University in Boston. he was arrested and after being arraigned in Boston federal court, released on $1 million bail. His arrest is a result of his dealings with the Chinese government.', false, 'https://www.factcheck.org/2020/02/no-link-between-harvard-scientist-charles-lieber-and-coronavirus/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://socceronsunday.com/article/rooney-signs-for-shanghai/', '2017-01-08', 'Rooney Signs for Shanghai in £700,000 per-week Deal', 'Wayne Rooney has joined Chinese club Shanghai SIGP in a deal worth a reported £700,000 per-week. The 31 year-old had fallen down the pecking order at Old Trafford, and now becomes Andres Villas Boas’ second major signing following the capture of Oscar from Chelsea.', false, 'https://www.bbc.co.uk/news/blogs-trending-40574049', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://worldtruth.tv/china-poised-to-demand-u-s-land-as-payment-for-u-s-debt/', '', 'China Poised To Demand U.S. Land As Payment For U.S. Debt', 'That’s part of an evolving proposal Beijing has been developing quietly since 2009 to convert more than $1 trillion of U.S debt it owns into equity. Under the plan, China would own U.S. businesses, U.S. infrastructure and U.S. high-value land, all with a U.S. government guarantee against loss. Yu Qiao, a professor of economics in the School of Public Policy and Management at Tsighua University in Beijing, proposed in 2009 a plan for the U.S. government to guarantee foreign investments in the United States.', false, 'https://www.factcheck.org/2009/03/eminently-nonsensical/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://prntly.com/2021/03/02/china-sees-more-economic-growth-in-2020-than-world-combined/', '2021-03-02', 'China Sees More Economic Growth In 2020 Than World Combined', 'China saw more economic growth than the whole world combined in 2020. It also saw more billionaires created than the rest of the world combined. While most of America locked herself down, China actually did the opposite, contrary to what fake news beoadcasted. Chinese factories and economic muscles went into full flex to fill the void in goods created by shuttered western businesses and factories. The result was a massive transfer of wealth to the Asian communist-capitalist fusion country.', false, 'https://en.wikipedia.org/wiki/List_of_countries_by_real_GDP_growth_rate', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.thepaper.cn/newsDetail_forward_7734300', '2020-06-03', 'Boris Johnson on the Hong Kong crisis: We will meet our obligations, not walk away.', 'The rhetoric of welcoming "Hong Kong independence" has been used badly by British politicians these years. The British colonial rule has trampled on human rights, but now it has "fight for the good of Hong Kong" and "fight for freedom".', false, 'https://www.gov.uk/government/news/hong-kong-hong-kong-myth-busting-article.', 0, 0, callback);
        },
        //true
        function(callback) {
          quizquestionCreate('https://www.bbc.co.uk/news/technology-36340514', '2020-05-20', 'China \'flooding\' social media with fake posts', 'China is "flooding" social media with comments by paid supporters in a bid to sway public opinion, a report has said. The research by Harvard academics draws on leaked documents to paint a picture of the way China polices social media. The government and its army of helpers write 488 million fake posts a year, the report said.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.politico.eu/article/china-bans-bbc-for-fake-news-on-xinjiang-coronavirus/', '2021-02-11', 'China bans BBC for ‘fake news’ on Xinjiang, coronavirus.', 'Chinese authorities banned BBC World News on Thursday, accusing the British broadcaster of not being “factual and fair,” according to a government statement. The decision was a result of a “slew of falsified reporting” on issues including the Xinjiang region and China’s handling of the coronavirus, state media Global Times said, adding that “fake news” is not tolerated in China.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.csis.org/east-green-chinas-global-leadership-renewable-energy/', '', 'The East Is Green: China’s Global Leadership in Renewable Energy.', 'China is genuinely interested in leading the world in one particular sector: deployment and investment in renewable energy. China is already leading in renewable energy production figures. It is currently the world’s largest producer of wind and solar energy and the largest domestic and outbound investor in renewable energy.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.bbc.co.uk/news/world-asia-china-45910479', '2018-10-20', 'Fake moon: Could China really light up the night sky?', 'A Chinese company has announced ambitious plans to put a "fake moon" into space to brighten the night sky. According to the People\'s Daily state newspaper, officials at a private aerospace institute in Chengdu want to launch this "illumination satellite" in orbit by 2020, and say it will be bright enough to replace street lights.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://nypost.com/2020/12/10/chinese-flight-attendants-told-to-wear-diapers-amid-covid-19/', '2020-12-10', 'Chinese flight attendants told to wear diapers to avoid COVID-19.', 'The disposable undergarments and other personal protective equipment — masks, goggles, shoe covers — are on a list of recommendations for flight crew on flights to and from high-risk countries, CNN reported.', true, '', 0, 0, callback);
        },

        // Coronavirus questions
        // false Qs
        function(callback) {
          quizquestionCreate('https://beforeitsnews.com/u-s-politics/2021/04/pregnant-considering-the-jab-number-of-women-losing-babies-after-experimental-covid-injection-increases-by-366-2582140.html', '2021-04-03', 'Number Of Women Losing Babies After Experimental COVID Injection Increases By 366%', 'Number Of Women Losing Babies After Experimental COVID Injection Increases By 366%, Losing a new born is a heart breaking endeavour, as is the pain of losing an unborn child. Which is why we’re both saddened and shocked to bring you the latest update on the number of unborn and newborn children to lose their lives as a result of the mothers receiving one of the Covid-19 vaccines in the United Kingdom.', false, 'https://www.npr.org/sections/health-shots/2021/04/02/983666339/study-covid-19-vaccine-is-safe-during-pregnancy-and-may-protect-baby-too', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://beforeitsnews.com/prophecy/2020/12/the-unmasked-buried-the-masked-in-the-spanish-flu-is-history-going-to-repeat-itself-what-did-people-in-masks-die-from-bacterial-pneumonia-dr-feces-fauci-wrote-about-this-in-2516514.html', '2020-12-16', 'The Unmasked Buried The Masked In The "Spanish Flu". Is History Going To Repeat Itself? What Did People In Masks Die From? Bacterial Pneumonia.', 'German Doctor Has Reported 3 Children’s Deaths From Wearing Masks', false, 'https://www.reuters.com/article/uk-factcheck-masks-idUSKBN26R3D9', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://beforeitsnews.com/eu/2020/11/the-shocking-reason-why-pfizers-coronavirus-vaccine-requires-storage-at-70c-because-it-contains-experimental-nanotech-components-that-have-never-been-used-in-vaccines-before-2664075.html', '2020-11-18', 'The Shocking Reason Why Pfizer’s Coronavirus Vaccine Requires Storage at -70C - It Contains Experimental Nanotech Components Which Have Never Been Used in Vaccines Before', 'As Children’s Health Defense explained in an August 6th article, “mRNA vaccines undergoing Covid-19 clinical trials, including the Moderna vaccine, rely on a nanoparticle-based “carrier system” containing a synthetic chemical called polyethylene glycol (PEG)', false, 'https://www.reuters.com/article/uk-factcheck-vaccine-nanoparticles-idUSKBN28F0I9', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://prntly.com/2020/02/28/coronavirus-recovery-rate-in-us-is-100-stop-panicking/', '2020-02-28', 'Coronavirus recovery rate in US is 100%', 'Across the globe, the media spreads panic about the Coronavirus. But it’s fatality rate is small. If you are already healthy, your chances of dying are slim to none. And for the United States, we’re leading the globe in recovery. While other countries struggle to contain the virus and treat infected, the US already has a whopping 100% recovery rate. Meanwhile, countries with socialist healthcare systems are facing brutal fatality rates, like those in Iran and Italy.', false, 'https://fullfact.org/health/Covid-recovery-vaccine/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://prntly.com/2020/01/30/black-death-virus-dna-sequenced-96-5-match-with-similar-virus-found-in-bats/', '2020-01-30', 'BLACK DEATH: Virus DNA sequenced; 96.5% Match With Similar Virus Found In Bats.', 'They are almost identical to each other and share 79.5% sequence identify to SARS-CoV. Furthermore, it was found that nCoV-2019 is 96% identical at the whole genome level to a bat coronavirus. So the cause of this rapidly spreading illnesses is a virus that mutated from bats to people. But how could a virus have made such a jump? The answer lies in one of the most gross food practices in China today.', false, 'https://faktograf.hr/2020/02/05/nije-dokazano-da-je-jedenje-juhe-od-sismisa-povezano-s-koronavirusom/', 0, 0, callback);
        },
        // true Qs
        function(callback) {
          quizquestionCreate('https://metro.co.uk/2020/04/02/north-korea-claims-0-coronavirus-cases-global-count-reaches-one-million-12498221/', '2020-04-02', 'North Korea claims it has 0 coronavirus cases as global count reaches one million.', 'North Korea has claimed it is completely free of coronavirus as confirmed global infections near one million. The already isolated, nuclear-armed country quickly shut down its borders after Covid-19 was first detected in neighbouring China in January, and imposed strict containment measures.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.sciencedaily.com/releases/2020/11/201102155409.htm', '2020-11-02', 'Hot or cold, weather alone has no significant effect on COVID-19 spread', 'Research led by The University of Texas at Austin is adding some clarity on weather’s role in COVID-19 infection, with a new study finding that temperature and humidity do not play a significant role in coronavirus spread. That means whether it’s hot or cold outside, the transmission of COVID-19 from one person to the next depends almost entirely on human behavior.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.bupa.co.uk/newsroom/ourviews/covid-19-vaccine-facts', '2020-02-16', 'Vaccination cannot give you COVID-19', 'COVID-19 vaccines cannot cause COVID-19 infection. The myth that vaccination can give you COVID-19 seems to stem from a misunderstanding about what vaccines are and how they work.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters', '2021-03-26', 'People should NOT wear masks while exercising', 'People should NOT wear masks when exercising, as masks may reduce the ability to breathe comfortably. Sweat can make the mask become wet more quickly which makes it difficult to breathe and promotes the growth of microorganisms. The important preventive measure during exercise is to maintain physical distance of at least one meter from others.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters', '2021-03-26', 'The prolonged use of medical masks* when properly worn, DOES NOT cause CO2 intoxication nor oxygen deficiency', 'The prolonged use of medical masks can be uncomfortable. However, it does not lead to CO2 intoxication nor oxygen deficiency. While wearing a medical mask, make sure it fits properly and that it is tight enough to allow you to breathe normally.', true, '', 0, 0, callback);
        },
        ],

        // Climate Change questions
        // false Qs
        function(callback) {
          quizquestionCreate('https://web.archive.org/web/20181116133754/https://metro.co.uk/2018/11/16/a-mini-ice-age-could-be-on-the-way-and-its-going-to-get-very-very-cold-8146529/', '2018-11-16', 'A mini ice age could be on the way and it’s going to get very, very cold', 'That’s the warning from a Nasa scientist who fears sunspot activity on the surface of our star has dropped so low that it could herald the arrival of a uniquely grim mini Ice Age. ‘We see a cooling trend,’ Martin Mlynczak of Nasa’s Langley Research Center told Space Weather.', false, 'https://www.poynter.org/fact-checking/2018/this-fact-checker-got-several-news-outlets-to-correct-a-false-story-about-a-mini-ice-age/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.weforum.org/agenda/2018/06/90-of-plastic-polluting-our-oceans-comes-from-just-10-rivers/', '2018-06-08', '90% of plastic polluting our oceans comes from just 10 rivers', 'By analyzing the waste found in the rivers and surrounding landscape, researchers were able to estimate that just 10 river systems carry 90% of the plastic that ends up in the ocean. Eight of them are in Asia: the Yangtze; Indus; Yellow; Hai He; Ganges; Pearl; Amur; Mekong; and two in Africa – the Nile and the Niger.', false, 'https://marinelitter.no/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.toddstarnes.com/values/the-australia-bushfires-have-nothing-to-do-with-climate-change-it-was-arson/?fbclid=IwAR3mDMm28-8GBDNEN-31YK0lOVJi9HlET8Vxe9DrH5z5KjHjka48HuZcS9c', '2020-01-07', 'In My Humble Opinion, the Australia Bushfires Have Nothing to Do With Climate Change; It Was Arson', 'Radical environmental extremists and Hollywood celebrities have blamed the fires on climate change. But it turns out — climate change has nothing to do with the humanitarian crisis unfolding Down Under. It turns out — many of the fires were set by arsonists. The Australian reports more than 180 people have been arrested since the start of the bushfire season.', false, 'https://www.politifact.com/factchecks/2020/jan/10/facebook-posts/those-claims-about-nearly-200-arrested-arson-austr/', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://everythingclimate.org/climate-change-is-causing-accelerated-21st-century-surface-warming/', '', 'Climate Change is Causing Accelerated 21st Century Surface Warming.', 'Most Observed Warming is Natural, Almost half of the global warming in the 21st century is due to El Niño events, false', false, 'https://www.nature.com/articles/d41586-018-07638-w', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://wattsupwiththat.com/2009/10/28/the-sun-defines-the-climate-an-essay-from-russia/', '2009-09-28', 'The Sun Defines the Climate', 'Observations of the Sun show that as for the increase in temperature, carbon dioxide is “not guilty” and as for what lies ahead in the upcoming decades, it is not catastrophic warming, but a global, and very prolonged, temperature drop.', false, 'https://www.carbonbrief.org/why-the-sun-is-not-responsible-for-recent-climate-change', 0, 0, callback);
        },
        // true Qs
        function(callback) {
          quizquestionCreate('https://www.tampabay.com/things-to-do/food/cooking/The-facts-about-farmed-salmon-you-wish-you-didn-t-know_166193900/#:~:text=Studies%20show%20that%20farmed%20salmon,from%20herbicides%20like%20Agent%20Orange.', '2018-03-21', 'The facts about farmed salmon you wish you didn’t know', 'Studies show that farmed salmon contains up to eight times more PCBs — cancer-causing industrial chemicals that were banned in 1979 — than wild, as well as high levels of mercury and dioxins from herbicides like Agent Orange.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.nationalgeographic.com/culture/article/100-million-sharks-killed-every-year-study-shows-on-eve-of-international-conference-on-shark-protection', '2013-03-01', '100 Million Sharks Killed Every Year, Study Shows On Eve of International Conference on Shark Protection', 'One of the most comprehensive studies ever compiled on illegal shark killing brings new startling statistics. An estimated 100 million sharks are killed every year around the world, a number that far exceeds what many populations need to recover.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.npr.org/sections/goatsandsoda/2020/10/27/928201367/study-air-pollution-contributes-to-500-000-newborn-deaths-a-year?t=1617607272319', '2020-10-27', 'New Study Points To Invisible Killer Of Infants', 'Air pollution, both inside and outside the home, contributed to the deaths of about 500,000 newborns in 2019', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.bbc.co.uk/news/science-environment-49483580', '2019-09-03', 'Greenland’s ice faces melting ’death sentence’', 'Greenland’s massive ice sheet may have melted by a record amount this year, scientists have warned. During this year alone, it lost enough ice to raise the average global sea level by more than a millimetre.', true, '', 0, 0, callback);
        },
        function(callback) {
          quizquestionCreate('https://www.iucn.org/resources/issues-briefs/deforestation-and-forest-degradation#:~:text=Over%20half%20of%20the%20tropical,forests%20to%20provide%20essential%20services.', '2021-02-01', 'Deforestation and forest degradation', 'Over half of the tropical forests worldwide have been destroyed since the 1960s, and every second, more than one hectare of tropical forests is destroyed or drastically degraded.', true, '', 0, 0, callback);
        },
        // optional callback
        cb);
}


function createNewsTopic(cb) {
    async.parallel([
        function(callback) {
          newsTopicCreate('Brexit', brexit_questions, callback);
        },
        function(callback) {
          newsTopicCreate('General', general_questions, callback);
        },
        function(callback) {
          newsTopicCreate('China', china_questions, callback);
        },
        function(callback) {
          newsTopicCreate('Coronavirus', corona_questions, callback);
        },
        function(callback) {
          newsTopicCreate('Climate Change', climate_questions, callback);
        },
        ],
        // optional callback
        cb);
}

function sortQuizQuestions(cb){
  async.parallel([

    brexit_questions[0] = quizquestion_arr[0]
    brexit_questions[1] = quizquestion_arr[1]
    brexit_questions[2] = quizquestion_arr[2]
    brexit_questions[3] = quizquestion_arr[3]
    brexit_questions[4] = quizquestion_arr[4]
    brexit_questions[5] = quizquestion_arr[5]
    brexit_questions[6] = quizquestion_arr[6]
    brexit_questions[7] = quizquestion_arr[7]
    brexit_questions[8] = quizquestion_arr[8]
    brexit_questions[9] = quizquestion_arr[9]

    general_questions[0] = quizquestion_arr[10]
    general_questions[1] = quizquestion_arr[11]
    general_questions[2] = quizquestion_arr[12]
    general_questions[3] = quizquestion_arr[13]
    general_questions[4] = quizquestion_arr[14]
    general_questions[5] = quizquestion_arr[15]
    general_questions[6] = quizquestion_arr[16]
    general_questions[7] = quizquestion_arr[17]
    general_questions[8] = quizquestion_arr[18]
    general_questions[9] = quizquestion_arr[19]

    china_questions[0] = quizquestion_arr[20]
    china_questions[1] = quizquestion_arr[21]
    china_questions[2] = quizquestion_arr[22]
    china_questions[3] = quizquestion_arr[23]
    china_questions[4] = quizquestion_arr[24]
    china_questions[5] = quizquestion_arr[25]
    china_questions[6] = quizquestion_arr[26]
    china_questions[7] = quizquestion_arr[27]
    china_questions[8] = quizquestion_arr[28]
    china_questions[9] = quizquestion_arr[29]

    corona_questions[0] = quizquestion_arr[30]
    corona_questions[1] = quizquestion_arr[31]
    corona_questions[2] = quizquestion_arr[32]
    corona_questions[3] = quizquestion_arr[33]
    corona_questions[4] = quizquestion_arr[34]
    corona_questions[5] = quizquestion_arr[35]
    corona_questions[6] = quizquestion_arr[36]
    corona_questions[7] = quizquestion_arr[37]
    corona_questions[8] = quizquestion_arr[38]
    corona_questions[9] = quizquestion_arr[39]

    climate_questions[0] = quizquestion_arr[40]
    climate_questions[1] = quizquestion_arr[41]
    climate_questions[2] = quizquestion_arr[42]
    climate_questions[3] = quizquestion_arr[43]
    climate_questions[4] = quizquestion_arr[44]
    climate_questions[5] = quizquestion_arr[45]
    climate_questions[6] = quizquestion_arr[46]
    climate_questions[7] = quizquestion_arr[47]
    climate_questions[8] = quizquestion_arr[48]
    climate_questions[9] = quizquestion_arr[49]

    ],
  cb);

}

async.series([
    createQuizQuestion,
    sortQuizQuestions,
    createNewsTopic
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
      //console.log('QuizQuestions: ' +quizquestion_arr);
      //console.log('NewsTopics: ' + newstopic_arr);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
