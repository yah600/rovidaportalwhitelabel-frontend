export const mockMeetings = [
  {
    id: 'meeting-1',
    title: 'Annual General Meeting',
    date: '2023-10-10',
    time: '7:00 PM',
    location: 'Community Hall',
    attendees: ['BOARD', 'OWNER'],
  },
  {
    id: 'meeting-2',
    title: 'Board Meeting - October',
    date: '2023-10-05',
    time: '6:00 PM',
    location: 'Online',
    attendees: ['BOARD'],
  },
];

export const mockVotes = [
  {
    id: 'vote-1',
    meetingId: 'meeting-1',
    question: 'Approve 2024 Budget?',
    options: ['Yes', 'No'],
    results: { 'Yes': 70, 'No': 30 },
    status: 'Closed',
  },
  {
    id: 'vote-2',
    meetingId: 'meeting-2',
    question: 'Approve new landscaping proposal?',
    options: ['Approve', 'Reject', 'Abstain'],
    results: { 'Approve': 5, 'Reject': 1, 'Abstain': 0 },
    status: 'Open',
  },
];
