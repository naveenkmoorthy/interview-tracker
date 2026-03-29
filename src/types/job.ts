export type Job = {
    id: string,
    company: string,
    role: string,
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected'
}