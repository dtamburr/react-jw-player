function onTime(event) {
  const { hasFired, previousPos } = this.state;
  const { duration } = event;
  const position = Math.floor(event.position);
  let hasChanged = false;

  if (this.props.onEverySecond) {
    if (position > previousPos) {
      this.props.onEverySecond(position);
    }

    this.setState({ previousPos: position });
  } else {
    if (!hasFired.threeSeconds && position >= 3) {
      this.props.onThreeSeconds();
      hasFired.threeSeconds = true;
      hasChanged = true;
    }

    if (!hasFired.tenSeconds && position >= 10) {
      this.props.onTenSeconds();
      hasFired.tenSeconds = true;
      hasChanged = true;
    }

    if (!hasFired.thirtySeconds && position >= 30) {
      this.props.onThirtySeconds();
      hasFired.thirtySeconds = true;
      hasChanged = true;
    }
  }

  if (!hasFired.fiftyPercent && ((position / duration) * 100) >= 50) {
    this.props.onFiftyPercent();
    hasFired.fiftyPercent = true;
    hasChanged = true;
  }

  if (!hasFired.ninetyFivePercent && ((position / duration) * 100) >= 95) {
    this.props.onNinetyFivePercent();
    hasFired.ninetyFivePercent = true;
    hasChanged = true;
  }

  if (hasChanged) {
    this.setState({
      hasFired,
    });
  }
}

export default onTime;
