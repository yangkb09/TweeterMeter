const router = require('express').Router()
const Form = require('../db/models/form')
const Twitter = require('twitter') //An asynchronous client library for the Twitter REST and Streaming API's.
// const rp = require('request-promise')

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  // bearer_token: process.env.TWITTER_BEARER_TOKEN
})

router.get('/', async (req, res, next) => {
  try {
    const scores = await Form.findAll({
      attributes: ['id', 'score', 'magnitude']
    })
    res.send(scores)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language')

    // Instantiates a client
    const client = new language.LanguageServiceClient({
      keyFilename: 'google.json',
      projectId: 'sentiment-analys-1611430622359'
    })

    // The text to analyze (should be users cleaned tweets)
    let text = req.body.formText
    console.log('REQ.BODY: ', req.body)
    const twitterUsername = req.body.formText
    let cleanedTweets

    //GET Twitter data (user by un, then user's tweet timeline)
    //setState/setTimeout/twitterClient.get are async functions, but don't start with "async"
    //callbacks came before promises (these funcs are CBs)
    //moment an async func is called,
    //twitter.get making http call - this whole thing gets dumped into the thread pool (and everything inside of it), setting cleaned
    //tweets is waiting
    //doing the document assignment
    //functon that assins cleanedTweets can't run until all other lines run
    //anytime you have an async function, none of the contents of the function will run until everyting is off the callstack

    //delete response if not using
    twitterClient.get(
      '/users/show.json',
      {screen_name: twitterUsername},
      function(error, profile, response) {
        if (error) {
          throw error
        } else {
          // console.log('TWITTER PROFILE: ', profile)
          const profileImg = profile.profile_image_url.replace(/_normal/, '')
          const profileBanner = profile.profile_banner_url

          console.log('twitter user response: ', response);
          //GET Twitter user's tweet timeline (tweets)
          twitterClient.get(
            '/statuses/user_timeline.json',
            {screen_name: twitterUsername, count: 200, include_rts: false},
            async function(error, tweets, response) {
              if (error) {
                throw error
              } else {
                let holder = ''
                for (let i = 0; i < tweets.length; i++) {
                  holder += tweets[i].text
                }
                cleanedTweets = holder.replace(
                  /(?:https?|ftp):\/\/[\n\S]+/g,
                  ''
                )
                // console.log('TWEETS: ', tweets)
                // console.log('cleanedTweets inside twitter get: ', cleanedTweets)
                // console.log('TYPEOF CLEANED TWEETS: ', typeof text)

                const document = {
                  content: cleanedTweets,
                  type: 'PLAIN_TEXT'
                }

                // Detects the sentiment of the text
                const [result] = await client.analyzeSentiment({
                  document: document
                })
                const sentiment = result.documentSentiment

                console.log(`Text: ${cleanedTweets}`)
                console.log(`Sentiment score: ${sentiment.score}`)
                console.log(`Sentiment magnitude: ${sentiment.magnitude}`)


//stuff is an instance from the DB

                //QUEST: how to rewrite bottom line? if i dont need to send data to db, i dont want to
                const stuff = {
                  formText: cleanedTweets,
                  score: sentiment.score,
                  magnitude: sentiment.magnitude
                }
                res.json(stuff)

                // .then(stuff => {
                //   console.log('stuff', stuff)
                //   res.json(stuff)

                // }

              }
            }
          )
        }
      }
    )

    //text's value isn't getting rewritten on ln66, it's val remains what's on ln 37

    // const document = {
    //   content: text,
    //   type: 'PLAIN_TEXT'
    // }
    // console.log('CLEANEDTWEETS oUTSIDE GET: ', cleanedTweets)
    // console.log('DOCUMENT: ', document)

    // // const document = {
    // //   content: cleanedTweets,
    // //   type: 'PLAIN_TEXT'
    // // }

    // // Detects the sentiment of the text
    // const [result] = await client.analyzeSentiment({document: document})
    // const sentiment = result.documentSentiment

    // console.log(`Text: ${text}`)
    // console.log(`Sentiment score: ${sentiment.score}`)
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`)

    // // console.log(`Text: ${cleanedTweets}`)
    // // console.log(`Sentiment score: ${sentiment.score}`)
    // // console.log(`Sentiment magnitude: ${sentiment.magnitude}`)

    // Form.create({
    //   formText: text, //this may be twitter UN now
    //   score: sentiment.score,
    //   magnitude: sentiment.magnitude
    // }).then(stuff => res.json(stuff))
  } catch (err) {
    next(err)
  }
})

module.exports = router
