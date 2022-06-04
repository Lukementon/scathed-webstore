import { makeStyles } from '@material-ui/core';

export const useSelectStyles = makeStyles({
  input: {
    color: 'white',
  },
  divider: {
    color: 'white',
  },
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
  root: {
    color: 'white',
  },
});
