import * as Amenities from '@/data/mock-amenities';
import * as Analytics from '@/data/mock-analytics';
import * as Announcements from '@/data/mock-announcements';
import * as ArchitecturalRequests from '@/data/mock-architectural-requests';
import * as Assets from '@/data/mock-assets';
import * as AuditLogs from '@/data/mock-audit-logs';
import * as Automations from '@/data/mock-automations';
import * as Bills from '@/data/mock-bills';
import * as Buildings from '@/data/mock-buildings';
import * as CalendarEvents from '@/data/mock-calendar-events';
import * as Documents from '@/data/mock-documents';
import * as FinancialReportDetails from '@/data/mock-financial-reports-details';
import * as FinancialReports from '@/data/mock-financial-reports';
import * as InboxDocuments from '@/data/mock-inbox-documents';
import * as Insurance from '@/data/mock-insurance';
import * as Integrations from '@/data/mock-integrations';
import * as Issues from '@/data/mock-issues';
import * as Leases from '@/data/mock-leases';
import * as Meetings from '@/data/mock-meetings';
import * as Payments from '@/data/mock-payments';
import * as Portfolio from '@/data/mock-portfolio';
import * as PurchaseOrders from '@/data/mock-purchase-orders';
import * as Roles from '@/data/mock-roles';
import * as Rules from '@/data/mock-rules';
import * as Tasks from '@/data/mock-tasks';
import * as UnitStatements from '@/data/mock-unit-statements';
import * as Units from '@/data/mock-units';
import * as Users from '@/data/mock-users';
import * as Violations from '@/data/mock-violations';
import * as VisitorLogs from '@/data/mock-visitor-logs';
import * as Votes from '@/data/mock-votes';
import * as WorkOrders from '@/data/mock-work-orders';

import { mockAsync } from '../config';

type KeyOfType<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

type PrimitiveKey = string | number;

type CollectionAdapter<T, K extends KeyOfType<T, PrimitiveKey>> = {
  list: () => Promise<T[]>;
  getById: (value: T[K]) => Promise<T | null>;
};

const createCollectionAdapter = <T, K extends KeyOfType<T, PrimitiveKey>>(
  items: T[],
  key: K,
): CollectionAdapter<T, K> => ({
  list: () => mockAsync(items),
  getById: (value: T[K]) =>
    mockAsync(items.find((item) => item[key] === value) ?? null),
});

const createIdCollectionAdapter = <T extends Record<'id', PrimitiveKey>>(items: T[]) =>
  createCollectionAdapter(items, 'id');

const amenitiesAdapter = createIdCollectionAdapter(Amenities.mockAmenities);
export const listAmenities = amenitiesAdapter.list;
export const getAmenityById = amenitiesAdapter.getById;

const announcementsAdapter = createIdCollectionAdapter(Announcements.mockAnnouncements);
export const listAnnouncements = announcementsAdapter.list;
export const getAnnouncementById = announcementsAdapter.getById;

const architecturalRequestsAdapter = createIdCollectionAdapter(
  ArchitecturalRequests.mockArchitecturalRequests,
);
export const listArchitecturalRequests = architecturalRequestsAdapter.list;
export const getArchitecturalRequestById = architecturalRequestsAdapter.getById;

const assetsAdapter = createIdCollectionAdapter(Assets.mockAssets);
export const listAssets = assetsAdapter.list;
export const getAssetById = assetsAdapter.getById;

const auditLogsAdapter = createIdCollectionAdapter(AuditLogs.mockAuditLogs);
export const listAuditLogs = auditLogsAdapter.list;
export const getAuditLogById = auditLogsAdapter.getById;

const automationsAdapter = createIdCollectionAdapter(Automations.mockAutomationTemplates);
export const listAutomations = automationsAdapter.list;
export const getAutomationById = automationsAdapter.getById;

const billsAdapter = createIdCollectionAdapter(Bills.mockBills);
export const listBills = billsAdapter.list;
export const getBillById = billsAdapter.getById;

const buildingsAdapter = createIdCollectionAdapter(Buildings.mockBuildings);
export const listBuildings = buildingsAdapter.list;
export const getBuildingById = buildingsAdapter.getById;

const calendarEventsAdapter = createIdCollectionAdapter(CalendarEvents.mockCalendarEvents);
export const listCalendarEvents = calendarEventsAdapter.list;
export const getCalendarEventById = calendarEventsAdapter.getById;

const documentsAdapter = createIdCollectionAdapter(Documents.mockDocuments);
export const listDocuments = documentsAdapter.list;
export const getDocumentById = documentsAdapter.getById;

const inboxDocumentsAdapter = createIdCollectionAdapter(InboxDocuments.mockInboxDocuments);
export const listInboxDocuments = inboxDocumentsAdapter.list;
export const getInboxDocumentById = inboxDocumentsAdapter.getById;

const insuranceAdapter = createIdCollectionAdapter(Insurance.mockInsurancePolicies);
export const listInsurancePolicies = insuranceAdapter.list;
export const getInsurancePolicyById = insuranceAdapter.getById;

const integrationsAdapter = createIdCollectionAdapter(Integrations.mockIntegrations);
export const listIntegrations = integrationsAdapter.list;
export const getIntegrationById = integrationsAdapter.getById;

const issuesAdapter = createIdCollectionAdapter(Issues.mockIssues);
export const listIssues = issuesAdapter.list;
export const getIssueById = issuesAdapter.getById;

const leasesAdapter = createIdCollectionAdapter(Leases.mockLeases);
export const listLeases = leasesAdapter.list;
export const getLeaseById = leasesAdapter.getById;

const meetingsAdapter = createIdCollectionAdapter(Meetings.mockMeetings);
export const listMeetings = meetingsAdapter.list;
export const getMeetingById = meetingsAdapter.getById;

const paymentsAdapter = createIdCollectionAdapter(Payments.mockPayments);
export const listPayments = paymentsAdapter.list;
export const getPaymentById = paymentsAdapter.getById;

const portfolioAdapter = createIdCollectionAdapter(Portfolio.mockPortfolioProperties);
export const listPortfolioProperties = portfolioAdapter.list;
export const getPortfolioPropertyById = portfolioAdapter.getById;

const purchaseOrdersAdapter = createIdCollectionAdapter(PurchaseOrders.mockPurchaseOrders);
export const listPurchaseOrders = purchaseOrdersAdapter.list;
export const getPurchaseOrderById = purchaseOrdersAdapter.getById;

const rolesAdapter = createIdCollectionAdapter(Roles.mockRoles);
export const listRoles = rolesAdapter.list;
export const getRoleById = rolesAdapter.getById;

const rulesAdapter = createIdCollectionAdapter(Rules.mockRules);
export const listRules = rulesAdapter.list;
export const getRuleById = rulesAdapter.getById;

const tasksAdapter = createIdCollectionAdapter(Tasks.mockTasks);
export const listTasks = tasksAdapter.list;
export const getTaskById = tasksAdapter.getById;

const unitStatementsAdapter = createIdCollectionAdapter(UnitStatements.mockUnitStatements);
export const listUnitStatements = unitStatementsAdapter.list;
export const getUnitStatementById = unitStatementsAdapter.getById;

const unitsAdapter = createIdCollectionAdapter(Units.mockUnits);
export const listUnits = unitsAdapter.list;
export const getUnitById = unitsAdapter.getById;

const usersAdapter = createIdCollectionAdapter(Users.mockUsers);
export const listUsers = usersAdapter.list;
export const getUserById = usersAdapter.getById;

const violationsAdapter = createIdCollectionAdapter(Violations.mockViolationTickets);
export const listViolationTickets = violationsAdapter.list;
export const getViolationTicketById = violationsAdapter.getById;

const visitorLogsAdapter = createIdCollectionAdapter(VisitorLogs.mockVisitorLogs);
export const listVisitorLogs = visitorLogsAdapter.list;
export const getVisitorLogById = visitorLogsAdapter.getById;

const votesAdapter = createIdCollectionAdapter(Votes.mockVotes);
export const listVotes = votesAdapter.list;
export const getVoteById = votesAdapter.getById;

const workOrdersAdapter = createIdCollectionAdapter(WorkOrders.mockWorkOrders);
export const listWorkOrders = workOrdersAdapter.list;
export const getWorkOrderById = workOrdersAdapter.getById;

export const listMonthlyIssues = () => mockAsync(Analytics.mockMonthlyIssues);
export const listIssueTypeDistribution = () => mockAsync(Analytics.mockIssueTypeDistribution);
export const listWorkOrderCompletionRate = () => mockAsync(Analytics.mockWorkOrderCompletion);

export const listLedgerEntries = () => mockAsync(FinancialReportDetails.mockLedger);
export const getLedgerEntryById = (id: string) =>
  mockAsync(
    FinancialReportDetails.mockLedger.find((entry) => entry.id === id) ?? null,
  );
export const listTrialBalance = () => mockAsync(FinancialReportDetails.mockTrialBalance);
export const listProfitLoss = () => mockAsync(FinancialReportDetails.mockProfitLoss);
export const listBalanceSheet = () => mockAsync(FinancialReportDetails.mockBalanceSheet);

export const listMonthlyFinancialSummary = () =>
  mockAsync(FinancialReports.mockMonthlyFinancialSummary);

export * from '@/data/mock-amenities';
export * from '@/data/mock-analytics';
export * from '@/data/mock-announcements';
export * from '@/data/mock-architectural-requests';
export * from '@/data/mock-assets';
export * from '@/data/mock-audit-logs';
export * from '@/data/mock-automations';
export * from '@/data/mock-bills';
export * from '@/data/mock-buildings';
export * from '@/data/mock-calendar-events';
export * from '@/data/mock-documents';
export * from '@/data/mock-financial-reports-details';
export * from '@/data/mock-financial-reports';
export * from '@/data/mock-inbox-documents';
export * from '@/data/mock-insurance';
export * from '@/data/mock-integrations';
export * from '@/data/mock-issues';
export * from '@/data/mock-leases';
export * from '@/data/mock-meetings';
export * from '@/data/mock-payments';
export * from '@/data/mock-portfolio';
export * from '@/data/mock-purchase-orders';
export * from '@/data/mock-roles';
export * from '@/data/mock-rules';
export * from '@/data/mock-tasks';
export * from '@/data/mock-unit-statements';
export * from '@/data/mock-units';
export * from '@/data/mock-users';
export * from '@/data/mock-violations';
export * from '@/data/mock-visitor-logs';
export * from '@/data/mock-votes';
export * from '@/data/mock-work-orders';
