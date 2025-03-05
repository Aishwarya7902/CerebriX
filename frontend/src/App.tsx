import { useState } from "react"
import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { CreateContentModal } from "./components/CreateContentModal"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return <div className="p-4">


    <CreateContentModal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false)
      }}
    />

    <div className="flex justify-end gap-4">
      <Button
        onClick={() => {
          setModalOpen(true)
        }}
        variant="primary"
        text="Add Content"
        startIcon={<PlusIcon />}
      />

      <Button
        variant="secondary"
        text="Share brain"
        startIcon={<ShareIcon />}
      />

    </div>
    <div className="flex gap-4">
      <Card
        title="First tweet"
        type="twitter"
        link="https://twitter.com/Abhishekcur/status/1896627058253701316"
      />

      <Card
        title="Harkirat Motivation"
        type="youtube"
        link="https://www.youtube.com/watch?v=fZGnOPnvBp8"
      />
    </div>


  </div>
}

export default App
