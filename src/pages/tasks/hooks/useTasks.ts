import { useState, useEffect } from "react";
import { Task } from "../types";
import { io } from "socket.io-client";

export type UseTasksReturn = {
  completed: Task[];
  active: Task[];
  waiting: Task[];
};


export const useTasks = (): UseTasksReturn => {
  const [completed, setCompleted] = useState<Task[]>([]);
  const [active, setActive] = useState<Task[]>([]);
  const [waiting, setWaiting] = useState<Task[]>([]);

  useEffect(() => {
    const socket = io("/");

    socket.on("tasks", (data) => {
      setCompleted(data.completed);
      setActive(data.active);
      setWaiting(data.waiting);
    });
  }, [])

  return {
    completed,
    active,
    waiting,
  };
};
