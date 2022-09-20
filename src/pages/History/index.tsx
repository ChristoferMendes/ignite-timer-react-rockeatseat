import { HistoryContainer, HistoryList, Status } from './styles'

function History() {
  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tasks !</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="yellow">On going</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Completed</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="red">Paused</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="red">Paused</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export default History
