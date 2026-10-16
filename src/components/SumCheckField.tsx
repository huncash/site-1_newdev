"use client";

import { useEffect, useState } from "react";

export function SumCheckField({
  resetKey,
  answer,
  onAnswer,
  onToken,
  inputClassName,
}: {
  resetKey: number;
  answer: string;
  onAnswer: (value: string) => void;
  onToken: (token: string) => void;
  inputClassName: string;
}) {
  const [question, setQuestion] = useState("");
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setQuestion("");
    setFailed(false);
    onToken("");
    onAnswer("");

    fetch("/api/ajanlat-ellenorzes", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as { token?: string; question?: string };
        if (!response.ok || !data.token || !data.question) throw new Error("check");
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        setQuestion(data.question ?? "");
        onToken(data.token ?? "");
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [resetKey, attempt, onAnswer, onToken]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">
        {question || (failed ? "Az ellenőrző kérdést nem sikerült betölteni." : "Az ellenőrző kérdés betöltése…")}
      </p>
      <input
        name="sum_answer"
        inputMode="numeric"
        autoComplete="off"
        aria-label="Az eredmény"
        value={answer}
        onChange={(event) => onAnswer(event.target.value)}
        className={inputClassName}
      />
      {failed ? (
        <button
          type="button"
          className="text-sm font-semibold text-brand underline"
          onClick={() => setAttempt((value) => value + 1)}
        >
          Új kérdés
        </button>
      ) : null}
    </div>
  );
}
