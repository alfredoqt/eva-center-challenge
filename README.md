# Eva Center Challenge

App build following the specifications of this document: [Front End Challenge](https://www.notion.so/Frontend-Challenge-06db503b72104a3f994497badc270797)

The app is hosted at: [Firebase Hosting](https://eva-center-challenge.firebaseapp.com/)

## Features
- Responsive. Shows temperature stats of a patient and the camera preview in a row for medium to large screens, and shows those components in a column for small screens
- Image load handling
  - Handles image load timeout greater than one second
  - Handles image load error
- Image download
  - Handles empty image size errors
  - Saves the image with the timestamp when it was first loaded
- Temperature stats
  - Pooling of temperature stats every 2 seconds
  - Warns the user when the risk of a patient is high
- GitHub Action build and deploy pipeline on every push to **main**
  - Caches Node.js modules
  - Installs dependencies
  - Runs the jest tests
  - Runs the React production build
  - Hosts it to [Firebase Hosting](https://eva-center-challenge.firebaseapp.com/) at the end

## How to run locally
- Install Node.js and NPM. Follow this [link](https://nodejs.org/en/)
- Clone the respository (e.g. con git cli ```git clone https://github.com/alfredoqt/eva-center-challenge.git```)
- Run ```npm i``` to install the modules required for this app
- Start the React app with ```npm start```. The app will be hosted on localhost at port 3000 by default

## Caveats
- The image cannot be downloaded when ran locally. It can only be downloaded through the [public site](https://eva-center-challenge.firebaseapp.com/)
