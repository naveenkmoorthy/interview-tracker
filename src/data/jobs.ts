import type { Job } from '../types/job'

const baseMs = new Date('2026-01-01T12:00:00.000Z').getTime()

function seedDate(index: number): string {
  return new Date(baseMs + index * 86400000).toISOString()
}

export const seedJobs: Job[] = [
  {
    id: '1',
    company: 'Google',
    role: 'Software Engineer',
    status: 'Applied',
    createdAt: seedDate(0),
  },
  {
    id: '2',
    company: 'Microsoft',
    role: 'Software Engineer',
    status: 'Interview',
    createdAt: seedDate(1),
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'Software Engineer',
    status: 'Offer',
    createdAt: seedDate(2),
  },
  {
    id: '4',
    company: 'Apple',
    role: 'Software Engineer',
    status: 'Rejected',
    createdAt: seedDate(3),
  },
  {
    id: '5',
    company: 'Facebook',
    role: 'Software Engineer',
    status: 'Applied',
    createdAt: seedDate(4),
  },
  {
    id: '6',
    company: 'Twitter',
    role: 'Software Engineer',
    status: 'Interview',
    createdAt: seedDate(5),
  },
  {
    id: '7',
    company: 'LinkedIn',
    role: 'Software Engineer',
    status: 'Offer',
    createdAt: seedDate(6),
  },
  {
    id: '8',
    company: 'GitHub',
    role: 'Software Engineer',
    status: 'Rejected',
    createdAt: seedDate(7),
  },
  {
    id: '9',
    company: 'Stack Overflow',
    role: 'Software Engineer',
    status: 'Applied',
    createdAt: seedDate(8),
  },
  {
    id: '10',
    company: 'Reddit',
    role: 'Software Engineer',
    status: 'Interview',
    createdAt: seedDate(9),
  },
  {
    id: '11',
    company: 'YouTube',
    role: 'Software Engineer',
    status: 'Offer',
    createdAt: seedDate(10),
  },
]
