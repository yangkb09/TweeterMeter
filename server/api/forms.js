const router = require('express').Router()
// const Form = require('../db/models/form')
const Twitter = require('twitter') //An asynchronous client library for the Twitter REST and Streaming API's.

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

// router.get('/', async (req, res, next) => {
//   try {
//     const scores = await Form.findOne({
//       attributes: ['id', 'score', 'magnitude']
//     })
//     res.send(scores)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    res.send([])
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

    // The text to analyze: an user's cleaned tweets
    let text = req.body.formText
    const twitterUsername = req.body.formText
    let cleanedTweets

    //GET Twitter data (user by un, then user's tweet timeline)

    //delete response if not using
    twitterClient.get(
      '/users/show.json',
      {screen_name: twitterUsername},
      function(error, profile, response) {
        if (error) {
          throw error
        } else {
          console.log('TWITTER PROFILE: ', profile)
          const profileImg = profile.profile_image_url.replace(/_normal/, '')
          const profileBanner = profile.profile_banner_url

          // console.log('twitter user response: ', response)
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

                const document = {
                  content: cleanedTweets,
                  type: 'PLAIN_TEXT'
                }

                // Detects the sentiment of the text
                const [result] = await client.analyzeSentiment({
                  document: document
                })
                const sentiment = result.documentSentiment

                // console.log(`Text: ${cleanedTweets}`)
                // console.log(`Sentiment score: ${sentiment.score}`)
                // console.log(`Sentiment magnitude: ${sentiment.magnitude}`)

                const stuff = {
                  score: sentiment.score,
                  magnitude: sentiment.magnitude,
                  profileImg: profileImg,
                  profileBanner: profileBanner,
                  screenName: profile.screen_name,
                  name: profile.name,
                  location: profile.location
                }
                console.log('stuff: ', stuff)
                res.json(stuff)
              }
            }
          )
        }
      }
    )
  } catch (err) {
    next(err)
  }
})

module.exports = router
