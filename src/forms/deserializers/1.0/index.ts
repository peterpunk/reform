import { AppDataSource } from '../../../data-source'
import { FormEntry } from '../../../entity/FormEntry'

function deserialize(serializedForm:any, slug:string, version: string) {
  return
}

async function deserializeForm(serializedForm: any, slug: string, version: string) {
  const fields = deserialize(serializedForm, slug, version)
  return {
    fields,
    slug,
    version,
  }
}

export default deserializeForm