import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavLink from './NavLink';
import { styles, pallette } from '../styles';

const NavTab = ({ to, iconName, ...props }) => (
    <NavLink
        to={to}
        component={TouchableOpacity}
        style={styles.navItem}
        activeStyle={styles.navItemActive}
        activeOpacity={0.5}
        ignore-this={1/*isActive={(match, location) => {
            if (to === '/home') {
                console.log(match);
                console.log(location);
                console.log(to);
            }
        }}*/}
        render={active => (
            <Icon
                name={iconName}
                size={20}
                color={active ? pallette.crimson : pallette.black}
            />
        )}
        {...props}
    />
);

export default NavTab;
