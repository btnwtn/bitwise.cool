import React from 'react'
import styled from 'react-emotion'
import mq from '../mq'

const Container = styled.div`
  max-width: 900px;
`

const Images = styled.div`
  position: relative;
  padding-top: 120px;
  padding-bottom: 36px;

  ${mq.small} {
    padding-top: 68px;
  }

  ${mq.medium} {
    padding-top: 33px;
  }
`

const Bubble = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 10px 10px 0px rgba(255, 196, 196, 0.4);
  border-radius: 51px;
  padding: 25px 10px 37px 32px;
  max-width: 532px;
  margin-left: auto;
  margin-bottom: 2em;
`

const Text = styled.p`
  font-size: 1.25em;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0;

  ${mq.small} {
    font-size: 1.5em;
  }
`

const Image = styled.img`
  display: block;
  margin: 0;
`

const Floater = styled(Image)`
  position: absolute;
  max-width: 50%;
  right: 0;
  bottom: 0;
`

const Collage = () => {
  return (
    <Container>
      <Images>
        <Bubble>
          <Text>
            <b>Brandon Newton</b> is an Artist and Frontend Engineer who makes
            helpful things for Human beings.
          </Text>
        </Bubble>
        <Image src={require('./1.jpg')} alt="" style={{ maxWidth: '73%' }} />
        <Floater src={require('./2.jpg')} alt="" />
      </Images>
    </Container>
  )
}

export default Collage
