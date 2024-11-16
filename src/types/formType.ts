export interface FieldType {
  type: string
  label: string
  required: boolean
  placeholder?: string
  options?: (OptionType | string | number)[]
}

export interface StepType {
  step: number
  title: string
  description: string
  fields: FieldType[]
}

export interface OptionType {
  label: string
  value: string | number
}

export type FormType = StepType[]
