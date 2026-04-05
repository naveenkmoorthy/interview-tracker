import { useState } from 'react'
import { AddJobForm } from './components/AddJobForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { JobList } from './components/JobList'
import { StatsBar } from './components/StatsBar'
import { useJobs } from './hooks/useJobs'
import type { JobStatus } from './types/job'

type StatusFilter = 'all' | JobStatus
type SortOrder = 'newest' | 'oldest'

function App() {
  const { jobs, addJob, updateJobStatus, markFollowedUp, deleteJob, updateJobNotes } = useJobs()
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      <Header />
      <main className="grow w-full max-w-4xl mx-auto px-6 py-12">
        <AddJobForm onAdd={addJob} />
        <StatsBar
          jobs={jobs}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <JobList
          jobs={jobs}
          statusFilter={statusFilter}
          sortOrder={sortOrder}
          onUpdateStatus={updateJobStatus}
          onMarkFollowedUp={markFollowedUp}
          onDelete={deleteJob}
          onUpdateNotes={updateJobNotes}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
