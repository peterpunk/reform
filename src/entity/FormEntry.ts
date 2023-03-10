import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { Form } from "./Form";

@Entity()
export class FormEntry {

    @PrimaryGeneratedColumn('uuid')
    id: string

    /**
     * which was the source originating this form entry
     */ 
    @Column({name: 'source_id'})
    sourceId: string

    @ManyToOne((_type) => Form, (form: Form) => form.entries)
    @JoinColumn()
    form!: Form;

    @Column()
    slug: string

    @Column()
    version: string

    /**
     * a placeholder for some user related data
     */ 
    @Column('jsonb', {nullable: true})
    userMetadata: object

    /**
     * here the submitted form data
     */ 
    @Column('jsonb')
    serializedFields: object

    /** 
     * enum of possible states: created, valid, invalid, ...
     */
    @Column()
    status: string

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;    

}
