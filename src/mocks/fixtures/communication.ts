export const mockMessages = [
  {
    id: 'msg-1',
    workOrderId: 'wo-1',
    sender: 'John Doe (Tenant)',
    timestamp: '2023-10-01T10:00:00Z',
    content: 'The faucet is still leaking, can someone come fix it soon?',
  },
  {
    id: 'msg-2',
    workOrderId: 'wo-1',
    sender: 'Building Manager',
    timestamp: '2023-10-01T10:30:00Z',
    content: 'We have dispatched a technician. They should arrive within 2 hours.',
  },
];

export const mockChatHistory = [
  {
    id: 'chat-1',
    participants: ['John Doe', 'Building Manager'],
    messages: [
      {
        sender: 'John Doe',
        timestamp: '2023-09-29T14:00:00Z',
        content: 'Hi, I have a question about my lease.',
      },
      {
        sender: 'Building Manager',
        timestamp: '2023-09-29T14:05:00Z',
        content: 'Sure, how can I help you?',
      },
    ],
  },
];
