import React from "react";
import './tabs.scss';
import TabText from './TabText';
import TabContent from './TabContent';

class Tabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: this.getTabsState(0)
        };
    }

    validateProps = () => {
        const {tabsText, tabsContent} = this.props.data;
        return tabsText.length === tabsContent.length;
    }

    hasEventClick = () => this.props.data.tabsText.length === 1;

    getTabsState = (value) => {
        const {tabsText} = this.props.data;
        return tabsText.map((tabText, i) => i === value);
    }
    
    handleClick = (i) => {
        const tabs = this.getTabsState(i);
        this.setState({tabs});
    }


    render () {
        const {tabs} = this.state;
        const {tabsText, tabsContent} = this.props.data;
        if(!this.validateProps()) return <p>Revisa el número de "tabsText", y "tabsContent"</p>

        return (
            <div className="tabs">
                <div className="top">
                    { tabsText.map((tabText, i) => <TabText key={i} hasEventClick={this.hasEventClick()} id={i} active={tabs[i]} text={tabText} handleClick={this.handleClick} />) }
                </div>
                <div className="content">
                    { tabsContent.map((tabContent, i) => <TabContent key={i} active={tabs[i]} component={tabContent} />) }
                </div>
            </div>
        );
    }

}


export default Tabs;