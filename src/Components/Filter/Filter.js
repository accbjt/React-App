import React from 'react';
import Draggable from 'gsap/Draggable';
import { TweenMax } from 'gsap';
import './Filter.scss';

class Filter extends React.Component {
  componentDidMount() {
    const containerWidth = this.container.offsetWidth;
    const knobWidth = this.knob.offsetWidth;
    const knobOffset = knobWidth / 2;
    const units = containerWidth / this.props.maxQty;
    const self = this;

    Draggable.create('.knob', {
      type:   'x',
      bounds: { left: -knobOffset, width: containerWidth + knobWidth },
      cursor: 'pointer',
      onDrag() {
        const qty = Math.round((this.x / units) + self.props.maxQty);
        self.props.updateItemCount(qty);
      }
    });

    TweenMax.to('.knob', 0, { x: -80*units })
  }

  render() {
    return (
      <div className='item-range' ref={(x) => { this.container = x; }}>
        <h4 className='title'>Product Range</h4>
        <div className='knob' id='knob' ref={(x) => { this.knob = x; }}>
          <div className='qty'>{this.props.qty}</div>
        </div>
        <div className="range"></div>
      </div>
    );
  }
}

export default Filter;
