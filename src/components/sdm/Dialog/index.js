import {Observable} from 'rx'
const {just, merge} = Observable

import combineLatestObj from 'rx-combine-latest-obj'

import {Dialog as SmDialog} from 'snabbdom-material'
import {div} from 'cycle-snabbdom'

import {OkAndCancel} from 'components/sdm/Button'

import {AccentToolbar} from 'components/sdm/Toolbar'

import {icon, iconSrc} from 'helpers'

const dialogStyle = {
  position: 'fixed',
  top: '20px',
  // bottom: '20px',
  margin: 'auto',
  // minWidth: '400px',
  // width: 'auto',
  minWidth: '600px',
}

const mobileDialogStyle = {
  marginTop: '-15em',
  // minWidth: '400px',
  // width: 'auto',
  width: '400px',
}

const contentStyle = {
  padding: '0em 1em 1em 1em',
}

const modal = ({isOpen, isMobile, toolbarDOM, contentDOM, actionsDOM}) =>
  SmDialog({
    isOpen,
    noPadding: true,
    style: isMobile ? mobileDialogStyle : dialogStyle,
    title: toolbarDOM,
    footer: actionsDOM,
  },[
    div({style: contentStyle}, [contentDOM]),
  ])

const BaseDialog = sources => {
  // hax to capture close click from SmDialog
  const maskClose$ = sources.DOM.select('.close').events('click')

  const toolbar = AccentToolbar({...sources,
    leftItemDOM$: sources.iconUrl$ && sources.iconUrl$
      .map(src => src && iconSrc(src) || '') ||
      sources.iconName$ && sources.iconName$.map(icon),
  })

  const isOpen$ = merge(
    sources.isOpen$,
    maskClose$.map(false),
  ).startWith(false)

  const viewState = {
    isOpen$,
    isMobile$: sources.isMobile$,
    toolbarDOM$: toolbar.DOM,
    contentDOM$: sources.contentDOM$,
    actionsDOM$: sources.actionsDOM$,
  }

  const DOM = combineLatestObj(viewState).map(modal)

  return {
    DOM,
  }
}

// this should be called 'SimpleDialog'
const Dialog = sources => {
  const oac = OkAndCancel(sources)

  const isOpen$ = merge(
    sources.isOpen$ || just(false),
    oac.ok$.map(false),
    oac.cancel$.map(false),
  ).startWith(false)

  const bd = BaseDialog({...sources,
    actionsDOM$: oac.DOM,
    isOpen$,
  })

  return {
    DOM: bd.DOM,
    submit$: oac.ok$,
    close$: oac.cancel$,
  }
}

export {
  Dialog,
  BaseDialog,
}
