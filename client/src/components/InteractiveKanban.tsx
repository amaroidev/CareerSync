import React, { useState } from "react";
// simple kanban uses native drag/drop — no framer motion here to keep types clean

type KanbanCard = {
  id: string;
  title: string;
  company?: string;
};

type Columns = Record<string, KanbanCard[]>;

export default function InteractiveKanban(): JSX.Element {
  const initialColumns: Columns = {
    Saved: [
      { id: `c-${Date.now()}-1`, title: "Software Engineer Intern", company: "Acme" },
      { id: `c-${Date.now()}-2`, title: "Data Analyst", company: "BrightData" },
    ],
    Applied: [
      { id: `c-${Date.now()}-3`, title: "Frontend Developer", company: "Pixelworks" },
    ],
    Interview: [],
  };

  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // Color theme per column for subtle accents
  const columnColors: Record<string, { pill: string; pillText: string; cardAccent: string }> = {
    Saved: { pill: 'bg-emerald-100', pillText: 'text-emerald-700', cardAccent: 'bg-emerald-400' },
    Applied: { pill: 'bg-sky-100', pillText: 'text-sky-700', cardAccent: 'bg-sky-400' },
    Interview: { pill: 'bg-amber-100', pillText: 'text-amber-700', cardAccent: 'bg-amber-400' },
  };

  function handleDragStart(e: React.DragEvent<HTMLElement>, cardId: string, fromCol: string) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ cardId, fromCol }));
    // For Firefox
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLElement>, toCol: string) {
    e.preventDefault();
    try {
      const raw = e.dataTransfer.getData("text/plain");
      const { cardId, fromCol } = JSON.parse(raw) as { cardId: string; fromCol: string };
      if (!cardId || !fromCol) return;
      if (fromCol === toCol) return;

      setColumns((prev) => {
        const sourceList = [...prev[fromCol]];
        const destList = [...prev[toCol]];
        const idx = sourceList.findIndex((c) => c.id === cardId);
        if (idx === -1) return prev;
        const [moved] = sourceList.splice(idx, 1);
        destList.unshift(moved);
        return {
          ...prev,
          [fromCol]: sourceList,
          [toCol]: destList,
        };
      });
    } catch (err) {
      // ignore malformed data but keep a tiny trace for debugging
      // eslint-disable-next-line no-console
      console.debug("kanban: malformed drag data", err);
    }
  }

  function addCard() {
    if (!newTitle.trim()) return;
    const card: KanbanCard = { id: `c-${Date.now()}-${Math.floor(Math.random() * 1000)}`, title: newTitle.trim() };
    setColumns((prev) => ({ ...prev, Saved: [card, ...prev.Saved] }));
    setNewTitle("");
    setCreating(false);
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Interactive Kanban</h3>
        <div className="flex items-center gap-2">
          {creating ? (
            <div className="flex items-center gap-2">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Card title"
                className="rounded-md border border-border px-2 py-1 text-sm bg-background"
              />
              <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm" onClick={addCard}>
                Add
              </button>
              <button className="px-2 py-1 text-sm" onClick={() => setCreating(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="px-3 py-1 rounded-md border border-border text-sm" onClick={() => setCreating(true)}>
              + New card
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {Object.keys(columns).map((col) => (
          <div key={col} className="rounded-lg p-3 bg-card/60 border border-border min-h-[160px]">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-6 px-2 py-0.5 rounded-full text-xs font-medium ${columnColors[col]?.pill || 'bg-muted/10'} ${columnColors[col]?.pillText || ''}`}>
                  {col}
                </div>
                <div className="text-xs text-muted-foreground">&middot; {columns[col].length}</div>
              </div>
              <div className="text-xs text-muted-foreground" />
            </div>
            <ul
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col)}
              className="space-y-2 min-h-[120px]"
            >
              {columns[col].map((card) => (
                <li key={card.id} className="list-none">
                  <button
                    type="button"
                    className={`w-full text-left p-2 rounded-md bg-background border border-border cursor-move flex items-start gap-3`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id, col)}
                  >
                    {/* colored accent */}
                    <div className={`w-1 rounded-full mt-1 ${columnColors[col]?.cardAccent || 'bg-muted/10'}`} aria-hidden />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{card.title}</div>
                      {card.company && <div className="text-xs text-muted-foreground">{card.company}</div>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
