import React from 'react';
import './styles.css';

class SocialShare extends React.Component {
    state = {
        show: false,
    };

    handleMouseEnter = () => {
        this.setState({ show: true });
    };

    handleMouseLeave = () => {
        this.setState({ show: false });
    };

    render() {
        const { socialShare } = this.props;
        return (
            <div
                className={`social-share popup-menu ${socialShare || this.state.show ? 'show' : 'fade'}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <h3 className="popup-menu__title">Share</h3>
                <ul>
                    <li className="popup-menu__item">
                        <a
                            className="popup-menu__link"
                            href="http://www.facebook.com/sharer.php?u=http://www.pisteview.com/ski-areas/austria/pitztal-glacier/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook-f"></i>
                            Facebook
                        </a>
                    </li>
                    <li className="popup-menu__item">
                        <a
                            className="popup-menu__link"
                            href="https://twitter.com/share?url=http://www.pisteview.com/ski-areas/austria/pitztal-glacier/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-twitter"></i>
                            Twitter
                        </a>
                    </li>
                    {/*<li className="popup-menu__item">*/}
                        {/*<a*/}
                            {/*className="popup-menu__link"*/}
                            {/*href="https://plus.google.com/share?url=http://www.pisteview.com/ski-areas/austria/pitztal-glacier/"*/}
                            {/*target="_blank"*/}
                            {/*rel="noopener noreferrer"*/}
                        {/*>*/}
                            {/*<i className="fab fa-google-plus-g"></i>*/}
                            {/*Google +*/}
                        {/*</a>*/}
                    {/*</li>*/}
                </ul>
            </div>
        );
    }
}

export default SocialShare;
