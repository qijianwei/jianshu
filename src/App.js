import React from 'react';
import Header from './common/header';
import {Provider} from 'react-redux';
import store from './store';
import { GlobalStyle} from './style';
import { GlobalFontStyle}from './statics/iconfont/iconfont'
import {BrowserRouter,Route} from 'react-router-dom';/* route是一条条路由规则 */

import Home from './pages/home';
import Login from './pages/login';
import Detail from './pages/detail';
function App() {
  /* exact精确对比 */
  return (
    <Provider store={store}>
       <BrowserRouter>
            <React.Fragment>
                <GlobalStyle/>
                <GlobalFontStyle/>
                <Header/> 
                <Route path='/' exact component={Home}></Route>
                <Route path='/login' exact component={Login}></Route>
                <Route path='/detail/:id' exact component={Detail}></Route>
            </React.Fragment>
       </BrowserRouter>
    </Provider>
  );
}

export default App;
