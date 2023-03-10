import { NextFunction, Request, Response  } from "express";
import deserializeForm from '../forms/deserializers/1.0'
import validateForm from '../forms/validators/1.0'
import { getFormEntry, persistForm } from "../repositories/formEntry";

async function formPersist(request: Request, response: Response, next?: NextFunction) {
  const { slug, version } = request.params as any;
  const { formEntryId, serializedForm } = request.body;
  try {
    const formEntry = await getFormEntry(formEntryId)
    const formData = await deserializeForm(serializedForm, slug, version)
    const result = await validateForm(formEntry, formData, slug, version)
    await persistForm(formEntry, formData, result)
    response.send(result)
  } catch (err) {
    response.sendStatus(400).send(err.message)
  }
}

export default formPersist;