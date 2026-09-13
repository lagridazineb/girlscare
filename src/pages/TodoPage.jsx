import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import Card from "../components/common/Card";
import Icon from "../components/common/Icon";

export default function TodoPage() {
  const todos = useAppStore((s) => s.todos);
  const addTodo = useAppStore((s) => s.addTodo);
  const toggleTodo = useAppStore((s) => s.toggleTodo);
  const deleteTodo = useAppStore((s) => s.deleteTodo);
  const [text, setText] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text.trim());
    setText("");
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl text-rose-700 mb-1">قائمة مهامي ✅</h1>
      <p className="text-ink-700/60 text-sm mb-4">نظمي يومك بخطوات بسيطة وواضحة.</p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="أضيفي مهمة جديدة..."
          className="flex-1 rounded-full border border-blush-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
        />
        <button
          type="submit"
          className="w-11 h-11 shrink-0 rounded-full bg-rose-600 text-white flex items-center justify-center active:scale-90 transition-transform"
        >
          <Icon name="FaPlus" size={16} />
        </button>
      </form>

      {todos.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-4xl mb-2">🌸</p>
          <p className="text-ink-700/60 text-sm">لا توجد مهام بعد، أضيفي أول مهمة لك!</p>
        </Card>
      )}

      {pending.length > 0 && (
        <div className="space-y-2 mb-4">
          {pending.map((t) => (
            <TodoRow key={t.id} todo={t} onToggle={() => toggleTodo(t.id)} onDelete={() => deleteTodo(t.id)} />
          ))}
        </div>
      )}

      {done.length > 0 && (
        <>
          <p className="text-xs font-bold text-ink-700/50 mb-2">مكتملة ({done.length})</p>
          <div className="space-y-2">
            {done.map((t) => (
              <TodoRow key={t.id} todo={t} onToggle={() => toggleTodo(t.id)} onDelete={() => deleteTodo(t.id)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TodoRow({ todo, onToggle, onDelete }) {
  return (
    <Card className="flex items-center gap-3 py-3">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          todo.done ? "bg-rose-600 border-rose-600" : "border-blush-400 bg-white"
        }`}
      >
        {todo.done && (
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
            <path d="M4 10.5L8 14.5L16 5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className={`flex-1 text-sm ${todo.done ? "line-through text-ink-700/40" : "text-ink-800"}`}>{todo.text}</span>
      <button onClick={onDelete} className="text-blush-400 hover:text-rose-500 shrink-0">
        <Icon name="FaTrashAlt" size={13} />
      </button>
    </Card>
  );
}
