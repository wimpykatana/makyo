import './App.css'
import Dropdown from './component/Dropdown'

function App() {

  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Fried Chicken', value: '6' },
    { label: 'Grilled Chicken', value: '7' },
    { label: 'Fried Rice', value: '9' },
    { label: 'Grilled Rice', value: '10' },
  ]
 

  return (
    <>
      <Dropdown options={options} onChange={(selected) => console.log(selected)} />
    </>
  )
}

export default App
