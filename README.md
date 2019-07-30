<h1 align="center">Chat App with Maps Tracking</h1>

<p align="center">
  <img src="https://cdn-images-1.medium.com/max/2400/1*iTAHnz8gq1UkwTa_1sGYdw.png" height=300 />
  <img src="http://pluspng.com/img-png/google-maps-png-google-maps-icon-1600.png" height=300 />
</p>

<br>

## Table of contents
* [Introduction](#introduction)
* [Requirements](#requirements)
* [Setting up Firebase](#setting-up-firebase)
* [Create and Implement API Maps SDK](#Create-and-Implement-API-Maps-SDK)
* [Run App](#run-app)

## Introduction
[![React Native](https://img.shields.io/badge/React%20Native-0.59-blue.svg?style=rounded-square)](https://facebook.github.io/react-native/)
[![React Navigation](https://img.shields.io/badge/React%20Navigation-^3.11-purple.svg?style=rounded-square)](https://reactnavigation.org)
[![Native Base](https://img.shields.io/badge/Native%20Base-^2.12.1-blue.svg?style=rounded-square)](http://nativebase.io)
[![Firebase](https://img.shields.io/badge/Firebase-orange.svg?style=rounded-square)](https://console.firebase.google.com)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-green.svg?style=rounded-square)](https://cloud.google.com/maps-platform)
<br>

Here is my new github repository that is build an Chat App with User Map Tracking that i named with '**Black Sugar**', i build this app less than a week :D.

In this project i'am using firebase as database. Why ? because Firebase provides a realtime database and backend as a service. The service provides application developers an API that allows application data to be synchronized across clients and stored on Firebase's cloud.

**Note**<br>
If u want develope and take a part to make this app more better, feel free to fork or clone this repository and tag me as creator.

## Requirements
1. `node`, `npm`, `react-native-cli`
1. This repository, clone into your local disk
2. Firebase Account
3. Google Cloud (to make API Maps SDK)

## Setting up Firebase

The most important from this app is the database, yes, you must setup the database first at firebase. You can follow the instuctions how to create a real time database here : [Create and Integrating Firebase in React Native](https://www.metizsoft.com/blog/real-time-firebase-integration-with-react-native).

After you create a real time database at firebase and you got a Web Configuration, you must put the firebase web configuration at this file **[AuthLoadingScreen](https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/src/Screens/AuthLoading.js)

## Create and Implement API Maps SDK

To make a new API Maps SDK and Implement it to your react native project, you can follow this instructions : [Get API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key)

Don't forget after you create a new Maps SDK API, you must put the API to this file : **[AndroidManifest.xml](https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/android/app/src/main/AndroidManifest.xml)**

## Run App

After you follow the instructions above, now you can go ahead to the last step, follow the instruction as well :
1. Open the terminal in the project, if u use text editor Visual Studio Code you can do with **CTRL + SHIFT + `**
2. Type in the terminal `npm install`
3. Then, type `react-native link` to link all dependencies in this project
4. And then type `react-native run-android` to run the project in your phone or emulator, the first be sure you connecting your Android Phone or Emulator with enabling USB Debugging.
5. Enjoy the app! If you have a question feel free to send me email : [hajidito.kerja@gmail.com](mailto:hajidito.kerja@gmail.com)

## Screenshot from the app
<p align='center'>
  <span>
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-145521.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124048.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124106.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-145951.jpg' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124639.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124647.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124655.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124704.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124712.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-124743.png' width=200 />
  <img src='https://github.com/hajidito/ReactNative-GoogleMaps-Firebase-ChatApp-BlackSugar/blob/master/Screenshot_20190730-125032.png' width=200 />
  </span>
</p>

## Video Demo App

[![DEMO APP](https://img.youtube.com/vi/DVjXG4Vvz_M/0.jpg)](https://youtu.be/DVjXG4Vvz_M)

<hr>

<h3 align="center">Author</h3>

<p align="center">
<a href="https://github.com/hajidito">
  <img alt="Author Andre Feri" title="git author" src="https://avatars3.githubusercontent.com/u/50772146?s=460&v=4" width="250" />
</a>
<p align="center"><b><a href="https://github.com/hajidito">Haji Dito M A</a></b></p>
</p>

