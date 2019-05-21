import React from 'react';
import ReactDOM from 'react-dom';
import {Manager, Reference, Popper} from 'react-popper';
import Settings from '../../components/Settings';

const SettingsButton = ({
                          onShowSettings, hasSettings, videoId, filtervideos, setPlaybackRate, changeFilter, is360Available, currentFilter, onLanguageChange
                        }) => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span className="player__icon" onClick={onShowSettings} ref={ref}>
                       <i className="fas fa-cog"></i>
                    </span>
        )}
      </Reference>
      {/*{*/}
      {/*ReactDOM.createPortal(*/}
      <Popper placement="top">
        {({ ref, style, placement, arrowProps }) => (
          <div
            ref={ref} style={{ ...style, bottom: -35, top: 'unset', left: -62, zIndex: 9999999 }}
            data-placement={placement}
          >
            <Settings
              onLanguageChange={onLanguageChange}
              hasSettings={hasSettings}
              videoId={videoId}
              filtervideos={filtervideos}
              setPlaybackRate={setPlaybackRate}
              changeFilter={changeFilter}
              onShowSettings={onShowSettings}
              is360Available={is360Available}
              currentFilter={currentFilter}
            />
            <div ref={arrowProps.ref} style={arrowProps.style}/>
          </div>
        )}
      </Popper>
      {/*document.querySelector('body'),*/}
      {/*)*/}
      {/*}*/}
    </Manager>
  );
};

export default SettingsButton;
