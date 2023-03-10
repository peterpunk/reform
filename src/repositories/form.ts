import { AppDataSource } from '../data-source'
import { Form } from "../entity/Form";

export const getForm = async (id: string): Promise<Form | null> => {
  const formRepository = AppDataSource.getRepository(Form);
  const form = await formRepository.findOne({where: { id }});
  if (!form) return null;
  return form;
};