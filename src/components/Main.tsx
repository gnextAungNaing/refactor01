import { useContext, useState } from "react";


export const Main = () => {
  const { notifications, addNotification } = useContext(AppContext);
  const [input, setInput] = useState('');

  return (
    <main>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='New notification'
      />
      <button
        onClick={() => {
          if (input.trim()) {
            addNotification(input.trim());
            setInput('');
          }
        }}
      >
        Add
      </button>
    </main>
  );
}