import api from "@/lib/api";
import type { Payment, CreatePaymentData } from "@/interfaces";

export const paymentService = {
  getPayments: async (): Promise<Payment[]> => {
    const response = await api.get<Payment[]>("/payments");
    return response.data;
  },

  getPayment: async (id: string): Promise<Payment> => {
    const response = await api.get<Payment>(`/payments/${id}`);
    return response.data;
  },

  createPayment: async (data: CreatePaymentData): Promise<Payment> => {
    const response = await api.post<Payment>("/payments", data);
    return response.data;
  },

  updatePayment: async (id: string, data: Partial<Payment>): Promise<Payment> => {
    const response = await api.patch<Payment>(`/payments/${id}`, data);
    return response.data;
  },
};

