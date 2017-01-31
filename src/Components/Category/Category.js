import { Link } from 'react-router';
import React from 'react';
import './Category.scss';
import ProductItem from '../ProductItem/ProductItem';
import Filter from '../Filter/Filter';

class Category extends React.Component {

  state = {
    data:          [],
    filteredItems: [],
    categories:    [],
    deliveryZone:  false,
    itemCount:     20,
    latitude:      '34.0836804',
    longitude:     '-118.3415054',
    address:       ''
  }

  componentWillMount() {
    this.getAllData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.categoryId !== this.props.params.categoryId) {
      this.fetchData().then((data) => {
        this.setState({
          data,
          filteredItems: data.slice(0, this.state.itemCount)
        });
      });
    }
  }

  getAllData() {
    this.fetchCategories().then((data) => {
      this.setState({
        categories:   data.menu,
        deliveryZone: data.store.inside_delivery_zone
      });
    });

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
    return this.props.params.categoryId ? this.props.params.categoryId : '5769c97729c54c2b71db6f00';
  }

  size() {
    return '100';
  }

  async fetchCategories() {
    try {
      const response = await fetch(`https://menu.saucey-api.com/?lat=${this.state.latitude}&lng=${this.state.longitude}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }

    return [];
  }

  async fetchData() {
    try {
      let response = await fetch(`https://menu.saucey-api.com/category/${this.categoryId()}?lat=${this.state.latitude}&lng=${this.state.longitude}8&size=${this.size()}`);
      let responseJson = await response.json();
      return responseJson.products;
    } catch(error) {
      console.error(error);
    }

    return [];
  }

  async fetchLocation(address) {
    try {
      let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.convertAddress(address)}&key=AIzaSyAgSEs68MVuY1gKfntkNS7T6jLRm-n-Y5Q`);
      let responseJson = await response.json();
      return responseJson.results[0];
    } catch(error) {
      console.error(error);
    }

    return [];
  }

  convertAddress(address) {
    return address.replace(/ /g, '+');
  }

  filterData() {
    this.setState({
      filteredItems: this.state.data.slice(0, this.state.itemCount)
    });
  }

  currentCategory() {
    const data = this.state.categories.filter(category => {
      return this.categoryId() === category._id
    })[0];

    return data ? data : { name: '', subtitle: '' };
  }

  handleChange(event) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchLocation(this.state.address).then(data => {
      var location = data.geometry.location;

      this.setState({
        latitude:  location.lat,
        longitude: location.lng
      });

      this.getAllData();
    });
  }

  renderInsideDelivaryZone() {
    if (this.state.deliveryZone) {
      return (
        <i style={{ color: '#96d883' }} className='glyphicon glyphicon-ok-sign' />
      );
    }

    return (
      <i className='glyphicon glyphicon-remove-sign' />
    );
  }

  render() {
    return (
      <div className="category container {this.props.title.replace(/\s/g, '-').toLowerCase()}">
          <div className='category-header'>
            <span ref='image' className='category-header-image' />
            <div className='category-header-text'>
              <span className='category-header-title text-large'>{this.currentCategory().name}</span>
              <span className='category-header-subtitle text-large-subtitle'>{this.currentCategory().subtitle}</span>
            </div>
          </div>
          <div className='row'>
            <div className='category-filter-content col-xs-12'>
              <Filter
                maxQty={100}
                qty={this.state.itemCount}
                updateItemCount={(qty) => { this.updateItemCount(qty); }}
              />

              <form className='form-inline address col-xs-12 col-sm-6' onSubmit={(e) => { this.handleSubmit(e); }}>
                <div className='form-group'>
                  <label htmlFor='address'>Address</label>
                  <input className='form-control' type='text' placeholder='5555 Melrose Ave, Los Angeles, Ca' value={this.state.address} onChange={(e) => { this.handleChange(e); }} />
                </div>
                <input className='btn btn-default' type='submit' value='Submit' />
              </form>
              <div style={{marginTop: 52}}>
                {this.renderInsideDelivaryZone()} In Delivery Zone
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-2 category-list'>
              <ul className='nav nav-pills nav-stacked'>
                {
                  this.state.categories.map((category, i) => (
                    <li key={i}><Link to={`/category/${category._id}`} activeStyle={{ background: '#e1e1e1' }}>{category.name}</Link></li>
                  ))
                 }
              </ul>
            </div>
            <div className='category-main-content products col-xs-10'>
              <div className='category-products row products'>
                <h2>{this.props.title}</h2>
                {this.state.filteredItems.map(item => {
                  return (
                    <ProductItem
                      category='{this.props.title}'
                      classNameName='col-xs-6 col-sm-6 col-md-4 col-lg-3 section' key={item.sku_id} data={item} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Category;
