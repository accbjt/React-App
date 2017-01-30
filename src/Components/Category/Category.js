import React from 'react';
import { Menu, MenuItem } from 'react-foundation';
import './Category.scss';
import ProductItem from '../ProductItem/ProductItem';

class Category extends React.Component {
  componentWillMount() {
    debugger
  }

  fetchData() {

  }

  render() {
    return (
      <div className="category {this.props.title.replace(/\s/g, '-').toLowerCase()}">
          <div className="category-header">
            <span ref="image" className="category-header-image" />
            <div className="category-header-text">
              <span className="category-header-title text-large">{this.props.title}</span>
              <span rt-if="this.props.subtitle" className="category-header-subtitle text-large-subtitle">{this.props.subtitle}</span>
            </div>
          </div>
          <div className="row">
            <div className="category-filter-content">
              {/* <Filter/> */}
            </div>
            <div className="category-main-content products">
              <div className="category-products row products">
                {/* <!--<div className="col-xs-12 col-lg-12 products-header"> */}
                  <h2>{this.props.title}</h2>
                {/* </div> --> */}
                {/* <div rt-if="this.props.products.length == 0" className="category-products-empty">
                  No Results :(
                </div> */}
                <ProductItem
                  category="{this.props.title}"
                  classNameName="col-xs-6 col-sm-6 col-md-4 col-lg-3 section" key="{item.sku_id}" />
                <div className="category-pagination col-xs-12 col-lg-12">
                  <span className="category-pagination-count text-bold">{this.props.count} Products</span>
                  <a rt-if="this.hasPrev()" href="{this.prevUrl()}" className="category-pagination-button prev-button">Previous</a>
                  {/* <rt-virtual rt-repeat="item in this.paginationLinks()">
                    <span rt-if="item.page == this.currentPage"
                      className="category-pagination-button category-pagination-button-selected">
                      {item.page}
                    </span>
                    <span rt-if="item.page == '...'"
                      className="category-pagination-button category-pagination-button-fill">
                      {item.page}
                    </span>
                    <a rt-if="item.page != this.currentPage && item.page != '...'"
                      className="category-pagination-button"
                      href="{item.url}">
                      {item.page}
                    </a>
                  </rt-virtual> */}
                  <a rt-if="this.hasNext()" href="{this.nextUrl()}" className="category-pagination-button next-button">Next</a>
                </div>
                <div rt-if="this.props.loading" className="category-products-loading">
                  {/* <Spinner spinnerName='three-bounce'/> */}
                </div>
              </div>
              <div className="category-footer">
                {/* <!-- footer --> */}
              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default Category;
