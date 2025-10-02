export const mockMeetingSetups = [
  {
    id: 'setup-1',
    meetingId: 'meeting-1',
    quorum: 50,
    votingType: 'weighted',
    anonymousVoting: false,
  },
  {
    id: 'setup-2',
    meetingId: 'meeting-2',
    quorum: 30,
    votingType: 'anonymous',
    anonymousVoting: true,
  },
];

export const mockVotingResults = [
  {
    id: 'result-1',
    voteId: 'vote-1',
    option: 'Yes',
    count: 70,
    percentage: 70,
  },
  {
    id: 'result-2',
    voteId: 'vote-1',
    option: 'No',
    count: 30,
    percentage: 30,
  },
];
