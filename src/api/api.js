export async function postApi() {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: 'KDT5_nREmPe9B',
        username: 'KDT5_SeoDongUk',
      },
      body: JSON.stringify({
        title: 'having lunch2',
        order: '1',
      }),
    }
  );
  const json = await res.json();
  console.log(json);
}

export async function getApi() {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        apikey: 'KDT5_nREmPe9B',
        username: 'KDT5_SeoDongUk',
      },
    }
  );
  const json = await res.json();
  console.log(json);
  return json; // to-do array
}

export async function deleteApi(id) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
    {
      method: 'DELETE',
      headers: {
        apikey: 'KDT5_nREmPe9B',
        username: 'KDT5_SeoDongUk',
      },
    }
  );
  const json = await res.json();
  console.log(json);
}
