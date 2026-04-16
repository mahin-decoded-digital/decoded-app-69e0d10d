import { create } from 'zustand'
import { apiUrl } from '@/lib/api'

interface MessageStore {
  message: string
  loading: boolean
  loaded: boolean
  error: string | null
  fetchMessage: () => Promise<void>
  updateMessage: (msg: string) => Promise<void>
}

let debounceTimer: ReturnType<typeof setTimeout>

export const useMessageStore = create<MessageStore>((set, get) => ({
  message: 'Hello World',
  loading: false,
  loaded: false,
  error: null,
  
  fetchMessage: async () => {
    if (get().loading || get().loaded) return
    set({ loading: true, error: null })
    try {
      const res = await fetch(apiUrl('/api/message'))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      set({ message: data.message || 'Hello World', loading: false, loaded: true })
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'Failed to load' })
    }
  },

  updateMessage: async (msg: string) => {
    set({ message: msg }) // Optimistically update
    
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(apiUrl('/api/message'), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg })
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } catch (err) {
        set({ error: err instanceof Error ? err.message : 'Failed to save' })
      }
    }, 500)
  }
}))