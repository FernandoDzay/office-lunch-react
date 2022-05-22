import React from "react";
import './tabs.scss';
import TabText from './TabText';
import TabContent from './TabContent';
import Loader from '../Loader/Loader';

class Tabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: this.getTabsState(0)
        };
    }

    validateProps = () => {
        const {tabsText, tabsContent} = this.props;
        return tabsText.length === tabsContent.length;
    }

    hasEventClick = () => this.props.tabsText.length === 1;

    getTabsState = (value) => {
        const {tabsText} = this.props;
        if(tabsText === undefined || tabsText.length === 0) return;
        return tabsText.map((tabText, i) => i === value);
    }
    
    handleClick = (i) => {
        const tabs = this.getTabsState(i);
        this.setState({tabs});
    }

    handleUnmountContent = () => {
        if(this.props.tabsContent.length !== 0) {
            this.setState({tabs: this.getTabsState(0)});
        }
    }


    render () {
        const {tabs} = this.state;
        const {tabsText, tabsContent} = this.props;
        const {loading} = this.props;
        if(!this.validateProps()) return <p>Revisa el número de "tabsText", y "tabsContent"</p>

        return (
            <div className="tabs">{
                loading ? 
                <>
                    <div className="top">
                        <TabText text="Cargando..." /> 
                    </div>
                    <div className="content loading">
                        <Loader size="2" color="blue" />
                    </div>
                </>
                :
                <>
                    <div className="top">
                        { tabsText.map((tabText, i) => <TabText key={i} hasEventClick={this.hasEventClick()} id={i} active={tabs[i]} text={tabText} handleClick={this.handleClick} />) }
                    </div>
                    <div className="content">
                        { tabsContent.map((tabContent, i) => <TabContent key={i} active={tabs[i]} component={tabContent} handleUnmountContent={this.handleUnmountContent} />) }
                    </div>
                </>
            }</div>
        );
    }

}


export default Tabs;