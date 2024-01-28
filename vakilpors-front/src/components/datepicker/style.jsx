import { createStyles, makeStyles } from "@mui/styles";

export const DatePickerContainerStyle = makeStyles(() =>
  createStyles({
    dateTimePicker: {
      width: "100%",
    },
    dateTimePickerContainer: {
      position: "relative",
    },
    popper: {},
  })
);