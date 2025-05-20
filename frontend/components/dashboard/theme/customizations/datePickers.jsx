import { alpha } from '@mui/material/styles';

import {
  pickersYearClasses,
  pickersMonthClasses,
  pickersDayClasses,
} from '@mui/x-date-pickers';
import { menuItemClasses } from '@mui/material/MenuItem';

const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};


/* eslint-disable import/prefer-default-export */
export const datePickersCustomizations = {
  MuiPickersPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 16 },
      button: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      switchViewButton: {
        padding: 0,
        border: 'none',
      },
    },
  },
  MuiPickersMonth: {
    styleOverrides: {
      monthButton: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${pickersMonthClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${pickersMonthClasses.selected}`]: { backgroundColor: gray[700] },
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          [`&.${pickersMonthClasses.selected}`]: {
            color: (theme.vars || theme).palette.common.black,
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${pickersMonthClasses.selected}`]: { backgroundColor: gray[300] },
          },
        }),
      }),
    },
  },
  MuiPickersYear: {
    styleOverrides: {
      yearButton: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        height: 'fit-content',
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${pickersYearClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${pickersYearClasses.selected}`]: { backgroundColor: gray[700] },
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          [`&.${pickersYearClasses.selected}`]: {
            color: (theme.vars || theme).palette.common.black,
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${pickersYearClasses.selected}`]: { backgroundColor: gray[300] },
          },
        }),
      }),
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${pickersDayClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[700] },
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          [`&.${pickersDayClasses.selected}`]: {
            color: (theme.vars || theme).palette.common.black,
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[300] },
          },
        }),
      }),
    },
  },
};
