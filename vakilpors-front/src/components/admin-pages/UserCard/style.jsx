import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

export const UserCardStyles = makeStyles((theme) => ({
  cardContainer: {
    display: "flex",
    gap: "12px",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingRight: "16px",
    paddingLeft: "16px",
    boxShadow: "0px 2px 4px -1px #0000000F",
    border: "1px solid #E8E8E8",
    borderRadius: "16px",
    position: "relative",
  },

  imageProfile: {
    borderRadius: "50%",
    width: 75,
    height: 75,
  },

  textBoxProfile: {
    display: "flex",
    flexDirection: "column",
  },

  profileStyle: {
    fontWeight: "400",
    lineHeight: "24px",
    fontSize: "16px",
    color: "#6C757D",
  },

  blueCircle: {
    padding: "4px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    bottom: "0",
    left: "0",
    position: "absolute",
    margin: "16px",
    [theme.breakpoints.down("md")]: {
      width: "16px",
      height: "16px",
      marginLeft: "8px",
    },
  },
}));

const useUserCardStyles = () => {
  const theme = useTheme();
  return UserCardStyles(theme);
};

export default useUserCardStyles;