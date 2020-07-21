import React from 'react'
import { render } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

import './styles.css'

const Container = styled.div`
  background-color: white;
  height: 297mm;
  width: 210mm;
  box-shadow: inset 0 0 1px 1px red !important;
`
// without @page the _second_ page printed (!) is A3 in printToPdf
const GlobalStyle = createGlobalStyle`
  @page {
    size: A4 portrait;
  }
`

console.log('renderer rendering')

render(
  <>
    <GlobalStyle />
    <Container className="printer-content">example pdf</Container>
  </>,
  document.getElementById('root'),
)
