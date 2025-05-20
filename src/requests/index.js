import { errorMessages, successMessages } from "@/constants";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Login
export async function login(data) {
  const req = await fetch(baseURL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const data = await req.json();
    return { data, message: successMessages.login };
  } else if (req.status === 400) {
    throw new Error(errorMessages.login);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Get all data
export async function getAllData(route) {
  const req = await fetch(baseURL + route, {
    headers: {
      "Cache-Control": "no-store",
    },
    next: {
      revalidate: 0,
    },
  });
  if (req.status === 200) {
    const { data } = await req.json();

    return data;
  } else {
    throw new Error(errorMessages.unknown);
  }
}
// get data by id
export async function getDataById(id) {
  const res = await fetch(`${baseURL}/materials/${id}`, {
    method: "GET",
    headers: {
      "Cache-Control": "no-store",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return Promise.reject(new Error(error.message || "Unknown error occurred"));
  }

  const data = await res.json();
  return data;
}

// Add data
export async function addData(route, data, token) {
  const req = await fetch(baseURL + route, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (req.status === 200) {
    const data = await req.json();
    return { data, message: successMessages.add };
  } else if (req.status === 403) {
    throw new Error(errorMessages[req.status]);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Update data
export async function updateData(route, data, id, token) {
  const req = await fetch(baseURL + route + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (req.status === 200) {
    const data = await req.json();
    return { data, message: successMessages.update };
  } else if (req.status === 403) {
    throw new Error(errorMessages[req.status]);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Delete data
export async function deleteData(route, id, token) {
  const req = await fetch(baseURL + route + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (req.status === 200) {
    return { message: successMessages.delete };
  } else if (req.status === 403) {
    throw new Error(errorMessages[req.status]);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Upload file
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const req = await fetch(baseURL + "/upload", {
    method: "POST",
    body: formData,
  });

  if (req.status === 200) {
    return req.text();
  } else {
    throw new Error(errorMessages.unknown);
  }
}
