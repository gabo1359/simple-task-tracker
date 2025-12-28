import './TaskList.css';

function TaskList({ tasks }) {
  const isEmpty = tasks.length === 0;

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className={`task-list ${isEmpty ? 'empty' : ''}`}>
      {isEmpty ? (
        <p className="empty-message">🎉 No tasks found! Enjoy the free time.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <span>{task.description}</span>
              <span className="task-date">{formatDateTime(task.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
