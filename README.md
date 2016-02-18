# Jordsta Twitter Banner

This is a neato little project to showcase some of my NodeJS expertise. When the `index.js` file is run, a screenshot is taken of `website/twitter.html` and saved to `tmp/`, and the photo is then uploaded to Twitter as a 'profile banner'. The screenshot file is then discarded.

You should be able to demo the result on [my Twitter page](https://twitter.com/jordsta). The profile banner is updated periodically.

## Prerequisites

You'll need to setup a [Twitter App](https://apps.twitter.com/) before proceeding.

## Getting Started

First, do your normal `npm install`. Then, in the top directory of the project, add a `.env` file with the following details from the app you set up on Twitter:

````
CONSUMER_KEY=[CONSUMER_KEY_HERE]
CONSUMER_SECRET=[CONSUMER_SECRET_HERE]
ACCESS_TOKEN=[ACCESS_TOKEN_HERE]
ACCESS_TOKEN_SECRET=[ACCESS_TOKEN_SECRET_HERE]
````

Then run:

````bash
node index.js [--pretend] [--facebook]
````

Feel free to throw this command in a cron.

**Beware:** You probably only want to run this command every so often - Twitter's API rate-limits hard, yo.

### Runtime Flags

Just so you know:

`--pretend` pretends to post to Twitter. It doesn't actually do anything except generate the screenshot for you.

`--facebook` generates you a one-off Facebook profile banner instead. Currently, this doesn't post it to Facebook for you, so you'll have to grab it from the `tmp/` directory.