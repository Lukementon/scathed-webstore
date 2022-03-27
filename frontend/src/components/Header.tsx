import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import emblem from '../img/emblem.png';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { shoppingCartState, ShoppingCartItem } from '../state/products/cart';

const USER_ACCOUNT_MENU_ID = 'primary-search-account-menu';
const MOBILE_MENU_ID = 'primary-search-account-menu-mobile';
const SHOPPING_CART_MENU_ID = 'primary-search-shopping-cart-menu';

const Header = () => {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [shoppingCartAnchorEl, setShoppingCartAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const isShoppingCartMenuOpen = Boolean(shoppingCartAnchorEl);
  const handleShoppingCartMenuClose = () => setShoppingCartAnchorEl(null);
  const handleShoppingCartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!shoppingCart.length) return;
    setShoppingCartAnchorEl(event.currentTarget);
  };

  const removeProductFromShoppingCart = (product: ShoppingCartItem) => {
    //
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={MOBILE_MENU_ID}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show total cart items' color='inherit'>
          <Badge badgeContent={shoppingCart.length} color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  const renderShoppingCartMenu = (
    <Menu
      anchorEl={shoppingCartAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={SHOPPING_CART_MENU_ID}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isShoppingCartMenuOpen}
      onClose={handleShoppingCartMenuClose}
    >
      {shoppingCart.map((cartItem: ShoppingCartItem) => (
        <MenuItem>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p>{cartItem.product.name}</p>
            <IconButton
              onClick={() => removeProductFromShoppingCart(cartItem)}
              aria-label='remove this product'
              aria-controls='primary-search-shopping-cart-menu'
              aria-haspopup='true'
              color='inherit'
            >
              <ClearIcon />
            </IconButton>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <>
      <StyledAppBar position='sticky'>
        <StyledToolbar>
          <HeaderLeft>
            <IconButton edge='start' color='inherit' aria-label='open drawer'>
              <MenuIcon />
            </IconButton>
            <StyledTypography variant='h6' noWrap>
              Scathed Webstore
            </StyledTypography>

            <LogoImage src={emblem} alt='' />
          </HeaderLeft>

          <HeaderCenter>
            <StyledSearchContainer>
              <StyledSearchIcon />
              <StyledInputBase
                placeholder='Search products…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </StyledSearchContainer>
          </HeaderCenter>

          <HeaderRight>
            <StyledOptionsContainer>
              <IconButton
                aria-label='show 4 new cart items'
                color='inherit'
                onClick={handleShoppingCartMenuOpen}
              >
                <Badge badgeContent={shoppingCart.length} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={USER_ACCOUNT_MENU_ID}
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </StyledOptionsContainer>

            <StyledMoreButtonContainer>
              <IconButton
                aria-label='show more'
                aria-controls={MOBILE_MENU_ID}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </StyledMoreButtonContainer>
          </HeaderRight>
        </StyledToolbar>
      </StyledAppBar>
      {renderShoppingCartMenu}
      {renderMobileMenu}
    </>
  );
};

export default Header;

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #1d1d1d;
  }
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  && {
    display: inline-block;

    @media (max-width: 850px) {
      display: none;
    }
  }
`;

const LogoImage = styled.img`
  height: 2.25rem;
  overflow: hidden;
  object-fit: contain;
  display: none;

  @media (max-width: 850px) {
    display: inline-block;
  }
`;

const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  width: 40%;

  @media (max-width: 1230px) {
    width: 50%;
  }

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const StyledSearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);

  padding: 0 1rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const StyledInputBase = styled(InputBase)`
  && {
    border-radius: 0.2rem;
    color: white;
    padding: 0 2rem;
    width: 100%;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyledOptionsContainer = styled.div`
  display: inline-block;
  @media (max-width: 850px) {
    display: none;
  }
`;

const StyledMoreButtonContainer = styled.div`
  display: none;
  @media (max-width: 850px) {
    display: inline-block;
  }
`;
