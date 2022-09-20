import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(3, 'Info the task'),
  minutesAmount: zod
    .number()
    .min(1, 'Your task must be higher than 5 minutes')
    .max(60, 'Your task needs to be less than 60 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0') // padStart -> if a string dont have 2 chars, padStart will put a 0 in the Stars :)
  const seconds = String(secondsAmount).padStart(2, '0') // padStart -> if a string dont have 2 chars, padStart will put a 0 in the Stars :)

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

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
            disabled={!!activeCycle}
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
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interrupt
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Play
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

export default Home
