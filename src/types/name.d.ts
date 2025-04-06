export interface Name {
  id: number;
  name: string;
  error?: string;
}

export type CreateNameDto = Pick<Name, 'name'>;
export type UpdateNameDto = Partial<CreateNameDto>;
