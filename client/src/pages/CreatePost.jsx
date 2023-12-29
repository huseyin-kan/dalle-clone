import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader, Header} from '../components'
const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name :'',
    prompt:'',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImg = async() => {
    if(form.prompt){
      try {
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({prompt:form.prompt})
        })
        const data = await response.json()

        setForm({...form, photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)
      }finally{
        setGeneratingImg(false)
      }
    }else{
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(form.prompt && form.photo){
      setLoading(true)
      try {
          const response = await fetch('http://localhost:8080/api/v1/post',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...form})
          })
          await response.json()
          navigate('/')
      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
      }
    }else {
      alert('Please enter a prompt and generate an image')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value})

  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt:randomPrompt})
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <Header title="Create"/>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
          labelName="Your name" 
          type="text" 
          name="name" 
          placeholder="John Doe" 
          value={form.name} 
          handleChange={handleChange} />
          <FormField 
          labelName="Prompt" 
          type="text" 
          name="prompt" 
          placeholder="A plush toy robot sitting against a yellow wall" 
          value={form.prompt} 
          handleChange={handleChange} 
          isSurpriseMe 
          handleSurpriseMe={handleSurpriseMe} />
          <div className='relative flex justify-center items-center bg-gray-50 text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 size-64 p-3'>
          {form.photo ?
          (
            <img src={form.photo} alt={form.prompt} className='size-full object-contain' />
          )
          :
          (
            <img src={preview} alt="preview" className='size-9/12 object-contain opacity-40' />
          )
          }
          {generatingImg && (
            <div className='absolute inset-0 z-10 flex justify-center items-center bg-[rgb(0,0,0,0.5)] rounded-lg'>
              <Loader/>
            </div>
          )}
        </div>
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={generateImg} className='text-white bg-green-700 font-medium text-sm rounded-md w-full sm:w-auto px-5 py-2.5 text-center' >
            {generatingImg ? 'Generating...':'Generate'}
          </button>
        </div>
        </div>
        <div className='mt-10'>
            <p className='mt-2 text-[$666e75] text-[14px]'>
              Once you have created the image you want, you can share it with others in the community
            </p>
            <button type='submit' className='mt-5 text-white bg-[#6469ff] font medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {loading ? 'Sharing...':'Sharing'}
            </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost