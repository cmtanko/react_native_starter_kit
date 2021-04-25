# React Native Starter Kit

Simple react native kit, working as an expense manager for android/ios devices.

## Environment Versions
- Node: 10.15.3
- React Native : 0.63.3
- Cocopod: 1.10.1

# Installation

## Ruby & Fastlane

### Install rvm
Install rvm and select Ruby version

``` bash
# Install RVM
curl -sSL https://get.rvm.io | bash -s stable --ruby
 
# Install the version used by Fastlane
rvm install ruby-$(cat .ruby-version)

```

### Install Fastlane
So that we can build like cool humans, we use [Fastlane](https://fastlane.tools/)

```bash
gem install fastlane -NV
```
 
## Node

Node versions are managed via nvm. 

### nvm
To install

```
# Install NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# Install Required Node version
nvm install

# Select node version
nvm use
```

## React Native

```bash
brew install watchman
npm install -g react-native-cli
```


### Platform specific dependencies
```
npm run install-deps
```

### Android tools

- Android Studio 3.2
- Android SDK 8.1(oreo)
- Androik SDK Build Tools 29
- Android Sdk platform-tools 28.0.0
- Android sdk tools 26.1.1
- Android support repository 47.0.0
- Google repository 58 

### Xcode

10.1

# Build 

TL;DR

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

# Deployment

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
