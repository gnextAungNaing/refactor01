// Fake API
export const fetchUserData = () =>
  new Promise((res) =>
    setTimeout(() => res({ name: "Alice", age: 28, loggedIn: true }), 800)
  );

export const fetchNotifications = () =>
  new Promise((res) =>
    setTimeout(() => res(["Welcome!", "Update your profile."]), 1000)
  );
