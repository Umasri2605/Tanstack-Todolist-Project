import { createFileRoute } from '@tanstack/react-router'
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from 'lucide-react'
import Todolist from './Todolist/Todolist'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return(
    <div>
      <Todolist></Todolist>
    </div>
  )
}
