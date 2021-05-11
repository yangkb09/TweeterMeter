const router = require('express').Router()
const Twitter = require('twitter') //An asynchronous client library for the Twitter REST and Streaming API's.

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

router.post('/', async (req, res, next) => {
  try {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language')

    // Instantiates a client
    const client = new language.LanguageServiceClient({
      keyFilename: 'google-credentials.json',
      projectId: 'sentiment-analys-1611430622359'
    })

    const twitterUsername = req.body.formText

    //GET Twitter user by username
    twitterClient.get(
      '/users/show.json',
      {screen_name: twitterUsername},
      function(error, profile) {
        if (error) {
          throw error
        } else {
          const profileImg = profile.profile_image_url.replace(/_normal/, '')
          const profileBanner = profile.profile_banner_url

          //GET Twitter user's tweet timeline
          twitterClient.get(
            '/statuses/user_timeline.json',
            {screen_name: twitterUsername, count: 200, include_rts: false},
            async function(error, tweets) {
              if (error) {
                throw error
              } else {
                let holder = ''
                for (let i = 0; i < tweets.length; i++) {
                  holder += tweets[i].text
                }
                // The text to analyze: an user's cleaned tweets
                const cleanedTweets = holder.replace(
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

                const googleAndTwitterData = {
                  score: sentiment.score,
                  magnitude: sentiment.magnitude,
                  profileImg: profileImg,
                  profileBanner: profileBanner,
                  screenName: profile.screen_name,
                  name: profile.name,
                  location: profile.location
                }

                res.json(googleAndTwitterData)
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
