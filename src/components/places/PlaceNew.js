import React from 'react'
import { useHistory } from 'react-router'
import  { useForm }  from '../../hooks/useForm'
import { createPlace } from '../../lib/api'
import { getCordinates } from '../../lib/api'

function CreateNewPlace() {
  const history = useHistory()
  const { formData, formErrors, handleChange, setFormErrors } = 
  useForm({
    name: '',
    area: '',
    address: '',
    postcode: '',
    description: '',
    categories: '',
    district: '',
    region: '',
    image: '',
    rating: '',
    lat: '',
    long: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postCodeData = await getCordinates(formData.postcode)
    const postCodeResult = await postCodeData.data.result
    console.log(postCodeResult.region)
    console.log(postCodeResult.admin_district)    
    console.log(formData)
    try {
      
      const newFormData = { 
        ...formData, 
        lat: Number(postCodeResult.latitude),
        long: Number(postCodeResult.longitude),
        area: postCodeResult.admin_ward,
        region: postCodeResult.region,
        district: postCodeResult.admin_district,
      }
      console.log('this is it', newFormData)

      const res = await createPlace( newFormData )

      history.push(`/places/${res.data._id}`)
    } catch (error) {
      alert(error.response.data.message)
      setFormErrors(error.response.data.message)
    }
  
  }


  console.log(formData)
  return (
    <section className='section'>
      <div className='container'>
        <div className='columns'>
          <form 
            className='column is-half is-offset-one-quarter box'
            onSubmit={handleSubmit}
          >
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <input
                  className={`input ${formErrors.name ?
                    'is-danger' : '' }`}
                  placeholder='Name Of Place'
                  name='name'
                  onChange={handleChange}

                  // value={formData.name}
                />
              </div>
              {formErrors.name && <p className='help is-danger'>
                {formErrors.name}
              </p>}
            </div>
            <div className='field'>
              <label className='label'>Address</label>
              <div className='control'>
                <input 
                  className={`input ${formErrors.address ? 
                    'is-danger' : '' }`}
                  placeholder='Address'
                  name='address'
                  onChange={handleChange}
                  // value={formData.address}
                />
              </div>
              {formErrors.address && <p className='help is-danger'>
                {formErrors.address}
              </p>}
            </div>
            <div className='field'>
              <label className='label'>Postcode</label>
              <div className='control'>
                <input 
                  className={`input ${formErrors.postcode ? 
                    'is-danger' : '' }`}
                  placeholder='Postcode'
                  name='postcode'
                  onChange={handleChange}
                  // value={formData.postcode}
                />
              </div>
              {formErrors.postcode && <p className='help is-danger'>
                {formErrors.postcode}
              </p>}
            </div>
            <div className='field'>
              <label className='label'>Image</label>
              <div className='control'>
                <input 
                  className={`input ${formErrors.image ? 
                    'is-danger' : '' }`}
                  placeholder='Image Url'
                  name='image'
                  onChange={handleChange}
                  // value={formData.image}
                />
              </div>
              {formErrors.image && <p className='help is-danger'>
                {formErrors.image}
              </p>}
            </div>
            <div className='field'>
              <label className='label'>Description</label>
              <div className='control'>
                <input 
                  className={`input ${formErrors.description ? 
                    'is-danger' : '' }`}
                  placeholder='Description'
                  name='description'
                  onChange={handleChange}
                  // value={formData.address}
                />
              </div>
              {formErrors.description && <p className='help is-danger'>
                {formErrors.description}
              </p>}
            </div>
            <div className='field'>
              <label className='label'>Categories</label>
              <div className='control'>
                <input 
                  className={`input ${formErrors.categories ? 
                    'is-danger' : '' }`}
                  placeholder='Categories ie. sports & leisure'
                  name='categories'
                  onChange={handleChange}
                  // value={formData.address}
                />
              </div>
              {formErrors.categories && <p className='help is-danger'>
                {formErrors.categories}
              </p>}
            </div>
            <div className='field'>
              <label className='label'>Rating</label>
              <div className='control'>
                <input 
                  className={`input ${formErrors.rating ? 
                    'is-danger' : '' }`}
                  placeholder='Rating'
                  name='rating'
                  onChange={handleChange}
                  // value={formData.rating}
                />
              </div>
              {formErrors.rating && <p className='help is-danger'>
                {formErrors.rating}
              </p>}
            </div>
            <div className='field'>
              <button type='submit' className='button is-success is-fullwidth'>
                Create a place!!! Lets Go!
              </button> 
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateNewPlace