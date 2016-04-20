import React, {
  Dimensions,
  StyleSheet,
  Component,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';

const window = Dimensions.get('window');
var SplashImage = require('../../../images/splash.png');

const styles = StyleSheet.create({
  backdrop:{
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  overlay: {
    // source: {SplashImage},
    position: 'absolute',
    width: window.width,
    height: window.height,
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : 'transparent',
    // backgroundImage: {SplashImage},
    // backgroundColor : "#ffffff"
  }
});

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pageX, pageY, show, onPress, overlayStyles } = this.props;

    if (!show) {
      return null
    }

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <View style={[styles.overlay, { top: -pageY, left: -pageX }, overlayStyles]}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Overlay.propTypes = {
  pageX: React.PropTypes.number,
  pageY: React.PropTypes.number,
  show: React.PropTypes.bool,
  overlayStyles : React.PropTypes.object
};

Overlay.defaultProps = {
  pageX: 0,
  pageY: 0,
  show: false,
  overlayStyles : {}
};

module.exports = Overlay;
