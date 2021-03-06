import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as inputAction from '../actions/preview-action';
import PreviewBox from '../components/PreviewBox';

class PreviewGroup extends Component {

  evaluateInput(e) {
    const inputModel = this.props.preview;
    const inputId = this.props.inputId;
    let value = e.target.value;

    if (inputModel.type === 'number') {
      value = e.target.value && e.target.value.length > 0 ? parseInt(e.target.value, 10) : undefined;
    }
    this.props.actions.evaluateInputCondition(inputId, value);
  }

  renderSubinputs(childIds) {
    const self = this;
    return childIds.map(function(inputId) {
      return (
        <PreviewGroupContainer
          parentId={self.props.inputId}
          inputId={inputId} 
          key={inputId} />
      );
    });
  }

  render() {
    const inputId = this.props.inputId;
    const thisInput = this.props.preview;

    return (
      <div className="Preview-list">
        <div className="Preview-parent">
          <PreviewBox 
            reevaluate={this.evaluateInput.bind(this)}
            inputModel={thisInput} />
          <div className="Preview-child">
            {this.renderSubinputs(thisInput.childIds)}
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    preview: state.preview[props.inputId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(inputAction, dispatch)
  }
}

const PreviewGroupContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewGroup);
export default PreviewGroupContainer;
