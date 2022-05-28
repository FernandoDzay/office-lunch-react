import Tabs from "../../globals/Tabs/Tabs";
import GroupTable from './GroupTable';
import { getUsersGroups } from "../../../store/slices/groupsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";


const GroupsTabs = ({is_admin}) => {
    const dispatch = useDispatch();
    const { usersGroups, loadingUsersGroups } = useSelector(state => state.groups);
    const [tabs, setTabs] = useState({tabsText: [], tabsContent: []});
    const [displayTabs, setDisplayTabs] = useState(false);

    const loading = usersGroups.length === 0 ? loadingUsersGroups : false;


    useEffect(() => {
        dispatch( getUsersGroups() );
    }, [dispatch])

    useEffect(() => {
        const tabsText = usersGroups.map(userGroup => `Grupo ${userGroup.group_id}`);
        const tabsContent = usersGroups.map(userGroup => (
            <GroupTable key={userGroup.group_id} userGroup={userGroup} is_admin={is_admin} />
        ));

        setTabs({tabsText, tabsContent});
        setDisplayTabs(true);
    }, [usersGroups, is_admin])


    if(!displayTabs || tabs.tabsText.length === 0 || tabs.tabsContent === 0) {
        return (
            <Tabs
                tabsText={['No hay grupos']}
                tabsContent={[<div></div>]}
                loading={loading}
            />
        );
    }
    return (
        <Tabs
            tabsText={tabs.tabsText}
            tabsContent={tabs.tabsContent}
        />
    );

}

export default GroupsTabs;