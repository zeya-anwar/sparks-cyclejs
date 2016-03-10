import React from 'react'
import ReactDOM from 'react-dom'
import {div, a, img} from 'cycle-snabbdom'
import {Icon, Appbar} from 'snabbdom-material'
import {material} from 'util'

import 'images/sn-logo-32.png'

export {menu} from './menu'
export {landing} from './landing'
export {appMenu} from './appMenu'
export {mobileFrame, desktopFrame} from './frame'
export {projectForm} from './projectForm'
export {sideNav} from './sideNav'

// helper function to attach react components to the snabbdom
// some need to be attached on 'update', others on 'insert', not sure why
// see Dropper.js and Cropper.js
export const reactComponent = (Klass,attrs,hookName = 'update') =>
  div({
    hook: {[hookName]: ({elm}) => ReactDOM.render(<Klass {...attrs}/>,elm)},
  })

export const icon = (name, color = '#FFF') => Icon({name, style: {color}})

const src = require('images/sn-logo-32.png')

export const headerLogo =
  a({props: {href: '/'}}, [
    img({
      style: {height: '24px', float: 'left'},
      attrs: {src: '/' + src},
    }),
  ])

export const appBar = ({appMenu}) =>
  Appbar({fixed: true, material}, [
    Appbar.Title({style: {float: 'left'}}, [headerLogo]),
    div({style: {float: 'right'}}, [appMenu]),
  ])

// export const appBar = ({})

export const col = (...children) =>
  div({},children)
