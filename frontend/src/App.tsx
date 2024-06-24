import '@/App.css'
import { Label } from '@/components'
import { DESCRIPTION, FILES_INPUT_LABEL, TITLE } from '@/constants/uiTexts'
import FileInput from '@/components/inputs/FileInput'

function App() {
  

  return (
    <>
      <h1 className="text-2xl text-red-500">{TITLE}</h1>
      <h2 className='text-xl'>{DESCRIPTION}</h2>
      <form>
        <Label htmlFor="files">{FILES_INPUT_LABEL}</Label>
        <FileInput id="files" />
      </form>
    </>
  )
}

export default App
