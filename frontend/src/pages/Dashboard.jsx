import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import Navbar from '../components/layout/Navbar'
import TaskCard from '../components/tasks/TaskCard'
import TaskModal from '../components/tasks/TaskModal'
import StatsBar from '../components/tasks/StatsBar'

const FILTER_STATUSES = ['all', 'todo', 'in-progress', 'done']
const FILTER_PRIORITIES = ['all', 'high', 'medium', 'low']

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0 })
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [search, setSearch] = useState('')

  const fetchTasks = useCallback(async () => {
    try {
      const params = {}
      if (filterStatus !== 'all') params.status = filterStatus
      if (filterPriority !== 'all') params.priority = filterPriority
      const { data } = await api.get('/tasks', { params })
      setTasks(data)
    } catch {
      toast.error('Failed to load tasks')
    }
  }, [filterStatus, filterPriority])

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks/stats/summary')
      setStats(data)
    } catch {}
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await Promise.all([fetchTasks(), fetchStats()])
      setLoading(false)
    }
    load()
  }, [fetchTasks, fetchStats])

  const handleSave = async (formData) => {
    try {
      if (editingTask) {
        const { data } = await api.put(`/tasks/${editingTask._id}`, formData)
        setTasks(prev => prev.map(t => t._id === data._id ? data : t))
        toast.success('Task updated')
      } else {
        const { data } = await api.post('/tasks', formData)
        setTasks(prev => [data, ...prev])
        toast.success('Task created')
      }
      await fetchStats()
      setModalOpen(false)
      setEditingTask(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save task')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(t => t._id !== id))
      await fetchStats()
      toast.success('Task deleted')
    } catch {
      toast.error('Failed to delete task')
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, { status: newStatus })
      setTasks(prev => prev.map(t => t._id === id ? data : t))
      await fetchStats()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <StatsBar stats={stats} />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">My tasks</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary flex items-center gap-1.5 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New task
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="input-field flex-1 min-w-[180px] text-sm py-1.5"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="input-field w-auto text-sm py-1.5"
          >
            {FILTER_STATUSES.map(s => (
              <option key={s} value={s}>{s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}</option>
            ))}
          </select>
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="input-field w-auto text-sm py-1.5"
          >
            {FILTER_PRIORITIES.map(p => (
              <option key={p} value={p}>{p === 'all' ? 'All priorities' : p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Task list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              {search || filterStatus !== 'all' || filterPriority !== 'all'
                ? 'No tasks match your filters'
                : 'No tasks yet — create your first one'}
            </p>
            {!search && filterStatus === 'all' && filterPriority === 'all' && (
              <button onClick={() => setModalOpen(true)} className="btn-primary mt-3 text-sm">
                Create a task
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
