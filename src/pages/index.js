import React from 'react'
import styled from 'react-emotion'
import Layout from '../components/layout'

import Collage from '../components/Collage'

const Center = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IndexPage = () => {
  return (
    <Layout>
      <Center>
        <Collage />
      </Center>
    </Layout>
  )
}

export default IndexPage
