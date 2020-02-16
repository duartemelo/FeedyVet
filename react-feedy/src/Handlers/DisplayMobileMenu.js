import React from 'react';
import MobileMenuContainer from '../Views/MobileMenuContainer';

const DisplayMobileMenu = props => {
    if (props.getState === true) {
        return (
          <MobileMenuContainer
            handlerDown={props.getHandlerDown}
            stateClasses={props.getStateClasses}
            loginHandler={props.getLoginHandler}
            registerHandler={props.getRegisterHandler}
          ></MobileMenuContainer>
        );
      }
      else{
          return null;
      }
}

export default DisplayMobileMenu;