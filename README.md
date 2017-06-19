# habhubDemo

An offline demo project for HabHub

## Getting started

```sh
yarn
yarn run link         # link up libraries
yarn run ios          # or yarn run android
```

## Project directory
```
README.md                 # This README document
.babelrc                  # Config file for Babel transpiler
.gitignore                # Config file for Git
.eslintrc                 # Config file for eslint (Styling JavaScript)
.flowconfig               # Config file for Flow (not used yet...)
.watchmanconfig           # Config file for watchman
yarn.lock                 # yarn (npm replacement)
index.ios.js              # The entry point of the iOS app (React Native recognizes it)
index.android.js          # The entry point of the Android App
app.json                  # App settings

[Directories]
__tests__                 # directory: store tests
android                   # directory: source files for the Android project
img                       # directory: store images
video                     # directory: store video clips
ios                       # directory: source files for the ios project
js                        # directory: JavaScript source files
```

## Development stack

Dependencies
- [`react`](https://facebook.github.io/react/)  JavaScript library to build user interface
- [`prop-types`](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) Typechecking With PropTypes
- [`redux`](https://github.com/reactjs/redux) Predictable state container for JavaScript apps
- [`react-native`](http://facebook.github.io/react-native/)  JavaScript framework to build native apps
- [`react-navigation`](https://reactnavigation.org/) React Navigation is born from the React Native community's need for an extensible yet easy-to-use navigation solution.
- [`react-native-i18n`](https://github.com/AlexanderZaytsev/react-native-i18n) Internationalization library of react-native
- [`native-base`](https://github.com/GeekyAnts/NativeBase) Essential cross-platform UI components for React Native
- [`react-redux`](https://github.com/reactjs/react-redux) Official React bindings for Redux
- [`redux-thunk`](https://github.com/gaearon/redux-thunk) Thunk middleware for Redux
- [`lodash`](https://lodash.com/) A modern JavaScript utility library delivering modularity, performance & extras
- [`moment`](https://momentjs.com/) Parse, validate, manipulate, and display dates and times in JavaScript
- [`react-native-video`](https://github.com/react-native-community/react-native-video) A Video component for react-native
- [`react-native-slider`](https://github.com/jeanregisser/react-native-slider) A pure JavaScript Slider component for react-native
- [`react-native-camera`](https://github.com/lwansbrough/react-native-camera) A Camera component for React Native. Also supports barcode scanning!
- [`react-native-datepicker`](https://github.com/xgfe/react-native-datepicker) React native datePicker component for both Android and IOS

## Programming guidelines
- [Airbnb JavaScript style guideline](https://github.com/airbnb/javascript)
- [React native networking: Fetch, Promise, async/await](https://facebook.github.io/react-native/docs/network.html)

## Tricks
- Atom: Press `Ctrl+Shift+M` to preview markdown
- Nuclide: Nuclide > React Native > Start Packager


## Tools
- [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) and its [usage](http://extension.remotedev.io/#usage) Install the chrome extension to debug Redux


## App deployment

### iOS
- Open the project in Xcode
- Product > Build
- Product > Archive
- Window > Organizer
- Export the project as an archive (ipa file)
- Window > Devices. Select the physical device. Click an add button to install the app


## References
- [js.coach - search RN](https://js.coach/?search=react%20native)
- [Redux Shopping-cart example](https://github.com/reactjs/redux/tree/master/examples/shopping-cart)
- [React native app authenticate user example](https://medium.com/@alexmngn/the-essential-boilerplate-to-authenticate-users-on-your-react-native-app-f7a8e0e04a42)
