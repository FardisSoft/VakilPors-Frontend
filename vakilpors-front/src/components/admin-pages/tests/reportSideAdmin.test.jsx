import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportSideAdmin from '../reportSideAdmin';
import { useAuth } from "../../../context/AuthProvider";
import { ThemeProvider, createTheme } from '@mui/material/styles';

jest.mock("../../../context/AuthProvider"); // Mock the useAuth hook

describe('ReportSideAdmin', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ // Provide the values your component expects
            refUserRole: {},
            getAccessToken: jest.fn(),
        });
    });

    const renderWithTheme = (ui) => {
        const theme = createTheme(); // Create a MUI theme
        return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
    };

    it('should render the component', () => {
        renderWithTheme(<ReportSideAdmin />);

        expect(screen.getByText('بررسی تخلفات وکلا')).toBeInTheDocument();
        expect(screen.getByText('لیست تخلفات ثبت شده')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument(); // Assuming there are no reports initially
    });

    it('should display a list of reports', () => {
        const reportsData = [
            {
                offenderName: 'Reportee 1',
                reporterName: 'Reporter 1',
                description: 'Report 1 description',
            },
            {
                offenderName: 'Reportee 2',
                reporterName: 'Reporter 2',
                description: 'Report 2 description',
            },
        ];

        renderWithTheme(<ReportSideAdmin reports={reportsData} />);

        // Verify each report item
        reportsData.forEach((report, index) => {
            const reportItem = screen.getByText(report.offenderName);
            expect(reportItem).toBeInTheDocument();

            const offenderName = screen.getByText(report.offenderName);
            expect(offenderName).toBeInTheDocument();

            const reporterName = screen.getByText(report.reporterName);
            expect(reporterName).toBeInTheDocument();

            const reportDescription = screen.getByText(report.description);
            expect(reportDescription).toBeInTheDocument();
        });
    });

    it('should render buttons for approving and rejecting reports', () => {
        const reportItem = screen.getByText('Reportee 1');
        const approveButton = screen.getByRole('button', { name: 'تایید گزارش' });
        const rejectButton = screen.getByRole('button', { name: 'رد گزارش' });
        expect(approveButton).toBeInTheDocument();
        expect(rejectButton).toBeInTheDocument();
    });
});
