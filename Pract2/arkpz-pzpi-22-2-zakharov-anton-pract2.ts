// Interfaces and Types
interface OrderItem {
    price: number;
    quantity: number;
}

interface OrderDetails {
    items: OrderItem[];
    quantity: number;
    itemPrice: number;
}

interface Report {
    id: string;
    data: any;
    format: string;
    createdAt: Date;
}

// 1. Extract Method Example
// До рефакторингу
function generateInvoiceOld(orderData: OrderDetails): void {
    console.log("Створення рахунку");
    
    let invoiceSubtotal = 0;
    for (const item of orderData.items) {
        invoiceSubtotal += item.price * item.quantity;
    }
    
    const invoiceTax = invoiceSubtotal * 0.2;
    const invoiceTotal = invoiceSubtotal + invoiceTax;
    
    console.log(`Сума без податків: ${invoiceSubtotal}`);
    console.log(`Податок: ${invoiceTax}`);
    console.log(`Загальна сума: ${invoiceTotal}`);
    
    const invoiceDate = new Date();
    const invoiceDueDate = new Date();
    invoiceDueDate.setDate(invoiceDate.getDate() + 30);
    
    console.log(`Дата створення: ${invoiceDate.toLocaleDateString()}`);
    console.log(`Термін оплати: ${invoiceDueDate.toLocaleDateString()}`);
}

// Після рефакторингу
interface InvoiceCalculation {
    subtotal: number;
    tax: number;
    total: number;
}

function generateInvoiceNew(orderData: OrderDetails): void {
    console.log("Створення рахунку");
    
    const calculations = calculateInvoiceTotals(orderData);
    printInvoiceFinancials(calculations);
    printInvoiceDates();
}

function calculateInvoiceTotals(orderData: OrderDetails): InvoiceCalculation {
    let subtotal = 0;
    for (const item of orderData.items) {
        subtotal += item.price * item.quantity;
    }
    const tax = subtotal * 0.2;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function printInvoiceFinancials(calc: InvoiceCalculation): void {
    console.log(`Сума без податків: ${calc.subtotal}`);
    console.log(`Податок: ${calc.tax}`);
    console.log(`Загальна сума: ${calc.total}`);
}

function printInvoiceDates(): void {
    const currentDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(currentDate.getDate() + 30);
    
    console.log(`Дата створення: ${currentDate.toLocaleDateString()}`);
    console.log(`Термін оплати: ${dueDate.toLocaleDateString()}`);
}

// 2. Replace Temp with Query Example
// До рефакторингу
class OrderProcessorOld {
    private orderDetails: OrderDetails;

    constructor(orderDetails: OrderDetails) {
        this.orderDetails = orderDetails;
    }

    calculateOrderTotal(): number {
        const baseOrderPrice = this.orderDetails.quantity * this.orderDetails.itemPrice;
        const orderDiscount = baseOrderPrice > 1000 ? baseOrderPrice * 0.1 : 0;
        const orderShipping = baseOrderPrice > 500 ? 0 : 50;
        const orderTax = (baseOrderPrice - orderDiscount) * 0.2;
        
        return baseOrderPrice - orderDiscount + orderShipping + orderTax;
    }
}

// Після рефакторингу
class OrderProcessorNew {
    private orderDetails: OrderDetails;

    constructor(orderDetails: OrderDetails) {
        this.orderDetails = orderDetails;
    }

    calculateOrderTotal(): number {
        return this.calculateBasePrice() - 
               this.calculateDiscount() + 
               this.calculateShipping() + 
               this.calculateTax();
    }

    private calculateBasePrice(): number {
        return this.orderDetails.quantity * this.orderDetails.itemPrice;
    }

    private calculateDiscount(): number {
        return this.calculateBasePrice() > 1000 ? this.calculateBasePrice() * 0.1 : 0;
    }

    private calculateShipping(): number {
        return this.calculateBasePrice() > 500 ? 0 : 50;
    }

    private calculateTax(): number {
        return (this.calculateBasePrice() - this.calculateDiscount()) * 0.2;
    }
}

// 3. Introduce Parameter Object Example
// До рефакторингу
class ReportGeneratorOld {
    generateReportOld(
        reportStartDate: Date,
        reportEndDate: Date,
        reportDepartment: string,
        includeSubdepts: boolean,
        reportFormat: string,
        shouldSendEmail: boolean,
        recipients: string[]
    ): Report {
        if (reportStartDate > reportEndDate) {
            throw new Error("Некоректний період звіту");
        }

        const reportData = this.collectReportData(
            reportStartDate, 
            reportEndDate, 
            reportDepartment, 
            includeSubdepts
        );

        const formattedReport = this.formatReportData(reportData, reportFormat);

        if (shouldSendEmail) {
            this.sendReport(formattedReport, recipients);
        }

        return formattedReport;
    }

    private collectReportData(startDate: Date, endDate: Date, dept: string, includeSub: boolean): any {
        // Логіка збору даних
        return {};
    }

    private formatReportData(data: any, format: string): Report {
        // Логіка форматування
        return {
            id: Math.random().toString(),
            data: data,
            format: format,
            createdAt: new Date()
        };
    }

    private sendReport(report: Report, recipients: string[]): void {
        // Логіка відправки
    }
}

// Після рефакторингу
interface ReportPeriod {
    startDate: Date;
    endDate: Date;
}

interface DepartmentFilter {
    department: string;
    includeSubdepartments: boolean;
}

interface ReportDelivery {
    sendEmail: boolean;
    emailRecipients: string[];
}

class ReportConfiguration {
    constructor(
        public period: ReportPeriod,
        public filter: DepartmentFilter,
        public format: string,
        public delivery: ReportDelivery
    ) {}

    validatePeriod(): void {
        if (this.period.startDate > this.period.endDate) {
            throw new Error("Некоректний період звіту");
        }
    }
}

class ReportGeneratorNew {
    generateReport(config: ReportConfiguration): Report {
        config.validatePeriod();

        const reportData = this.collectReportData(
            config.period,
            config.filter
        );

        const formattedReport = this.formatReportData(reportData, config.format);

        if (config.delivery.sendEmail) {
            this.sendReport(formattedReport, config.delivery.emailRecipients);
        }

        return formattedReport;
    }

    private collectReportData(period: ReportPeriod, filter: DepartmentFilter): any {
        // Логіка збору даних
        return {};
    }

    private formatReportData(data: any, format: string): Report {
        return {
            id: Math.random().toString(),
            data: data,
            format: format,
            createdAt: new Date()
        };
    }

    private sendReport(report: Report, recipients: string[]): void {
        // Логіка відправки email
    }
}

// Приклад використання:
const reportConfig = new ReportConfiguration(
    { startDate: new Date(), endDate: new Date() },
    { department: "Sales", includeSubdepartments: true },
    "PDF",
    { sendEmail: true, emailRecipients: ["user@example.com"] }
);

const reportGenerator = new ReportGeneratorNew();
const generatedReport = reportGenerator.generateReport(reportConfig);