import {Observable} from 'rx'
import {a, img} from 'cycle-snabbdom'

const src = require('images/sn-logo-32.png')

export default (sources) => ({
  DOM: Observable.just(
    a({props: {href: '/'}}, [
      img({
        style: {height: '24px', float: 'left'},
        attrs: {src},
      }),
    ])
  ),
})