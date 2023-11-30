import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

export const UserStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: "0px 140px 72px 140px",
    flexDirection: "column",
    gap: "24px",
    flex: "1 0 0",
    alignSelf: "stretch",
    background: "#F8F9FA",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 12px 0px 42px",
      gap: "12px",
    },
  },
  cardsContainer: {
    width: "100%",
    background: "#FDFDFD",
  },
  UsersLists: {
    width: "100%",
    alignItems: "center",
    flex: "1 0 0",
    background: "#FDFDFD",
  },
  tabsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#FDFDFD",
    borderRadius: "12px",
    boxShadow: "0px 0px 4px 0px rgba(108, 117, 125, 0.25)",
    padding: "16px",
    gap: "16px",
  },

  BoxSearchContainer: {
    width: "100%",
    height: "100%",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0px 0px 4px 0px #6C757D40",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FDFDFD",
  },

  SearchTextField: {
    width: "100%",
    borderRadius: "12px 12px 12px 12px !important",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "12px 12px 12px 12px !important",
       border: "0.5px solid #6C757D60 !important",
    },
  },

  bottonSearch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px !important",
    gap: "10px",
    minWidth: "56px !important",
    height: "48px",
    borderRadius: "12px 0 0 12px !important",
  },

  noInfoPage: {
    minHeight: "240px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  paginationBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  ListFooter: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default UserStyle;