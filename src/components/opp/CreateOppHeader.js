import {Observable} from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'

// import isolate from '@cycle/isolate'

import {Opps} from 'remote'

import {OppForm} from 'components/opp'

import {col} from 'helpers'
import modal from 'helpers/modal'
import listItem from 'helpers/listItem'

// import {log} from 'util'

const _openActions$ = ({DOM}) => Observable.merge(
  DOM.select('.open').events('click').map(true),
  DOM.select('.close').events('click').map(false),
)

const _submitAction$ = ({DOM}) =>
  DOM.select('.submit').events('click').map(true)

const _render = ({isOpen, oppFormDOM}) =>
  col(
    listItem({
      iconName: 'power',
      iconBackgroundColor: 'yellow',
      title: 'Opportunities',
      className: 'open',
      clickable: true,
      header: true,
    }),
    modal({
      isOpen,
      title: 'Create Opportunity',
      iconName: 'power',
      submitLabel: 'But of Course',
      closeLabel: 'Not the Now',
      content: oppFormDOM,
    })
  )

const CreateOppHeader = sources => {
  const oppForm = OppForm(sources)

  const submit$ = _submitAction$(sources)

  const queue$ = oppForm.item$
    .sample(submit$)
    .zip(sources.projectKey$,
      (opp,projectKey) => ({projectKey, ...opp})
    )
    .map(Opps.create)

  const isOpen$ = _openActions$(sources)
    .merge(submit$.map(false))
    .startWith(false)

  const viewState = {
    isOpen$,
    project$: sources.project$,
    oppFormDOM$: oppForm.DOM,
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {DOM, queue$}
}

export {CreateOppHeader}
