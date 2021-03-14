import React, { useState } from 'react';
import { Layout, Form, Select, InputNumber, Button, Input } from 'antd'

const Main = () => {
  const [selectedNode, setSelectedNode] = useState('amenophis')
  const [selectedPort, setSelectedPort] = useState(0)
  const [selectedAction, setSelectedAction] = useState('overlay')
  const [selectedSongName, setSelectedSongName] = useState('')
  const [selectedSongValue, setSelectedSongValue] = useState('')
  const [responseText, setResponseText] = useState('No Response')
  const formItemStyle = {
    backgroundColor: '#234523',
    width: '100%',
    padding: '15px',
    marginBottom: '2px',
    borderRadius: '5px'
  }

  const endpoints = {
    'overlay': '/user/overlay',
    'depart': '/user/depart'
  }

  const performAction = async () => {
    const response = await fetch(`http://${selectedNode}.kenovios.space:${selectedPort}${endpoints[selectedAction]}`, {
      method: 'POST',
      body: {}, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson)
    setResponseText(JSON.stringify(myJson, null, 2))
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'darkslateblue'
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
            color: 'white'
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
              width: '650px',
              backgroundColor: '#192519',
              height: '550px',
              overflow: 'auto',
              borderRadius: '5px',
              padding: '25px'
            }}
          >
            {responseText}
          </div>
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default Main