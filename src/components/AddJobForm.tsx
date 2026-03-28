export function AddJobForm() {
  return (
    <section className="mb-16">
      <div className="bg-surface-container-lowest p-8 rounded-xl ghost-border">
        <div className="mb-6">
          <h2 className="text-sm font-medium tracking-widest uppercase text-on-surface-variant mb-1">
            New Opportunity
          </h2>
          <p className="text-on-surface-variant/70 text-sm">
            Add a new job application to your pipeline.
          </p>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              className="w-full bg-surface-container-low border-none rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant"
              id="company"
              placeholder="e.g. Vercel"
              type="text"
            />
          </div>
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="role"
            >
              Role
            </label>
            <input
              className="w-full bg-surface-container-low border-none rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant"
              id="role"
              placeholder="e.g. Senior Frontend"
              type="text"
            />
          </div>
          <div className="md:col-span-1">
            <label
              className="block text-xs font-semibold tracking-wide text-on-surface mb-2 uppercase"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="w-full bg-surface-container-low border-none rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all text-on-surface"
              id="status"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <button
              className="w-full bg-linear-to-b from-primary to-primary-dim text-on-primary py-2.5 px-4 rounded-md font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              type="button"
            >
              <span className="material-symbols-outlined text-sm" data-icon="add">
                add
              </span>
              Add Job
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
