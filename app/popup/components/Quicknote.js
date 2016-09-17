import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { setRoutePath, toggleDrawer } from '../../shares/actions';
import '../../shares/styles/app.scss';
import '../styles/popup.scss';

class Quicknote extends Component {
  constructor(props) {
    super(props);
  }

  toggleDrawer(routePath) {
    this.props.toggleDrawer(this.props.drawer);
    if (routePath) {
      this.props.setRoutePath(routePath);
    }
  }

  render() {
    const { drawer, title, toggleDrawer } = this.props;
    return (
      <div id="app">
        <AppBar
          title={ title }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this, null) }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Drawer
          docked={ false }
          width={ 200 }
          open={ drawer } >
          <MenuItem primaryText="設定" onTouchTap={ this.toggleDrawer.bind(this, '/config') } />
          <MenuItem primaryText="登入" onTouchTap={ this.toggleDrawer.bind(this, '/login') } />
          <MenuItem primaryText="新增" onTouchTap={ this.toggleDrawer.bind(this, '/') } />
        </Drawer>
        { this.props.children }
      </div>
    );
  }
}

Quicknote.propTypes = {
  drawer: PropTypes.bool.isRequired,
  setRoutePath: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quicknote);

function mapStateToProps(state) {
  return {
    drawer: !!state.app.drawer,
    title: state.app.title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
    toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer)),
  };
}
