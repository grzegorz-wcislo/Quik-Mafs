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

  _selectQuestion = question => {
    this.setState({selectedQuestion: question, score: this.state.score + 1});
  }

  _selectResult = result => {
    this.setState({selectedResult: result, score: this.state.score + 1});
  }

  componentDidMount = () => {
    let equations = [];
    for (let i = 0; i < 10; i++) {
      const equation = randomEquation();
        equations.push({...equation,
                          questionRotation: {y: Math.random() * 360, x: Math.random() * 100 - 50, z: Math.random() * 20 - 10},
                          resultRotation: {y: Math.random() * 360, x: Math.random() * 100 - 50, z: Math.random() * 20 - 10}});
    }
    this.setState({activeEquations: equations});
  }

  render() {
    return (
      <View
        style={{transform: [{translate: [0,0,-2]}]}}>
        <View>
          <Text>
            {this.state.selectedQuestion || "empty equation"}
            {this.state.selectedResult || "empty result"}
          </Text>
        </View>
        {this.state.activeEquations.map(el => (
          <VrButton
            style={{transform: [{translate: [0, 0, 2]},
                                {rotateX: el.questionRotation.x},
                                {rotateY: el.questionRotation.y},
                                {rotateZ: el.questionRotation.z},
                                {translate: [0, 0, -2]}],
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
