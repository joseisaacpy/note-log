"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

export default function NovaNota() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || undefined,
        content,
        date,
      }),
    });

    setLoading(false);
    // limpa os campos aṕos envio
    setTitle("");
    setContent("");
    setDate(new Date().toISOString().split("T")[0]);
  }

  return (
    <section className="section">
      <h1 className="text-2xl font-bold">Nova nota</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título (opcional) */}
        <div className="space-y-1">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Opcional"
          />
        </div>

        {/* Conteúdo (obrigatório) */}
        <div className="space-y-1">
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo da nota"
            required
          />
        </div>

        {/* Data */}
        <div className="space-y-1">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </section>
  );
}
