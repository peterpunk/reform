import { AppDataSource } from '../data-source'
import { Form } from '../entity/Form'

(async () => {

  AppDataSource
    .initialize()
    .then(() => {
      console.log('seed forms table')
      AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Form)
      .values([
        { 
          version: "1.0", 
          slug: "smart", 
          title: "demo form",
          serializedFields: {},
          validatorChain: {},
          baseUrl: '//forms.baupal.de',
          submitPath: '/persist/smart/1.0',
        },
      ])
      .execute()
    
    })

})()
