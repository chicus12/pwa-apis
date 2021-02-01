/* eslint-disable react/prop-types */
import React from 'react'

const supported = 'contacts' in navigator && 'ContactsManager' in window

const PROPERTIES = {
  name: false,
  email: false,
  tel: false,
  address: false,
  icon: false,
}
export default function ContactPicker() {
  const [contacts, setContacts] = React.useState([])
  const [availableProperties, setAvailableProperties] = React.useState(
    PROPERTIES
  )
  const [properties, setProperties] = React.useReducer(
    (currentState, newState) => ({
      ...currentState,
      ...newState,
    }),
    {
      name: false,
      email: false,
      tel: false,
      address: false,
      icon: false,
      multiple: false,
    }
  )

  React.useEffect(() => {
    async function getProperties() {
      const supportedProperties = await navigator.contacts.getProperties()
      const newProperties = { ...PROPERTIES }
      if (supportedProperties.includes('name')) {
        newProperties.name = true
      }
      if (supportedProperties.includes('email')) {
        newProperties.email = true
      }
      if (supportedProperties.includes('tel')) {
        newProperties.tel = true
      }
      if (supportedProperties.includes('address')) {
        newProperties.address = true
      }
      if (supportedProperties.includes('icon')) {
        newProperties.icon = true
      }

      setAvailableProperties(newProperties)
    }
    if (supported) {
      getProperties()
    }
  }, [])

  const getContacts = React.useCallback(async () => {
    const propsOptions = []
    if (properties.name) propsOptions.push('name')
    if (properties.email) propsOptions.push('email')
    if (properties.tel) propsOptions.push('tel')
    if (properties.address) propsOptions.push('address')
    if (properties.icon) propsOptions.push('icon')

    const opts = { multiple: properties.multiple }

    try {
      const data = await navigator.contacts.select(propsOptions, opts)
      setContacts(data)
      alert(data)
      // handleResults(contacts)
    } catch (error) {
      console.log(error)
    }
  }, [properties])

  return (
    <>
      <h1>Contact Picker API Demo</h1>
      <p>
        El acceso a los contactos del usuario ha sido una característica de las
        aplicaciones nativas desde (casi) los albores de los tiempos. La API de
        Selector de contactos es un nuevo selector a pedido que permite a los
        usuarios seleccionar una entrada o entradas de su lista de contactos y
        compartir detalles limitados de los contactos seleccionados con un sitio
        web. Permite a los usuarios compartir solo lo que quieran, cuando
        quieran, y hace que sea más fácil para los usuarios llegar y conectarse
        con sus amigos y familiares.
      </p>

      <ul>
        <li>
          <label htmlFor="multiple">
            <input
              type="checkbox"
              id="multiple"
              value={properties.multiple}
              onChange={evt => {
                setProperties({ multiple: evt.target.checked })
              }}
            />
            Seleccionar múltiples contactos
          </label>
        </li>
        {availableProperties.name && (
          <li>
            <label htmlFor="name">
              <input
                type="checkbox"
                id="name"
                value={properties.name}
                onChange={evt => {
                  setProperties({ name: evt.target.checked })
                }}
              />
              Incluir el nombre
            </label>
          </li>
        )}
        {availableProperties.email && (
          <li>
            <label htmlFor="email">
              <input
                type="checkbox"
                id="email"
                value={properties.email}
                onChange={evt => {
                  setProperties({
                    email: evt.target.checked,
                  })
                }}
              />
              Incluir el email
            </label>
          </li>
        )}
        {availableProperties.tel && (
          <li>
            <label htmlFor="tel">
              <input
                type="checkbox"
                id="tel"
                value={properties.tel}
                onChange={evt => {
                  setProperties({ tel: evt.target.checked })
                }}
              />
              Incluir el teléfono
            </label>
          </li>
        )}
        {availableProperties.address && (
          <li>
            <label htmlFor="address">
              <input
                type="checkbox"
                id="address"
                value={properties.address}
                onChange={evt => {
                  setProperties({ address: evt.target.checked })
                }}
              />
              Incluir la dirección
            </label>
          </li>
        )}
        {availableProperties.icon && (
          <li>
            <label htmlFor="icon">
              <input
                type="checkbox"
                id="icon"
                value={properties.icon}
                onChange={evt => {
                  setProperties({ icon: evt.target.checked })
                }}
              />
              Incluir el avatar
            </label>
          </li>
        )}
      </ul>

      <button type="button" onClick={getContacts}>
        Abrir el Contact Picker
      </button>

      <div>
        <pre>
          <ContactsSelected contacts={contacts} />
        </pre>
      </div>
    </>
  )
}

function ContactsSelected({ contacts }) {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li key={contact.name}>
            {contact.name && (
              <b>
                Nombre:
                {contact.name}
              </b>
            )}

            {contact.email && (
              <b>
                Email:
                {contact.email.join(', ')}
              </b>
            )}

            {contact.tel && (
              <b>
                Teléfono:
                {contact.tel.join(', ')}
              </b>
            )}

            {contact.icon.map(icon => {
              const imgURL = URL.createObjectURL(icon)
              return (
                <>
                  <b>Icon:</b>
                  <img src={imgURL} alt={contact.name} />
                </>
              )
            })}
          </li>
        )
      })}
    </ul>
  )
}
