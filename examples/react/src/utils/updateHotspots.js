
/**
 * @param { Array<{ left: string; top: string; dentAngle: string; display: boolean; }> } hotspotsData
 * @param {number} imgAngle - angle of current img
 * @param {{ x: number, y: number }} center - x, y cordinates of center
 * 
 */
const updateHotspots = (hotspotsData, imgAngle, center = { x: 0.5, y: 0.5 }) => {
  const curAngle = imgAngle > 180 ? imgAngle - 360 : imgAngle;

  // position wise 360 angle
  const getAngle = (pos) => {
    switch (pos) {
      case 'front':
        return 0;
      case 'left':
        return 90;
      case 'right':
        return -90;
      case 'back':
        return 180;
      default:
        return 0;
    }
  }

  // for hotspot to display in this range
  const getMaxAngle = (pos) => {
    return 45;
  }

  const getCoordinatesFromPos = (pos, r) => {
    switch (pos) {
      case 'front':
        return { x: center.x, y: center.y - r }
      case 'left':
        return { x: center.x - r, y: center.y }
      case 'right':
        return { x: center.x + r, y: center.y }
      case 'back':
        return { x: center.x, y: r + center.y }
      case 'upper':
        return { x: center.x, y: center.y - r }
      default:
        return { x: center.x, y: center.y - r }
    }
  }

  const rotate = (cx, cy, x, y, angle) => {
    const radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: Number(nx.toFixed(5)), y: Number(ny.toFixed(5)) };
  }

  const getDeviation = (currX, currY, curAngle) => {
    const { x, y } = rotate(center.x, center.y, currX, currY, curAngle);
    return { x, y }
  }

  return hotspotsData.map((hotspot) => {
    let minAngle, maxAngle, isDiplay;
    minAngle = getAngle(hotspot.position) - getMaxAngle(hotspot.position);
    maxAngle = getAngle(hotspot.position) + getMaxAngle(hotspot.position);

    if (imgAngle > 180 && hotspot.position === 'back') {
      isDiplay = imgAngle > minAngle && imgAngle < maxAngle;
    } else {
      isDiplay = curAngle > minAngle && curAngle < maxAngle;
    }

    const cor = getCoordinatesFromPos(hotspot.position, hotspot.radius);
    const deviation = getDeviation(cor.x, cor.y, -(curAngle + hotspot.dentAngle));

    return {
      ...hotspot,
      left: deviation.x,
      display: isDiplay || hotspot.position === 'upper'
    };
  })
}

export default updateHotspots;