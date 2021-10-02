import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

//redux
const CLICK_PAD = 'CLICK_PAD'
const NO_CLICK = 'NO_CLICK'

const padAction = (id) => {
  return {
    type: CLICK_PAD,
    id
  }
}

const padReducer = (state = {id: '', power: false}, action) => {
  switch (action.type) {
    case CLICK_PAD:
      return {id: action.id, power: state.power}
      break;
    case NO_CLICK: 
      return state
      break
    default: return state
      break;
  }
}

const BANK_ONE = 'BANK_ONE'
const BANK_TWO = 'BANK_TWO'

const bankOneAction = (bank) => {
  return {
    type: BANK_ONE,
    bank
  }
}

const bankTwoAction = (bank) => {
  return {
    type: BANK_TWO,
    bank
  }
}

const bankReducer = (state = {bank: bankOne, id: 'Heater Kit'}, action) => {
  switch (action.type) {
    case BANK_ONE:
      return {bank: action.bank, id: 'Heater Kit'}
      break;
    case BANK_TWO:
      return {bank: action.bank, id: 'Smooth Piano Kit'}
      break;
    default: return state
      break;
  }
}

const INCRE_VOLUME = 'INCRE_VOLUME'
const DECRE_VOLUME = 'DECRE_VOLUME'

const increVolumeAction = () => {
  return {
    type: INCRE_VOLUME
  }
}

const decreVolumeAction = () => {
  return {
    type: DECRE_VOLUME
  }
}

const volumeReducer = (state = 0.3, action) => {
  switch (action.type) {
    case INCRE_VOLUME:
      return state + 0.01
      break;
    case DECRE_VOLUME:
      return state - 0.01
      break
    default: return state
      break;
  }
}

const allReducer = combineReducers({
  pad: padReducer, 
  bank: bankReducer,
  volume: volumeReducer
})

const store = createStore(allReducer)

console.log(store.getState())

const styleNoPad = {backgroundColor: 'grey', boxShadow: '3px 3px 5px black', marginTop: 0}
const stylePad = {backgroundColor: 'orange', marginTop: 3, boxShadow: '0 3px orange'}

//react
class Pad extends React.Component {
  constructor(props) {
    super(props)
    this.clickOnePad = this.clickOnePad.bind(this)
  }

  clickOnePad(e) {
    if(!store.getState().pad.power)
     {
      const audio = document.getElementsByClassName('clip')[e.target.value]
      store.dispatch(padAction(e.target.id.replace(/-/g, ' ')))
      e.target.style.backgroundColor = stylePad.backgroundColor
      e.target.style.boxShadow = stylePad.boxShadow
      e.target.style.marginTop = stylePad.marginTop
      setTimeout(() => {
        e.target.style = styleNoPad
      }, 100);
      audio.volume = store.getState().volume      
      audio.play()
     }
  }

  render() {
    console.log("re-render-pad")
    return(
      <button className='drum-pad' 
              value={this.props.value} 
              id={this.props.id} 
              onClick={this.clickOnePad} 
              key={this.props.key}
              style={styleNoPad}>
        {this.props.keyTrigger}
        <audio className='clip' src={this.props.url}></audio>
      </button> 
    )
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("re-render-drum")
    return (
      <div className="pad-container">
        {this.props.bank.map((item, i) => {
          return (
            <Pad id={item.id}
                value={i}
                key={item.keyCode}
                url={item.url}
                keyTrigger={item.keyTrigger}
            />
          )}
        )}
      </div>
    )
  }
}

const styleButtonPower = {marginRight: 0,
  marginLeft: 'auto'}
class FunctionButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bank: bankOne,
      styleButtonBank: {marginRight: 'auto',
        marginLeft: 0}
    }
    this.clickBank = this.clickBank.bind(this)
    this.clickPower = this.clickPower.bind(this)
  }

  clickBank() {
    if(!store.getState().pad.power) {
      if (this.state.bank == bankOne) {
        this.setState({
          bank: bankTwo,
          styleButtonBank: {marginRight: 0,
        marginLeft: 'auto'}
        })
        store.dispatch(padAction('Smooth Piano Kit'))
      }
      else {
        this.setState({
          bank: bankOne,
          styleButtonBank: {marginRight: 'auto',
        marginLeft: 0}
        })
        store.dispatch(padAction('Heater Kit'))
      }
    }
  }

  clickPower(e) {
    if(!store.getState().pad.power) {
      store.getState().pad.power = true
      e.target.style.marginRight = 'auto'
      e.target.style.marginLeft = 0
    }
    else {
      store.getState().pad.power = false
      e.target.style.marginRight = 0
      e.target.style.marginLeft = 'auto'
    }
  }

  clickInc() {
    store.dispatch(increVolumeAction())
    store.dispatch(padAction("Volume: " + Math.round(store.getState().volume*100).toString()))
    setTimeout(() => {
      store.dispatch(padAction(' '))
    }, 1000);
  }

  clickDec() {
    store.dispatch(decreVolumeAction())
    store.dispatch(padAction("Volumn: " + Math.round(store.getState().volume*100).toString()))
    setTimeout(() => {
      store.dispatch(padAction(' '))
    }, 1000);
  }


  render() {
    console.log(store.getState())
    return (
      <div id='drum-machine'>
        <DrumPad bank={this.state.bank}/>
        <div className='function-button'>
          <div className="button">
            <p>Power</p>
            <button className='fb' onClick={this.clickPower}>
              <button id="child" style={styleButtonPower}></button>
            </button>
          </div>
          <button onClick={this.clickInc}>+</button>
          <AppWrapper />
          <button onClick={this.clickDec}>-</button>
          <div className="button"><p>Bank</p><button className='fb' onClick={this.clickBank}><button id="child" style={this.state.styleButtonBank}></button></button></div>
        </div>
        
      </div>
      
    )
  }
}

//react-redux
const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickPad: (id) => {dispatch(padAction(id))},
    clickBankOne: () => {dispatch(bankOneAction())},
    clickBankTwo: () => {dispatch(bankTwoAction())}
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='display'>
        {this.props.pad.id}
      </div>
      
    )
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Display)

class AppWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("re-render-main")
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <FunctionButton />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
