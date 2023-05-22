const { VITE_TODO_API_KEY, VITE_TODO_USER_NAME } = import.meta.env;

export async function postApi(todo, order) {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: VITE_TODO_API_KEY,
        username: VITE_TODO_USER_NAME,
      },
      body: JSON.stringify({
        title: todo,
        order: order,
      }),
    }
  );
  const json = await res.json();
  console.log(json);
  return json;
}

export async function getApi() {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        apikey: VITE_TODO_API_KEY,
        username: VITE_TODO_USER_NAME,
      },
    }
  );
  const json = await res.json();
  console.log(json);
  return json;
}

export async function putApi(id, data) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        apikey: VITE_TODO_API_KEY,
        username: VITE_TODO_USER_NAME,
      },
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  console.log(json);
  return json;
}

export async function deleteApi(id) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    {
      method: 'DELETE',
      headers: {
        apikey: VITE_TODO_API_KEY,
        username: VITE_TODO_USER_NAME,
      },
    }
  );
  const json = await res.json();
  return json;
}

export async function reorderApi(todoIds) {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder',
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        apikey: VITE_TODO_API_KEY,
        username: VITE_TODO_USER_NAME,
      },
      body: JSON.stringify({
        todoIds: todoIds,
      }),
    }
  );
  console.log(res);
}
