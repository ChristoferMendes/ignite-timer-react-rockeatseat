import { Play } from 'phosphor-react'
// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

function Home() {
  const { register, handleSubmit, watch } = useForm()

  const handleCreateNewCycle = (data: any) => {
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task // Readability const

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I&apos;ll work in</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your project"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="project 1"></option>
            <option value="project 3"></option>
            <option value="project 4"></option>
            <option value="project 5"></option>
          </datalist>

          <label htmlFor="minutesAmount">during</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={0}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton
          type="submit"
          disabled={!isSubmitDisabled}
          // onSubmit={resetForm}
        >
          <Play size={24} />
          Play
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}

export default Home
