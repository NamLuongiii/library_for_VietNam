import Input from './input'
import ComplexSelect from './complexSelect'
import Textarea from './textarea'
import InseartingField from './insertingField'
import AvatarField from './avatar'
import BookFileField from './bookFiles'
import Autocomplete from './autocomplete'
import RadioGroup from './radioGroup'
import BookCoverField from './bookCoverField'
import BookDocumentsField from './bookDocuments'
import Select from './select'
import BookFileUpload from './bookFileUpload'

export default function Generator(props) {
  const { errorMessages = {} } = props
  function renderValue() {
    const { render, entity, value, name } = props
    if (!value && !entity && !render) return undefined

    if (value) return value
    if (entity) return entity[name]
    if (render) return render(entity)
  }

  let ele
  switch (props.type) {
    case 'text':
      ele = (
        <Input
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        />
      )
      break

    case 'textarea':
      ele = (
        <Textarea
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        />
      )
      break

    case 'complexSelect':
      ele = (
        <ComplexSelect
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></ComplexSelect>
      )
      break

    case 'date':
      ele = (
        <Input
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        />
      )
      break

    case 'inseartingField':
      ele = (
        <InseartingField
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></InseartingField>
      )
      break
    case 'avatar':
      ele = (
        <AvatarField
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></AvatarField>
      )
      break
    case 'bookFiles':
      ele = (
        <BookFileField
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></BookFileField>
      )
      break
    case 'autocomplete':
      ele = (
        <Autocomplete
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></Autocomplete>
      )
      break
    case 'radioGroup':
      ele = (
        <RadioGroup
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></RadioGroup>
      )
      break

    case 'number':
      ele = (
        <Input
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        />
      )
      break
    case 'bookCover':
      ele = (
        <BookCoverField
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></BookCoverField>
      )
      break
    case 'bookDocuments':
      ele = (
        <BookDocumentsField
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></BookDocumentsField>
      )
      break
    case 'select':
      ele = (
        <Select
          {...props}
          value={renderValue()}
          errorMessage={errorMessages[props.name]}
        ></Select>
      )
      break
    case 'bookFileUpload':
      ele = (
        <BookFileUpload
          {...props}
          errorMessage={errorMessages[props.name]}
        ></BookFileUpload>
      )
    default:
      break
  }

  return ele
}
