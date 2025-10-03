// types.ts
export interface FormData {
  name: string;
  phone: string;
  amount: string;
  comment: string;
}

export interface BookingData {
  name: string;
  phone_number: string;
  service?: string;
  amount?: string;
  comment?: string;
  selected_slot?: string;
}