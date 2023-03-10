import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { FormEntry } from "./FormEntry"

@Entity()
export class Form {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    slug: string

    @Column()
    version: string

    /**
     *
     *
     * here we have a lot to play with and see how to keep not so coupled to the frontend
     * maybe a Field entity to describe fields, type and validation ranges.
     * 
     */
    @Column('jsonb', { name: 'serlalized_fields'})
    serializedFields: object

    @Column('jsonb')
    validatorChain: object

    /** 
     * we send to the frontend where to submit the form
    */
    @Column({ name: 'base_url'})
    baseUrl: string

    @Column({ name: 'submit_path'})
    submitPath: string

    @OneToMany(() => FormEntry, (entry) => entry.form)
    entries: FormEntry[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    

}
