const baseCarData = {
  width: 1745,
  height: 1510,
  length: 3995,
  body_type: 'SUV'
}

const getPosition = (x, y) => {
  if (x >= 0 && x <= 0.42 && y >= 0.30 && y <= 0.66) {
    return 'front';
  } else if (x >= 0.12 && x <= 0.76 && y >= 0.66 && y <= 0.95) {
    return 'left';
  } else if (x >= 0.12 && x <= 0.76 && y >= 0 && y <= 0.32) {
    return 'right';
  } else if (x >= 0.62 && x <= 1 && y >= 0.30 && y <= 0.68) {
    return 'back';
  }

  return 'upper';
}

const sqrandroot = (x, y) => getNumber(Math.sqrt(x * x + y * y));

const getWidthFraction = (width) => {
  return width / baseCarData.width;
}

const getHeightFraction = (height) => {
  return height / baseCarData.height;
}

const getLengthFraction = (length) => {
  return length / baseCarData.length;
}

const getVerticalRadius = (carData) => {
  return (carData.width / carData.length) * 0.4;
}

const getRadius = (pos, x, y, carData) => {
  switch (pos) {
    case 'front':
      if (x >= 0 && x <= 0.24) return sqrandroot(getNumber(0.37 * getLengthFraction(carData.length)), getNumber(0.5 - (getVerticalRadius(carData) / 0.15 * y)));
      return sqrandroot(getNumber(0.5 - (3.7 / 5 * x * getLengthFraction(carData.length))), getNumber(0.5 - (getVerticalRadius(carData) / 0.15 * y)));
    case 'left':
      if (x < 0.18) return 0.25;
      return 75 / 68 * getLengthFraction(carData.length) * sqrandroot(getVerticalRadius(carData), 0.48 - x);
    case 'right':
      if (x < 0.18) return 0.25;
      return 75 / 68 * getLengthFraction(carData.length) * sqrandroot(getVerticalRadius(carData), 0.48 - x);
    case 'back':
      return getWidthFraction(carData.width) * sqrandroot(0.45 * getLengthFraction(carData.length), getNumber(y - 0.5));
    case 'upper':
      return (2 / 2.4) * sqrandroot(0.5 - x, y - 0.5);
    default:
      return 0;
  }
}

function calcAngleDegrees(ax, ay) {
  const angleRad = Math.atan((ay) / (ax));
  const angleDeg = angleRad * 180 / Math.PI;

  return (angleDeg);
}

const getNumber = (n) => {
  return Number(n.toFixed(5));
}

const getAngle = (pos, r, x, y, carData) => {
  switch (pos) {
    case 'front':
      return calcAngleDegrees(getNumber(0.5 - x), getNumber(0.5 - y));
    case 'left':
      if (x < 0.18) return 32;
      return calcAngleDegrees(0.1, getNumber(0.47 - x));
    case 'right':
      if (x < 0.18) return -32;
      return calcAngleDegrees(-0.1, getNumber(0.47 - x));
    case 'back':
      return calcAngleDegrees(0.5, getNumber(y - 0.5));
    case 'upper': {
      const angle = calcAngleDegrees(getNumber(0.5 - x), getNumber(0.5 - y));

      if (x > 0.5) {
        return - angle + (y > 0.5 ? -90 : 90);
      } else {
        return angle;
      }
    }

    default:
      return 0;
  }
}

const getTopPos = (pos, x, y, carData) => {
  switch (pos) {
    case 'front':
      if (x >= 0.43 && x <= 0.50) return 0.2;
      else if (x >= 0.33 && x < 0.43) return 0.5 - 0.13 - (0.13 * (x - 0.33));
      else if (x >= 0.20 && x < 0.33) return 0.5 - (x - 0.20);
      else return 0.5 + ((x / 0.13) * 0.25);
    case 'left':
      if (x < 0.18) return 0.4;
      return 0.5 + ((5 / 3) * (y - 0.83));
    case 'right':
      if (x < 0.18) return 0.4;
      return 0.5 + ((5 / 3) * (0.13 - y));
    case 'back':
      return 0.5 + (5 / 3) * (x - 0.88);
    case 'upper':
      return 0.19 / getHeightFraction(carData.height);
    default:
      return 0.2;
  }
}

const convertDentData = (data, carDetails) => {
  const threesixtyDents = data.map((dent) => {
    const carData = {
      height: carDetails.height ? Number(carDetails.height) : baseCarData.height,
      width: carDetails.width ? Number(carDetails.width) : baseCarData.width,
      length: carDetails.length ? Number(carDetails.length) : baseCarData.length
    }
    const x = getNumber(dent.y);
    const y = getNumber(dent.x);
    const pos = getPosition(x, y);
    const r = getNumber(getRadius(pos, x, y, carData));
    const angle = getNumber(getAngle(pos, r, x, y, carData));
    return {
      position: pos,
      dentAngle: angle,
      display: 0,
      top: getNumber(getTopPos(pos, x, y, carData)),
      radius: r
    }
  });
  return [...threesixtyDents,
  ]
}


export default convertDentData;