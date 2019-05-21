import gondolaLift from '../assets/icons/gondola_lift.png';
import chairLift from '../assets/icons/chair_lift.png';
import snowPark from '../assets/icons/snow_park.png';
import towLift from '../assets/icons/tow_lift.png';
import viewPoint from '../assets/icons/view_point.png';


const icons = {
  gondola_lift: gondolaLift,
  chair_lift: chairLift,
  snow_park: snowPark,
  tow_lift: towLift,
  view_point: viewPoint
};

export default iconName => {
  return icons[iconName];
}