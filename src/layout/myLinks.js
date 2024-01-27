import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.HOME, children: "Home" },
];
const loggedInLinks = [{ to: ROUTES.FAVCARDS, children: "FAV CARDS" }];
const bizLinks = [{ to: ROUTES.MYCARDS, children: "MY CARDS" }];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "SIGNUP" },
  { to: ROUTES.LOGIN, children: "LOGIN" },
  ,
];
const adminLinks = [{ to: ROUTES.CRM, children: "CRM" }];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks, adminLinks };
