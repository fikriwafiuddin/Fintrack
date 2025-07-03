function ToggleTab({ tabs, setTab, tab }) {
  return (
    <div className="bg-gray-200 w-max p-1 mt-8 rounded-lg text-slate-700">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={`py-1 px-2 ${tab === t ? "bg-white rounded-lg" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export default ToggleTab
