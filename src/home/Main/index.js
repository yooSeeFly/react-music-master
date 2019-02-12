import React from 'react'
import style from './style/index.module.less'
import { inject, observer } from 'mobx-react'
import { NavLink, withRouter,Route,Switch,Redirect } from 'react-router-dom'
import asyncComponent from '@/utils/AsyncComponent'

const FindPage = asyncComponent(()=>import('../../pages/FindPage/index'))          //发现页面
const TopListPage = asyncComponent(()=>import('../../pages/ToplistPage/index'))     //排行榜列表页面
const TopPage = asyncComponent(()=>import('../../pages/TopPage/index'))             //排行榜页面
const SearchPage = asyncComponent(()=>import('../../pages/SearchPage/index'))             //搜索页面

@inject('appStore') @withRouter @observer
class Main extends React.Component {
    toggleExpand = () => {
        this.props.appStore.toggleExpand()
    }

    render () {
        const {isExpandSider} = this.props.appStore
        return (
            <div className={style.container} style={{transform: `translateX(${isExpandSider ? '80%' : 0})`}}>
                <div className={style.header}>
                    <span className={'icon-weibiaoti12 iconfont'} onClick={this.toggleExpand}/>
                </div>
                <ul className={style['navigation-menu']}>
                    <li><NavLink to={'/my'} activeClassName={style.active}>我的</NavLink></li>
                    <li><NavLink to={'/find'} activeClassName={style.active}>发现</NavLink></li>
                    <li><NavLink to={'/toplist'} activeClassName={style.active}>排行榜</NavLink></li>
                    <li><NavLink to={'/search'} activeClassName={style.active}>搜索</NavLink></li>
                </ul>
                <div className={style.content}>
                    <Switch>
                        <Route path={'/find'} component={FindPage}/>
                        <Route path={'/toplist'} component={TopListPage}/>
                        <Route path={`/top/:idx`} component={TopPage}/>
                        <Route path={`/search`} component={SearchPage}/>

                        <Redirect exact from={'/'} to={'/my'}/>
                    </Switch>
                </div>

                {isExpandSider && <div className={style.mask} onClick={this.toggleExpand}/>}
            </div>
        )
    }
}

export default Main