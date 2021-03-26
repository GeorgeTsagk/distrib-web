import React, { useState } from 'react';
import { Layout, Form, Select, InputNumber, Button, Input } from 'antd'
import { JsonTable } from 'react-json-to-html'

import mp3 from '../santo-johny.mp3'
import pyramids from '../pyramids.jpg'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Main = () => {
  const [selectedNode, setSelectedNode] = useState('amenophis')
  const [selectedPort, setSelectedPort] = useState(5000)
  const [selectedAction, setSelectedAction] = useState('overlay')
  const [selectedSongName, setSelectedSongName] = useState('')
  const [selectedSongValue, setSelectedSongValue] = useState('')
  const [response, setResponse] = useState({})
  const [fullResults, setFullResults] = useState(false)
  const formItemStyle = {
    backgroundColor: 'rgba(23,45,23,0.4)',
    width: '100%',
    padding: '15px',
    marginBottom: '2px',
    borderRadius: '5px'
  }

  const endpoints = {
    'overlay': '/user/overlay',
    'depart': '/user/depart',
    'insert': '/user/insert',
    'delete': '/user/delete',
    'query': '/user/query'
  }

  const createReqBody = () =>{
    switch(selectedAction) {
      case 'overlay':
        return {}
      case 'depart':
        return {}
      case 'insert':
        return {
          'key': selectedSongName,
          'value': selectedSongValue
        }
      case 'delete':
        return {
          'key': selectedSongName
        }
      case 'query':
        return {
          'song_name': selectedSongName
        }
    }
  }

  const performAction = async () => {
    console.log('Sending: ', createReqBody())
    const response = await fetch(`http://${selectedNode}.kenovios.space:${selectedPort}${endpoints[selectedAction]}`, {
      method: 'POST',
      body: JSON.stringify(createReqBody()),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
    for (const [key, value] of Object.entries(myJson)) {
      if(typeof key == 'string' && key.length > 30){
        console.log('Checking key:' , key)
        console.log(value)
        var val = myJson[key]
        val = (val.replace(/'/g, '"'))
        myJson[key] = JSON.parse(val)
      }
    }
    console.log(myJson)
    setResponse(myJson)
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'darkslateblue',
        overflow: 'hidden'
      }}
      onClick={(e) => {
        document.getElementById('myAudio').volume = 0.25
        document.getElementById('myAudio').play()
      }}
    >
      <Layout>
        <Layout.Header
          style={{
            backgroundColor: 'darkslategray',
            padding: '10px',
            color: 'white',
            fontSize: '35px'
          }}
        >
          Distributed Systems 2021

        </Layout.Header>
        <Layout.Content
          style={{
            backgroundColor: 'darkslateblue',
            padding: '50px',
            color: 'white',
            backgroundImage: `url(${pyramids})`,
            backgroundSize: '100%',
            minHeight: '900px',
          }}
        >
          <Form
            style={{
              display: 'inline-block',
              width: '600px'
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Form.Item
              style={formItemStyle}
              label='Choose node'
            >
              <Select
                defaultValue={selectedNode}
                onChange={(e) => {
                  setSelectedNode(e)
                }}
              >
                <Select.Option value='amenophis'>Amenophis</Select.Option>
                <Select.Option value='bennu'>Bennu</Select.Option>
                <Select.Option value='chisisi'>Chisisi</Select.Option>
                <Select.Option value='dalila'>Dalila</Select.Option>
                <Select.Option value='eshe'>Eshe</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label='Specify Port'
              style={formItemStyle}
            >
              <InputNumber
                onChange={(e) => {
                  setSelectedPort(e)
                }}
                value={selectedPort}
              />
            </Form.Item>
            <Form.Item
              label='Choose Action'
              style={formItemStyle}
            >
              <Select
                defaultValue={selectedAction}
                onChange={(e) => {
                  setSelectedAction(e)
                }}
              >
                <Select.Option value='overlay'>overlay</Select.Option>
                <Select.Option value='insert'>insert</Select.Option>
                <Select.Option value='query'>query</Select.Option>
                <Select.Option value='delete'>delete</Select.Option>
                <Select.Option value='depart'>depart</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{
                ...formItemStyle,
                display: (['insert', 'delete', 'query'].indexOf(selectedAction) > -1) ? 'inherit' : 'none'
              }
              }
            >
              <Input
                placeholder='Song Name'
                value={selectedSongName}
                style={{
                  display: 'inline',
                  marginLeft: '50px'
                }}
                onChange={(e) => {
                  setSelectedSongName(e.target.value)
                }}
              />
              <Input
                placeholder='Song Value'
                value={selectedSongValue}
                style={{
                  display: selectedAction === 'insert' ? 'inline' : 'none',
                  marginLeft: '50px'
                }}
                onChange={(e) => {
                  setSelectedSongValue(e.target.value)
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                onClick={(e) => {
                  console.log(
                    selectedNode,
                    selectedPort,
                    selectedAction,
                    selectedSongName,
                    selectedSongValue
                  )
                  performAction()
                }}
              >
                Execute Command
              </Button>
            </Form.Item>

          </Form>
          <div
            style={{
              position: 'fixed',
              right: '25px',
              top: '80px',
              width: '700px',
              height: '90vh',
              overflow: 'auto',
              borderRadius: '5px',
              padding: '25px',
              color: 'black'
            }}
            onClick={(e) => {
              setFullResults(true)
            }}
            onKeyPress={(e) => {
              if(e.key=='Enter') setFullResults(false)
            }}
          >
            <JsonTable
              json={response}
            />
          </div>
        </Layout.Content>
      </Layout>
      <audio
        loop
        id='myAudio'
        src={mp3}
      >
      </audio>
    </div>
  )
}

export default Main