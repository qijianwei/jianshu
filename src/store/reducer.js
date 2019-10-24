import {combineReducers} from 'redux-immutable'; /* 包装对象 */
import {reducer as headerReducer} from '../common/header/store'
const reducer = combineReducers({
	header: headerReducer,
});

export default reducer;