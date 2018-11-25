import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';

import randomEquation from './randomEquation';

export default class Quik_Mafs extends React.Component {
  state = {
    score: 0,
    activeEquations: [],
    selectedResult: null,
    selectedQuestion: null
  };

  _newEquation = () => ({
    ...randomEquation(),
    questionRotation: {y: Math.random() * 360, x: Math.random() * 100 - 50, z: Math.random() * 20 - 10},
    resultRotation: {y: Math.random() * 360, x: Math.random() * 100 - 50, z: Math.random() * 20 - 10}
  });

  _selectQuestion = question => {
    this.setState({selectedQuestion: question});
    this._checkAnswer();
  };

  _selectResult = result => {
    this.setState({selectedResult: result});
    this._checkAnswer();
  };

  _checkAnswer = () => {
    if (this.state.selectedQuestion && this.state.selectedResult) {
      const hit = this.state.activeEquations.filter(el => el.question === this.state.selectedQuestion && el.result === this.state.selectedResult)[0];
      if (hit != undefined) {
        this.setState({score: this.state.score + 1});
          this.setState({
            score: this.state.score + 1,
            activeEquations: this.state.activeEquations.filter(el => !(el.question === this.state.selectedQuestion && el.result === this.state.selectedResult)).concat(this._newEquation())
          });
      } else {
        this.setState({score: 0});
      }
    }
  };

  componentDidMount = () => {
    let equations = [];
    for (let i = 0; i < 10; i++) {
        equations.push(this._newEquation());
    }
    this.setState({activeEquations: equations});
  };

  render() {
    return (
      <View
        style={{transform: [{translate: [0,0,-2]}]}}>
        <View>
          <Text>
            Score: {this.state.score}
          </Text>
        </View>
        {this.state.activeEquations.map(el => (
          <VrButton
            style={{transform: [{translate: [0, 0, 2]},
                                {rotateX: el.questionRotation.x},
                                {rotateY: el.questionRotation.y},
                                {rotateZ: el.questionRotation.z},
                                {translate: [0, 0, -2]}],
                    color: this.state.selectedQuestion === el.question ? "red" : "white",
                    position: 'absolute',
                    fontSize: 200}}
            onClick={() => this._selectQuestion(el.question)}>
            <Text>
              {el.question}
            </Text>
          </VrButton>
        ))}
        {this.state.activeEquations.map(el => (
          <VrButton
            style={{transform: [{translate: [0, 0, 2]},
                                {rotateX: el.resultRotation.x},
                                {rotateY: el.resultRotation.y},
                                {rotateZ: el.resultRotation.z},
                                {translate: [0, 0, -2]}],
                    color: this.state.selecteResult === el.result ? "red" : "white",
                    position: 'absolute',
                    fontSize: 200}}
            onClick={() => this._selectResult(el.result)}>
            <Text>
              {el.result}
            </Text>
          </VrButton>
        ))}
      </View>
    );
  }
};

AppRegistry.registerComponent('Quik_Mafs', () => Quik_Mafs);
