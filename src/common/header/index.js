import React,{Component} from 'react';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux'; /* 帮助组件和store建立连接 */
import {actionCreators} from './store';
import {actionCreators as loginActionCreators} from '../../pages/login/store';
import {Link} from 'react-router-dom';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Addition,
  Button,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem
} from './style';
class Header extends Component{
    getListArea(){
      const {focused,list,mouseIn,page,totalPage,handleMouseEnter,handleMouseLeave,handleChangePage}=this.props;
      const newList=list.toJS();
      const pageList=[];
      if(newList.length){
        for(let i=(page-1)*10;i<10*page;i++){
          pageList.push(
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }
      
      if(focused||mouseIn){
        return (
          <SearchInfo
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
          >
             <SearchInfoTitle>
                 热门搜索
                 <SearchInfoSwitch
                    onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}
                 >
                     <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                     换一批
                 </SearchInfoSwitch>  
             </SearchInfoTitle>
             <SearchInfoList>
                 {pageList}
             </SearchInfoList>
          </SearchInfo>
        )
      }else{
        return null;
      }
    }
    render(){
      const {focused,handleInputFocus,handleInputBlur,list,login,logout}=this.props;
        return (<HeaderWrapper>
                <Logo href='/'/>
                <Nav> 
                  <NavItem className='left active'>首页</NavItem>
                  <NavItem className='left'>下载App</NavItem>
                  {
                     login?
                      <NavItem onClick={logout}>退出</NavItem>:
                      <Link to='/login'><NavItem className='right'>登录</NavItem> </Link>
                  }
                  
                  <NavItem className='right'>
                     <i className="iconfont">&#xe636;</i>
                  </NavItem>
                  <SearchWrapper>
                     <CSSTransition
                        in={focused}
                        timeout ={200}
                        classNames="slider"
                      >
                        <NavSearch 
                          className={focused ? 'focused': ''}
                          onFocus={()=>handleInputFocus(list)}
                          onBlur={handleInputBlur}
                        >
                        </NavSearch>
                     </CSSTransition>
                    <i className={focused?'focused iconfont zoom': 'iconfont zoom'}>
                     &#xe614;
                    </i>
                    {this.getListArea()}
                  </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className="writting">
                       <i className="iconfont">&#xe615;</i>
                       写文章
                    </Button>
                    <Button className="reg">
                       注册
                    </Button>
                </Addition>
            </HeaderWrapper>)
    }
}
const mapStateToProps=(state)=>{
  //console.log(state.get('header'))
   return {
       focused:state.getIn(['header', 'focused']),
       list:state.getIn(['header','list']),
       mouseIn:state.getIn(['header','mouseIn']),
       page:state.getIn(['header','page']),
       totalPage:state.getIn(['header','totalPage']),
       login:state.getIn(['login','login'])
   }
}
const mapDispatchToProps=(dispatch)=>{
  return {
            handleInputFocus(list){
              (list.size===0)&&dispatch(actionCreators.getList());/* 用了thunk中间件，action可以是一个函数 */
              dispatch(actionCreators.searchFocus())
           },
          handleInputBlur(){   
            dispatch(actionCreators.searchBlur())
          },
          handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
          },
          handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
          },
          handleChangePage(page,totalPage,spinIcon){
            let originAngle=spinIcon.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
              originAngle=parseInt(originAngle,10);
            }else{
              originAngle=0;
            }
            spinIcon.style.transform=`rotate(${originAngle+360}deg)`
            if(page<totalPage){
              dispatch(actionCreators.changePage(page+1))
            }else{
              dispatch(actionCreators.changePage(1))
            }
          },
          logout(){
             dispatch(loginActionCreators.logout());
          }
     }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
