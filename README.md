# Getting Started with Contacts Table App
Contacts Table App grabs artificial CRM client data via a RESTful API call and renders the contact name, total value of each contact's deals, their location, the deals, and client tags in a CSS Grid table.

The app is powered by React and implements TypeScript, SCSS, and semantic HTML.

The https encrypted production app is hosted via Netlify at https://react-typescript-contacts-table.netlify.app/.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode using React Testing Library.

The unit test checks whether the page successfully renders the component in the browser and also validates that the RESTful API returns the requested data and then displays the massaged data to the screen.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Main Assumptions based off Design Guide
- The app should be responsive across all form factors, so the text shrinks for mobile.
- Contact names should remain black since they are not links to contact information yet and I don't want to trick theuser into thinking they are selectable.
- The list should not contain anything selectable since that would also trick the user to think that an action will result from the click event.
- Total Value will convert to AUD if the deals are the summation of deals listed in AUD and EUR.
- Total Value will convert to USD if the client is located in the US, but the deal is listed in another country.
- Tags will be lower case.
- States and countries should be abbreviated.
- There should be adequate space left to the right of tags in desktop view to leave room for row controls.
- Per design guide, column headers height should be 28px.
- Per design guide, contact details rows should be 32px without a gravatar and have 8px of padding-top and padding-bottom if there is space in the row.  If the text needs to wrap, I assumed it was preferable to maintain the padding and allow the row height to grow.
- I assumed that the deal's number should be listed in the Deals column as opposed to the total number of deals for that client.
- I assumed a 40px margin top, right, bottom, and left was adequate.
- I assumed some padding to the left of contacts should be kept in order to preserve space for a checkbox and gravatar.
