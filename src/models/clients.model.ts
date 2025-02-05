export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface ClientResponse {
  clients: Client[] | null | undefined;
}

export interface ClientByIdResponse {
  client: Client | null | undefined;
}

export interface CreateTransactionResponse {
  client: Client | null | undefined;
}

export interface UpdateTransactionResponse {
  updatedClient: Client | null | undefined;
}

export interface DeleteTransactionResponse {
  data: Client[] | null | undefined;
}
