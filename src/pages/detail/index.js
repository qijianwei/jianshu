import React,{PureComponent} from 'react';
import {connect} from 'react-redux';

import {
  DetailWrapper,
  Header,
  Content
}from './style';
import { actionCreators } from './store';
class Detail extends PureComponent{
    render(){
        const {content}=this.props;
        return(
            <DetailWrapper>
               <Header></Header>
               <Content 
                 dangerouslySetInnerHTML={{
                     __html:content
                 }}
               />
            </DetailWrapper>
        )
    }
    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
}
const mapStateToProps=(state)=>({
   title:state.getIn(['detail','title']),
   content:state.getIn(['detail','content'])
})
const mapDispatchToProps=(dispatch)=>({
    getDetail(id){
        dispatch(actionCreators.getDetail(id));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Detail);