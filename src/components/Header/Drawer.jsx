import React, { useState } from 'react';
import { Drawer as MUIDrawer, Button, List, ListItem, ListItemText } from '@mui/material';

const MyDrawer = ({open , setOpen}) => {

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button>
                    <ListItemText primary="Item 1" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Item 2" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Item 3" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <MUIDrawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </MUIDrawer>
        </div>
    );
};

export default MyDrawer;  