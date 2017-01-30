import React from 'react';
import './Category.scss';
import ProductItem from '../ProductItem/ProductItem';
import Filter from '../Filter/Filter';

class Category extends React.Component {

  state = {
    data:          [],
    filteredItems: [],
    itemCount:     20
  }

  componentWillMount() {
    this.fetchData().then((data) => {
      this.setState({
        data,
        filteredItems: data.slice(0, this.state.itemCount)
      });
    });
  }

  updateItemCount(qty) {
    this.setState({ itemCount: qty });
    this.filterData();
  }

  categoryId() {
    return '5769c97729c54c2b71db6f00';
  }

  latitude() {
    return '34.179172';
  }

  longitude() {
    return '-118.76286';
  }

  size() {
    return '100';
  }

  async fetchData() {
    try {
      let response = await fetch(`https://menu.saucey-api.com/category/${this.categoryId()}?lat=${this.latitude()}&lng=${this.longitude()}8&size=${this.size()}`);
      let responseJson = await response.json();
      return responseJson.products;
    } catch(error) {
      console.error(error);
    }

    return [];
  }

  filterData() {
    this.setState({
      filteredItems: this.state.data.slice(0, this.state.itemCount)
    });
  }

  render() {
    return (
      <div className="category {this.props.title.replace(/\s/g, '-').toLowerCase()}">
          <div className="category-header">
            <span ref="image" className="category-header-image" />
            <div className="category-header-text">
              <span className="category-header-title text-large">{this.props.title}</span>
              <span className="category-header-subtitle text-large-subtitle">{this.props.subtitle}</span>
            </div>
          </div>
          <div className="row">
            <div className="category-filter-content col-xs-12">
              <Filter
                maxQty={this.state.data.length}
                qty={this.state.itemCount}
                updateItemCount={(qty) => { this.updateItemCount(qty); }}
              />
            </div>
            <div className="category-main-content products col-xs-12">
              <div className="category-products row products">
                {/* <!--<div className="col-xs-12 col-lg-12 products-header"> */}
                  <h2>{this.props.title}</h2>
                {/* </div> --> */}
                {/* <div rt-if="this.props.products.length == 0" className="category-products-empty">
                  No Results :(
                </div> */}
                {this.state.filteredItems.map(item => {
                  return (
                    <ProductItem
                      category="{this.props.title}"
                      classNameName="col-xs-6 col-sm-6 col-md-4 col-lg-3 section" key={item.sku_id} data={item} />
                  );
                })}
                <div className="category-pagination col-xs-12 col-lg-12">
                  <span className="category-pagination-count text-bold">{this.props.count} Products</span>
                  <a href="{this.prevUrl()}" className="category-pagination-button prev-button">Previous</a>
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
                  <a href="{this.nextUrl()}" className="category-pagination-button next-button">Next</a>
                </div>
                {/* <div className="category-products-loading"> */}
                  {/* <Spinner spinnerName='three-bounce'/> */}
                {/* </div> */}
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
