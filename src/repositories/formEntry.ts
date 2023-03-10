import { AppDataSource } from '../data-source'
import { Form } from '../entity/Form';
import { FormEntry } from "../entity/FormEntry";
import { ValidatorResponse } from '../forms/validators/1.0';

export type FormEntryPayload = {
  sourceId: string,
  slug: string,
  version: string,
}

export async function createEntry(payload: FormEntryPayload): Promise<FormEntry> {
  /**
   * TODO: validate version and slug
   */
  const formEntryRepository = AppDataSource.getRepository(FormEntry);
  const formRepository = AppDataSource.getRepository(Form);
  const form = await formRepository.findOne(
    {
      where: {
        slug: payload.slug,
        version: payload.version,
    },
  })
  const formEntry = formEntryRepository.create();

  formEntry.sourceId = payload.sourceId;
  formEntry.slug = payload.slug;
  formEntry.version = payload.version;
  formEntry.serializedFields = {};
  formEntry.form = form;
  formEntry.status = 'created';
  const savedEntry = await formEntryRepository.save(formEntry);
  return savedEntry;
};

export async function getFormEntry(id: string): Promise<FormEntry | null> {
  const formEntryRepository = AppDataSource.getRepository(FormEntry);
  const formEntry = await formEntryRepository.findOne({where: { id }});
  if (!formEntry) return null;
  return formEntry;
};

export async function persistForm(formEntry: FormEntry, formData: any, result: ValidatorResponse):Promise<FormEntry> {
  const formEntryRepository = AppDataSource.getRepository(FormEntry);
  formEntry.serializedFields = formData;
  formEntry.status = (result.success) ? 'valid' : 'invalid';
  await formEntryRepository.save(formEntry);
  return formEntry;
}
