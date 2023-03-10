import { Form } from '../../../entity/Form';
import { FormEntry } from '../../../entity/FormEntry';

export type ValidatorResponse = {
  success: boolean,
  errors: string[],
}

interface Validator {
  (form: Form, formData: any, slug: string, version: string):Promise<ValidatorResponse>
}

async function validateForm(formEntry: FormEntry, formData: any, slug: string, version: string): Promise<ValidatorResponse> {
  const result = ((formEntry.form.validatorChain as any).list as Validator[]).reduce(async(state, validator: Validator) => {
    const current = await state;
    const validationResult = await validator(formEntry.form, formData, slug, version);
    if (validationResult.success) return current;
    current.errors = current.errors.concat(validationResult.errors);
    current.success = false;
    return current;
  }, Promise.resolve({ success: true, errors: []}))

  return result
}

export default validateForm;