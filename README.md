[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/cmtanko)

# alpha React Native Starter Kit

Boilerplate for react native app

## APP Link

## Features:
- [x] Have
- [ ] Dont Have


## Screenshots

<img src="screenshots/overview.JPG">

## Environment Versions
- Node: 10.15.3
- React Native : 0.63.3
- Cocopod: 1.10.1

## Installation

### Ruby & Fastlane

#### Install rvm
Install rvm and select Ruby version

``` bash
# Install RVM
curl -sSL https://get.rvm.io | bash -s stable --ruby
 
# Install the version used by Fastlane
rvm install ruby-$(cat .ruby-version)

```

#### Install Fastlane
So that we can build like cool humans, we use [Fastlane](https://fastlane.tools/)

```bash
gem install fastlane -NV
```
 
### Node

Node versions are managed via nvm. 

#### nvm
To install

```
# Install NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Install Required Node version
nvm install

# Select node version
nvm use
```

### React Native

```bash
brew install watchman
npm install -g react-native-cli
```


#### Platform specific dependencies
```
npm run install-deps
```

#### Android tools

- Android Studio 3.2
- Android SDK 8.1(oreo)
- Androik SDK Build Tools 29
- Android Sdk platform-tools 28.0.0
- Android sdk tools 26.1.1
- Android support repository 47.0.0
- Google repository 58 

#### Xcode

12.X

## Build 

```bash
# In terminal 1
npm run start

# In terminal 2
npm run start-ios #switch npm run start-android
```

## Targeting specific platforms

You can build out for a particular platform via the appropriate npm command
```bash
npm run build-ios
npm run build-android
```

### iOS
```
  Rename .env.example to .env , and fill with appropriate keys
```
### Android
Make sure your .keystore file is named react-native-starter-kit.keystore and inside ./android/secure folder
```
export MY_RELEASE_STORE_FILE=YOUR_PATH
export My_RELEASE_STORE_PASSWORD=YOUR_STORE_PASSWORD
export My_RELEASE_KEY_ALIAS=YOUR_STORE_KEY_ALIAS
export My_RELEASE_KEY_PASSWORD=YOUR_KEY_PASSWORD
export ANDROID_HOME=YOUR_PATH_TO_Library/Android/sdk
export ANDROID_NDK=YOUR_PATH_TO_Library/Android/sdk/ndk/21.3.6528147
```

# Deployment

## Deploy
```
  General
  1. Ensure you have admin access to the destination Google Play and Apple/iTunesConnect Developer accounts
  2. Ensure you've named your app correctly and set a unique bundle identifier:
      Use react-native-rename
          eg. react-native-rename "Travel App" -b com.junedomingo.travelapp
      Open the project in Xcode and double check that the Bundle ID has been updated (if not, correct it)
  3. In both Google Play and iTunes Connect:
      Setup a new app
      Use the manual method below to build and deploy the app for the first time
      iOS Note: when you deploy the iOS app for the first time, you'll select 'Automatic Key Management'. Xcode will generate a private distribution key. Ensure you save this (eg. to a password safe) so that others can distribute the app too

  Android
  1. Generate/configure Android key:
    ( cd android/app && keytool -genkeypair -v -keystore android-release-key.keystore -alias jims-app-release-key -keyalg RSA -keysize 2048 -validity 10000 ) (note: change jims-app-release-key to your own alias)
  2. Save the key to a secure password safe (don't commit it to the repo)
  3. Setup the Gradle variables, using the alias and password/s (that you set in the previous command) in: android/gradle.properties
  4. Add the release signing config to your app's Gradle config in: android/app/build.gradle

  Fastlane
  1. Using the account owner's login (i.e. we want to create the API credentials from the owner's account) - follow the steps here to generate API credentials for Google Play. Download and place the json   file here: android/app/google-play-android-developer.json. Save the key to a secure password safe (don't commit it to the repo)
  2. Update the package_name and itc_team_id (App Store Connect Team ID) in faslane/Appfile to match the bundle of your app
  3. Update the following in fastlane/Fastfile:
    app_identifier: com.app.bundle - where com.app.bundle is your bundle id
    name.xcodeproj - to the name of your Xcode project file
    scheme: 'name' - where name is your scheme (eg. AppName)
  4. Run fastlane supply init (which will download the meta data of the uploaded app, from the stores)
```


## Generating artefacts

## Scripts

```
npm run script_name
```

the available scripts are

```bash
# start the metro interface
npm run start

npm run start-ios
npm run start-android

npm run build-ios
npm run build-android

npm run alpha-release

npm run reinstall

``` 

# Running Test 

Test is implemented through detox and jest

```bash
# In terminal 1
npm run test

# In terminal 2
npm run test-v
```

# Common setup issues

## iOS 

You may receive errors about Podfile not matching Podfile.lock being out of date
or Gemfile being out of date Gemfile.lock

```
cd ios  
pod update
pod install
gem update
```

# Trouble shooting in the development Process

## Remove dead metro thread

If you get an error like "something is already running"
follow these steps

- get PID `sudo lsof -i :8081`
- remember the PID
- kill it `kill pid_number` ex: `kill 4532`

## Fastlane doesnt not reconize node

`ln -s $(which node) /usr/local/bin/node`


### White screen

disable CORS `open -a Google\ Chrome --args --disable-web-security --user-data-dir`

if http://some_stuff/debugger-ui/ Change to http://localhost:8081/debugger-ui/

### 

### The simulator IOS is crashing without any error message

rm -rf ./ios/build
watchman watch-del-al
rm -rf $TMPDIR/react-*
lsof -ti :8081 | xargs kill -9
cd ios/ && pod install
react-native run-ios


This command should create a symlink to `/uer`
`ln -s $(which node) /usr/local/bin/node`

### Implementing Google signin 
https://www.pradipdebnath.com/2020/10/06/how-to-implement-google-login-in-react-native-with-firebase/

### Update in react-native-carousel-view > carouselPager.android.js
`import {ViewPagerAndroid} from 'react-native';` to
`import ViewPagerAndroid from '@react-native-community/viewpager';`


### Update in react-native-timeline-flatlist
```
<FlatList
  ListHeaderComponent={<this.props.ListHeaderComponent/>}   <--- Add this line
  style={[styles.listview, this.props.listViewStyle]}
  contentContainerStyle={this.props.listViewContainerStyle}
  data={this.state.data}
  extraData={this.state}
  renderItem={this._renderItem}
  keyExtractor={(item, index) => index + ""}
  {...this.props.options}
/>
```