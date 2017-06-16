# habhubDemo

An offline demo project for HabHub

## Getting started

```sh
yarn
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
- [`react-native`](http://facebook.github.io/react-native/)  JavaScript framework to build native apps
- [`react-navigation`](https://reactnavigation.org/) React Navigation is born from the React Native community's need for an extensible yet easy-to-use navigation solution.

## Programming guidelines
- [Airbnb JavaScript style guideline](https://github.com/airbnb/javascript)

## Tricks
- Atom: Press `Ctrl+Shift+M` to preview markdown
- Nuclide: Nuclide > React Native > Start Packager

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
- [Renaming React native project](http://stackoverflow.com/questions/32830046/renaming-a-react-native-project)
