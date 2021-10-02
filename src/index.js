import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

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
const PAD = 'PAD'

const padAction = (id) => {
  return {
    type: PAD,
    id
  }
}

const padReducer = (state = {id: '', volume: 0.3, power: false}, action) => {
  switch (action.type) {
    case PAD:
      return {id: action.id, volume: state.volume, power: state.power}
      break;
  
    default: return state
      break;
  }
}

const BANK_ONE = 'BANK_ONE'
const BANK_TWO = 'BANK_TWO'

const bankOneAction = () => {
  return {
    type: BANK_ONE
  }
}

const bankTwoAction = () => {
  return {
    type: BANK_TWO
  }
}

const bankReducer = (state = {bank: bankOne}, action) => {
  switch (action.type) {
    case BANK_ONE:
      return {bank: bankOne}
      break;
    case BANK_TWO:
      return {bank: bankTwo}
      break;
    default: return state
      break;
  }
}

const allReducer = combineReducers({
  pad: padReducer, 
  bank: bankReducer
})

const store = createStore(allReducer)

console.log(store.getState())

//react
class Pad extends React.Component {
  constructor(props) {
    super(props)
    this.clickOnePad = this.clickOnePad.bind(this)
  }
  clickOnePad(e) {
    const audio = document.getElementsByClassName('clip')[e.target.value]      
    audio.load()
    audio.muted = this.props.power
    audio.play()
    
  }

  render() {
    console.log("re-render-pad")
    return(
      <button value={this.props.value} id={this.props.id} onClick={this.clickOnePad} key={this.props.key}>{this.props.keyTrigger}
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
      <div>
        {this.props.bank.bank.map((item, i) => {
          return (
            <Pad id={item.id}
                 value={i}
                 key={item.keyCode}
                 url={item.url}
                 keyTrigger={item.keyTrigger}
                 power={this.props.pad.power}
            />
          )
        })}
      </div>
    )
  }
}


class FunctionButton extends React.Component {
  constructor(props) {
    super(props)
    this.clickBank = this.clickBank.bind(this)
    this.clickPower = this.clickPower.bind(this)
  }

  clickBank() {
    if(!this.props.pad.power) {
      if (this.props.bank.bank == bankOne) {
        this.props.clickBankTwo()
        this.props.pad.id = 'Smooth Piano Kit'
      }
      else if(this.props.bank.bank == bankTwo) {
        this.props.clickBankOne()
        this.props.pad.id = 'Heater Kit'
      }
    }
  }

  clickPower() {
    if(this.props.pad.power) this.props.pad.power = true
    else this.props.pad.power = false
  }


  render() {
    console.log("re-render-pad")
    return (
      <div>
        <button onClick={this.clickBank}>Bank</button>
        <p>{this.props.pad.id}</p>
        <button onClick={this.clickPower}>Power</button>
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

const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(FunctionButton)
const PadContainer = connect(mapStateToProps, mapDispatchToProps)(DrumPad) 

class AppWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("re-render-main")
    return (
      <Provider store={store}>
        <ButtonContainer />
        <PadContainer />
      </Provider>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
