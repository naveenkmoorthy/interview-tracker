import { AddJobForm } from './components/AddJobForm'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { JobList } from './components/JobList'
import { useJobs } from './hooks/useJobs'

function App() {
  const { jobs, addJob, updateJobStatus, deleteJob } = useJobs()

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      <Header />
      <main className="grow w-full max-w-4xl mx-auto px-6 py-12">
        <AddJobForm onAdd={addJob} />
        <JobList
          jobs={jobs}
          onUpdateStatus={updateJobStatus}
          onDelete={deleteJob}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
