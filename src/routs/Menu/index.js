import React from 'react';
import MenuBadge from '../../components/MenuBadge'
import _ from 'lodash';
import './styles.css';

const Menu = (props) => {

  const { language, locations, switchToVideo, history, currentVideoId } = props;
  const sortedLocations = _.reverse(_.values(_.groupBy(locations, 'location_type.category.id')));
  console.log('sortedLocations', sortedLocations);
  return (
    <div className="menu__block">
      {
        sortedLocations.map((item, index) => {
          return (
            <div className="menu__list-category" key={index}>
              <h2 className="menu__title">
                {item[0].location_type.category.name === 'Pistes' ? language === 'en' ? 'Pistes' : 'Pisten' : item[0].location_type.category.name}
              </h2>
              <ul>
                {
                  item.map((location) => {
                    return (
                      <MenuBadge
                        key={location.id}
                        location={location}
                        switchToVideo={switchToVideo}
                        history={history}
                        currentVideoId={currentVideoId}
                      />
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  );
};

export default Menu;
