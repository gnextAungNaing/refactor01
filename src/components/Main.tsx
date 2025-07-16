import { fetchNotifications } from "@/api/fakeApi";
import { useEffect, useState } from "react";


export const Main = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [input, setInput] = useState('');

  const addNotification = (n: Notification) => {
    setNotifications([...notifications, n]);
  }

  useEffect(() => {
    fetchNotifications()
      .then((notes: Notification[]) => {
        setNotifications(notes);
      })
      .catch(() => setNotifications([]));
  }, []);

  return (
    <main>
      <h2>Notifications ({notifications.length})</h2>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n.toString()}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='New notification'
      />
      <button
        onClick={() => {
          const value = input.trim();
          if (value) {
            addNotification(value as unknown as Notification);
            setInput('');
          }
        }}
      >
        Add
      </button>
    </main>
  );
}