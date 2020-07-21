import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import useDetectPrint from 'use-detect-print'
import 'mobx-react-lite/batchingForReactDom'
import styled, { createGlobalStyle } from 'styled-components'

// without @page the _second_ page printed (!) is A3 in printToPdf
const GlobalStyle = createGlobalStyle`
  @page {
    size: A4 portrait;
  }
`
const Container = styled.div`
  background-color: white;
  height: 297mm;
  width: 210mm;
  box-shadow: inset 0 0 1px 1px red !important;
`

const App = () => {
  //const store = useContext(storeContext)

  const isPrinting = useDetectPrint()
  //console.log('App, isPrinting:', isPrinting)

  return (
    <>
      <GlobalStyle />
      <Container className="printer-content">example pdf</Container>
    </>
  )
}

export default observer(App)
