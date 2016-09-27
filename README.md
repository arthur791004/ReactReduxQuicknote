# ReactReduxQuicknote

a quicknote of chrome extension integrated with Ｍａｉｌ２０００ system.

## Installation
```shell
$ npm install
```

## Build
```shell
$ PROD=1 webpack
```

## Usage
1. add build directory to chrome extension
2. setup Ｍａｉｌ２０００
3. login
4. now, you can add any url or selected text on browser to the quicknote in Ｍａｉｌ２０００

## 3rd-party library
* Basic
  * react
  * redux
  * es6
  * sass
  * react-chrome-redux
* Compiler & Packer
  * webpack
    * compiler
      * basic
        * babel-loader
        * babel-preset-react (for react)
        * babel-preset-es2015 (for es6)
        * babel-preset-stage-0 (for es7)
      * eslint
        * eslint
        * eslint-loader
        * eslint-plugin-react
      * css
        * css-loader
        * node-sass
        * sass-loader
        * style-loader
        * autoprefixer-loader
        * extract-text-webpack-plugin
      * file
        * file-loader
        * url-loader
      * html
        * html-webpack-plugin
    * hot reload
      * webpack-dev-server
    * packer
      * clean-webpack-plugin
      * copy-webpack-plugin
* Router
  * react-router
* middleware
  * redux-thunk
  * redux-logger
* UI
  * material-ui
  * redux-form
* Promise
  * bluebird
* Request
  * superagent
* Auto Testing
  * mocha
  * chai
* API
  * opengraph api
* Others
  * keymirror

## Todos
* test case for redux action

## Reference
* Basic
  * https://facebook.github.io/react/
  * https://github.com/reactjs/redux
  * http://es6-features.org/
  * http://sass-lang.com/
  * https://github.com/tshaddix/react-chrome-redux
* Compiler & Packer
  * https://webpack.github.io/
  * https://arthur791004.github.io/2016/08/20/webpack-react-scss-eslint-material/
* Router
  * https://github.com/ReactTraining/react-router
* middleware
  * https://github.com/gaearon/redux-thunk
  * https://github.com/evgenyrodionov/redux-logger
* UI
  * http://www.material-ui.com/
  * http://redux-form.com/
* Promise
  * http://bluebirdjs.com/
* Request
  * https://github.com/visionmedia/superagent
* Auto Testing
  * https://mochajs.org/
  * http://chaijs.com/
* API
  * https://www.opengraph.io/
* Others
  * https://www.npmjs.com/package/keymirror

## Demo
* config
  * popup
    ![config popup](https://github.com/arthur791004/ReactReduxQuicknote/blob/master/demo/config_popup.jpg)
  * content
    ![config_content](https://github.com/arthur791004/ReactReduxQuicknote/blob/master/demo/config_content.jpg)
* login
  * popup
    ![login popup](https://github.com/arthur791004/ReactReduxQuicknote/blob/master/demo/login_popup.jpg)
  * content                                   
    ![login content](https://github.com/arthur791004/ReactReduxQuicknote/blob/master/demo/login_content.jpg)
* add quicknote
  * popup
    ![add popup](https://github.com/arthur791004/ReactReduxQuicknote/blob/master/demo/add_popup.jpg)
  * content                               
    ![add content](https://github.com/arthur791004/ReactReduxQuicknote/blob/master/demo/add_content.jpg)
