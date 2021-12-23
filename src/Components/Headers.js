import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import MenuItem from './MenuItem'
const NavBar = () => {
    return (
        <div>
            <AppBar style={{ background: '#FFFFFF' }} position="static">

                <MenuItem />

            </AppBar>
        </div>
    )
}
export default NavBar;
