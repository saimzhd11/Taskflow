export default function StatsBar({ stats }) {
  const cards = [
    { label: 'Total', value: stats.total, color: 'text-gray-800' },
    { label: 'To do', value: stats.todo, color: 'text-gray-600' },
    { label: 'In progress', value: stats.inProgress, color: 'text-blue-600' },
    { label: 'Done', value: stats.done, color: 'text-emerald-600' }
  ]

  const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0

  return (
    <div className="card p-5 mb-6">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map(c => (
          <div key={c.label} className="text-center">
            <p className={`text-2xl font-semibold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{pct}% complete</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
