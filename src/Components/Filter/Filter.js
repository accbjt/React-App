import React from 'react';
import Draggable from 'gsap/Draggable';
import './Filter.scss';

class Filter extends React.Component {
  componentDidMount() {
    const containerWidth = this.container.offsetWidth;
    const knobWidth = this.knob.offsetWidth;
    const knobOffset = knobWidth / 2;
    const self = this;

    Draggable.create('.knob', {
      type:   'x',
      bounds: { left: -knobOffset, width: containerWidth + knobWidth },
      cursor: 'pointer',
      onDrag() {
        const units = containerWidth / self.props.maxQty;
        const qty = Math.round((this.x / units) + self.props.maxQty);
        self.props.updateItemCount(qty);
      }
    });
  }

  render() {
    return (
      <div className='item-range' ref={(x) => { this.container = x; }}>
        <div className="qty">{this.props.qty}</div>
        <div className="knob" id="knob" ref={(x) => { this.knob = x; }}></div>
        <div className="range"></div>
      </div>
    );
  }
}

export default Filter;
