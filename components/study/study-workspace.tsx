"use client";

import { useState } from "react";
import { StudySession } from "@/components/study/study-session";
import { scenarios } from "@/content/scenarios";

export function StudyWorkspace() {
  const [selectedTask, setSelectedTask] = useState(scenarios[0]);
  const [focusExampleOnMount, setFocusExampleOnMount] = useState(false);

  function selectTask(id: string) {
    const task = scenarios.find((example) => example.id === id);
    if (task && task.id !== selectedTask.id) {
      setFocusExampleOnMount(true);
      setSelectedTask(task);
    }
  }

  // The selector is available only in setup. A different key discards the old
  // component's state so choices and presentation records cannot cross cases.
  return (
    <StudySession
      key={selectedTask.id}
      task={selectedTask}
      focusExampleOnMount={focusExampleOnMount}
      onTaskChange={selectTask}
    />
  );
}
