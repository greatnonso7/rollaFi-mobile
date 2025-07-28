import {fontSz} from 'utils';
import {font} from './font';

export const typography = {
  tiny: {
    fontFamily: font.GeneralSansRegular,
    fontSize: fontSz(10),
  },
  tinyBold: {
    fontFamily: font.GeneralSansBold,
    fontSize: fontSz(10),
  },
  bodySmall: {
    fontFamily: font.GeneralSansRegular,
    fontSize: fontSz(12),
  },
  small: {
    fontFamily: font.GeneralSansRegular,
    fontSize: fontSz(10),
  },
  smallBold: {
    fontFamily: font.GeneralSansBold,
    fontSize: fontSz(12),
  },
  body: {
    fontFamily: font.GeneralSansRegular,
    fontSize: fontSz(14),
  },
  bodyMedium: {
    fontFamily: font.GeneralSansMedium,
    fontSize: fontSz(14),
  },
  bodySemiBold: {
    fontFamily: font.GeneralSansSemibold,
    fontSize: fontSz(14),
  },
  bodyBold: {
    fontFamily: font.GeneralSansBold,
    fontSize: fontSz(14),
  },
  headerBold: {
    fontFamily: font.GeneralSansBold,
    fontSize: fontSz(16),
  },
  header: {
    fontFamily: font.GeneralSansRegular,
    fontSize: fontSz(16),
  },
  headerMedium: {
    fontFamily: font.GeneralSansMedium,
    fontSize: fontSz(16),
  },
  headerBig: {
    fontFamily: font.GeneralSansSemibold,
    fontSize: fontSz(18),
  },
  heading: {
    fontFamily: font.GeneralSansBold,
    fontSize: fontSz(20),
  },
  h1: {
    fontFamily: font.GeneralSansBold,
    fontSize: fontSz(32),
  },
  h2: {
    fontFamily: font.GeneralSansSemibold,
    fontSize: fontSz(28),
  },
  h3: {
    fontFamily: font.GeneralSansSemibold,
    fontSize: fontSz(22),
  },
  h4: {
    fontFamily: font.GeneralSansSemibold,
    fontSize: fontSz(17),
  },
  bottomTabRegular: {
    fontFamily: font.GeneralSansRegular,
    fontSize: fontSz(11),
  },
  bottomTabMedium: {
    fontFamily: font.GeneralSansMedium,
    fontSize: fontSz(11),
  },
  h4UpperCase: {
    fontFamily: font.GeneralSansMedium,
    fontSize: fontSz(17),
    textTransform: 'uppercase',
  },
};
