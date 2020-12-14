import  { MineState } from '@/store/reducers/mine'
import  { HomeState } from '@/store/reducers/home'
import { ProfileState }from '@/store/reducers/profile'
import { RouterState } from 'connected-react-router'


// 自己实现
// 1首先自己构建CombinedState  合并后的状态，根状态
export interface CombinedState  {
    home: HomeState;
    mine: MineState;
    profile: ProfileState;
    router: RouterState
}