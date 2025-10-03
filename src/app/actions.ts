"use server";

export async function createDeal(body: { 
  name: string; 
  phone_number: string;
  service_id?: number;
  comment?: string;
  amount?: string;
  selected_time?: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/deals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        code: process.env.NEXT_PUBLIC_CODE,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create deal");
  }
  const json = await response.json();
  return json.data.deal;
}

export async function updateTxt(body: {
  name: string;
  phone: string;
  service?: string;
  comment?: string;
  amount?: string;
  selected_time?: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TXT_URL}/api/lead`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update txt");
    }
  } catch (error) {
    console.error(error);
  }
  return;
}