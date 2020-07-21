import React from 'react'
import { render } from 'react-dom'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'

import './styles.css'
import App from './App'

registerLocale('de', de)
setDefaultLocale('de')

console.log('renderer rendering')

render(<App />, document.getElementById('root'))
