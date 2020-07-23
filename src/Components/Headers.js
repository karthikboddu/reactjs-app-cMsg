import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
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
