import { PageHeader } from "antd"
import TaskStore from "../../stores/TaskStore"

const Task = ({ match }: any) => {
    const id = match.params.id
    TaskStore.getTask(id)
    const taskInfo = TaskStore.task
    const { title, time, icon } = taskInfo
    return (
        <PageHeader
            className="site-page-header"
            onBack={() => null}
            title={title}
            subTitle={`Created at ${time}`}
        />
    )
}

export default Task