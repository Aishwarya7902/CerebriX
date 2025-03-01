import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {


  return (
    <>

      <Button
        startIcon={<PlusIcon size='lg' />}
        endIcon={<ShareIcon size='lg' />}
        size='lg'
        title={"Share"}
        variant='secondary'
      />

      <Button
        startIcon={<PlusIcon size='lg' />}
        endIcon={<ShareIcon size='lg' />}
        size='lg'
        title={"Share"}
        variant='primary'
      />

      <Button
        startIcon={<PlusIcon size='md' />}
        endIcon={<ShareIcon size='md' />}
        size='md'
        title={"Share"}
        variant='secondary'
      />

      <Button
        startIcon={<PlusIcon size='md' />}
        endIcon={<ShareIcon size='md' />}
        size='md'
        title={"Share"}
        variant='primary'
      />

      <Button
        startIcon={<PlusIcon size='sm' />}
        endIcon={<ShareIcon size='sm' />}
        size='sm'
        title={"Share"}
        variant='secondary'
      />

      <Button
        startIcon={<PlusIcon size='sm' />}
        endIcon={<ShareIcon size='sm' />}
        size='sm'
        title={"Share"}
        variant='primary'
      />





    </>
  )
}

export default App
