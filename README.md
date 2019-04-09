# BimSPOT API Exercise

## A couple of notes on open questions and implementation details

### Hooks vs Class based components
In this exercise I decided to use [React Hooks](https://reactjs.org/docs/hooks-intro.html) instead of the more "traditional" way of doing things with class based stateful components. I like to keep up with new developments and experiment with new things, so using Hooks seemed like a good idea. Should you prefer class based components, however, I would be happy to refactor the relevant portion of the code.

### Amount of data displayed
The number of items fetched from the API, even when filtered down to the requirements given in the exercise brief, can easily reach the hundreds if not thousands. Displaying all that data on the page didn't seem like the smartest of ideas, so I decided on adding a configurable limit. In the **config.js** file, there is a DISPLAY_LIMIT option with the value of 25. That seemed like a reasonable default limit. Should you want to display all the results, you just need to set this option to null or any other falsey value.

It wasn't an explicit requirement here, so I chose not to implement it but in a production ready app I would probably make use of some form of pagination. The config option mentioned above could easily be reused in a pagination system as well: a single page would display as many results.

### Item details
Each item (that is, each critically endangered species and each mammal) has around 10 or more props. Since there were no specific requirements which ones to display here, I used my own judgement. In the case of critically endangered species, I used a table display with one column being the scientific name (which I assume is unique), the other the conservation measures fetched in addition to each item. In the case of mammals, I simply used a list display with the scientific name once again, and as a nice addition, the category/status (critically endangered, vulnerable, etc) of the animal as a badge/pill.

In a more complex, production ready app, one might pull in a router and make each item a link pointing to a details page of said item where all the props could be displayed.

---

To run or install the app, refer to the CRA docs below.

You will also need to create a .env file in the project root and create an environmental variable with the name of REACT_APP_API_TOKEN and set its value to your access token of the API:

```env
REACT_APP_API_TOKEN=yourtoken
```

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
