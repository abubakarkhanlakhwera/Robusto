'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTodoStore } from '../../../lib/store';
import Layout from '../../../components/Layout';
import TaskItem from '../../../components/TaskItem';
import AddTaskForm from '../../../components/AddTaskForm';
import { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const projectId = id;

  const todos = useTodoStore((s) => s.todos);
  const projects = useTodoStore((s) => s.projects);
  const deleteProject = useTodoStore((s) => s.deleteProject);
  const updateProject = useTodoStore((s) => s.updateProject);

  const project = projects.find((p) => p.id === projectId);
  const projectTodos = todos.filter((t) => t.projectId === projectId && t.parentId === null);

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(project?.name || '');

  if (!project) {
    return (
      <Layout>
        <div className="text-center text-red-500 mt-10">Project not found</div>
      </Layout>
    );
  }

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    deleteProject(projectId);
    router.push('/projects');
  };

  const handleEdit = () => {
    if (!newName.trim()) return;
    updateProject(projectId, newName.trim());
    setEditing(false);
  };

  return (
    <Layout activeProjectName={project.name}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Project Header */}
        <div className="flex justify-between items-center">
          {editing ? (
            <div className="flex w-full gap-2 items-center">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border px-2 py-1 rounded w-full max-w-sm"
              />
              <button onClick={handleEdit}>
                <CheckIcon className="w-5 h-5 text-green-600" />
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">📁 {project.name}</h1>
              <div className="flex gap-2">
                <button onClick={() => setEditing(true)}>
                  <PencilIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button onClick={handleDelete}>
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Tasks */}
        {projectTodos.length === 0 ? (
          <p className="text-gray-500">No tasks in this project.</p>
        ) : (
          projectTodos.map((todo) => <TaskItem key={todo.id} todo={todo} />)
        )}

        {/* Add Task — validation for past date is handled inside AddTaskForm */}
        <AddTaskForm projectId={projectId} />
      </div>
    </Layout>
  );
}
