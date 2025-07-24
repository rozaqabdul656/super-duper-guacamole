export default function MessageInput() {
  return (
    <div className="p-4 border-t border-zinc-700 bg-zinc-900">
      <form className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-zinc-800 text-white outline-none"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </form>
    </div>
  )
}
