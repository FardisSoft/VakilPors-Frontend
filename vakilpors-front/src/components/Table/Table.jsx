

import "primeicons/primeicons.css";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import MuiButton from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import "./Table.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import { Box } from "@mui/system";
import Tooltip from "@mui/material/Tooltip"
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { IoMdRefresh } from "react-icons/io";
import { convertDateToJalali, primeFaceDataTablePaginatorTemplate } from "./utils";

// "authorization": "admin_naebzadeh",
// "endpoint": "/api/log/log_table/?limit=10&offset=1",
// "page_name": "داشبورد لاگ کاربران",
// "created_at": "2023-07-29 09:29:25",
// "timestamp": "1690610365082"
const Field = ["authorization", "page_name", "created_at"];
const Header = [
    "نام کاربری",
    "نام صفحه",
    "تاریخ ثبت لاگ"
];
export default function Table(props) {
    const [showAlertDetails, setShowAlertDetails] = useState(false);
    const [eventDetails, setEventDetails] = useState({});
    const toast = useRef(null);
    const [events, setEvents] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState(columns);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);

    const dt = useRef(null);
    useEffect(() => {
        let current = new Date();
        current = convertDateToJalali(current, "full", "medium");
        setCurrentDate(current);
        setEvents(props.records);
    }, [props.records]);

    useEffect(() => {
        let cols = [];
        for (let i = 0; i < Field.length; i++) {
        cols.push({ field: Field[i], header: Header[i] });
        }
        setColumns(cols);
        setSelectedColumns(cols);
        let current = new Date();
        current = convertDateToJalali(current, "full", "medium");
        setCurrentDate(current);
    }, []);
    // Show Details for a record
    const handleShowDetails = (rowData) => {
        setEventDetails(rowData);
        setShowAlertDetails(true);
    };
    // Special Body Structure
    const createBodyStructure = (rowData) => {
        return (
        <React.Fragment>
            <MuiButton
            variant="text"
            size="small"
            onClick={() => handleShowDetails(rowData)}
            >
            مشاهده‌ی جزئیات
            </MuiButton>
        </React.Fragment>
        );
    };
    // On Selected Cols Change
    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) =>
        selectedColumns.some((sCol) => sCol.field === col.field)
        );
        setSelectedColumns(orderedSelectedColumns);
    };
    // Export Table Data
    const exportCSV = () => {
        dt.current.exportCSV();
    };
    // Load Selected Cols
    const loadColumns = selectedColumns.map((col) => {
        return (
        <Column
            sortable
            style={{ minWidth: "8rem" }}
            bodyStyle={{ textAlign: "right" }}
            key={col.field}
            field={col.field}
            header={col.header}
        />
        );
    });


    const panelHeaderTemplate = (values, options) => {
        const noDataFound = {
        textAlign: "center",
        paddingTop: "0.5rem",
        fontSize: "1.2rem",
        };
        let content = "";
        if (values.length > 0)
        content = (
            <div className="p-multiselect-header">
            <div>
                <span title="Select All">{options.checkboxElement}</span>
                <b> همه</b>
            </div>
            </div>
        );
        else content = <div style={noDataFound}>داده‌ای موجود نیست</div>;
        return content;
    };

    const header = (
        <div>
        <div className="table-header">
            <div className="table-header1">
            <Tooltip title="بروزرسانی">
                <div className="table-header1-btn">
                <IoMdRefresh
                    color="#1976d2"
                    className="table-header1-icon"
                    size="1.5rem"
                    onClick={props.onRefreshClick}
                />
                </div>
            </Tooltip>
            {/* <span className="table-header1-lastest-update-date">
                تاریخچه تا تاریخ: {currentDate}
            </span> */}
            </div>
            <div className="flex align-items-center export-buttons table-header2-left">
            <MultiSelect
                value={selectedColumns}
                options={columns}
                optionLabel="header"
                placeholder="نمایش ستون‌ها"
                fixedPlaceholder="نمایش ستون‌ها"
                onChange={onColumnToggle}
                style={{ width: "20em", textAlign: "right" }}
                panelHeaderTemplate={(options) => {
                return panelHeaderTemplate(columns, options);
                }}
            />
            <Tooltip title="خروجی اکسل">
                <Button
                type="button"
                icon="pi pi-file"
                onClick={() => exportCSV(false)}
                className="mr-2"
                data-pr-tooltip="CSV"
                />
            </Tooltip>
            </div>
        </div>
        </div>
    );

    return (
        <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
            <DataTable
            globalFilter={globalFilter}
            loading={props.loading}
            resizableColumns
            columnResizeMode="fit"
            emptyMessage="هیچ داده‌ای موجود نیست"
            ref={dt}
            header={header}
            first={props.lazyParams.first}
            onPage={props.onPage}
            onSort={props.onSort}
            stripedRows
            editMode="row"
            value={events?.logs}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            lazy
            totalRecords={events?.total_logs_count}
            paginatorTemplate={primeFaceDataTablePaginatorTemplate}
            currentPageReportTemplate={`نمایش {first} تا {last} از ${
                events?.total_logs_count ? events?.total_logs_count : 0
            } لاگ ها`}
            responsiveLayout="scroll"
            >
            <Column
                header="ردیف"
                body={(data, props) => <div>{props.rowIndex + 1}</div>}
                style={{ minWidth: "1rem" }}
            />
            {loadColumns}
            </DataTable>
        </div>
        </div>
    );
}