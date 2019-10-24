import React from 'react';
import Header from './common/header';
import {Provider} from 'react-redux';
import store from './store';
import { GlobalStyle} from './style';
import { GlobalFontStyle}from './statics/iconfont/iconfont'
import {BrowserRoute,Route} from 'react-router-dom';/* route是一条条路由规则 */
function App() {
  /* exact精确对比 */
  return (
    <Provider store={store}>
       <React.Fragment>
           <GlobalStyle/>
          <GlobalFontStyle/>
          <Header></Header> 
       </React.Fragment>
    </Provider>
  );
}

export default App;
