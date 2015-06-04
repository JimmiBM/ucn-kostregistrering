# Kostregistrerings applikation for Region Nordjylland

App bygget til Region Nordjylland.

Underærnerede patienter indtaster hvad de har spist og hvor meget, så kommer appen med forslag til hvad de kan spise for at nå dagens mål.

# Kør selv

**Kør i emulator**

Dette kræver at NodeJS er installeret og at du har en emulator iOS eller Android installeret. Skift 'android' til 'ios' for at bruge IOS.
```sh
$ npm install -g ionic cordova
$ git clone https://github.com/JimmiBM/ucn-kostregistrering.git
$ cd ucn-kostregistrering
$ ionic platform add android
$ ionic emulate android
```

**Kør i browser**

Dette kræver at NodeJS er installeret
```sh
$ npm install -g ionic cordova
$ git clone https://github.com/JimmiBM/ucn-kostregistrering.git
$ cd ucn-kostregistrering
$ ionic serve
```

### Frameworks

Frameworks brugt

* Ionic
* AngularJS
* Cordova