import { Box, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, SvgIconProps, Toolbar } from '@mui/material'
import React from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
  } from 'react-router-dom';
import { ListInventoryItem } from '../types';
interface MyDrawerProps {
    items: ListInventoryItem[]
}
interface ListItemLinkProps {
    primary?: string;
    to: string;
    icon: React.ComponentType<SvgIconProps>;
  }

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
    function Link(itemProps, ref) {
      return <RouterLink ref={ref} {...itemProps} role={undefined} />;
    },
  );
  function ListItemLink(props: ListItemLinkProps) {
    const { primary = "p", to, icon: Icon } = props;
  
    return (
      <ListItemButton component={Link} to={to}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
    );
  }

export const MyDrawer = ({items}:MyDrawerProps) => {
  return (
    <div>
      {/* <Toolbar /> */}
      <Box
        sx={{
          display: 'flex',  // Usa flexbox para alinear elementos en línea
          alignItems: 'center', // Centra verticalmente los elementos
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src="../src/assets/logo.png"
          alt="Insumos médicos"
          style={{
            width: '60px',
            height: 'auto',
            objectFit: 'contain',
            marginRight: '10px', // Agrega espacio entre el logo y el texto
          }}
        />
        <h1 style={{ margin: 0 }}>PRODUCTOS</h1> {/* Elimina el margen por defecto de h1 */}
      </Box>

      <Divider />
      <List>
        {items.map((item) => {
          if (item.to && item.icon) { 
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemLink to={item.to} primary={item.text} icon={item.icon} />
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </div>
  );
}
