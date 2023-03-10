import { Request, Response } from "express";

import { createEntry } from '../repositories/formEntry';

async function formProvider(request: Request, response: Response) {
  const { slug, version } = request.params as any;
  const { sourceId } = request.body;
  try {
    console.log('create')
    const entry = await createEntry({ sourceId, slug, version });
    response.send({ entry, sourceId });
  } catch(err) {
    response.status(500).send({ error: 'server error' });
  }
}

export default formProvider;