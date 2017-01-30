import React from 'react';
import './ProductItem.scss';

class ProductItem extends React.Component {
  render() {
    return (
      <div className="{this.className}" itemScope itemType="http://schema.org/Product">
        {/* <a href="{this.props.url}" onClick="{this.track.bind(this)}" className="{this.linkClass}" itemProp="url"> */}
          {/* <img className="product-item-placeholder" src="/images/bottle-loading-image.jpg" /> */}
          {/* <img rt-if="this.props.image" className="product-item-image" src="{this.props.image}" alt="{this.props.title}" itemProp="image"/> */}
          <div className="product-info">
            <div className="product-info-table">
              <div className="product-info-row">
                <div className="title" itemProp="name">
                  {this.props.title}
                </div>
                  <rt-virtual rt-if="this.price">
                    <div className="price">
                      ${this.props.priceDisplay}
                    </div>
                  </rt-virtual>
              </div>
            </div>
            <div className="product-info-table">
              <div className="product-info-row">
                <div className="subtitle" itemProp="description">
                  {this.props.subtitle}
                </div>
                <div className="volume">{this.props.volume}</div>
              </div>
            </div>
          </div>
        {/* </a> */}
        {/* <rt-virtual rt-if="this.price">
          <span className="img-hover button btn-primary green" onClick="{this.add.bind(this)}">Add To Bag</span>
        </rt-virtual> */}
      </div>

    );
  }
}

export default ProductItem;
