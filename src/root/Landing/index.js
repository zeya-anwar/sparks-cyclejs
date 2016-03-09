import {Observable} from 'rx'
import {div, h1, h2, h3, h4, h5, ul, li, a, b, br} from 'cycle-snabbdom'
import {Col, Row} from 'snabbdom-material'

import AppMenu from 'components/AppMenu'
import HeaderLogo from 'components/HeaderLogo'

import {log} from 'util'

import './styles.scss'

const headerSrc = require('images/pitch/sparklerHeader-2048.jpg')

const iconSrcs = {
  heart: require('images/pitch/heartIcon.svg'),
  first: require('images/pitch/icon-first.svg'),
  flag: require('images/pitch/icon-flag.svg'),
  mountains: require('images/pitch/icon-mountains.svg'),
}

const renderHook = (appIcon, headerLogo) =>
  div('#hook', {
    style: {backgroundImage: 'url("' + headerSrc + '")'},
  }, [
    div({style: {spaceBetween: 'flex-start'}}, [
      headerLogo,
      div({style: {float: 'right'}}, [appIcon]),
    ]),
    h1('.container', {}, 'Doing is living.'),
  ])

const renderBenefits = () =>
  div('#benefits', {static: true}, [
    div('.container', {}, [
      h3({}, ['Get invited to volunteer opportunities from all ' +
        'over the world by joining the ', b('sparks.network')]),
      ul({}, [
        li('.sn-icon.flag', {
          style: {backgroundImage: 'url("' + iconSrcs.flag + '")'},
        }, [
          b({}, 'Have new experiences'),
          ' by participating in lots of different events.',
        ]),
        li('.sn-icon.mountains', {
          style: {backgroundImage: 'url("' + iconSrcs.mountains + '")'},
        }, [
          b({}, 'Get rewarded'),
          ' for the help that you give with perks and access to new opportunities.',
        ]),
        li('.sn-icon.first', {
          style: {backgroundImage: 'url("' + iconSrcs.first + '")'},
        }, [
          b({}, 'Be recognized'),
          ' for your contributions with Karma, Accomplishments, and Triumphs.',
        ]),
      ]),
    ]),
  ])

const basicLink = (title, href = '') =>
  a({props: {href}}, [title])

const renderFooter = () =>
  div('#footer', {static: true}, [
    div('.links.container', {style: {textAlign: 'center'}}, [
      Row({style: {width: '100%'}},[
        Col({type: 'xs-4'},[
          h5({}, 'Contact'),
          ul({}, [
            li({}, [basicLink('Support')]),
            li({}, [basicLink('Business')]),
            li({}, [basicLink('Press')]),
            li({}, [
              basicLink('Info', 'mailto:info@sparks.network'),
            ]),
          ]),
        ]),
        Col({type: 'xs-4'},[
          h5({}, 'About'),
          ul({}, [
            li({}, [basicLink('Mission')]),
            li({}, [basicLink('Now Hiring')]),
            li({}, [basicLink('Our Team')]),
          ]),
        ]),
        Col({type: 'xs-4'},[
          h5({}, 'News'),
          ul({}, [
            li({}, [basicLink('Blog')]),
            li({}, [basicLink('Facebook')]),
            li({}, [basicLink('Twitter')]),
          ]),
        ]),
      ]),
    ]),
    Row({},[
      div('.container', {
        hook: {
          insert({elm}) {
            elm.innerHTML = '&copy; 2016 Sparks.Network'
          },
        },
      }),
    ]),
  ])

export default (sources) => {
  const appMenu = AppMenu(sources)
  const headerLogo = HeaderLogo(sources)

  const view =
    div('#landing', {}, [
      renderHook(appMenu.DOM, headerLogo.DOM),
      div('#promise', {static: true}, [
        h2('.container', {}, 'Get Involved Now!'),
      ]),
      div('#more-heart', {
        static: true,
        style: {backgroundImage: 'url("' + iconSrcs.heart + '")'},
      }),
      renderBenefits(),
      div('#cta', {static: true}, [
        div('.container', {}, [
          h4({}, ['Sign Up For', br({}), 'The Sparks Network!']),
        ]),
      ]),
      renderFooter(),
    ])

  return {
    DOM: Observable.just(view),
    auth$: appMenu.auth$,
    route$: sources.redirectLogin$,
  }
}