import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IconButton, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";

import { useState } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { faIR } from "date-fns/locale";
import { DatePickerContainerStyle } from "./style";

const initialState = {
  openDatePicker: false,
};

export default function AdapterJalali({
  onDateChange,
  type,
  placeholder,
  label,
  helperText,
  isEmpty,
  minDate,
  maxDate,
  views,
  value,
}) {
  const [{ openDatePicker }, setState] = useState(initialState);
  const classes = DatePickerContainerStyle();

  const handleClearClick = () => {
    onDateChange(null);
  };

  const handleDateChange = (date) => {
    onDateChange(date);
  };

  const handleTextFieldClick = () => {
    setState((prevState) => ({
      ...prevState,
      openDatePicker: true,
    }));
  };

  const handleDatePickerClose = () => {
    setState((prevState) => ({
      ...prevState,
      openDatePicker: false,
    }));
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFnsJalali}
      locale={faIR}
      overwriteAlertText={(text) => text}
    >
      {type === "date" ? (
        <DatePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(props) => (
            <TextField
              {...props}
              placeholder={placeholder}
              label={label}
              helperText={!isEmpty ? helperText : "این فیلد نمی‌تواند خالی باشد."}
              error={isEmpty}
              onClick={handleTextFieldClick}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          minDate={minDate}
          maxDate={maxDate}
          open={openDatePicker}
          onOpen={() => handleTextFieldClick()}
          onClose={handleDatePickerClose}
        />
      ) : type === "time" ? (
        <>
          <TimePicker
            value={value}
            onChange={handleDateChange}
            renderInput={(props) => (
              <TextField
                {...props}
                placeholder={placeholder}
                label={label}
                helperText={!isEmpty ? helperText : "این فیلد نمی‌تواند خالی باشد."}
                error={isEmpty}
                onClick={handleTextFieldClick}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
            views={views}
            open={openDatePicker}
            onOpen={() => handleTextFieldClick()}
            onClose={handleDatePickerClose}
          />
          {value && (
            <IconButton
              size="small"
              onClick={handleClearClick}
              sx={{ position: "absolute", right: "40px", top: "8px" }}
            >
              <Clear />
            </IconButton>
          )}
        </>
      ) : type === "futuredatetime" ? (
        <DateTimePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(props) => (
            <TextField
              {...props}
              placeholder={placeholder}
              label={label}
              helperText={!isEmpty ? helperText : "این فیلد نمی‌تواند خالی باشد."}
              error={isEmpty}
              onClick={handleTextFieldClick}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          minDateTime={new Date()}
          maxDateTime={maxDate}
          open={openDatePicker}
          onOpen={() => handleTextFieldClick()}
          onClose={handleDatePickerClose}
          ampm={false}
        />
      ) : null}
    </LocalizationProvider>
  );
}