import { useId } from 'react'
import { ModalShell } from './ModalShell'

type ConfirmModalProps = {
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const titleId = useId()
  return (
    <ModalShell onClose={onCancel} ariaLabelledBy={titleId}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-error text-xl" data-icon="warning">
            warning
          </span>
        </div>
        <h3 id={titleId} className="text-base font-semibold text-on-surface">{title}</h3>
      </div>
      <p className="text-sm text-on-surface-variant mb-6">{description}</p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md text-sm font-medium text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 py-2 rounded-md text-sm font-medium bg-error text-on-error hover:opacity-90 transition-opacity"
        >
          {confirmLabel}
        </button>
      </div>
    </ModalShell>
  )
}
